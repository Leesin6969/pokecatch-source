// probe-missing.mjs — find alternate Showdown/pokesprite slugs for the missing ids.
import { readFileSync } from 'node:fs';
const manifest = JSON.parse(readFileSync('.cache/gens/raw/pokesprite-v2.json', 'utf8'));
const missing = [772, 782, 783, 784, 785, 786, 787, 788, 866, 931, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 1001, 1002, 1003, 1004, 1005, 1006, 1009, 1010, 1017, 1020, 1021, 1022, 1023, 1025];
for (const dex of missing) {
  const s = manifest.pokemon.find(x => x.dex === dex);
  console.log(dex, 'slug=', s?.species_slug, 'forms=', s?.forms?.map(f => f.file_slug).slice(0, 4).join(','));
}
(async () => {
  const names = ['great-tusk', 'greattusk', 'iron-valiant', 'ironvaliant', 'tapu-koko', 'tapukoko', 'type-null', 'typenull', 'jangmo-o', 'jangmoo', 'mr-rime', 'mrrime', 'kommo-o', 'kommoo', 'squawkabilly', 'squawkabilly-green-plumage', 'ogerpon', 'pecharunt'];
  for (const n of names) {
    for (const folder of ['dex', 'home', 'ani']) {
      for (const ext of ['.png', '.gif']) {
        const ok = await fetch(`https://play.pokemonshowdown.com/sprites/${folder}/${n}${ext}`, { method: 'HEAD' }).then(x => x.ok).catch(() => false);
        if (ok) console.log('FOUND', folder + '/' + n + ext);
      }
    }
  }
})();
