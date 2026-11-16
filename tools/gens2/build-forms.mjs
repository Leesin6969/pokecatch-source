// build-forms.mjs — gen 5-9 content pack, part 2: alternate forms (regional + mega + primal).
//
// Produces:
//   src/ext/js/017b-gen5to9-forms.js        dex entries for the forms + FORMS/SPECIALS patches
//   src/ext/js/004c-gen5to9-forms-evos.js   form evolution edges (regional lines, mega stones, orbs)
//   src/ext/js/019c-gen5to9-items.js        mega-stone / orb item names
//   src/ext/data/forms.json                 manifest (forms, items, regions -> wild pools hint)
//   src/assets/pokemon/<formId>.*           icons + art (from PokéSprite v2 + Showdown)
//   src/assets/items/<stone>.png            mega-stone/orb icons
//   verify/forms-report.json                fetch/asset report
//
// Form ids follow the game's own convention (base × 1000 + index, always > 1025 so they never
// collide with the National Dex); the original game uses base × 100 for the 63 shipped forms.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const RAW = '.cache/gens2/raw';
const CACHE = '.cache/gens/raw';
mkdirSync(RAW, { recursive: true });
mkdirSync('src/ext/js', { recursive: true });
mkdirSync('src/ext/data', { recursive: true });
const readJson = p => JSON.parse(readFileSync(p, 'utf8'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const manifest = readJson(CACHE + '/pokesprite-v2.json');
const baseDexData = readJson('data/POKEDEX.json');
const gen59 = readJson('src/ext/data/gen5to9.json');
const baseById = new Map([...baseDexData, ...gen59.entries].map(e => [e.id, e]));

// ---- form selection ------------------------------------------------------------------------
const SELECTED = [];
const seen = new Set();
for (const s of manifest.pokemon) {
  for (const f of s.forms || []) {
    const slug = f.file_slug;
    if (!slug || seen.has(slug) || f.is_generated) continue;
    if (slug === s.species_slug) continue;
    const regional = /-(alola|galar|hisui|paldea)$/.test(slug) || /^tauros-paldea-/.test(slug);
    const mega = /-mega(-x|-y)?$/.test(slug);
    const primal = /-primal$/.test(slug);
    if (!regional && !mega && !primal) continue;
    seen.add(slug);
    SELECTED.push({ dex: s.dex, slug, sourceForm: f, kind: regional ? 'regional' : mega ? 'mega' : 'primal' });
  }
}
console.log('selected forms:', SELECTED.length, {
  regional: SELECTED.filter(f => f.kind === 'regional').length,
  mega: SELECTED.filter(f => f.kind === 'mega').length,
  primal: SELECTED.filter(f => f.kind === 'primal').length,
});

// stable ids: base*1000 + sequence, skipping collisions with the dex and with existing form ids
const existingIds = new Set(baseById.keys());
for (const f of readJson(CACHE + '/pokesprite-v2.json').pokemon) existingIds.add(f.dex);
const counters = new Map();
for (const f of SELECTED) {
  let seq = (counters.get(f.dex) || 0) + 1;
  let id = f.dex * 1000 + seq;
  while (existingIds.has(id)) id = f.dex * 1000 + ++seq;
  counters.set(f.dex, seq);
  existingIds.add(id);
  f.id = id;
}

const labelOf = f => {
  if (f.kind === 'mega') {
    if (/-mega-x$/.test(f.slug)) return 'Méga-Évolution X';
    if (/-mega-y$/.test(f.slug)) return 'Méga-Évolution Y';
    return 'Méga-Évolution';
  }
  if (f.kind === 'primal') return 'Forme Primitive';
  if (/^tauros-paldea-combat/.test(f.slug)) return 'Forme de Paldea (Race Combat)';
  if (/^tauros-paldea-blaze/.test(f.slug)) return 'Forme de Paldea (Race Flamme)';
  if (/^tauros-paldea-aqua/.test(f.slug)) return 'Forme de Paldea (Race Aquatique)';
  if (/-alola$/.test(f.slug)) return "Forme d'Alola";
  if (/-galar$/.test(f.slug)) return 'Forme de Galar';
  if (/-hisui$/.test(f.slug)) return 'Forme de Hisui';
  if (/-paldea$/.test(f.slug)) return 'Forme de Paldea';
  return 'Forme alternative';
};

// ---- fetch PokéAPI data (cached) -----------------------------------------------------------
const UA = { 'user-agent': 'pokecatch-gen5to9-pack/1.0' };
async function getJson(url, file) {
  const p = `${RAW}/${file}`;
  if (existsSync(p)) return readJson(p);
  for (let t = 0; t < 4; t++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      writeFileSync(p, JSON.stringify(j));
      return j;
    } catch (e) {
      if (t === 3) throw new Error(url + ' :: ' + e.message);
      await sleep(400 * (t + 1));
    }
  }
  return null;
}
const API_SLUG_OVERRIDE = { 'darmanitan-galar': 'darmanitan-galar-standard', 'darmanitan-galar-zen': 'darmanitan-galar-zen' };
const formData = new Map();
const missingData = [];
for (const f of SELECTED) {
  const apiSlug = API_SLUG_OVERRIDE[f.slug] || f.slug;
  const pk = await getJson(`https://pokeapi.co/api/v2/pokemon/${apiSlug}`, `pokemon-${apiSlug}.json`);
  if (!pk) { missingData.push(f.slug); continue; }
  const stats = {};
  for (const st of pk.stats || []) {
    const key = { hp: 'hp', attack: 'atk', defense: 'def', 'special-attack': 'spa', 'special-defense': 'spd', speed: 'spe' }[st.stat.name];
    if (key) stats[key] = st.base_stat;
  }
  const base = baseById.get(f.dex);
  if (!base) { missingData.push(f.slug + ' (no base)'); continue; }
  formData.set(f.slug, { types: pk.types.map(t => t.type.name), stats, height: (pk.height || 0) / 10, weight: (pk.weight || 0) / 10, baseExp: pk.base_experience || 60 });
}
console.log('form data:', formData.size, '/', SELECTED.length, '| missing:', missingData.slice(0, 8));

// ---- mega stones / primals ------------------------------------------------------------------
const MEGA_STONE = {
  'venusaur-mega': 'venusaurite', 'charizard-mega-x': 'charizardite-x', 'charizard-mega-y': 'charizardite-y',
  'blastoise-mega': 'blastoisinite', 'beedrill-mega': 'beedrillite', 'pidgeot-mega': 'pidgeotite',
  'alakazam-mega': 'alakazite', 'slowbro-mega': 'slowbronite', 'gengar-mega': 'gengarite',
  'kangaskhan-mega': 'kangaskhanite', 'pinsir-mega': 'pinsirite', 'gyarados-mega': 'gyaradosite',
  'aerodactyl-mega': 'aerodactylite', 'mewtwo-mega-x': 'mewtwonite-x', 'mewtwo-mega-y': 'mewtwonite-y',
  'ampharos-mega': 'ampharosite', 'steelix-mega': 'steelixite', 'scizor-mega': 'scizorite',
  'heracross-mega': 'heracronite', 'houndoom-mega': 'houndoominite', 'tyranitar-mega': 'tyranitarite',
  'sceptile-mega': 'sceptilite', 'blaziken-mega': 'blazikenite', 'swampert-mega': 'swampertite',
  'gardevoir-mega': 'gardevoirite', 'sableye-mega': 'sablenite', 'mawile-mega': 'mawilite',
  'aggron-mega': 'aggronite', 'medicham-mega': 'medichamite', 'manectric-mega': 'manectite',
  'sharpedo-mega': 'sharpedonite', 'camerupt-mega': 'cameruptite', 'altaria-mega': 'altarianite',
  'banette-mega': 'banettite', 'absol-mega': 'absolite', 'glalie-mega': 'glalitite',
  'salamence-mega': 'salamencite', 'metagross-mega': 'metagrossite', 'latias-mega': 'latiasite',
  'latios-mega': 'latiosite', 'rayquaza-mega': null, 'lopunny-mega': 'lopunnite',
  'garchomp-mega': 'garchompite', 'lucario-mega': 'lucarionite', 'abomasnow-mega': 'abomasnowite',
  'gallade-mega': 'galladite', 'audino-mega': 'audinite', 'diancie-mega': 'diancite',
};
const PRIMAL_ITEM = { 'kyogre-primal': 'blue-orb', 'groudon-primal': 'red-orb' };
const itemSlugs = [...new Set([...Object.values(MEGA_STONE).filter(Boolean), ...Object.values(PRIMAL_ITEM)])];
const items = {};
for (const slug of itemSlugs) {
  const it = await getJson(`https://pokeapi.co/api/v2/item/${slug}`, `item-${slug}.json`);
  const fr = it?.names?.find(n => n.language.name === 'fr');
  items[slug] = { id: slug, name: fr?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), kind: PRIMAL_ITEM && Object.values(PRIMAL_ITEM).includes(slug) ? 'primal' : 'mega' };
}
console.log('items:', Object.keys(items).length);

