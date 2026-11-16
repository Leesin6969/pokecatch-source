// build-data.mjs — generate the extension layer that adds Pokémon #494–#1025 (gen 5–9).
//
// Output (authored mod layer, never touching the recovered canonical src/js):
//   src/ext/js/003b-gen5to9-pokedex.js   push 532 Pokédex entries (after the recovered 003)
//   src/ext/js/004b-gen5to9-evolutions.js add evolution edges (after 004)
//   src/ext/js/014b-gen5to9-baseexp.js    add base experience values (after the last base-exp module)
//   src/ext/js/094b-gen5to9-story.js      fill the 5 placeholder regions + append 17 chapters with
//                                         explicit species pools (after 094, before boot 095)
//   src/ext/data/gen5to9.json             manifest for docs/audit (ids, slugs, sources, coverage)
//
// Rules kept faithful to the game's data model:
//   learnsets reuse the game's own MOVES table (unknown moves are mapped to the closest existing move
//   of the same type/category); evolutions use only level or items that already exist in the game;
//   every new species is placed in exactly one route pool so it is obtainable in normal play.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const RAW = '.cache/gens/raw';
const OUT = 'src/ext/js';
mkdirSync(OUT, { recursive: true });
mkdirSync('src/ext/data', { recursive: true });

const readJson = p => JSON.parse(readFileSync(p, 'utf8'));
const manifest = readJson(RAW + '/pokesprite-v2.json');
const byDex = new Map(manifest.pokemon.map(s => [s.dex, s]));
const MOVES = readJson('data/MOVES.json');
// gen 5-9 damaging moves added by tools/gens2/build-moves.mjs (042b extension module); they can be
// used by the new learnsets with their real names/FR translations.
const EXTRA_MOVES = existsSync('src/ext/data/moves.json') ? readJson('src/ext/data/moves.json') : {};
const ALL_MOVES = { ...MOVES, ...EXTRA_MOVES };
const moveKeys = new Set(Object.keys(ALL_MOVES));

// items the game already has (006 + 019 merged)
const items = new Set(Object.keys(readJson('data/ITEM_NAMES.json')));
for (const m of readFileSync('src/js/019-item-names-2.js', 'utf8').matchAll(/"([a-z0-9-]+)":/g)) items.add(m[1]);

const IDS = [];
for (let id = 494; id <= 1025; id++) IDS.push(id);
const species = {}, pokemon = {};
for (const id of IDS) {
  species[id] = readJson(`${RAW}/species-${id}.json`);
  pokemon[id] = readJson(`${RAW}/pokemon-${id}.json`);
}

// ---- version-group priority for learnsets -------------------------------------------------
const VG = ['scarlet-violet', 'legends-arceus', 'sword-shield', 'ultra-sun-ultra-moon', 'omega-ruby-alpha-sapphire',
  'black-2-white-2', 'black-white', 'x-y', 'sun-moon', 'let-s-go-pikachu-let-s-go-eevee', 'brilliant-diamond-and-shining-pearl', 'legends-za'];
const vgRank = name => { const i = VG.indexOf(name); return i === -1 ? 999 : i; };

// ---- move mapping: keep keys that exist, otherwise map by type/category/power -------------
const moveRaw = {};
for (const f of readFileSync(RAW + '/_summary.json', 'utf8') ? [] : []) { /* noop */ }
import { readdirSync } from 'node:fs';
for (const f of readdirSync(RAW)) {
  if (!f.startsWith('move-')) continue;
  const j = readJson(RAW + '/' + f);
  moveRaw[j.name] = j;
}
const byTypeCat = new Map();
for (const [key, mv] of Object.entries(ALL_MOVES)) {
  const k = mv.type + '|' + mv.cat;
  if (!byTypeCat.has(k)) byTypeCat.set(k, []);
  byTypeCat.get(k).push({ key, power: mv.power || 0 });
}
for (const list of byTypeCat.values()) list.sort((a, b) => a.power - b.power);
const aliasCache = new Map();
function mapMove(name, level) {
  const norm = name.replace(/\s+/g, '-').toLowerCase();
  if (moveKeys.has(norm)) return norm;
  if (aliasCache.has(norm)) return aliasCache.get(norm);
  const raw = moveRaw[norm];
  const type = raw?.type?.name || 'normal';
  const cat = raw?.damage_class?.name === 'status' ? 'status' : 'physical';
  const power = raw?.power || (cat === 'status' ? 0 : 40);
  const candidates = byTypeCat.get(type + '|' + cat) || byTypeCat.get('normal|' + cat) || byTypeCat.get('normal|physical') || [];
  let best = null, bestD = Infinity;
  for (const c of candidates) { const d = Math.abs(c.power - power); if (d < bestD) { bestD = d; best = c; } }
  const out = best ? best.key : 'tackle';
  aliasCache.set(norm, out);
  return out;
}

