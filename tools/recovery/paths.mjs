// paths.mjs — every source-path-like string literal in the bundle (recovers original file names).
import { readFileSync } from 'node:fs';
const s = readFileSync('mirror/bundle/app.js', 'utf8');
const re = /["'`]((?:\.{0,2}\/)?(?:js|css|assets|tools|bundle)\/[A-Za-z0-9_./-]+)["'`]/g;
const found = {};
let m;
while ((m = re.exec(s))) found[m[1]] = (found[m[1]] || 0) + 1;
const keys = Object.keys(found).sort();
console.log('distinct path-like literals:', keys.length);
for (const k of keys) console.log(String(found[k]).padStart(3), k);
