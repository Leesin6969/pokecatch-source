// analyze7.mjs — dotted-path assignments (t.UI.x = ..., t.Screens.y = ...) per chunk → real module names.
import { readFileSync } from 'node:fs';
import * as acorn from 'acorn';

const src = readFileSync('mirror/bundle/app.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });
const iife = ast.body[0].expression;
const body = (iife.type === 'CallExpression' ? iife.callee : iife).body.body;
const seq = body[3].expression;
const chunks = seq.expressions.map((e, i) => ({ i, start: e.start, end: e.end, type: e.type }));

function dotPath(node) {
  // MemberExpression chain from Identifier t
  const parts = [];
  let n = node;
  while (n.type === 'MemberExpression') {
    if (n.computed) return null;
    parts.unshift(n.property.name);
    n = n.object;
  }
  if (n.type !== 'Identifier') return null;
  return [n.name, ...parts].join('.');
}

for (const c of chunks) {
  const paths = new Map();
  const strs = new Set();
  (function walk(n, d) {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression') {
      const p = dotPath(n.left);
      if (p && p.startsWith('t.')) paths.set(p, (paths.get(p) || 0) + 1);
    }
    if (n.type === 'Literal' && typeof n.value === 'string' && /^(adventure|map|team|pokedex|shop|achievements|friends|trade|market|admin|pension|casino|raid|underground|event|home|title)$/.test(n.value)) {
      strs.add(n.value);
    }
    for (const k of Object.keys(n)) {
      if (['start', 'end', 'loc'].includes(k)) continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach(x => walk(x, d + 1));
      else if (v && typeof v.type === 'string') walk(v, d + 1);
    }
  })(seq.expressions[c.i], 0);
  if (c.type === 'CallExpression') {
    console.log(`#${c.i} ${String(c.end - c.start).padStart(7)}b`,
      '\n   paths:', [...paths.keys()].slice(0, 14).join(', ') || '-',
      '\n   screens:', [...strs].join(',') || '-');
  }
}
