// fetch-small.mjs — one-off: fetch a fixed list of asset paths from the CDN into src/.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
const CDN = 'https://pokecatch-online.pages.dev/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131.0 Safari/537.36';
const list = process.argv.slice(2).filter(a => !a.startsWith('--'));
let ok = 0, miss = [];
for (const p of list) {
  if (existsSync(join('src', p))) continue;
  const r = await fetch(CDN + p, { headers: { 'user-agent': UA } });
  const ct = r.headers.get('content-type') || '';
  if (r.status === 200 && !ct.startsWith('text/html')) {
    const buf = Buffer.from(await r.arrayBuffer());
    mkdirSync(dirname(join('src', p)), { recursive: true });
    writeFileSync(join('src', p), buf);
    ok++;
    console.log('ok', p, buf.length);
  } else miss.push(p);
}
console.log(`downloaded ${ok}, missing ${miss.length}`, miss);
