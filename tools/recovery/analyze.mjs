// analyze.mjs — parse app.js, report top-level structure so we can recover module boundaries.
import { readFileSync } from 'node:fs';
import * as acorn from 'acorn';
import { simple as walk } from 'acorn-walk';

const src = readFileSync('mirror/bundle/app.js', 'utf8');
const t0 = Date.now();
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });
console.log('parsed in', Date.now() - t0, 'ms; top-level nodes:', ast.body.length);

const kinds = {};
for (const n of ast.body) kinds[n.type] = (kinds[n.type] || 0) + 1;
console.log('top-level kinds:', kinds);

// describe top-level statements (truncated text)
for (const [i, n] of ast.body.entries()) {
  const text = src.slice(n.start, Math.min(n.end, n.start + 160)).replace(/\s+/g, ' ');
  console.log(String(i).padStart(2), n.type.padEnd(22), `${String(n.end - n.start).padStart(9)}b`, text);
}

// find all `X.Y = function` namespace assignments
const assigns = [];
walk(ast, {
  AssignmentExpression(node) {
    for (let depth = 0; depth < 3; depth++) {
      // Match patterns like t.Foo = ... / window.Foo = ...
    }
    if (node.left.type === 'MemberExpression' && node.left.property.type === 'Identifier' &&
        (node.left.object.type === 'Identifier') && node.right &&
        (node.right.type === 'FunctionExpression' || node.right.type === 'ArrowFunctionExpression')) {
      assigns.push({ obj: node.left.object.name, name: node.left.property.name, start: node.start, end: node.end,
                     args: node.right.params.map(p => p.name) });
    }
  },
});
console.log('\nnamespace function assignments:', assigns.length);
const byObj = {};
for (const a of assigns) (byObj[a.obj] ??= []).push(a);
for (const [obj, list] of Object.entries(byObj)) {
  console.log(` ${obj}: ${list.length} ->`, list.slice(0, 12).map(a => a.name + '(' + a.args.join(',') + ')').join(', '));
}
