// demangle.mjs — scope-aware de-mangling of the recovered source.
//
// The shipped bundle was minified by terser, so every local binding is called `a`, `b`, `Oe`…
// The canonical tree in src/js/ stays byte-faithful (AST-verified against the bundle). This tool
// produces a *readable sibling tree* in src/readable/js/ where every name that can be recovered
// mechanically gets its real name back:
//
//   1. the 77 module slots of the namespace registry   (Oo → slot_Adventure …)
//   2. the prelude helpers                             (ko → MODULES, io → GLOBAL, e → tr …)
//   3. export tables: t.UI = { $: f, … }               (f → $, ue → $$, H → h …)
//      t.Game = { makeMon: ct, … }                     (ct → makeMon …)
//      t.Screens.adventure = { … }  and  t.X = (() => ({ … }))()
//   4. destructuring aliases of the namespace         (const { esc: f, sleep: H } = t.UI)
//   5. direct aliases                                  (const B = t.Game → Game)
//   6. single-member aliases                           (const a = t.UI.$ → $)
//
// Parameters and other locals keep their minified names — their meaning cannot be recovered
// mechanically. The result is a pure alpha-rename; tools/verify-readable.mjs walks both ASTs in
// lockstep to prove it, then builds the readable tree and boots it in a browser.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const SRC = 'src/js';
const OUT = 'src/readable/js';
const files = readdirSync(SRC).filter(f => /^\d{3}-.*\.js$/.test(f)).sort();
const read = f => readFileSync(join(SRC, f), 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');

// ---- one program, so scopes span files exactly like the real bundle -------------------------
const parts = [];
let offset = 0;
const spans = [];
for (const f of files) {
  const code = read(f);
  spans.push({ file: f, start: offset, end: offset + code.length });
  parts.push(code);
  offset += code.length + 1;
}
const combined = parts.join('\n');
console.log('parsing', (combined.length / 1024 / 1024).toFixed(2), 'MB …');
const ast = parse(combined, {
  sourceType: 'script', allowReturnOutsideFunction: true,
  plugins: ['optionalChaining', 'nullishCoalescingOperator', 'classProperties', 'classPrivateProperties', 'classStaticMethods', 'classPrivateMethods', 'classStaticBlock', 'numericSeparator', 'logicalAssignment', 'topLevelAwait'],
});

// ---- prelude tables -------------------------------------------------------------------------
const prelude = read('000-prelude.js');
const slotToModule = new Map();
for (const m of prelude.matchAll(/get (\w+)\(\)\s*\{\s*return Sa \? Sa\.\1 : (\w+);/g)) {
  if (m[1] !== '_t') slotToModule.set(m[2], m[1]);
}
slotToModule.set('e', 'tr'); // e("…") is the translate function (module `_t`)
const GLOBAL_RENAMES = {
  ko: 'MODULES', Sa: 'SEALED', io: 'GLOBAL', Ro: 'BOUND_CACHE', vo: 'isModuleName',
  Qr: 'TIMERS', Wa: 'setTimeoutNative', Ss: 'setIntervalNative', es: 'requestAnimationFrameNative',
  zn: 'PERFORMANCE', ri: 'lockProperty', t: 't',
};

// ---- namespace-assignment helpers -----------------------------------------------------------
const isNamespaceTarget = node => {
  if (!node) return false;
  switch (node.type) {
    case 'Identifier': return node.name === 't';
    case 'MemberExpression': return !node.computed && isNamespaceTarget(node.object);
    case 'AssignmentExpression': return isNamespaceTarget(node.left);
    case 'LogicalExpression': return isNamespaceTarget(node.left) || isNamespaceTarget(node.right);
    case 'ParenthesizedExpression': return isNamespaceTarget(node.expression);
    case 'SequenceExpression': return isNamespaceTarget(node.expressions[node.expressions.length - 1]);
    default: return false;
  }
};
const isModuleRef = n => n && n.type === 'MemberExpression' && !n.computed &&
  n.object.type === 'Identifier' && n.object.name === 't' && n.property.type === 'Identifier';
const exportTablePairs = objExpr => {
  const out = [];
  if (!objExpr || objExpr.type !== 'ObjectExpression') return out;
  for (const p of objExpr.properties) {
    if (p.type !== 'ObjectProperty' && p.type !== 'Property') continue; // skip methods/getters
    if (p.computed) continue;
    if (!p.key || p.key.type !== 'Identifier' || !p.value || p.value.type !== 'Identifier') continue;
    out.push({ key: p.key.name, valueNode: p.value });
  }
  return out;
};
const returnedObjectOf = fnNode => {
  const body = fnNode.body;
  if (!body) return null;
  if (body.type === 'ObjectExpression') return body;
  if (body.type !== 'BlockStatement') return null;
  const last = body.body[body.body.length - 1];
  return last && last.type === 'ReturnStatement' && last.argument && last.argument.type === 'ObjectExpression' ? last.argument : null;
};

// ---- single traversal: scopes, bindings and export-table candidates --------------------------
let programPath = null;
const scopes = new Set();
const exportTables = [];
const dbg = { assigns: 0, ns: 0, obj: 0 };
traverse(ast, {
  Program(p) { programPath = p; },
  enter(p) { if (p.scope) scopes.add(p.scope); },
  AssignmentExpression(p) {
    dbg.assigns++;
    const { left, right } = p.node;
    if (!isNamespaceTarget(left)) return;
    dbg.ns++;
    let obj = null;
    if (right.type === 'ObjectExpression') { dbg.obj++; obj = right; }
    else if (right.type === 'CallExpression' && right.callee && (right.callee.type === 'FunctionExpression' || right.callee.type === 'ArrowFunctionExpression')) obj = returnedObjectOf(right.callee);
    if (obj) exportTables.push(obj);
  },
});
if (programPath) programPath.scope.crawl();
console.log('scopes:', scopes.size, '| namespace assignments:', dbg.ns, '| export tables:', exportTables.length);

const allBindings = [];
for (const scope of scopes) for (const name of Object.keys(scope.bindings || {})) allBindings.push(scope.bindings[name]);
console.log('bindings:', allBindings.length);

const nodeBinding = new Map();
for (const b of allBindings) {
  if (b.identifier) nodeBinding.set(b.identifier, b);
  for (const p of b.referencePaths || []) if (p.node) nodeBinding.set(p.node, b);
  for (const p of b.constantViolations || []) {
    if (p.node && p.node.type === 'AssignmentExpression' && p.node.left) nodeBinding.set(p.node.left, b);
    else if (p.node) nodeBinding.set(p.node, b);
  }
}

// ---- rename decisions ------------------------------------------------------------------------
const renamed = new Map();
const stats = { moduleSlots: 0, globals: 0, exportAliases: 0, uiAliases: 0, moduleAliases: 0, memberAliases: 0, shorthand: 0 };
const usedNamesByScope = new Map();
const sanitize = name => (/^[A-Za-z_$][\w$]*$/.test(name) ? name : '_' + String(name).replace(/[^\w$]/g, '_'));
// A rename is only safe if it does not shadow an outer binding that the scope (or a descendant)
// still reads by name. This is what would otherwise turn `t.LANG_PICK` inside the I18n module into
// a lookup on the renamed translate function.
function scopeIsAncestorOrSelf(ancestor, scope) {
  for (let s = scope; s; s = s.parent) if (s === ancestor) return true;
  return false;
}
function shadowsUsedOuter(scope, name, selfBinding) {
  const outer = scope.getBinding?.(name);
  if (!outer || outer === selfBinding) return false;
  if (outer.scope === scope) return false;               // own scope: handled by `used`
  for (const p of outer.referencePaths || []) {
    if (p.scope && scopeIsAncestorOrSelf(scope, p.scope)) return true;
  }
  return false;
}
// Renaming binding B to `name` is also unsafe when one of B's references sits inside a nested
// scope that already declares `name`: that reference would resolve to the nested binding instead.
function capturedByDescendant(binding, name) {
  const check = paths => {
    for (const p of paths || []) {
      if (!p.scope) continue;
      for (let s = p.scope; s && s !== binding.scope; s = s.parent) {
        if (s.bindings && Object.prototype.hasOwnProperty.call(s.bindings, name)) return true;
      }
    }
    return false;
  };
  const refs = (binding.referencePaths || []).map(p => ({ scope: p.scope }));
  const violations = (binding.constantViolations || []).map(p => ({ scope: p.scope }));
  return check(refs) || check(violations);
}
function uniqueName(scope, base, selfBinding) {
  let used = usedNamesByScope.get(scope);
  if (!used) { used = new Set(Object.keys(scope.bindings || {})); usedNamesByScope.set(scope, used); }
  let name = sanitize(base) || '_';
  if (['__proto__', 'constructor', 'prototype'].includes(name)) name = '_' + name;
  const taken = n => used.has(n) || shadowsUsedOuter(scope, n, selfBinding) ||
    (selfBinding ? capturedByDescendant(selfBinding, n) : false);
  let n = name, i = 2;
  while (taken(n)) n = name + i++;
  used.add(n);
  return n;
}
function claim(binding, targetName, kind) {
  if (!binding || renamed.has(binding)) return;
  const p = binding.path;
  const variableLike = p && (p.isVariableDeclarator?.() || p.isFunctionDeclaration?.());
  if (!variableLike) return;               // never touch params / catch bindings
  const newName = uniqueName(binding.scope, targetName, binding);
  if (newName === binding.identifier.name) return;
  renamed.set(binding, { newName, kind });
  stats[kind]++;
}

for (const b of allBindings) {
  if (!b.scope.path.isProgram()) continue;
  const name = b.identifier.name;
  if (slotToModule.has(name)) claim(b, 'slot_' + slotToModule.get(name), 'moduleSlots');
  else if (GLOBAL_RENAMES[name] && GLOBAL_RENAMES[name] !== name) claim(b, GLOBAL_RENAMES[name], 'globals');
}
console.log('after slots/globals:', { ...stats });
let dbgPairs = 0, dbgHits = 0;
for (const obj of exportTables) {
  for (const { key, valueNode } of exportTablePairs(obj)) {
    dbgPairs++;
    const b = nodeBinding.get(valueNode);
    if (b) dbgHits++;
    if (b) claim(b, key, 'exportAliases');
  }
}
console.log('export pairs:', dbgPairs, '| with binding:', dbgHits);
console.log('after export tables:', { ...stats });
for (const b of allBindings) {
  if (renamed.has(b)) continue;
  const declPath = b.path && b.path.isVariableDeclarator ? b.path : null;
  if (!declPath) continue;
  const decl = declPath.node;
  if (decl.id === b.identifier) {
    if (isModuleRef(decl.init)) claim(b, decl.init.property.name, 'moduleAliases');
    else if (decl.init && decl.init.type === 'MemberExpression' && !decl.init.computed && isModuleRef(decl.init.object)) {
      claim(b, decl.init.property.name, 'memberAliases');
    }
  } else if (decl.init && isModuleRef(decl.init)) {
    let prop = null;
    (function walk(pat) {
      if (!pat || prop) return;
      if (pat.type === 'ObjectPattern') for (const pr of pat.properties) {
        if (pr.type !== 'ObjectProperty' || !pr.value) continue;
        if (pr.value === b.identifier) { prop = pr; return; }
        if (pr.value.type === 'AssignmentPattern' && pr.value.left === b.identifier) { prop = pr; return; }
      }
    })(decl.id);
    if (prop && !prop.shorthand && !prop.computed && prop.key && prop.key.type === 'Identifier') claim(b, prop.key.name, 'uiAliases');
  }
}
console.log('final stats:', { ...stats }, '| renamed bindings:', renamed.size);

// ---- text edits ------------------------------------------------------------------------------
const edits = [];
const push = (node, text) => { if (node && typeof node.start === 'number') edits.push({ start: node.start, end: node.end, text }); };
for (const [binding, { newName }] of renamed) {
  const name = binding.identifier.name;
  push(binding.identifier, newName);
  for (const p of binding.referencePaths || []) {
    const node = p.node;
    if (!node || node.type !== 'Identifier') continue;
    const par = p.parentPath;
    if (par && par.isObjectProperty() && par.node.shorthand) { stats.shorthand++; push(node, `${name}: ${newName}`); continue; }
    if (par && par.isAssignmentPattern() && par.parentPath && par.parentPath.isObjectProperty() && par.parentPath.node.shorthand) {
      stats.shorthand++; push(node, `${name}: ${newName}`); continue;
    }
    push(node, newName);
  }
  for (const p of binding.constantViolations || []) {
    if (p.isAssignmentExpression() && p.node.left.type === 'Identifier') push(p.node.left, newName);
  }
}
edits.sort((a, b) => a.start - b.start || b.end - a.end);
const clean = [];
for (const e of edits) {
  const last = clean[clean.length - 1];
  if (last && last.start === e.start && last.end === e.end) continue;
  if (last && e.start < last.end) { console.error('OVERLAP at', e.start); process.exitCode = 1; continue; }
  clean.push(e);
}
console.log('edits:', clean.length, { ...stats });

// ---- write tree ------------------------------------------------------------------------------
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });
const spanOf = pos => spans.find(s => pos >= s.start && pos < s.end);
const perFile = new Map(files.map(f => [f, []]));
for (const e of clean) {
  const s = spanOf(e.start);
  if (s) perFile.get(s.file).push({ ...e, localStart: e.start - s.start, localEnd: e.end - s.start });
}
const manifest = {
  generatedAt: new Date().toISOString(),
  note: 'readable sibling tree; canonical byte-faithful tree is src/js/',
  globalRenames: GLOBAL_RENAMES,
  moduleSlots: Object.fromEntries([...slotToModule].map(([slot, mod]) => [mod, slot])),
  stats, renamedBindings: renamed.size, edits: clean.length, files: {},
};
for (const f of files) {
  const code = read(f);
  let out = code;
  for (const e of perFile.get(f).sort((a, b) => b.localStart - a.localStart)) {
    const expected = combined.slice(e.start, e.end);
    const slice = out.slice(e.localStart, e.localEnd);
    if (slice !== expected) { console.error('DRIFT', f, e.localStart, JSON.stringify(slice), JSON.stringify(expected)); process.exitCode = 1; continue; }
    out = out.slice(0, e.localStart) + e.text + out.slice(e.localEnd);
  }
  writeFileSync(join(OUT, f), `/**\n * ${f} — readable variant (de-mangled).\n *\n * Generated by tools/demangle.mjs from the canonical ${f} in src/js/.\n * Only mechanically-recoverable names were rewritten (module slots, prelude helpers, export tables,\n * destructuring aliases). Parameters and unknown locals keep their minified names on purpose.\n * Proven alpha-equivalent by tools/verify-readable.mjs.\n */\n` + out);
  manifest.files[f] = perFile.get(f).length;
}
writeFileSync(join(OUT, '_rename-manifest.json'), JSON.stringify(manifest, null, 1));
console.log('wrote', files.length, 'files to', OUT);
