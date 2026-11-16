// fetch-derived.mjs — download the asset files whose names are computed at runtime
// (trainer portraits, Pokémon artwork per dex id, underground themes) by deriving the names from src/.
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const CDN = 'https://pokecatch-online.pages.dev/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const wanted = new Set();

// ---- 1. trainer sprite keys (portraits + battle stills) -----------------------------------
const allSrc = readdirSync('src/js').filter(f => f.endsWith('.js')).map(f => readFileSync('src/js/' + f, 'utf8')).join('\n');
const trainerKeys = new Set();
for (const m of allSrc.matchAll(/\b(?:sprite|look|face|avatar|portrait)\s*:\s*"([a-z0-9_-]+)"/g)) trainerKeys.add(m[1]);
for (const m of allSrc.matchAll(/(?:trainers|avatars|LOOKS|SPRITES|FACES)\s*[:=]\s*\[([^\]]{10,4000})\]/g)) {
  for (const k of m[1].matchAll(/"([a-z0-9_-]+)"/g)) trainerKeys.add(k[1]);
}
for (const k of trainerKeys) {
  wanted.add(`assets/trainers/${k}.png`);
  wanted.add(`assets/trainers/still/${k}.png`);
}
console.log('trainer keys:', trainerKeys.size);

// ---- 2. Pokémon artwork for every dex id (base + alt forms) -------------------------------
const pokedex = readFileSync('src/js/003-pokedex.js', 'utf8');
const dexIds = new Set([...pokedex.matchAll(/^\s{4}id: (\d+),/gm)].map(m => +m[1]));
// forms use 5-digit ids (49301 = form 1 of 493): collect every 5-digit id literal in the data modules
const forms = readFileSync('src/js/017-forms.js', 'utf8');
for (const m of forms.matchAll(/\b(\d{5})\b/g)) {
  const n = +m[1];
  if (n % 10000 >= 1 && n % 10000 <= 99 && Math.floor(n / 10000) <= 493) dexIds.add(n);
}
console.log('pokemon ids (base + forms):', dexIds.size);
for (const id of dexIds) {
  wanted.add(`assets/pokemon/${id}.png`);
  wanted.add(`assets/pokemon/shiny/${id}.png`);
  wanted.add(`assets/pokemon/art/still/${id}.png`);
  wanted.add(`assets/pokemon/art/shiny/still/${id}.png`);
}

// ---- 3. underground themes ----------------------------------------------------------------
const ug = readFileSync('src/js/033-underground.js', 'utf8');
const themes = new Set([...ug.matchAll(/key:\s*"([a-z0-9-]+)"/g)].map(m => m[1]));
for (const t of themes) wanted.add(`assets/bg/underground/${t}.png`);
wanted.add('assets/bg/underground/crystal.png');
console.log('underground themes:', themes.size, [...themes].join(','));

// ---- 4. download what is missing ----------------------------------------------------------
const todo = [...wanted].filter(p => !existsSync(join('src', p)));
console.log('derived candidates:', wanted.size, '| missing:', todo.length);

const ok = [], fallback = [], failed = [];
let i = 0;
async function worker() {
  while (i < todo.length) {
    const p = todo[i++];
    for (let a = 0; a < 3; a++) {
      try {
        const r = await fetch(CDN + p, { headers: { 'user-agent': UA } });
        const ct = r.headers.get('content-type') || '';
        if (r.status === 200 && !ct.startsWith('text/html')) {
          const buf = Buffer.from(await r.arrayBuffer());
          mkdirSync(dirname(join('src', p)), { recursive: true });
          writeFileSync(join('src', p), buf);
          ok.push(p);
        } else if (ct.startsWith('text/html')) fallback.push(p);
        else if (a === 2) failed.push([p, r.status]);
        if (r.status === 200 || ct.startsWith('text/html')) break;
      } catch (e) { if (a === 2) failed.push([p, String(e).slice(0, 80)]); }
    }
  }
}
await Promise.all(Array.from({ length: 20 }, worker));
console.log(`downloaded: ${ok.length} | not on CDN: ${fallback.length} | failed: ${failed.length}`);
writeFileSync('raw/fetch-derived.json', JSON.stringify({ ok: ok.length, fallback, failed }, null, 1));
if (fallback.length) console.log('not on CDN:', fallback.slice(0, 30));
if (failed.length) console.log('failed:', failed.slice(0, 10));
