// analyze5.mjs — is statement 3 a SequenceExpression? List its elements (candidate original files).
import { readFileSync, writeFileSync } from 'node:fs';
import * as acorn from 'acorn';

const src = readFileSync('mirror/bundle/app.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });
const iife = ast.body[0].expression;
const body = (iife.type === 'CallExpression' ? iife.callee : iife).body.body;
const st3 = body[3];
console.log('st3 expr type:', st3.expression.type);
const expr = st3.expression;
if (expr.type === 'SequenceExpression') {
  console.log('sequence elements:', expr.expressions.length);
  const rows = expr.expressions.map((e, i) => {
    let label = '?';
    if (e.type === 'AssignmentExpression' && e.left.type === 'MemberExpression' && e.left.property.type === 'Identifier') {
      label = e.left.property.name;
    } else if (e.type === 'AssignmentExpression' && e.left.type === 'Identifier') label = e.left.name;
    else if (e.type === 'CallExpression' && e.callee.type === 'FunctionExpression') label = '(iife)';
    else if (e.type === 'LogicalExpression') label = 'logical:' + e.operator;
    return { i, label, start: e.start, end: e.end, size: e.end - e.start, type: e.type };
  });
  rows.forEach(r => console.log(String(r.i).padStart(3), String(r.start).padStart(8), String(r.size).padStart(8), r.type.padEnd(18), r.label));
  writeFileSync('mirror/sequence-elements.json', JSON.stringify(rows, null, 1));
} else {
  console.log('not a sequence; keys:', Object.keys(expr));
}
