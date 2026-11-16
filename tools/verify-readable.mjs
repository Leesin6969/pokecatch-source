// verify-readable.mjs — prove the de-mangled tree (src/readable/js) is a pure alpha-rename of the
// canonical tree (src/js), then build it and boot it in a browser.
//
//   1. parse both trees as one program (same file order)
//   2. lockstep AST diff: every node must be identical (type + non-identifier fields); identifiers
//      must match the recorded rename, and the *set of unresolved globals must be byte-identical*
//      (a wrong rename shows up here as a new unresolved or a missing one)
//   3. build the readable tree and run the boot check + deep runtime audit on it
//
//   node tools/verify-readable.mjs
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { spawn } from 'node:child_process';

const strip = s => s.replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
const load = dir => readdirSync(dir).filter(f => /^\d{3}-.*\.js$/.test(f)).sort().map(f => strip(readFileSync(join(dir, f), 'utf8')));
const A = load('src/js');           // canonical
const B = load('src/readable/js');  // readable
if (A.length !== B.length) throw new Error(`file count differs: ${A.length} vs ${B.length}`);

const report = { files: A.length, nodes: 0, identifiers: 0, renames: 0, unresolvedEqual: false, problems: [], boot: null, audit: null };
const parseTree = code => parse(code, {
  sourceType: 'script', allowReturnOutsideFunction: true,
  plugins: ['optionalChaining', 'nullishCoalescingOperator', 'classProperties', 'classPrivateProperties', 'classPrivateMethods', 'classStaticBlock', 'numericSeparator', 'logicalAssignment', 'topLevelAwait'],
});
const aa = parseTree(A.join('\n'));
const bb = parseTree(B.join('\n'));

// ---- lockstep structural comparison ---------------------------------------------------------
const IGNORE = new Set(['start', 'end', 'loc', 'leadingComments', 'trailingComments', 'innerComments', 'extra']);

// every reference identifier → the binding it resolves to (null = free/global). Comparing these
// 1:1 catches any rename that changed resolution (e.g. a new shadowing binding).
function refBindings(ast) {
  const m = new Map();
  traverse(ast, {
    ReferencedIdentifier(p) { if (!m.has(p.node)) m.set(p.node, p.scope.getBinding(p.node.name) || null); },
  });
  return m;
}
const refA = refBindings(aa), refB = refBindings(bb);
const pairMap = new Map(), revMap = new Map();

function cmp(x, y, path) {
  if (x === y) return null;
  if (x === null || y === null || typeof x !== 'object' || typeof y !== 'object') {
    if (typeof x === 'number' && typeof y === 'number') return null; // numeric literal metadata
    return `${path}: ${JSON.stringify(x)} != ${JSON.stringify(y)}`;
  }
  if (Array.isArray(x) || Array.isArray(y)) {
    if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length) return `${path}: array len ${x?.length} != ${y?.length}`;
    for (let i = 0; i < x.length; i++) { const e = cmp(x[i], y[i], `${path}[${i}]`); if (e) return e; }
    return null;
  }
  if (x.type !== y.type) return `${path}: type ${x.type} != ${y.type}`;
  if (x.type === 'Identifier') {
    report.identifiers++;
    if (x.name !== y.name) report.renames++;
    const bx = refA.get(x), by = refB.get(y);
    if (!!bx !== !!by) { report.problems.push(`resolution changed at ${path}: ${x.name}→${y.name} (bound ${!!bx} → ${!!by})`); return null; }
    if (bx) {
      if (pairMap.has(bx) && pairMap.get(bx) !== by) report.problems.push(`binding ${x.name} maps to two targets at ${path}`);
      if (revMap.has(by) && revMap.get(by) !== bx) report.problems.push(`two bindings merged onto ${y.name} at ${path}`);
      pairMap.set(bx, by); revMap.set(by, bx);
    }
    return null; // identifier names are the only allowed difference
  }
  for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) {
    if (IGNORE.has(k)) continue;
    if (k === 'name' && (x.type === 'JSXIdentifier')) return null;
    const e = cmp(x[k], y[k], `${path}.${k}`);
    if (e) return e;
  }
  return null;
}
const shapeError = cmp(aa, bb, '$');
report.nodes = report.identifiers;
report.bindingPairs = pairMap.size;
if (shapeError) report.problems.push('structure: ' + shapeError);

