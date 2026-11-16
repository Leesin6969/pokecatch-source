// coverage.mjs — compare referenced asset paths against extracted assets; probe CDN for leftovers.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const s = readFileSync('mirror/bundle/app.js', 'utf8');
const re = /["'`]((?:\.{0,2}\/)?(?:js|css|assets|tools|bundle)\/[A-Za-z0-9_./-]+)["'`]/g;
const found = new Set();
let m;
while ((m = re.exec(s))) found.add(m[1].replace(/^\.?\//, ''));

const assets = [...found].filter(p => p.startsWith('assets/'));
const jss = [...found].filter(p => p.startsWith('js/') || p.startsWith('css/') || p.startsWith('tools/') || p.startsWith('bundle/'));
const missing = assets.filter(p => !existsSync(join('mirror', p)));
console.log('referenced asset paths:', assets.length);
console.log('missing locally:', missing.length);
for (const p of missing.sort()) console.log('  MISSING', p);
console.log('\nreferenced source paths:');
for (const p of jss.sort()) console.log('  ', p);

// what top-level dirs do we have?
const roots = readdirSync('mirror/assets');
console.log('\nextracted asset roots:', roots.join(', '));
for (const r of roots) {
  const sub = readdirSync(join('mirror/assets', r));
  console.log(`  ${r}/: ${sub.length} entries`, sub.length < 12 ? '(' + sub.join(', ') + ')' : '');
}
