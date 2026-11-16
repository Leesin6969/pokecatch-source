// fetch-assets.mjs — download every literal-referenced asset from the CDN into mirror/.
// Skips files already present. Detects the site's text/html SPA fallback and reports it as a real 404.
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const CDN = 'https://pokecatch-online.pages.dev/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const src = readFileSync('mirror/bundle/app.js', 'utf8');

const re = /["'`]((?:\.{0,2}\/)?(?:js|css|assets|tools|bundle)\/[A-Za-z0-9_./-]+)["'`]/g;
const all = new Set();
let m;
while ((m = re.exec(src))) all.add(m[1].replace(/^\.?\//, ''));
// also collect css url() assets
const css = readFileSync('mirror/bundle/app.css', 'utf8');
for (const mm of css.matchAll(/url\(["']?(assets\/[A-Za-z0-9_./-]+)["']?\)/g)) all.add(mm[1]);

const wanted = [...all].filter(p => p.startsWith('assets/')).sort();
const todo = wanted.filter(p => !existsSync(join('mirror', p)));
console.log(`total literal asset refs: ${wanted.length}; to fetch: ${todo.length}`);

const results = { ok: [], html: [], fail: [] };
let idx = 0;
const CONC = 24;

async function one(path) {
  const url = CDN + path;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': UA } });
      const ct = r.headers.get('content-type') || '';
      const buf = Buffer.from(await r.arrayBuffer());
      if (r.status === 200 && !ct.startsWith('text/html')) {
        mkdirSync(dirname(join('mirror', path)), { recursive: true });
        writeFileSync(join('mirror', path), buf);
        results.ok.push(path);
        return;
      }
      if (ct.startsWith('text/html')) { results.html.push(path); return; }
      if (attempt === 2) results.fail.push([path, r.status]);
    } catch (e) {
      if (attempt === 2) results.fail.push([path, String(e && e.message)]);
    }
  }
}

async function worker() {
  while (idx < todo.length) {
    const p = todo[idx++];
    await one(p);
    if ((results.ok.length + results.html.length + results.fail.length) % 200 === 0) {
      console.log(`  progress ${results.ok.length + results.html.length + results.fail.length}/${todo.length}`);
    }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
console.log(`\ndownloaded: ${results.ok.length} | fallback(html=not on CDN): ${results.html.length} | failed: ${results.fail.length}`);
writeFileSync('mirror/fetch-assets-report.json', JSON.stringify({
  ok: results.ok.length, html: results.html, fail: results.fail,
}, null, 1));
if (results.html.length) console.log('not on CDN (first 40):\n' + results.html.slice(0, 40).join('\n'));
if (results.fail.length) console.log('failed:', results.fail.slice(0, 20));