// ---- assets ---------------------------------------------------------------------------------
const PSV2 = 'https://raw.githubusercontent.com/darknesspwnsu/pokesprite-v2/main';
const SD = 'https://play.pokemonshowdown.com/sprites';
const report = { forms: SELECTED.length, dataMissing: missingData, icons: 0, shinyIcons: 0, gifs: 0, shinyGifs: 0, staticFallback: [], gifFallback: [], artFallback: [], missing: [], items: 0, itemIcons: 0, itemMissing: [] };
async function fetchBuf(url) {
  for (let t = 0; t < 3; t++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(25000) });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
      if (r.status === 404) return null;
      await sleep(400 * (t + 1));
    } catch { await sleep(400 * (t + 1)); }
  }
  return null;
}
const save = (p, b) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, b); };
const sdVariants = slug => {
  const v = [slug];
  if (/-mega-x$/.test(slug)) v.push(slug.replace(/-mega-x$/, '-megax'));
  if (/-mega-y$/.test(slug)) v.push(slug.replace(/-mega-y$/, '-megay'));
  if (/-breed$/.test(slug)) v.push(slug.replace(/-breed$/, ''));
  return [...new Set(v)];
};
const statics = [];
let i = 0;
for (const f of SELECTED) {
  if (i++ % 25 === 0) console.log('  assets', i, '/', SELECTED.length);
  const icon = await fetchBuf(`${PSV2}/pokemon/regular/${f.slug}.png`);
  if (icon) { save(`src/assets/pokemon/${f.id}.png`, icon); report.icons++; } else report.missing.push(f.slug + ' icon');
  const sIcon = await fetchBuf(`${PSV2}/pokemon/shiny/${f.slug}.png`);
  if (sIcon) { save(`src/assets/pokemon/shiny/${f.id}.png`, sIcon); report.shinyIcons++; } else report.missing.push(f.slug + ' shiny icon');
  let gif = null, gifSrc = null;
  art: for (const folder of ['gen5ani', 'ani']) for (const v of sdVariants(f.slug)) {
    gif = await fetchBuf(`${SD}/${folder}/${v}.gif`);
    if (gif) { gifSrc = folder + '/' + v; break art; }
  }
  if (gif) { save(`src/assets/pokemon/art/${f.id}.gif`, gif); report.gifs++; if (!gifSrc.startsWith('gen5ani/')) report.gifFallback.push({ id: f.id, slug: f.slug, src: gifSrc }); }
  else {
    let still = null;
    for (const v of sdVariants(f.slug)) { still = await fetchBuf(`${SD}/dex/${v}.png`) || await fetchBuf(`${SD}/home/${v}.png`); if (still) break; }
    if (still) { mkdirSync('.cache/gens2/static', { recursive: true }); writeFileSync(`.cache/gens2/static/${f.id}.png`, still); statics.push(f.id); }
    else {
      // last resort: reuse the base form's animated art (upstream has no file for this form)
      const fallback = `src/assets/pokemon/art/${f.dex}.gif`;
      if (existsSync(fallback)) { save(`src/assets/pokemon/art/${f.id}.gif`, readFileSync(fallback)); report.gifs++; report.artFallback.push({ id: f.id, slug: f.slug, from: f.dex }); }
      else report.missing.push(f.slug + ' art');
    }
  }
  let sgif = null;
  art2: for (const folder of ['gen5ani-shiny', 'ani-shiny']) for (const v of sdVariants(f.slug)) {
    sgif = await fetchBuf(`${SD}/${folder}/${v}.gif`);
    if (sgif) break art2;
  }
  if (sgif) { save(`src/assets/pokemon/art/shiny/${f.id}.gif`, sgif); report.shinyGifs++; }
  else if (gif) { save(`src/assets/pokemon/art/shiny/${f.id}.gif`, gif); report.gifFallback.push({ id: f.id, slug: f.slug, src: 'shiny-fallback' }); }
  else if (f.dex && existsSync(`src/assets/pokemon/art/shiny/${f.dex}.gif`)) {
    save(`src/assets/pokemon/art/shiny/${f.id}.gif`, readFileSync(`src/assets/pokemon/art/shiny/${f.dex}.gif`));
    report.artFallback.push({ id: f.id, slug: f.slug, from: f.dex, shiny: true });
  }
}
report.staticFallback = statics;

