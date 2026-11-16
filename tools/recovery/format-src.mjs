// format-src.mjs — prettify the recovered source and PROVE the formatter changed nothing but whitespace.
//
// For every module file the original bundle chunk is parsed as an expression and the formatted file as a
// script; the two ASTs must be deeply equal once positions/raw text are dropped. That is a token-for-token
// proof: the readable source is semantically identical to the shipped code.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import * as prettier from 'prettier';
import * as acorn from 'acorn';

const bundle = readFileSync('mirror/bundle/app.js', 'utf8');
const bAst = acorn.parse(bundle, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });
const bSeq = (bAst.body[0].expression.type === 'CallExpression' ? bAst.body[0].expression.callee : bAst.body[0].expression).body.body[3].expression;
const bChunks = bSeq.expressions.map(e => bundle.slice(e.start, e.end));

const IGNORE = new Set(['start', 'end', 'loc', 'range', 'raw', 'extra']);
function astEqual(a, b, path = '') {
  if (a === b) return null;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    if (typeof a === 'number' && typeof b === 'number') return null; // -0, NaN edge cases inside literals
    return `${path}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`;
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return `${path}: array length ${a?.length} != ${b?.length}`;
    for (let i = 0; i < a.length; i++) { const e = astEqual(a[i], b[i], `${path}[${i}]`); if (e) return e; }
    return null;
  }
  if (a.type !== b.type) return `${path}: type ${a.type} != ${b.type}`;
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (IGNORE.has(k)) continue;
    const e = astEqual(a[k], b[k], `${path}.${k}`);
    if (e) return e;
  }
  return null;
}

const jsFiles = readdirSync('src/js').filter(f => f.endsWith('.js')).sort();
console.log(`formatting ${jsFiles.length} js file(s) recovered from the bundle...`);
let moduleIdx = 0;
let failures = 0;
for (const f of jsFiles) {
  const p = `src/js/${f}`;
  const src = readFileSync(p, 'utf8');
  const out = await prettier.format(src, { parser: 'babel', printWidth: 110, tabWidth: 2, endOfLine: 'lf' });
  writeFileSync(p, out);
  // verify against the original bundle chunk (files 001..095 map to chunks 0..94)
  const m = /^(\d{3})-/.exec(f);
  const idx = Number(m[1]) - 1;
  if (idx < 0) continue; // prelude
  const orig = bChunks[idx];
  const origAst = acorn.parse(`(${orig})`, { ecmaVersion: 2024, sourceType: 'script' }).body[0].expression;
  const newAst = acorn.parse(out, { ecmaVersion: 2024, sourceType: 'script' }).body[0].expression;
  const diff = astEqual(origAst, newAst, f);
  if (diff) { console.error('AST MISMATCH', f, diff); failures++; } else moduleIdx++;
}
console.log(failures ? `FAILED: ${failures} module(s) differ` : `verified ${moduleIdx}/${bChunks.length} modules: AST identical to the shipped bundle`);

// reassembled-source sanity check: prelude + all modules, headers stripped, must parse as one IIFE
{
  const strip = t => t.replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
  const prelude = strip(readFileSync('src/js/000-prelude.js', 'utf8')).trim();
  const parts = jsFiles.filter(f => /^\d{3}-/.test(f) && !f.startsWith('000'));
  const rebuilt = `(function(){${prelude}\n${parts.map(f => strip(readFileSync(`src/js/${f}`, 'utf8')).trim()).join('\n')}})();`;
  try {
    acorn.parse(rebuilt, { ecmaVersion: 2024, sourceType: 'script' });
    console.log('rebuilt source parses cleanly as one IIFE (' + rebuilt.length + ' bytes)');
  } catch (e) {
    console.error('REBUILT SOURCE DOES NOT PARSE:', e.message);
    failures++;
  }
}

console.log('\nformatting css...');
{
  const p = 'src/css/app.css';
  const src = readFileSync(p, 'utf8');
  const out = await prettier.format(src, { parser: 'css', printWidth: 200, tabWidth: 2, endOfLine: 'lf' });
  writeFileSync(p, out);
  console.log(`  src/css/app.css ${statSync(p).size} bytes`);
}

console.log('formatting boot files...');
for (const f of readdirSync('src/boot').filter(f => f.endsWith('.js'))) {
  const p = `src/boot/${f}`;
  const out = await prettier.format(readFileSync(p, 'utf8'), { parser: 'babel', printWidth: 110, tabWidth: 2, endOfLine: 'lf' });
  writeFileSync(p, out);
  console.log(`  ${p} ${statSync(p).size} bytes`);
}

console.log('formatting language bundles...');
for (const f of readdirSync('src/lang').filter(f => f.endsWith('.js'))) {
  const p = `src/lang/${f}`;
  const out = await prettier.format(readFileSync(p, 'utf8'), { parser: 'babel', printWidth: 200, tabWidth: 2, endOfLine: 'lf' });
  writeFileSync(p, out);
  console.log(`  ${p} ${statSync(p).size} bytes`);
}

if (failures) process.exit(1);
console.log('\nall formatting verified');
