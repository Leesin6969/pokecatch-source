// analyze6.mjs — map each of the 95 chunks to the module names it defines.
import { readFileSync, writeFileSync } from 'node:fs';
import * as acorn from 'acorn';

const src = readFileSync('mirror/bundle/app.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });
const iife = ast.body[0].expression;
const body = (iife.type === 'CallExpression' ? iife.callee : iife).body.body;
const seq = body[3].expression;
const chunks = seq.expressions.map((e, i) => ({ i, start: e.start, end: e.end, type: e.type }));

// registry module names
const collect = [];
(function walk(node, d) {
  if (!node || typeof node.type !== 'string' || d > 9) return;
  if (node.type === 'ObjectExpression') {
    const g = node.properties.filter(p => p.kind === 'get').length;
    if (g > 30) collect.push({ node, g });
  }
  for (const k of Object.keys(node)) {
    if (['start', 'end', 'loc'].includes(k)) continue;
    const v = node[k];
    if (Array.isArray(v)) v.forEach(x => walk(x, d + 1));
    else if (v && typeof v.type === 'string') walk(v, d + 1);
  }
})(iife, 0);
collect.sort((a, b) => b.g - a.g);
const regNames = new Set(collect[0].node.properties.filter(p => p.kind === 'get').map(p => p.key.name));

// find all t.<Name> = ... assignments, record depth relative to seq element
function findAssignments(node, top) {
  const out = [];
  (function walk(n, depth) {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' &&
        n.left.object.type === 'Identifier' && n.left.object.name === 't' &&
        n.left.property.type === 'Identifier') {
      out.push({ name: n.left.property.name, depth, chained: n.right.type === 'AssignmentExpression' });
    }
    for (const k of Object.keys(n)) {
      if (['start', 'end', 'loc'].includes(k)) continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach(x => walk(x, depth + 1));
      else if (v && typeof v.type === 'string') walk(v, depth + 1);
    }
  })(node, 0);
  return out;
}

const table = [];
for (const c of chunks) {
  const node = seq.expressions[c.i];
  const asg = findAssignments(node);
  // top-level chained assignment: e.g. t.ItemFX = t.BerryFX = fn
  const names = [...new Set(asg.map(a => a.name))];
  const topNames = [...new Set(asg.filter(a => a.depth <= (c.type === 'AssignmentExpression' ? 0 : 1)).map(a => a.name))];
  table.push({
    i: c.i, start: c.start, size: c.end - c.start, type: c.type,
    names, topNames,
    modules: names.filter(n => regNames.has(n)),
    nonModule: names.filter(n => !regNames.has(n)),
  });
}

console.log('idx | size      | type               | modules defined');
for (const r of table) {
  console.log(String(r.i).padStart(3), String(r.size).padStart(9), r.type.padEnd(18), (r.modules.join(',') || '(none)'),
    r.nonModule.length ? ' [+' + r.nonModule.join(',') + ']' : '');
}
writeFileSync('mirror/chunk-names.json', JSON.stringify(table, null, 1));
console.log('\nregistry names not found in any chunk:',
  [...regNames].filter(n => !table.some(r => r.names.includes(n))).join(', ') || '(none)');