// item icons
for (const slug of Object.keys(items)) {
  let buf = null;
  for (const folder of ['mega-stone', 'other-item', 'etc', 'evo-item']) {
    buf = await fetchBuf(`${PSV2}/icons/${folder}/${slug}.png`);
    if (buf) break;
  }
  if (buf) { save(`src/assets/items/${slug}.png`, buf); report.itemIcons++; }
  else report.itemMissing.push(slug);
}
// red-orb/blue-orb are not in the icon set: recoloured from the closest orb icons
const ORB_FALLBACK = { 'red-orb': 'lustrous-orb.png', 'blue-orb': 'adamant-orb.png' };
for (const [slug, src] of Object.entries(ORB_FALLBACK)) {
  if (!existsSync(`src/assets/items/${slug}.png`) && existsSync(`src/assets/items/${src}`)) {
    save(`src/assets/items/${slug}.png`, readFileSync(`src/assets/items/${src}`));
    report.itemFallback = report.itemFallback || [];
    report.itemFallback.push({ id: slug, from: src });
    report.itemIcons++;
    report.itemMissing = report.itemMissing.filter(x => x !== slug);
  }
}
writeFileSync('src/ext/data/forms-assets.json', JSON.stringify(report, null, 1));
console.log('assets:', JSON.stringify({ icons: report.icons, shinyIcons: report.shinyIcons, gifs: report.gifs, shinyGifs: report.shinyGifs, static: statics.length, artFallback: report.artFallback.length, items: report.itemIcons, missing: report.missing.length, itemMissing: report.itemMissing.length }));

