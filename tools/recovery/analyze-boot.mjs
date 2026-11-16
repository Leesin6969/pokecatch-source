// analyze-boot.mjs — structure of the CDN boot loader (boot.js).
import { readFileSync } from 'node:fs';
import * as acorn from 'acorn';

const src = readFileSync('mirror/boot.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script' });
console.log('top-level nodes:', ast.body.length);
for (const [i, n] of ast.body.entries()) {
  console.log(` ${i} ${n.type} ${n.end - n.start}b @${n.start}:`, src.slice(n.start, Math.min(n.end, n.start + 90)).replace(/\s+/g, ' '));
}
const expr = ast.body[0].expression;
if (expr.type === 'SequenceExpression') {
  console.log('\nsequence elements:', expr.expressions.length);
  expr.expressions.forEach((e, i) => {
    console.log(`  ${i} ${e.type} ${e.end - e.start}b:`, src.slice(e.start, Math.min(e.end, e.start + 100)).replace(/\s+/g, ' '));
  });
}
// find the shell markup template literal and the assets object
const iD = src.indexOf('var d=`');
console.log('\nvar d=` at', iD, ' context:', JSON.stringify(src.slice(iD - 60, iD + 20)));
const iO = src.indexOf('var o={css:');
console.log('var o={css: at', iO, ' context:', JSON.stringify(src.slice(iO - 40, iO + 120)));
console.log('\ntail 200:', JSON.stringify(src.slice(-200)));
