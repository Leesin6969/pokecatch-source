// patterns.mjs — find dynamic asset path patterns (template literals) + missing breakdown.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const s = readFileSync('mirror/bundle/app.js', 'utf8');

// template literals containing assets/ with interpolation
const tpl = /`([^`]*assets\/[^`]*)`/g;
const dyn = new Set();
let m;
while ((m = tpl.exec(s))) if (m[1].includes('${')) dyn.add(m[1]);
console.log('=== dynamic asset templates ===');
for (const t of [...dyn].sort()) console.log('  ' + t);

// string concatenations like "assets/pokemon/" + ... + ".png"
const concat = /["']([^"']*assets\/[^"']*)["']\s*\+/g;
const cat = new Set();
while ((m = concat.exec(s))) cat.add(m[1]);
console.log('\n=== asset prefix strings concatenated (+) ===');
for (const t of [...cat].sort()) console.log('  ' + t);

const plusBefore = /\+\s*["']([^"']*assets\/[^"']*)["']/g;
const cat2 = new Set();
while ((m = plusBefore.exec(s))) cat2.add(m[1]);
console.log('\n=== + "assets/..." ===');
for (const t of [...cat2].sort()) console.log('  ' + t);

// missing breakdown by directory
const re = /["'`]((?:\.{0,2}\/)?(?:js|css|assets|tools|bundle)\/[A-Za-z0-9_./-]+)["'`]/g;
const found = new Set();
while ((m = re.exec(s))) found.add(m[1].replace(/^\.?\//, ''));
const assets = [...found].filter(p => p.startsWith('assets/'));
const missing = assets.filter(p => !existsSync(join('mirror', p)));
const dirs = {};
for (const p of missing) {
  const d = p.split('/').slice(0, 3).join('/');
  dirs[d] = (dirs[d] || 0) + 1;
}
console.log('\n=== missing by dir ===');
for (const [d, n] of Object.entries(dirs).sort((a, b) => b[1] - a[1])) console.log(String(n).padStart(5), d);