// ---- form definitions + evolution table -----------------------------------------------------
const forms = [];
for (const f of SELECTED) {
  const d = formData.get(f.slug);
  const base = baseById.get(f.dex);
  if (!d || !base) continue;
  forms.push({ id: f.id, base: f.dex, slug: f.slug, label: labelOf(f), kind: f.kind, types: d.types, stats: d.stats, height: d.height, weight: d.weight, baseExp: d.baseExp, baseName: base.name, learn: base.learn || [] });
}

// regional evolution lines: [fromSlugOrBaseId, targetSlugOrBaseId, method, value]
const REGIONAL_EVOS = [
  ['rattata-alola', 'raticate-alola', 'level', 20], ['sandshrew-alola', 'sandslash-alola', 'level', 22],
  ['vulpix-alola', 'ninetales-alola', 'item', 'ice-stone'], ['diglett-alola', 'dugtrio-alola', 'level', 26],
  ['meowth-alola', 'persian-alola', 'level', 28], ['geodude-alola', 'graveler-alola', 'level', 25],
  ['graveler-alola', 'golem-alola', 'item', 'link-cable'], ['grimer-alola', 'muk-alola', 'level', 38],
  [102, 'exeggutor-alola', 'item', 'leaf-stone'], [104, 'marowak-alola', 'level', 28],
  [25, 'raichu-alola', 'item', 'thunder-stone'],
  ['meowth-galar', 863, 'level', 28], ['ponyta-galar', 'rapidash-galar', 'level', 40],
  ['slowpoke-galar', 'slowbro-galar', 'level', 37], ['slowpoke-galar', 'slowking-galar', 'level', 40],
  ['farfetchd-galar', 865, 'level', 35], ['mr-mime-galar', 866, 'level', 42],
  ['corsola-galar', 864, 'level', 38], ['zigzagoon-galar', 'linoone-galar', 'level', 20],
  ['linoone-galar', 862, 'level', 35], ['darumaka-galar', 'darmanitan-galar', 'item', 'ice-stone'],
  ['yamask-galar', 867, 'level', 35],
  [156, 'typhlosion-hisui', 'level', 36], [502, 'samurott-hisui', 'level', 36],
  [548, 'lilligant-hisui', 'item', 'sun-stone'], [627, 'braviary-hisui', 'level', 40],
  [712, 'avalugg-hisui', 'level', 37], ['zorua-hisui', 'zoroark-hisui', 'level', 30],
  ['qwilfish-hisui', 904, 'level', 35], ['sneasel-hisui', 903, 'level', 40],
  ['sliggoo-hisui', 'goodra-hisui', 'level', 50],
  [234, 899, 'level', 35], [123, 900, 'level', 40], [217, 901, 'level', 40],
  ['wooper-paldea', 980, 'level', 20],
];
const bySlug = new Map(forms.map(f => [f.slug, f]));
const resolve = ref => (typeof ref === 'number' ? ref : bySlug.get(ref)?.id ?? null);
const evolutions = {};
const megaEvolutions = [];
for (const [from, to, method, value] of REGIONAL_EVOS) {
  const fromId = resolve(from), toId = resolve(to);
  if (!fromId || !toId) continue;
  (evolutions[fromId] ||= []).push(method === 'level' ? { to: toId, level: value } : { to: toId, item: value });
}
for (const f of forms) {
  if (f.kind === 'mega') {
    const stone = MEGA_STONE[f.slug];
    if (stone) (evolutions[f.base] ||= []).push({ to: f.id, item: stone });
    else (evolutions[f.base] ||= []).push({ to: f.id, level: 80 }); // Rayquaza: no mega stone in canon
    megaEvolutions.push({ base: f.base, to: f.id, item: stone || null, level: stone ? null : 80 });
  } else if (f.kind === 'primal') {
    const orb = PRIMAL_ITEM[f.slug];
    (evolutions[f.base] ||= []).push({ to: f.id, item: orb });
    megaEvolutions.push({ base: f.base, to: f.id, item: orb, level: null });
  }
}
for (const k of Object.keys(evolutions)) {
  const seenKey = new Set();
  evolutions[k] = evolutions[k].filter(e => { const s = e.to + ':' + (e.item || 'l' + e.level); if (seenKey.has(s)) return false; seenKey.add(s); return true; });
}

