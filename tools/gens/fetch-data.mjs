// fetch-data.mjs — download the raw data needed to extend the dex from #494 to #1025.
// Sources: PokéAPI (French names/flavour/types/stats/evolution/moves) + PokéSprite v2 manifest
// (canonical slug + icon availability). Everything is cached under .cache/gens/raw so the later
// build steps are deterministic and re-runnable offline.
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

const IDS = [];
for (let id = 494; id <= 1025; id++) IDS.push(id);
const CACHE = '.cache/gens/raw';
mkdirSync(CACHE, { recursive: true });
const UA = { 'user-agent': 'pokecatch-source-recovery/1.0 (offline preservation)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getJson(url, tries = 4) {
  for (let t = 0; t < tries; t++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (r.status === 404) return { status: 404 };
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return { status: 200, json: await r.json() };
    } catch (e) {
      if (t === tries - 1) throw new Error(url + ' :: ' + e.message);
      await sleep(400 * (t + 1));
    }
  }
}
async function cached(file, url) {
  const p = `${CACHE}/${file}`;
  if (existsSync(p)) return JSON.parse(readFileSync(p, 'utf8'));
  const r = await getJson(url);
  if (r.status !== 200) throw new Error('missing ' + url);
  writeFileSync(p, JSON.stringify(r.json));
  return r.json;
}

// ---- pokesprite-v2 manifest gives canonical slugs + forms for all 1025 species -------------
const manifest = await cached('pokesprite-v2.json', 'https://raw.githubusercontent.com/darknesspwnsu/pokesprite-v2/main/data/pokemon.json');
const speciesByDex = new Map();
for (const s of manifest.pokemon) speciesByDex.set(s.dex, s);

// ---- concurrency helper --------------------------------------------------------------------
async function pool(items, n, fn) {
  let i = 0, done = 0;
  const workers = Array.from({ length: n }, async () => {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx], idx);
      if (++done % 50 === 0) console.log('  progress', done, '/', items.length);
    }
  });
  await Promise.all(workers);
}

const species = {}, pokemon = {}, chains = {};
const chainUrls = new Set();
console.log('fetching species + pokemon for', IDS.length, 'ids…');
await pool(IDS, 10, async id => {
  const sp = await cached(`species-${id}.json`, `https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const pk = await cached(`pokemon-${id}.json`, `https://pokeapi.co/api/v2/pokemon/${id}`);
  species[id] = sp;
  pokemon[id] = pk;
  if (sp.evolution_chain?.url) chainUrls.add(sp.evolution_chain.url);
});
console.log('evolution chains:', chainUrls.size);
const chainList = [...chainUrls];
await pool(chainList, 10, async (url, idx) => {
  const key = 'chain-' + url.replace(/\/$/, '').split('/').pop();
  chains[key] = await cached(key + '.json', url);
});

// ---- move names in French for the moves actually referenced by these learnsets --------------
const moveUrls = new Set();
for (const id of IDS) for (const mv of pokemon[id].moves || []) {
  const lvl = (mv.version_group_details || []).find(v => v.move_learn_method.name === 'level-up');
  if (lvl) moveUrls.add(mv.move.url);
}
console.log('distinct level-up moves:', moveUrls.size);
const moves = {};
await pool([...moveUrls], 10, async url => {
  const key = url.replace(/\/$/, '').split('/').pop();
  moves[key] = await cached('move-' + key + '.json', url);
});

// ---- summarise what we have ----------------------------------------------------------------
const summary = {
  generatedAt: new Date().toISOString(),
  manifestVersion: manifest.metadata?.version,
  ids: IDS.length,
  missingSpecies: IDS.filter(id => !species[id]),
  missingPokemon: IDS.filter(id => !pokemon[id]),
  moveCount: Object.keys(moves).length,
  chainCount: Object.keys(chains).length,
};
writeFileSync('.cache/gens/raw/_summary.json', JSON.stringify(summary, null, 1));
console.log(JSON.stringify(summary));
