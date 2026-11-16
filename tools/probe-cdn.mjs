// probe-cdn.mjs — exhaustively probe the CDN for every asset family the game builds at runtime,
// download the ones that exist, and report the ones that do not exist upstream (so a 404 is the
// original game's own behaviour, not a hole in this recovery).
import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const CDN = 'https://pokecatch-online.pages.dev/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
mkdirSync('verify', { recursive: true });

const candidates = new Set();
const add = p => candidates.add(p);

// ---- 1. animated artwork + anim sprites -----------------------------------------------------
const ART_GIF_IDS = [...Array(493)].map((_, i) => i + 1);
// 5-digit form ids seen in SPITE_BOUNDS / FORMS
const bounds = readFileSync('src/js/044-sprite-bounds.js', 'utf8');
for (const m of bounds.matchAll(/(\d{5})\.png/g)) ART_GIF_IDS.push(+m[1]);
const ANIM_IDS = [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251];
for (const id of new Set(ART_GIF_IDS)) {
  add(`assets/pokemon/art/${id}.gif`);
  add(`assets/pokemon/art/shiny/${id}.gif`);
}
for (const id of ANIM_IDS) add(`assets/pokemon/anim/${id}.gif`);
add('assets/pokemon/art/88.gif'); // placeholder used when animations are disabled (095-app-boot.js)
add('assets/pokemon/art/shiny/88.gif');

// ---- 2. underground -------------------------------------------------------------------------
for (const r of ['common', 'uncommon', 'rare', 'legendary']) add(`assets/ui/underground/geode-${r}.png`);
for (const t of ['flooded', 'volcanic', 'crystal', 'dark', 'ancient', 'galleries']) add(`assets/ui/underground/rock-${t}.png`);
add('assets/items/damp-rock.png');
add('assets/ui/underground/ic-camp.svg');
add('assets/ui/underground/ic-wall.svg');

// ---- 3. friendship marks --------------------------------------------------------------------
for (const m of ['upbeat', 'sleepy-time', 'joyful', 'rowdy', 'zoned-out', 'charismatic', 'smiley', 'excited', 'teary']) {
  add(`assets/ui/marks/${m}.png`);
}

// ---- 4. trainer-card candy sprites ----------------------------------------------------------
for (const c of ['exp-candy-s', 'exp-candy-m', 'exp-candy-xl', 'exp-candy-big', 'rare-candy']) {
  add(`assets/ui/frame-candy/${c}.png`);
  add(`assets/ui/frame-candy/${c}-m.png`);
}

// ---- 5. every trainer sprite variant (base keys × region suffixes + named characters) --------
const trainerKeys = new Set();
const allSrc = readdirSync('src/js').filter(f => f.endsWith('.js')).map(f => readFileSync('src/js/' + f, 'utf8')).join('\n');
for (const m of allSrc.matchAll(/\b(?:sprite|look|face|avatar)\s*:\s*"([a-z0-9-]+)"/g)) trainerKeys.add(m[1]);
// achievement "looks" catalog is a literal array of trainer keys in 082-trainer-card.js
const tc = readFileSync('src/js/082-trainer-card.js', 'utf8');
for (const m of tc.matchAll(/"([a-z][a-z0-9]+(?:-[a-z0-9]+)*)"/g)) {
  const k = m[1];
  if (/^(red|leaf|blue|oak|elm|birch|rowan|juniper|kukui|archer|ariana|proton|petrel|ethan|kris|lyra|silver|lucas|dawn|barry|brendan|may|wally|steven|maxie|archie|cynthia|looker|riley|cheryl|buck|marley|mira|fantina|sailor|breeder|parasollady|pokemonranger|rocketgrunt|galacticgrunt|aquagrunt|magmagrunt|acetrainer|youngster|lass|camper|picnicker|swimmer|hiker|beauty|psychic|pokemaniac|fisherman|scientist|pokefan|kimonogirl|blackbelt|gentleman|ruinmaniac|bugcatcher|birdkeeper|juggler|supernerd|medium|channeler|cyclist|biker|skier|boarder|guitarist|artist|jogger|twins|youngcouple|sisandbro|policeman|teacher|schoolkid|richboy|lady|idol|aromlady|collector|dragontamer|firebreather|blackbelt|sage|nurse|doctor)(?:-[a-z]+)?$/.test(k)) trainerKeys.add(k);
}
const REGIONS = ['', '-hgss', '-rse', '-dp', '-frlg', '-bw', '-xy', '-sm', '-swsh'];
for (const k of trainerKeys) {
  for (const r of REGIONS) {
    add(`assets/trainers/${k}${r}.png`);
    add(`assets/trainers/still/${k}${r}.png`);
  }
}

// ---- 6. item sprites incl. per-type gems ----------------------------------------------------
for (const g of ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']) {
  add(`assets/items/gem-${g}.png`);
}
for (const b of ['berry-oran', 'berry-sitrus', 'berry-pecha', 'berry-leppa', 'link-cable']) {
  add(`assets/items/${b}.png`);
  add(`assets/ui/${b}.png`);
}

// ---- 7. scenes referenced by key (sanity: they must all be present already) ------------------
const story = readFileSync('src/js/028-story.js', 'utf8');
for (const m of story.matchAll(/\bbg:\s*"([a-z0-9-]+)"/g)) add(`assets/bg/scenes/${m[1]}-710x400.webp`);

// ---- probe -----------------------------------------------------------------------------------
const list = [...candidates].sort();
const todo = list.filter(p => !existsSync(join('src', p)));
console.log(`candidates: ${list.length} | already present: ${list.length - todo.length} | to probe: ${todo.length}`);
if (DRY) { writeFileSync('verify/cdn-candidates.txt', list.join('\n')); process.exit(0); }

const ok = [], absent = [];
let idx = 0;
async function worker() {
  while (idx < todo.length) {
    const p = todo[idx++];
    for (let a = 0; a < 3; a++) {
      try {
        const r = await fetch(CDN + p, { headers: { 'user-agent': UA } });
        const ct = r.headers.get('content-type') || '';
        if (r.status === 200 && !ct.startsWith('text/html')) {
          const buf = Buffer.from(await r.arrayBuffer());
          mkdirSync(dirname(join('src', p)), { recursive: true });
          writeFileSync(join('src', p), buf);
          ok.push({ path: p, bytes: buf.length });
        } else if (ct.startsWith('text/html')) absent.push(p);
        break;
      } catch (e) { if (a === 2) absent.push(p + ' ERR ' + String(e).slice(0, 60)); }
    }
  }
}
await Promise.all(Array.from({ length: 24 }, worker));
console.log(`downloaded: ${ok.length} | not on CDN: ${absent.length}`);
writeFileSync('verify/probe-cdn.json', JSON.stringify({ candidates: list.length, downloaded: ok, absent }, null, 1));
if (absent.length) console.log('not on CDN (original game 404s these too):\n' + absent.slice(0, 40).join('\n'));
