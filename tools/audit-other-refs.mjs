// audit-other-refs.mjs — check non-image asset families: audio, fonts, JSON, and the intros page.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const hits = new Set();
const re = /["'`]([^"'`\s]+\.(?:mp3|ogg|wav|m4a|flac|woff2?|ttf|otf|json|bin|wasm))["'`]/g;
for (const f of readdirSync('src/js').filter(x => x.endsWith('.js'))) {
  const s = readFileSync('src/js/' + f, 'utf8');
  for (const m of s.matchAll(re)) hits.add(m[1]);
}
console.log('=== non-image file references in game source ===');
console.log([...hits].sort().join('\n') || '(none)');

// intros page: collect local refs and resolve relative to src/intros/
const intro = readFileSync('src/intros/legend-intros.html', 'utf8');
const refs = new Set();
for (const m of intro.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)) {
  const u = m[1];
  if (/^(data:|blob:|https?:|#|mailto:)/.test(u)) continue;
  refs.add(u);
}
let missingIntro = [];
for (const u of refs) {
  const p = resolve('src/intros', u);
  if (!existsSync(p)) missingIntro.push(u);
}
console.log('\n=== intros page local refs:', refs.size, '| missing:', missingIntro.length, '===');
for (const u of [...refs].slice(0, 30)) console.log('  ', u, existsSync(resolve('src/intros', u)) ? 'OK' : 'MISSING');
if (missingIntro.length) console.log('MISSING:', missingIntro);

// any fetch()/XHR of local paths in the game bundle
const bundle = readFileSync('mirror/bundle/app.js', 'utf8');
const fetches = new Set();
for (const m of bundle.matchAll(/fetch\(\s*[`"']([^`"']{2,120})[`"']/g)) fetches.add(m[1]);
console.log('\n=== fetch() targets in bundle ===');
for (const f of [...fetches].sort()) console.log('  ', f);
