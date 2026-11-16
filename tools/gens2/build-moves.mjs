// build-moves.mjs — add the damaging level-up moves of gen 5-9 species that the base game's
// 500-move table does not contain, so learnsets can keep their real names instead of aliases.
// Status moves are deliberately NOT added: the battle engine has no generic status effect data for
// unknown moves, so those are still mapped to the closest existing status move by build-data.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';

const RAW = '.cache/gens/raw';
const MOVES = JSON.parse(readFileSync('data/MOVES.json', 'utf8'));
const CAT = { physical: 'phys', special: 'spec', status: 'status' };
const added = {}, skipped = [];
mkdirSync('src/ext/data', { recursive: true });
for (const f of readdirSync(RAW)) {
  if (!f.startsWith('move-')) continue;
  const mv = JSON.parse(readFileSync(`${RAW}/${f}`, 'utf8'));
  const key = mv.name;
  if (MOVES[key] || added[key]) continue;
  const cat = CAT[mv.damage_class?.name];
  if (!cat || cat === 'status') { skipped.push(key + ' (status)'); continue; }
  if (!(mv.power > 0)) { skipped.push(key + ' (no power)'); continue; }
  if (mv.type?.name === 'stellar') { skipped.push(key + ' (stellar type)'); continue; }
  const fr = mv.names?.find(n => n.language.name === 'fr');
  added[key] = {
    name: fr?.name || key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    type: mv.type.name,
    power: mv.power,
    acc: mv.accuracy >= 1 && mv.accuracy <= 100 ? mv.accuracy : 100,
    cat,
  };
}
const banner = `/**\n * gen 5-9 moves — authored extension (gen 5–9 content pack).\n *\n * Extra damaging moves referenced by the new learnsets (all data from PokéAPI: FR name, type,\n * power, accuracy, category). Status moves stay aliased to existing game moves because the battle\n * engine has no per-move status effect data for unknown moves.\n */\n`;
writeFileSync('src/ext/js/005b-gen5to9-moves.js', banner + `Object.assign(t.MOVES, ${JSON.stringify(added, null, 0)});\n`);
writeFileSync('src/ext/data/moves.json', JSON.stringify(added, null, 1));
console.log('existing moves:', Object.keys(MOVES).length, '| added damaging moves:', Object.keys(added).length, '| skipped:', skipped.length);
