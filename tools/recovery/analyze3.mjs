// analyze3.mjs — full scan: find where registry vars are defined and map module order.
import { readFileSync } from 'node:fs';
import * as acorn from 'acorn';

const src = readFileSync('mirror/bundle/app.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });
const iife = ast.body[0].expression;
const body = (iife.type === 'CallExpression' ? iife.callee : iife).body.body;

console.log('top-level statements inside IIFE:');
body.forEach((n, i) => {
  const text = src.slice(n.start, Math.min(n.end, n.start + 200)).replace(/\s+/g, ' ');
  console.log(` ${i} ${n.type} ${n.end - n.start}b @${n.start}: ${text}`);
  if (n.type === 'VariableDeclaration') {
    for (const d of n.declarations) console.log('    var', d.id.name, 'init:', d.init?.type ?? '-', `${d.end - d.start}b`);
  }
});

// registry module list
let reg = null;
function eachObj(init, cb) { cb(init); }
const collect = [];
(function walk(node, depth) {
  if (!node || typeof node.type !== 'string' || depth > 8) return;
  if (node.type === 'ObjectExpression') {
    const g = node.properties.filter(p => p.kind === 'get').length;
    if (g > 30) collect.push({ node, g });
  }
  for (const k of Object.keys(node)) {
    if (['start', 'end', 'loc'].includes(k)) continue;
    const v = node[k];
    if (Array.isArray(v)) v.forEach(x => walk(x, depth + 1));
    else if (v && typeof v.type === 'string') walk(v, depth + 1);
  }
})(iife, 0);
collect.sort((a, b) => b.g - a.g);
reg = collect[0];
const mods = [];
for (const p of reg.node.properties) {
  if (p.kind !== 'get') continue;
  const ret = p.value.body.body.find(s => s.type === 'ReturnStatement');
  const cond = ret?.argument;
  mods.push({ name: p.key.name, varName: cond?.type === 'ConditionalExpression' ? cond.alternate.name : '?' });
}
const varNames = new Set(mods.map(m => m.varName));

// full walk: assignments to registry vars + function/var declarations with those names
const hits = [];
(function walk(node, depth, parent) {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'AssignmentExpression' && node.left.type === 'Identifier' && varNames.has(node.left.name)) {
    hits.push({ kind: 'assign', name: node.left.name, start: node.start, right: node.right.type, size: node.end - node.start, depth });
  }
  if (node.type === 'FunctionDeclaration' && node.id && varNames.has(node.id.name)) {
    hits.push({ kind: 'funcdecl', name: node.id.name, start: node.start, size: node.end - node.start, depth });
  }
  if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier' && varNames.has(node.id.name) && node.init) {
    hits.push({ kind: 'vardecl', name: node.id.name, start: node.start, right: node.init.type, size: node.end - node.start, depth });
  }
  for (const k of Object.keys(node)) {
    if (['start', 'end', 'loc'].includes(k)) continue;
    const v = node[k];
    if (Array.isArray(v)) v.forEach(x => walk(x, depth + 1, node));
    else if (v && typeof v.type === 'string') walk(v, depth + 1, node);
  }
})(iife, 0, null);

hits.sort((a, b) => a.start - b.start);
console.log('\n=== registry var definition sites ===');
const seen = new Set();
for (const h of hits) {
  if (seen.has(h.name)) continue;
  seen.add(h.name);
  console.log(String(h.start).padStart(8), h.kind.padEnd(10), h.name.padEnd(5), 'depth', h.depth, String(h.size).padStart(9) + 'b', h.right ?? '');
}
console.log(`defined ${seen.size}/${varNames.size}`);
const missing = [...varNames].filter(v => !seen.has(v));
if (missing.length) console.log('never assigned via those forms:', missing.join(', '));
