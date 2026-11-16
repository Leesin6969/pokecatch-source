// coverage.mjs — check Pokémon Showdown animated-sprite coverage for #494–#1025.
import { readFileSync } from 'node:fs';
const manifest = JSON.parse(readFileSync('.cache/gens/raw/pokesprite-v2.json', 'utf8'));
const byDex = new Map(manifest.pokemon.map(s => [s.dex, s]));
const ids = [];
for (let id = 494; id <= 1025; id++) ids.push(id);
const urls = {
  gen5ani: s => `https://play.pokemonshowdown.com/sprites/gen5ani/${s}.gif`,
  'gen5ani-shiny': s => `https://play.pokemonshowdown.com/sprites/gen5ani-shiny/${s}.gif`,
  ani: s => `https://play.pokemonshowdown.com/sprites/ani/${s}.gif`,
  'ani-shiny': s => `https://play.pokemonshowdown.com/sprites/ani-shiny/${s}.gif`,
};
const out = { gen5ani: [], 'gen5ani-shiny': [], ani: [], 'ani-shiny': [], missing: [] };
async function head(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(15000) });
    return r.ok;
  } catch { return false; }
}
let i = 0;
const workers = Array.from({ length: 16 }, async () => {
  while (i < ids.length) {
    const id = ids[i++];
    const s = byDex.get(id);
    const slug = s.species_slug;
    const row = { id, slug };
    const ok = {};
    for (const [name, fn] of Object.entries(urls)) ok[name] = await head(fn(slug));
    for (const name of Object.keys(ok)) if (ok[name]) out[name].push(row);
    if (!ok['gen5ani'] && !ok.ani) out.missing.push(row);
    if (i % 60 === 0) console.log('  checked', i);
  }
});
await Promise.all(workers);
console.log(JSON.stringify({ counts: Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])), missing: out.missing }, null, 1));