// ---- unresolved globals must be identical ---------------------------------------------------
function unresolved(ast) {
  const counts = new Map();
  traverse(ast, {
    ReferencedIdentifier(p) {
      if (!p.scope.getBinding(p.node.name)) counts.set(p.node.name, (counts.get(p.node.name) || 0) + 1);
    },
  });
  return counts;
}
const ua = unresolved(aa), ub = unresolved(bb);
const diff = [];
for (const [k, v] of ua) if (ub.get(k) !== v) diff.push(`lost/unbalanced global ${k}: ${v} -> ${ub.get(k)}`);
for (const [k, v] of ub) if (!ua.has(k)) diff.push(`new unresolved global ${k} (${v})`);
report.unresolvedEqual = diff.length === 0;
report.unresolvedBefore = ua.size;
report.unresolvedAfter = ub.size;
if (diff.length) report.problems.push(...diff.slice(0, 30));

console.log('structure diff :', shapeError || 'none');
console.log('identifiers    :', report.identifiers, '| renamed occurrences:', report.renames);
console.log('unresolved globals identical:', report.unresolvedEqual, `(${ua.size} names)`);
if (diff.length) for (const d of diff.slice(0, 15)) console.log('  !', d);

if (report.problems.length) {
  mkdirSync('verify', { recursive: true });
  writeFileSync('verify/readable-report.json', JSON.stringify(report, null, 1));
  console.error('READABLE TREE REJECTED — see problems above');
  process.exit(1);
}

// ---- build + boot the readable tree ---------------------------------------------------------
const run = (cmd, args) => new Promise(res => { const c = spawn(cmd, args, { stdio: 'inherit' }); c.on('exit', code => res(code)); });
console.log('\nbuilding readable tree…');
if (await run(process.execPath, ['tools/build.mjs', '--src=src/readable/js', '--out=.cache/readable-dist']) !== 0) {
  report.problems.push('build failed'); process.exit(1);
}
const PORT = 4412;
const server = spawn(process.execPath, ['tools/serve.mjs', '--dir=.cache/readable-dist', `--port=${PORT}`], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1500));
try {
  console.log('\nboot check on the readable build…');
  report.boot = await run(process.execPath, ['tools/verify.mjs', `--url=http://127.0.0.1:${PORT}/`]);
  console.log('\ndeep runtime audit on the readable build…');
  await run(process.execPath, ['tools/audit-runtime.mjs', `--url=http://127.0.0.1:${PORT}/`, '--label=readable', '--deep']);
} finally { server.kill(); }

// Judge the audit by its criteria (the tool exits non-zero when it sees the three known
// "App.show(market/friends/admin)" artefacts of the audit harness, which the live site throws too).
let auditOk = false, auditSummary = null;
try {
  const a = JSON.parse(readFileSync('verify/audit-readable.json', 'utf8'));
  const s = a.summary || {};
  const known = (a.pageErrors || []).every(e => /^show (market|friends|admin):/.test(e));
  auditOk = s.httpErrors === 0 && s.consoleErrors === 0 && (s.consoleWarnings || 0) === 0 &&
    s.brokenImages === 0 && s.modules === 77 && s.screens >= 17 && known;
  auditSummary = s;
} catch { /* missing json */ }
report.audit = auditOk ? 0 : 1;
report.auditSummary = auditSummary;
if (!auditOk) report.problems.push('readable runtime audit did not meet the criteria');

mkdirSync('verify', { recursive: true });
writeFileSync('verify/readable-report.json', JSON.stringify(report, null, 1));
const ok = report.problems.length === 0 && report.boot === 0 && report.audit === 0;
console.log('\nreadable audit summary:', JSON.stringify(auditSummary));
console.log('READABLE TREE VERIFIED:', ok);
process.exit(ok ? 0 : 1);
