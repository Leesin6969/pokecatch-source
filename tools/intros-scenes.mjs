// intros-scenes.mjs — download the intro-workshop scene backgrounds (they exist on the CDN) and
// build a favicon from the shell's inline data-URI icon so no local request 404s.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const CDN = 'https://pokecatch-online.pages.dev/';
const names = [
  'ciel-bleu-nuages', 'jirachi-ciel-introduction', 'lugia-introduction', 'ho-oh-introduction',
  'mewtwo-centre-intact', 'mewtwo-centre-detruit', 'artikodin-introduction', 'sulfura-grotte-sobre',
  'sinnoh-arceus-ciel',
];
let ok = 0; const absent = [];
for (const n of names) {
  const p = `assets/bg/scenes/${n}-710x400.webp`;
  if (existsSync(join('src', p))) { ok++; continue; }
  const r = await fetch(CDN + p, { headers: { 'user-agent': UA, accept: 'image/webp,image/*,*/*' } });
  const ct = r.headers.get('content-type') || '';
  if (r.status === 200 && ct.startsWith('image/')) {
    mkdirSync(dirname(join('src', p)), { recursive: true });
    writeFileSync(join('src', p), Buffer.from(await r.arrayBuffer()));
    ok++;
  } else absent.push([p, r.status, ct]);
}
console.log('intros scenes downloaded/present:', ok, '| absent:', absent);

// favicon: the shell page carries the game icon as a data: URI — write it as /favicon.ico
const shell = readFileSync('src/shell/index.html', 'utf8');
const m = /href="data:image\/png;base64,([A-Za-z0-9+/=]+)"/.exec(shell);
if (m) {
  writeFileSync('src/shell/favicon.ico', Buffer.from(m[1], 'base64'));
  console.log('favicon.ico written from the shell data URI:', Buffer.from(m[1], 'base64').length, 'bytes');
} else console.log('no data-uri favicon found in shell');