// ---- dex entries ---------------------------------------------------------------------------
const entries = [];
const evolutions = {};
const baseExp = {};
const nameReport = { noFrName: [], noFrFlavor: [], noFrGenus: [] };

function flavorOf(sp) {
  const fr = sp.flavor_text_entries.filter(f => f.language.name === 'fr' && f.flavor_text.trim());
  if (fr.length) return fr[fr.length - 1].flavor_text.replace(/[\n\f\r]+/g, ' ').replace(/\s+/g, ' ').trim();
  const en = sp.flavor_text_entries.filter(f => f.language.name === 'en' && f.flavor_text.trim());
  if (en.length) return en[en.length - 1].flavor_text.replace(/[\n\f\r]+/g, ' ').replace(/\s+/g, ' ').trim();
  return '';
}
const STAT = { hp: 'hp', attack: 'atk', defense: 'def', 'special-attack': 'spa', 'special-defense': 'spd', speed: 'spe' };

for (const id of IDS) {
  const sp = species[id], pk = pokemon[id], v2 = byDex.get(id);
  const frName = sp.names.find(n => n.language.name === 'fr');
  const frGenus = sp.genera.find(g => g.language.name === 'fr');
  if (!frName) nameReport.noFrName.push(id);
  if (!sp.flavor_text_entries.some(f => f.language.name === 'fr')) nameReport.noFrFlavor.push(id);
  if (!frGenus) nameReport.noFrGenus.push(id);

  // learnset: best version group first, then any level-up entry
  const learnMap = new Map();
  const candidates = [];
  for (const mv of pk.moves || []) {
    const details = (mv.version_group_details || []).filter(d => d.move_learn_method.name === 'level-up');
    if (!details.length) continue;
    details.sort((a, b) => vgRank(a.version_group.name) - vgRank(b.version_group.name));
    const d = details[0];
    const lvl = Math.max(1, Math.min(100, d.level_learned_at || 1));
    candidates.push({ move: mv.move.name, level: lvl, rank: vgRank(d.version_group.name) });
  }
  for (const c of candidates.sort((a, b) => a.rank - b.rank || a.level - b.level)) {
    const key = mapMove(c.move, c.level);
    if (!learnMap.has(key) || learnMap.get(key) > c.level) learnMap.set(key, c.level);
  }
  // guarantee a usable moveset for the first levels
  const typeMoves = [];
  for (const t of pk.types.map(x => x.type.name)) {
    for (const [key, mv] of Object.entries(ALL_MOVES)) if (mv.type === t && (mv.power || 0) > 0) typeMoves.push(key);
  }
  const fallbackLevels = [1, 5, 10, 15, 20, 25];
  for (const key of [...new Set(typeMoves)].sort((a, b) => (ALL_MOVES[a].power || 0) - (ALL_MOVES[b].power || 0))) {
    if (learnMap.size >= 6) break;
    if (!learnMap.has(key)) learnMap.set(key, fallbackLevels[Math.min(fallbackLevels.length - 1, learnMap.size)] || 1);
  }
  if (!learnMap.size) learnMap.set('tackle', 1);
  let learn = [...learnMap].map(([k, lv]) => [lv, k]).sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]));
  if (learn.length > 24) learn = learn.slice(0, 24);

  const stats = {};
  for (const st of pk.stats || []) stats[STAT[st.stat.name]] = st.base_stat;
  entries.push({
    id,
    name: frName?.name || sp.name.charAt(0).toUpperCase() + sp.name.slice(1),
    key: v2.species_slug,
    types: pk.types.map(t => t.type.name),
    stats: { hp: stats.hp, atk: stats.atk, def: stats.def, spa: stats.spa, spd: stats.spd, spe: stats.spe },
    captureRate: sp.capture_rate,
    legendary: !!sp.is_legendary,
    mythical: !!sp.is_mythical,
    height: Math.round((pk.height || 0)) / 10,
    weight: Math.round((pk.weight || 0)) / 10,
    genus: frGenus?.genus || 'Pokémon',
    flavor: flavorOf(sp),
    learn,
    ...(sp.is_baby ? { baby: true } : {}),
  });
  baseExp[id] = pk.base_experience || 60;
}

