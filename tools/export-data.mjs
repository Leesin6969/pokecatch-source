// export-data.mjs — dump the plain-literal data tables to data/*.json (read-only snapshot for tooling).
// Tables that are computed at runtime (IIFE + helper calls) are listed as "not exported" instead.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import * as acorn from 'acorn';

mkdirSync('data', { recursive: true });

const FILES = [
  '003-pokedex.js', '004-evolutions.js', '005-moves.js', '006-item-names.js',
  '007-encounters-kanto.js', '008-base-exp-kanto.js', '015-unown.js', '016-specials.js',
  '018-config.js', '020-types.js', '021-type-chart.js', '024-daytime.js', '025-weather.js',
  '026-habitats.js', '027-status.js', '028-story.js', '029-scenes.js', '031-league-teams.js',
  '033-underground.js', '035-raid-swaps.js', '044-sprite-bounds.js', '088-changelog.js',
];
let done = 0;
const skipped = [];

for (const file of FILES) {
  const src = readFileSync('src/js/' + file, 'utf8');
  let ast;
  try { ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script' }); }
  catch (e) { skipped.push([file, 'parse error']); continue; }
  const st = ast.body.find(n => n.type === 'ExpressionStatement' && n.expression.type === 'AssignmentExpression');
  if (!st) { skipped.push([file, 'no assignment']); continue; }
  const right = src.slice(st.expression.right.start, st.expression.right.end);
  let value;
  try { value = new Function('return (' + right + ');')(); }
  catch (e) { skipped.push([file, 'computed at runtime: ' + e.message.slice(0, 60)]); continue; }
  const key = src.slice(st.expression.left.start, st.expression.left.end).replace(/^t\./, '');
  let json;
  try { json = JSON.stringify(value, null, 1); }
  catch (e) { skipped.push([file, 'contains getters that need the game: ' + e.message.slice(0, 60)]); continue; }
  writeFileSync(`data/${key}.json`, json);
  console.log(`data/${key}.json  <- ${file}  (${(json.length / 1024).toFixed(0)} KB)`);
  done++;
}
if (skipped.length) {
  console.log('\nnot exported (computed at runtime):');
  for (const [f, why] of skipped) console.log('  ' + f + ' — ' + why);
}
console.log(`\n${done} table(s) exported to data/`);
