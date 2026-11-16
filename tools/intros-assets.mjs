// intros-assets.mjs — every asset path the intro workshop can request, checked/downloaded from the CDN.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const CDN = 'https://pokecatch-online.pages.dev/';
const src = readFileSync('src/intros/app.js', 'utf8') + '\n' + readFileSync('src/intros/shell.html', 'utf8');
const wanted = new Set();
for (const m of src.matchAll(/(?:^|["'`(\s])(?:\/|\.\.\/)?(assets\/[A-Za-z0-9_./${}-]+)/g)) {
  let p = m[1];
  if (!/\$\{/.test(p)) wanted.add(p);
  else {
    // template families: collect every scene name appearing as `xx-yy-710x400` reference
    console.log('dynamic template:', p);
  }
}
// the workshop names scenes with a `${scene}-710x400.webp` pattern; collect the scene ids it can pick
const names = new Set();
for (const m of src.matchAll(/"([a-z0-9-]+)-710x400\.webp"/g)) names.add(m[1]);
for (const m of src.matchAll(/`([a-z0-9-]+)-\$\{[^}]+\}-710x400\.webp`/g)) console.log('scene prefix:', m[1]);
for (const n of names) wanted.add(`assets/bg/scenes/${n}-710x400.webp`);
console.log('literal asset refs:', wanted.size, '| scene names:', names.size);
const missing = [...wanted].filter(p => !existsSync(join('src', p)));
console.log('missing locally:', missing.length);

let ok = 0; const absent = [];
for (const p of missing) {
  const r = await fetch(CDN + p, { headers: { 'user-agent': UA } });
  const ct = r.headers.get('content-type') || '';
  if (r.status === 200 && !ct.startsWith('text/html')) {
    const buf = Buffer.from(await r.arrayBuffer());
    mkdirSync(dirname(join('src', p)), { recursive: true });
    writeFileSync(join('src', p), buf);
    ok++;
  } else absent.push(p);
}
console.log('downloaded:', ok, '| absent upstream:', absent.length, absent.slice(0, 15));
writeFileSync('verify/intros-assets.json', JSON.stringify({ literal: [...wanted].length, sceneNames: [...names], downloaded: ok, absent }, null, 1));