// ---- evolutions ----------------------------------------------------------------------------
const chainFiles = readdirSync(RAW).filter(f => f.startsWith('chain-'));
const dexOfUrl = url => +url.replace(/\/$/, '').split('/').pop();
const LEVEL_FOR = { trade: 30, 'level-up': 30 };
function evoEdge(to, detail) {
  const trig = detail.trigger?.name;
  if (trig === 'use-item' && detail.item) {
    const item = detail.item.name;
    if (items.has(item)) return { to, item };
    return { to, level: 40 };
  }
  if (trig === 'trade') {
    if (detail.held_item && items.has(detail.held_item.name)) return { to, item: detail.held_item.name };
    return { to, item: 'link-cable' };
  }
  const lvl = detail.min_level || (trig === 'level-up' ? 30 : 32);
  const clamped = Math.max(8, Math.min(96, lvl));
  if (trig === 'level-up' && (detail.time_of_day || detail.min_happiness || detail.min_affection || detail.known_move || detail.location || detail.needs_overworld_rain || detail.turn_upside_down)) {
    return { to, level: clamped };
  }
  return { to, level: clamped };
}
function walkChain(node) {
  const fromId = dexOfUrl(node.species.url);
  for (const child of node.evolves_to || []) {
    const toId = dexOfUrl(child.species.url);
    const detail = (child.evolution_details || [])[0] || {};
    if (fromId >= 494 || toId >= 494) {
      const edge = evoEdge(toId, detail);
      if (edge.to === fromId) { walkChain(child); continue; }
      (evolutions[fromId] ||= []).push(edge);
    }
    walkChain(child);
  }
}
for (const f of chainFiles) walkChain(readJson(RAW + '/' + f).chain);
for (const k of Object.keys(evolutions)) {
  const seen = new Set();
  evolutions[k] = evolutions[k].filter(e => { const key = e.to + ':' + (e.item || 'l' + e.level); if (seen.has(key)) return false; seen.add(key); return true; });
}

// ---- regions + chapters --------------------------------------------------------------------
const REGION_DEFS = [
  { key: 'unova', name: 'Unys', color: '#8a8a8a', gen: 'V', dex: [494, 649], mythical: 649, chapters: 4, base: 60, chaptersAce: [63, 66, 69, 72], levels: [[56, 60], [59, 63], [62, 66], [65, 69]], bgs: ['prairie', 'forest', 'cave', 'mountain'] },
  { key: 'kalos', name: 'Kalos', color: '#3b6fe0', gen: 'VI', dex: [650, 721], mythical: 721, chapters: 3, base: 72, chaptersAce: [75, 78, 81], levels: [[68, 72], [71, 75], [74, 78]], bgs: ['town', 'pier', 'forest', 'mountain'] },
  { key: 'alola', name: 'Alola', color: '#ee8130', gen: 'VII', dex: [722, 809], mythical: 807, chapters: 3, base: 83, chaptersAce: [84, 87, 90], levels: [[79, 83], [82, 86], [85, 89]], bgs: ['beach', 'sea', 'cave', 'forest'] },
  { key: 'galar', name: 'Galar', color: '#a33ea1', gen: 'VIII', dex: [810, 905], mythical: 893, chapters: 3, base: 92, chaptersAce: [93, 96, 99], levels: [[88, 92], [91, 95], [94, 97]], bgs: ['prairie', 'lake', 'mountain', 'town'] },
  { key: 'paldea', name: 'Paldea', color: '#c22e28', gen: 'IX', dex: [906, 1025], mythical: 1025, chapters: 4, base: 98, chaptersAce: [97, 98, 99, 100], levels: [[93, 97], [95, 98], [97, 99], [98, 100]], bgs: ['prairie', 'cave', 'mountain', 'pier'] },
];

const CHAPTER_NAMES = {
  unova: ['Plaines d\'Unys', 'Forêt d\'Unys', 'Monts d\'Unys', 'Grande Route d\'Unys'],
  kalos: ['Chemins de Kalos', 'Côte de Kalos', 'Montagnes de Kalos'],
  alola: ['Plages d\'Alola', 'Îles d\'Alola', 'Grottes d\'Alola'],
  galar: ['Terres de Galar', 'Lacs de Galar', 'Hauts de Galar'],
  paldea: ['Plaines de Paldea', 'Cratères de Paldea', 'Cimes de Paldea', 'Grand Nord de Paldea'],
};

