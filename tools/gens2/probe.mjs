// probe.mjs — recon for the forms/mega pack.
import { readFileSync } from 'node:fs';
const ITEMS = JSON.parse(readFileSync('data/ITEM_NAMES.json', 'utf8'));
const t19 = readFileSync('src/js/019-item-names-2.js', 'utf8');
const keys19 = [...t19.matchAll(/"([a-z0-9-]+)":/g)].map(m => m[1]);
const allItems = new Set([...Object.keys(ITEMS), ...keys19]);
console.log('orbs/stones in game items:', [...allItems].filter(k => /orb|stone|ite/.test(k)).join(', '));

const manifest = JSON.parse(readFileSync('.cache/gens/raw/pokesprite-v2.json', 'utf8'));
const forms = [];
for (const s of manifest.pokemon) {
  for (const f of s.forms || []) {
    const slug = f.file_slug;
    if (slug === s.species_slug) continue;
    if (/-(alola|galar|hisui|paldea)$/.test(slug) || /^tauros-paldea-/.test(slug) || /-(mega|mega-x|mega-y)$/.test(slug) || /-primal$/.test(slug)) forms.push({ dex: s.dex, slug, label: f.label });
  }
}
const groups = { regional: forms.filter(f => /-(alola|galar|hisui|paldea)$|^tauros-paldea-/.test(f.slug)).length, mega: forms.filter(f => /-mega(-x|-y)?$/.test(f.slug)).length, primal: forms.filter(f => /-primal$/.test(f.slug)).length };
console.log('selected forms:', forms.length, groups);
console.log('sample:', forms.slice(0, 10).map(f => f.dex + ':' + f.slug).join(', '));
console.log('mega slugs:', forms.filter(f => /mega/.test(f.slug)).map(f => f.slug).join(', '));

// test asset availability for a few forms
const sdVariants = s => {
  const v = [s];
  if (/-mega-x$/.test(s)) v.push(s.replace(/-mega-x$/, '-megax'));
  if (/-mega-y$/.test(s)) v.push(s.replace(/-mega-y$/, '-megay'));
  if (/-mega$/.test(s)) v.push(s); // unchanged
  if (/-breed$/.test(s)) v.push(s.replace(/-breed$/, ''));
  return [...new Set(v)];
};
(async () => {
  for (const f of forms.slice(0, 6).concat(forms.filter(x => /mega|primal/.test(x.slug)).slice(0, 4))) {
    const icon = await fetch(`https://raw.githubusercontent.com/darknesspwnsu/pokesprite-v2/main/pokemon/regular/${f.slug}.png`, { method: 'HEAD' }).then(r => r.ok);
    let gif = null;
    for (const v of sdVariants(f.slug)) for (const folder of ['gen5ani', 'ani']) if (await fetch(`https://play.pokemonshowdown.com/sprites/${folder}/${v}.gif`, { method: 'HEAD' }).then(r => r.ok)) { gif = folder + '/' + v; break; }
    console.log(f.slug, '| icon:', icon ? 'ok' : 'MISS', '| gif:', gif || 'NONE');
  }
})();
