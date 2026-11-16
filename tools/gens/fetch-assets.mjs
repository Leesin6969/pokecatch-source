// fetch-assets.mjs — download sprites/art for the extended dex (#494–#1025).
//
// Sources are exactly the ones the original game uses (credits: "Sprites: Pokémon Showdown, PokéSprite"):
//   icon / shiny icon : PokéSprite v2  (68×56, same style/source as the shipped icons)
//   battle art gif    : Pokémon Showdown animated sprites — `gen5ani` first (same set as the original
//                       game), then `ani`; when neither exists a Showdown `dex` still is kept and the
//                       python step (make-stills.py) turns it into a single-frame gif + still.
// Showdown filenames drop hyphens for a few species (type-null → typenull …), so both variants are tried.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const RAW = '.cache/gens/raw';
const PSV2 = 'https://raw.githubusercontent.com/darknesspwnsu/pokesprite-v2/main';
const SD = 'https://play.pokemonshowdown.com/sprites';
const ID_FROM = 494, ID_TO = 1025;
const manifest = JSON.parse(readFileSync(RAW + '/pokesprite-v2.json', 'utf8'));
const byDex = new Map(manifest.pokemon.map(s => [s.dex, s]));
const CONCURRENCY = 14;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const report = { icons: 0, shinyIcons: 0, gifs: 0, shinyGifs: 0, missingIcons: [], missingGifs: [], fallbackGifs: [], generated: [], iconFallbacks: [] };

async function fetchBuf(url, { head = false } = {}) {
  for (let t = 0; t < 3; t++) {
    try {
      const r = await fetch(url, { method: head ? 'HEAD' : 'GET', signal: AbortSignal.timeout(30000) });
      if (r.ok) return head ? true : Buffer.from(await r.arrayBuffer());
      if (r.status === 404) return null;
      await sleep(500 * (t + 1));
    } catch { await sleep(500 * (t + 1)); }
  }
  return null;
}
function save(path, buf) {
  if (existsSync(path) && readFileSync(path).length === buf.length) return false;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buf);
  return true;
}
const slugVariants = slug => (slug.includes('-') ? [slug, slug.replace(/-/g, '')] : [slug]);

const ids = [];
for (let id = ID_FROM; id <= ID_TO; id++) ids.push(id);
let i = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (i < ids.length) {
    const id = ids[i++];
    const sp = byDex.get(id);
    if (!sp) { report.missingIcons.push({ id, reason: 'no manifest entry' }); continue; }
    const slug = sp.species_slug;
    const v = slugVariants(slug);

    // ---- icons (pokesprite v2) ------------------------------------------------------------
    const iconSlugs = [slug, ...(sp.forms || []).map(f => f.file_slug).filter(Boolean)];
    let icon = null, iconSlug = null;
    for (const s of iconSlugs) { icon = await fetchBuf(`${PSV2}/pokemon/regular/${s}.png`); if (icon) { iconSlug = s; break; } }
    if (icon) { save(`src/assets/pokemon/${id}.png`, icon); report.icons++; if (iconSlug !== slug) report.iconFallbacks.push({ id, slug, iconSlug }); }
    else report.missingIcons.push({ id, slug });
    let sIcon = null;
    for (const s of iconSlugs) { sIcon = await fetchBuf(`${PSV2}/pokemon/shiny/${s}.png`); if (sIcon) break; }
    if (sIcon) { save(`src/assets/pokemon/shiny/${id}.png`, sIcon); report.shinyIcons++; }

    // ---- battle art gif (showdown) ---------------------------------------------------------
    let gif = null, gifSrc = null;
    art: for (const folder of ['gen5ani', 'ani']) {
      for (const s of v) {
        gif = await fetchBuf(`${SD}/${folder}/${s}.gif`);
        if (gif) { gifSrc = `${folder}/${s}`; break art; }
      }
    }
    if (gif) {
      save(`src/assets/pokemon/art/${id}.gif`, gif);
      report.gifs++;
      if (!gifSrc.startsWith('gen5ani/')) report.fallbackGifs.push({ id, slug, src: gifSrc });
    } else {
      let still = null;
      for (const s of v) { still = await fetchBuf(`${SD}/dex/${s}.png`) || await fetchBuf(`${SD}/home/${s}.png`); if (still) break; }
      if (still) {
        mkdirSync('.cache/gens/static', { recursive: true });
        writeFileSync(`.cache/gens/static/${id}.png`, still);
        report.generated.push({ id, slug });
      } else report.missingGifs.push({ id, slug });
    }

    // ---- shiny art gif --------------------------------------------------------------------
    let sGif = null, sSrc = null;
    art2: for (const folder of ['gen5ani-shiny', 'ani-shiny']) {
      for (const s of v) {
        sGif = await fetchBuf(`${SD}/${folder}/${s}.gif`);
        if (sGif) { sSrc = `${folder}/${s}`; break art2; }
      }
    }
    if (sGif) { save(`src/assets/pokemon/art/shiny/${id}.gif`, sGif); report.shinyGifs++; }
    else if (gif) {
      save(`src/assets/pokemon/art/shiny/${id}.gif`, gif);
      report.fallbackGifs.push({ id, slug, src: 'shiny-fallback-to-regular' });
    }

    if (i % 80 === 0) console.log('  done', i, '/', ids.length);
  }
}));

mkdirSync('src/ext/data', { recursive: true });
// merge with the previous report so a re-run keeps the original fallback lists
const prevPath = 'src/ext/data/gens-assets.json';
if (existsSync(prevPath)) {
  try {
    const prev = JSON.parse(readFileSync(prevPath, 'utf8'));
    for (const k of ['fallbackGifs', 'generated', 'iconFallbacks']) {
      const seen = new Set((report[k] || []).map(x => x.id));
      report[k] = [...(report[k] || []), ...(prev[k] || []).filter(x => !seen.has(x.id))];
    }
  } catch {}
}
writeFileSync(prevPath, JSON.stringify(report, null, 1));
console.log(JSON.stringify({ counts: { icons: report.icons, shinyIcons: report.shinyIcons, gifs: report.gifs, shinyGifs: report.shinyGifs }, missingIcons: report.missingIcons.length, missingGifs: report.missingGifs.length, staticFallbacks: report.generated.length, gifFallbacks: report.fallbackGifs.length }, null, 1));