const chapters = [];
const coverage = new Map();
const regionOut = [];
for (const def of REGION_DEFS) {
  const ids = [];
  for (let id = def.dex[0]; id <= def.dex[1]; id++) ids.push(id);
  const legends = ids.filter(id => entries.find(e => e.id === id)?.legendary || entries.find(e => e.id === id)?.mythical);
  const normal = ids.filter(id => !legends.includes(id));
  const stepsCount = def.chapters * 3;
  const buckets = Array.from({ length: stepsCount }, () => []);
  normal.forEach((id, i) => buckets[Math.floor((i / normal.length) * stepsCount)].push(id));
  legends.forEach((id, i) => buckets[stepsCount - 1 - (i % 3)].push(id));
  for (let c = 0; c < def.chapters; c++) {
    const ace = def.chaptersAce[c];
    const steps = [];
    for (let s = 0; s < 3; s++) {
      const pool = buckets[c * 3 + s];
      if (!pool.length) continue;
      for (const id of pool) coverage.set(id, (coverage.get(id) || 0) + 1);
      const [lo, hi] = def.levels[c];
      steps.push({
        kind: 'route',
        name: `${CHAPTER_NAMES[def.key][c]} · ${s + 1}`,
        bg: def.bgs[(c + s) % def.bgs.length],
        lv: [Math.min(100, lo + s), Math.min(100, hi + s)],
        wild: 6,
        trainers: 2,
        ...(s === 2 ? { item: true } : {}),
        species: pool.sort((a, b) => a - b),
      });
    }
    const healName = ['Centre Pokémon', 'Village', 'Camp de base'][c % 3];
    steps.push({ kind: 'heal', name: healName, bg: 'pokecenter' });
    chapters.push({
      name: CHAPTER_NAMES[def.key][c],
      reg: def.key,
      ace,
      capMargin: c === 0 ? Math.min(4, Math.max(0, 100 - ace)) : Math.min(2, Math.max(0, 100 - ace)),
      steps,
    });
  }
  regionOut.push({
    key: def.key, name: def.name, gen: def.gen, color: def.color, open: true,
    dex: def.dex, offset: 0, ace: [def.base, 4], economy: 1,
    mythical: { id: def.mythical, level: 70 },
  });
}

// validation
const allCovered = IDS.every(id => coverage.get(id) >= 1);
const coveredCount = IDS.filter(id => coverage.get(id) >= 1).length;
const learnOk = entries.every(e => e.learn.length >= 4 && e.learn.every(([lv, k]) => lv >= 1 && lv <= 100 && moveKeys.has(k)));
const evoOk = Object.entries(evolutions).every(([from, list]) => list.every(e => e.to >= 1 && e.to <= 1025 && (e.level ? e.level >= 1 && e.level <= 100 : items.has(e.item))));
console.log('species:', entries.length, '| covered by route pools:', coveredCount, '/', IDS.length, '| all covered:', allCovered);
console.log('learnset ok:', learnOk, '| evolutions ok:', evoOk, '| evolution sources:', Object.keys(evolutions).length);
if (!allCovered || !learnOk || !evoOk) {
  const miss = IDS.filter(id => !coverage.get(id));
  console.error('VALIDATION FAILED', { miss: miss.slice(0, 30), learnOk, evoOk });
}

// ---- write the extension modules -----------------------------------------------------------
const banner = (title, note) => `/**\n * ${title} — authored extension (gen 5–9 content pack).\n *\n * ${note}\n * Recovered source files (src/js/**) are left untouched so the fidelity audit against the shipped\n * bundle stays valid; the build concatenates src/js and src/ext/js in filename order.\n */\n`;
const json = v => JSON.stringify(v);

writeFileSync(`${OUT}/003b-gen5to9-pokedex.js`, banner('gen 5-9 pokedex',
  'Pushes the 532 Pokédex entries #494–#1025 after the recovered table (FR names/flavour, types, stats,\n * capture rates, learnsets mapped onto the game\'s existing MOVES entries).') +
  `t.POKEDEX.push(\n${entries.map(e => '  ' + json(e)).join(',\n')}\n);\n`);

writeFileSync(`${OUT}/004b-gen5to9-evolutions.js`, banner('gen 5-9 evolutions',
  'Adds the evolution edges of the new species (level or an item that already exists in the game).') +
  `Object.assign(t.EVOLUTIONS, ${JSON.stringify(evolutions, null, 1)});\n`);

writeFileSync(`${OUT}/014b-gen5to9-baseexp.js`, banner('gen 5-9 base exp',
  'Base experience values used by the XP formula for the new species.') +
  `Object.assign(t.BASE_EXP, ${JSON.stringify(baseExp)});\n`);

// 094b (regions + gyms + league chapters) is generated by tools/gens2/build-story.mjs — it must run after this tool.
const manifestOut = {
  generatedAt: new Date().toISOString(),
  source: { data: 'PokéAPI v2', icons: 'PokéSprite v2', art: 'Pokémon Showdown (gen5ani/ani/dex)' },
  ids: IDS.length,
  range: [494, 1025],
  regions: regionOut.map(r => ({ key: r.key, name: r.name, dex: r.dex })),
  chapters: chapters.length,
  coveredByPools: coveredCount,
  learnOk, evoOk,
  noFrFlavor: nameReport.noFrFlavor,
  noFrName: nameReport.noFrName,
  evolutions: Object.keys(evolutions).length,
  entries,
};
writeFileSync('src/ext/data/gen5to9.json', JSON.stringify(manifestOut, null, 1));
console.log('wrote extension modules:', OUT);
