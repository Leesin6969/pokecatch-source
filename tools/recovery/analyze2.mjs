// analyze2.mjs — recover module graph from the namespace registry object.
import { readFileSync } from 'node:fs';
import * as acorn from 'acorn';

const src = readFileSync('mirror/bundle/app.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });

// The IIFE body
const iife = ast.body[0].expression;
const body = (iife.type === 'CallExpression' ? iife.callee : iife).body.body;
console.log('statements inside IIFE:', body.length);

// 1) locate the registry object literal: object with many get/set property pairs whose getters return Identifier
function findRegistry() {
  let best = null;
  for (const st of body) {
    let decl = st.type === 'VariableDeclaration' ? st : null;
    const cands = [];
    if (decl) for (const d of decl.declarations) if (d.init?.type === 'ObjectExpression') cands.push(d);
    if (st.type === 'ExpressionStatement' && st.expression.type === 'AssignmentExpression' && st.expression.right.type === 'ObjectExpression') cands.push(st.expression);
    for (const c of cands) {
      const obj = c.init ?? c.right;
      const withGet = obj.properties.filter(p => p.kind === 'get').length;
      if (!best || withGet > best.count) best = { count: withGet, obj, node: c };
    }
  }
  return best;
}
const reg = findRegistry();
console.log('registry object getters:', reg.count, 'props:', reg.obj.properties.length);

// map module name -> var name
const mods = [];
for (const p of reg.obj.properties) {
  if (p.kind !== 'get') continue;
  const name = p.key.name ?? p.key.value;
  // getter body: return Sa ? Sa.Adventure : Oo
  let varName = null;
  const ret = p.value.body.body.find(s => s.type === 'ReturnStatement');
  const cond = ret?.argument;
  if (cond?.type === 'ConditionalExpression') varName = cond.alternate.name;
  mods.push({ name, varName, getStart: p.get?.start ?? p.start });
}
console.log('\nmodules in registry (alphabetical):', mods.length);
console.log(mods.map(m => `${m.name}=${m.varName}`).join('  '));

// 2) where is each var first assigned a value inside IIFE? walk top-level statements recursively for AssignmentExpression with left=Identifier
const positions = new Map(); // varName -> [{kind, start}]
const visit = (node, depth = 0) => {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'AssignmentExpression' && node.left.type === 'Identifier') {
    const n = node.left.name;
    if (!positions.has(n)) positions.set(n, []);
    positions.get(n).push({ op: node.operator, start: node.start, right: node.right.type });
  }
  if (depth > 1) return;
  for (const k of Object.keys(node)) {
    if (k === 'start' || k === 'end' || k === 'loc') continue;
    const v = node[k];
    if (Array.isArray(v)) v.forEach(x => visit(x, depth + 1));
    else if (v && typeof v.type === 'string') visit(v, depth + 1);
  }
};
body.forEach(st => visit(st, 0));

const found = mods.filter(m => positions.has(m.varName));
const missing = mods.filter(m => !positions.has(m.varName));
console.log(`\nvars assigned: ${found.length}/${mods.length}; missing: ${missing.map(m => m.name + '=' + m.varName).join(', ')}`);

// order by first assignment position
const ordered = found.map(m => ({ ...m, at: positions.get(m.varName)[0].start })).sort((a, b) => a.at - b.at);
console.log('\n=== module order by first assignment position ===');
ordered.forEach((m, i) => {
  const ctx = src.slice(m.at - 40, m.at).replace(/\s+/g, ' ');
  console.log(String(i).padStart(3), String(m.at).padStart(8), m.name.padEnd(22), m.varName.padEnd(5), '|', ctx.slice(-38));
});