// ---- wild-pool hints (forms obtainable in their home region) ---------------------------------
const homeRegion = f => (f.kind !== 'regional' ? null : /-alola$|^tauros-paldea-/.test(f.slug) ? 'alola' : /-galar$/.test(f.slug) ? 'galar' : /-hisui$/.test(f.slug) ? 'galar' : /-paldea$/.test(f.slug) ? 'paldea' : null);
const wild = { unova: [], kalos: [], alola: [], galar: [], paldea: [] };
for (const f of forms) { const r = homeRegion(f); if (r) wild[r].push(f.id); }

// ---- write ext modules ----------------------------------------------------------------------
const banner = (title, note) => `/**\n * ${title} — authored extension (gen 5–9 content pack).\n *\n * ${note}\n * Recovered source files (src/js/**) are untouched; the build concatenates src/js and src/ext/js\n * in filename order.\n */\n`;
writeFileSync('src/ext/js/017b-gen5to9-forms.js', banner('gen 5-9 forms', 'Regional, Mega and Primal forms: dex entries + FORMS/SPECIALS patches so their art (gif/still) is used.') + `(function () {
  const defs = ${JSON.stringify(forms.map(f => ({ id: f.id, base: f.base, slug: f.slug, label: f.label, types: f.types, stats: f.stats, learn: f.learn })))};
  const map = new Map(defs.map(d => [d.id, d]));
  for (const d of defs) {
    const base = t.POKEDEX.find(e => e.id === d.base);
    if (!base) continue;
    const entry = {
      ...base, id: d.id, num: d.base, form: d.label, key: d.slug, types: d.types, stats: d.stats,
      learn: (d.learn || base.learn || []).map(x => x.slice()),
      legendary: !!base.legendary, mythical: !!base.mythical,
    };
    Object.defineProperty(entry, 'name', {
      get: function () {
        return base.name + ' (' + (typeof e === 'function' ? e(d.label) : d.label) + ')';
      },
      enumerable: true,
      configurable: true,
    });
    t.POKEDEX.push(entry);
    t.BASE_EXP[d.id] = t.BASE_EXP[d.base] || 60;
  }
  const F = t.FORMS;
  if (F) {
    const prevIsForm = F.isForm.bind(F), prevBaseOf = F.baseOf.bind(F), prevLabel = F.label.bind(F),
      prevSlug = F.slugOf.bind(F), prevFormsOf = F.formsOf.bind(F), prevEggOf = F.eggOf.bind(F);
    for (const d of defs) F.LIST.push({ id: d.id, base: d.base, slug: d.slug, form: d.label, types: d.types });
    F.ids = [...F.ids, ...defs.map(d => d.id)];
    F.isForm = id => prevIsForm(id) || map.has(id);
    F.baseOf = id => map.get(id)?.base ?? prevBaseOf(id);
    F.label = id => map.get(id)?.label ?? prevLabel(id);
    F.slugOf = id => map.get(id)?.slug ?? prevSlug(id);
    F.eggOf = id => map.get(id) ? null : prevEggOf(id);
    F.formsOf = id => {
      const base = map.get(id)?.base ?? prevBaseOf(id);
      const extra = defs.filter(d => d.base === base).map(d => d.id);
      return [...new Set([id, ...prevFormsOf(base), ...extra])];
    };
  }
  // art enablement: the shipped art loader hardcodes National Dex ids <= 493; register the new
  // National Dex range through the same hook the original special (event) mons use.
  const S = t.SPECIALS;
  if (S) {
    const prevHas = S.has.bind(S);
    S.has = id => prevHas(id) || (id >= 494 && id <= 1025);
  }
})();
`);
writeFileSync('src/ext/js/004c-gen5to9-forms-evos.js', banner('gen 5-9 forms evolutions', 'Regional evolution lines + Mega/Primal evolutions (via mega stones / orbs added below).') + `(function () {
  const add = ${JSON.stringify(evolutions)};
  for (const [from, list] of Object.entries(add)) {
    const cur = t.EVOLUTIONS[from] || (t.EVOLUTIONS[from] = []);
    for (const e of list) if (!cur.some(x => x.to === e.to && x.item === e.item && x.level === e.level)) cur.push(e);
  }
})();
`);
writeFileSync('src/ext/js/019c-gen5to9-items.js', banner('gen 5-9 mega stones', 'Mega-stone / primal-orb items used by the form evolutions.') + `Object.assign(t.ITEM_NAMES, ${JSON.stringify(Object.fromEntries(Object.entries(items).map(([k, v]) => [k, v.name]))) });\n`);

writeFileSync('src/ext/data/forms.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  source: { icons: 'PokéSprite v2', art: 'Pokémon Showdown gen5ani/ani/dex', data: 'PokéAPI v2' },
  counts: { forms: forms.length, regional: forms.filter(f => f.kind === 'regional').length, mega: forms.filter(f => f.kind === 'mega').length, primal: forms.filter(f => f.kind === 'primal').length, items: Object.keys(items).length },
  forms, wild, evolutions, megaEvolutions, items,
}, null, 1));
console.log('wrote forms modules | forms:', forms.length, '| regional:', forms.filter(f => f.kind === 'regional').length, '| mega:', forms.filter(f => f.kind === 'mega').length, '| primal:', forms.filter(f => f.kind === 'primal').length, '| items:', Object.keys(items).length);
