// fetch-missing.mjs — download a list of asset paths (from a JSON array file) that still exist on the CDN.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
const CDN = 'https://pokecatch-online.pages.dev/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const file = process.argv[2];
const list = JSON.parse(readFileSync(file, 'utf8'));
const ok = [], absent = [];
let i = 0;
async function worker() {
  while (i < list.length) {
    const p = list[i++];
    if (existsSync(join('src', p))) { ok.push(p + ' (already)'); continue; }
    try {
      const r = await fetch(CDN + p, { headers: { 'user-agent': UA } });
      const ct = r.headers.get('content-type') || '';
      if (r.status === 200 && !ct.startsWith('text/html')) {
        const buf = Buffer.from(await r.arrayBuffer());
        mkdirSync(dirname(join('src', p)), { recursive: true });
        writeFileSync(join('src', p), buf);
        ok.push(p);
      } else absent.push(p);
    } catch (e) { absent.push(p + ' ERR'); }
  }
}
await Promise.all(Array.from({ length: 16 }, worker));
console.log(`downloaded ${ok.length} | absent upstream ${absent.length}`);
if (absent.length) console.log('absent:', absent.slice(0, 30));
writeFileSync('verify/fetch-missing-report.json', JSON.stringify({ ok: ok.length, absent }, null, 1));
