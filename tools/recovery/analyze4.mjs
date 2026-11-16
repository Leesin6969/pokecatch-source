// analyze4.mjs — recover original module order: t.<Name> = ... assignments in the bundle.
import { readFileSync, writeFileSync } from 'node:fs';
import * as acorn from 'acorn';

const src = readFileSync('mirror/bundle/app.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });
const iife = ast.body[0].expression;
const body = (iife.type === 'CallExpression' ? iife.callee : iife).body.body;

console.log('--- statement 2 (namespace proxy) ---');
const st2 = body[2];
console.log(src.slice(st2.start, st2.end));

console.log('\n--- statement 3 head (400 chars) ---');
console.log(src.slice(body[3].start, body[3].start + 400));

// walk for `t.<Name> = ...` at any depth
const hits = [];
(function walk(node) {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression' &&
      node.left.object.type === 'Identifier' && node.left.object.name === 't' &&
      node.left.property.type === 'Identifier') {
    hits.push({ name: node.left.property.name, start: node.start, end: node.end, right: node.right.type, op: node.operator });
  }
  for (const k of Object.keys(node)) {
    if (['start', 'end', 'loc'].includes(k)) continue;
    const v = node[k];
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v.type === 'string') walk(v);
  }
})(body[3]);

hits.sort((a, b) => a.start - b.start);
console.log(`\nt.X assignments: ${hits.length}`);
const uniq = [];
const seen = new Set();
for (const h of hits) { if (!seen.has(h.name)) { seen.add(h.name); uniq.push(h); } }
console.log(`unique names: ${uniq.length}`);
for (const h of uniq) console.log(String(h.start).padStart(8), h.name.padEnd(26), h.op, h.right, `${h.end - h.start}b`);

writeFileSync('mirror/module-order.json', JSON.stringify(uniq, null, 1));
