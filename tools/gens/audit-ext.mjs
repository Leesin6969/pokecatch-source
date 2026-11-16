// audit-ext.mjs — independent audit of the gen 5–9 content pack (species + forms + gyms + league).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const fail = [];
const warn = [];
const ok = [];
const check = (name, cond, detail = '') => (cond ? ok.push(name) : fail.push(name + (detail ? ' — ' + detail : '')));
const listBad = a => a.slice(0, 8).join(', ');
const readJson = p => JSON.parse(readFileSync(p, 'utf8'));

const dexManifest = readJson('src/ext/data/gen5to9.json');
const formsManifest = readJson('src/ext/data/forms.json');
const gymsManifest = readJson('src/ext/data/gyms.json');
const movesExtra = readJson('src/ext/data/moves.json');
const MOVES = readJson('data/MOVES.json');
const ALL_MOVES = { ...MOVES, ...movesExtra };
const ITEM_NAMES = readJson('data/ITEM_NAMES.json');
const TYPES = new Set(['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']);

// ---- 1. National Dex entries -----------------------------------------------------------------
const IDS = [];
for (let id = 494; id <= 1025; id++) IDS.push(id);
const entries = dexManifest.entries;
const byId = new Map(entries.map(e => [e.id, e]));
check('dex: 532 entries', entries.length === 532, String(entries.length));
check('dex: ids 494..1025 exact', JSON.stringify(entries.map(e => e.id)) === JSON.stringify(IDS));
check('dex: no duplicates', byId.size === entries.length);
check('dex: names FR', entries.every(e => e.name && e.name.length >= 2));
check('dex: types valid', entries.every(e => e.types.length && e.types.every(t => TYPES.has(t))));
check('dex: stats valid', entries.every(e => ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].every(k => e.stats[k] >= 1 && e.stats[k] <= 255)));
check('dex: capture rate valid', entries.every(e => e.captureRate >= 1 && e.captureRate <= 255));
check('dex: height/weight valid', entries.every(e => e.height > 0 && e.height < 30 && e.weight > 0 && e.weight < 1200));
check('dex: flavor present', entries.every(e => (e.flavor || '').length > 20), 'empty: ' + entries.filter(e => (e.flavor || '').length <= 20).length);
check('dex: learnsets valid (>=4, existing moves)', entries.every(e => e.learn.length >= 4 && e.learn.every(([lv, k]) => lv >= 1 && lv <= 100 && ALL_MOVES[k])));
const learnRefs = entries.reduce((a, e) => a + e.learn.length, 0);
const legend = entries.filter(e => e.legendary).length, myth = entries.filter(e => e.mythical).length;

// ---- 2. Evolutions ---------------------------------------------------------------------------
const evo = (() => {
  const parseModule = file => {
    const src = readFileSync(file, 'utf8');
    if (src.includes('Object.assign(t.EVOLUTIONS, ')) {
      const a = src.indexOf('t.EVOLUTIONS, ') + 't.EVOLUTIONS, '.length;
      return JSON.parse(src.slice(a, src.lastIndexOf(');')));
    }
    // 004c uses: const add = { ... }; ... Object.assign(t.EVOLUTIONS...)
    const a = src.indexOf('const add = ') + 'const add = '.length;
    return JSON.parse(src.slice(a, src.indexOf(';\n  for (const [from')));
  };
  const merged = {};
  for (const file of ['src/ext/js/004b-gen5to9-evolutions.js', 'src/ext/js/004c-gen5to9-forms-evos.js']) {
    for (const [from, list] of Object.entries(parseModule(file))) merged[from] = [...(merged[from] || []), ...list];
  }
  return merged;
})();
const baseDexIds = new Set(readJson('data/POKEDEX.json').map(e => e.id));
const dexAll = new Set([...baseDexIds, ...byId.keys()]);
const formIdSet = new Set(formsManifest.forms.map(f => f.id));
const allowedItems = new Set([...Object.keys(ITEM_NAMES), ...Object.keys(formsManifest.items || {})]);
const badEvo = [];
for (const [from, list] of Object.entries(evo)) for (const e of list) {
  if (!(dexAll.has(+from) || formIdSet.has(+from)) || !e.to || !(dexAll.has(e.to) || formIdSet.has(e.to))) badEvo.push(from + '->' + e.to);
  if (e.level != null && !(e.level >= 1 && e.level <= 100)) badEvo.push(from + '->lvl' + e.level);
  if (e.item != null && !allowedItems.has(e.item)) badEvo.push(from + '->item:' + e.item);
}
check('evolutions: ', badEvo.length === 0, listBad(badEvo));
check('evolutions: >= 230 sources (incl 15 cross-gen)', Object.keys(evo).length >= 230, String(Object.keys(evo).length));
const baseExpSrc = readFileSync('src/ext/js/014b-gen5to9-baseexp.js', 'utf8');
const b = baseExpSrc.indexOf('t.BASE_EXP, ') + 't.BASE_EXP, '.length; const baseExp = JSON.parse(baseExpSrc.slice(b, baseExpSrc.lastIndexOf(');')));
check('base exp: 532 values', Object.keys(baseExp).length === 532, String(Object.keys(baseExp).length));

// ---- 3. Extra moves --------------------------------------------------------------------------
check('moves: damaging moves added', Object.keys(movesExtra).length >= 150, String(Object.keys(movesExtra).length));
check('moves: shape valid', Object.values(movesExtra).every(m => m.name && TYPES.has(m.type) && m.power > 0 && ['phys', 'spec'].includes(m.cat) && m.acc >= 1 && m.acc <= 100));

// ---- 4. Forms (regional / mega / primal) -----------------------------------------------------
const forms = formsManifest.forms;
const byFormId = new Map(forms.map(f => [f.id, f]));
check('forms: 103 total', forms.length === 103, String(forms.length));
check('forms: counts regional/mega/primal', forms.filter(f => f.kind === 'regional').length === 53 && forms.filter(f => f.kind === 'mega').length === 48 && forms.filter(f => f.kind === 'primal').length === 2,
  JSON.stringify({ regional: forms.filter(f => f.kind === 'regional').length, mega: forms.filter(f => f.kind === 'mega').length, primal: forms.filter(f => f.kind === 'primal').length }));
check('forms: ids unique & > 1025', new Set(forms.map(f => f.id)).size === forms.length && forms.every(f => f.id > 1025));
check('forms: base ids exist in dex', forms.every(f => dexAll.has(f.base)));
check('forms: types/stats valid', forms.every(f => f.types.length && f.types.every(t => TYPES.has(t)) && f.stats && ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].every(k => f.stats[k] >= 1 && f.stats[k] <= 255)));
check('forms: every mega/primal has an evolution entry', forms.filter(f => f.kind !== 'regional').every(f => Object.values(evo).some(list => list.some(e => e.to === f.id))));
const stones = formsManifest.items || {};
check('items: 49 mega stones / orbs', Object.keys(stones).length === 49, String(Object.keys(stones).length));
check('items: FR names', Object.values(stones).every(i => i.name && i.name.length > 3));
check('items: in ITEM_NAMES module', Object.keys(stones).every(k => readFileSync('src/ext/js/019c-gen5to9-items.js', 'utf8').includes(JSON.stringify(k))));
check('forms: mega stones sold in shop', readFileSync('src/ext/js/094c-gen5to9-shop.js', 'utf8').includes('venusaurite'));

// ---- 5. Regions / gyms / badges / league -----------------------------------------------------
const chaptersSrc = readFileSync('src/ext/js/094b-gen5to9-story.js', 'utf8');
const chStart = chaptersSrc.indexOf('const chapters = [') + 'const chapters = '.length;
const chEnd = chaptersSrc.indexOf('];', chStart);
const chapters = JSON.parse(chaptersSrc.slice(chStart, chEnd + 1));
check('story: 65 new chapters', chapters.length === 65, String(chapters.length));
check('story: 5 regions with dex ranges', JSON.stringify(gymsManifest.regions.map(r => r.key)) === JSON.stringify(['unova', 'kalos', 'alola', 'galar', 'paldea']));
check('story: 13 chapters per region', ['unova', 'kalos', 'alola', 'galar', 'paldea'].every(k => chapters.filter(c => c.reg === k).length === 13));
const gymSteps = chapters.flatMap(c => c.steps.filter(s => s.kind === 'gym' && s.badge && !s.champion));
check('story: 40 gyms with badges', gymSteps.length === 40, String(gymSteps.length));
check('story: 8 unique badges per region', ['unova', 'kalos', 'alola', 'galar', 'paldea'].every(k => {
  const b = chapters.filter(c => c.reg === k).flatMap(c => c.steps.filter(s => s.kind === 'gym' && s.badge && !s.champion).map(s => s.badge));
  return b.length === 8 && new Set(b).size === 8;
}));
check('story: gym steps complete', gymSteps.every(s => s.leader && s.sprite && s.type && TYPES.has(s.type) && s.team.length >= 3 && s.ace > 0 && s.reward > 0));
check('story: 25 league chapters', chapters.filter(c => c.league).length === 25, String(chapters.filter(c => c.league).length));
check('story: 5 champions with champion flag', chapters.filter(c => c.steps.some(s => s.kind === 'gym' && s.champion)).length === 5);
check('story: caps <= 100', chapters.every(c => c.ace + (c.capMargin ?? 0) <= 100), 'max: ' + Math.max(...chapters.map(c => c.ace + (c.capMargin ?? 0))));
const poolIds = new Set(chapters.flatMap(c => c.steps.filter(s => s.kind === 'route').flatMap(s => s.species || [])));
const baseCovered = IDS.filter(id => poolIds.has(id)).length;
check('story: all 532 new species in wild pools', baseCovered === 532, 'covered ' + baseCovered);
check('story: regional forms in home-region pools', formsManifest.wild && Object.values(formsManifest.wild).flat().slice(0, 10).every(id => poolIds.has(id)), 'wild hint ids: ' + Object.values(formsManifest.wild || {}).flat().length);
const badgeSheets = ['unova', 'kalos', 'alola', 'galar', 'paldea'].map(k => `src/assets/badges/${k}-sheet.png`);
check('badges: 5 recoloured sheet images', badgeSheets.every(existsSync));
const bmStart = chaptersSrc.indexOf('const badgeMaps = ') + 'const badgeMaps = '.length;
const bmEnd = chaptersSrc.indexOf('const badgeSheets');
const badgeMapsParsed = JSON.parse(chaptersSrc.slice(bmStart, bmEnd).trim().replace(/;\s*$/, ''));
check('badges: 8 badge names per region', Object.values(badgeMapsParsed).every(m => Object.keys(m).length === 8));
check('badges: 5 recoloured sheet images', ['unova', 'kalos', 'alola', 'galar', 'paldea'].map(k => `src/assets/badges/${k}-sheet.png`).every(existsSync));
const leagueTeamsSrc = readFileSync('src/ext/js/031b-gen5to9-league-teams.js', 'utf8');
check('league teams: >= 20 themed line-ups', (leagueTeamsSrc.match(/"sprite":/g) || []).length >= 80);
for (const mod of ['src/ext/js/017b-gen5to9-forms.js', 'src/ext/js/005b-gen5to9-moves.js', 'src/ext/js/004c-gen5to9-forms-evos.js', 'src/ext/js/019c-gen5to9-items.js', 'src/ext/js/094c-gen5to9-shop.js']) {
  try { new Function(readFileSync(mod, 'utf8')); } catch (e) { check('module parses: ' + mod, false, e.message); }
}

// ---- 6. Assets -------------------------------------------------------------------------------
const missing = [], badFormat = [];
let formBytes = 0;
for (const id of IDS) {
  const files = [
    [`src/assets/pokemon/${id}.png`, 'png'], [`src/assets/pokemon/shiny/${id}.png`, 'png'],
    [`src/assets/pokemon/art/${id}.gif`, 'gif'], [`src/assets/pokemon/art/shiny/${id}.gif`, 'gif'],
    [`src/assets/pokemon/art/still/${id}.png`, 'png'], [`src/assets/pokemon/art/shiny/still/${id}.png`, 'png'],
  ];
  for (const [p, fmt] of files) {
    if (!existsSync(p)) { missing.push(p); continue; }
    const b = readFileSync(p);
    if (fmt === 'png' && b.slice(0, 8).toString('hex') !== '89504e470d0a1a0a') badFormat.push(p);
    if (fmt === 'gif' && b.slice(0, 3).toString() !== 'GIF') badFormat.push(p);
    if (b.length < 100) badFormat.push(p + ' too small');
  }
}
for (const f of forms) {
  for (const p of [`src/assets/pokemon/${f.id}.png`, `src/assets/pokemon/shiny/${f.id}.png`, `src/assets/pokemon/art/${f.id}.gif`, `src/assets/pokemon/art/shiny/${f.id}.gif`, `src/assets/pokemon/art/still/${f.id}.png`, `src/assets/pokemon/art/shiny/still/${f.id}.png`]) {
    if (!existsSync(p)) missing.push(p); else formBytes += readFileSync(p).length;
  }
}
check('assets: 6 files x 532 species existing', missing.length === 0, listBad(missing));
check('assets: formats valid', badFormat.length === 0, listBad(badFormat));
check('assets: 6 files x 103 forms', forms.every(f => existsSync(`src/assets/pokemon/${f.id}.png`) && existsSync(`src/assets/pokemon/art/${f.id}.gif`) && existsSync(`src/assets/pokemon/art/still/${f.id}.png`)));
check('assets: 49 item icons', Object.keys(stones).every(k => existsSync(`src/assets/items/${k}.png`)), listBad(Object.keys(stones).filter(k => !existsSync(`src/assets/items/${k}.png`))));

// ---- 7. Functional browser probe -------------------------------------------------------------
let probe = null;
if (existsSync('verify/ext-probe.json')) {
  probe = readJson('verify/ext-probe.json');
  check('probe: no console/page/http errors', (probe.errors || []).length === 0, JSON.stringify(probe.errors?.slice(0, 3)));
  check('probe: runtime POKEDEX 1191 (556 + 532 + 103 forms)', probe.seeded?.pokedex === 1191, String(probe.seeded?.pokedex));
  check('probe: 131 chapters / 9 regions / 77 modules', probe.seeded?.chapters === 131 && probe.seeded?.regions === 9);
  check('probe: travel to Unys via UI', probe.uiTravel?.result?.region === 'Unys', JSON.stringify(probe.uiTravel?.result));
  check('probe: gen 5 wild encounters', (probe.wildEnemies || []).some(id => id >= 494), JSON.stringify(probe.wildEnemies));
  check('probe: mega evolution via item works', probe.extras?.megaEvolve?.monId === 3001, JSON.stringify(probe.extras?.megaEvolve));
  check('probe: form dex entry + art', probe.extras?.form3001?.inDex && probe.extras?.artForm?.includes('/art/3001.gif'), JSON.stringify(probe.extras?.form3001) + ' ' + probe.extras?.artForm);
  check('probe: art enabled for new base species', String(probe.extras?.artBase || '').includes('/art/494.gif'), String(probe.extras?.artBase));
  check('probe: 8 unova gyms + 5 league chapters', (probe.extras?.regionGyms || []).length === 8 && probe.extras?.leagueChaptersUnova === 5);
  check('probe: 8 badges rendered from new sheets', (probe.badgeHtml?.count || 0) > 0 && (probe.badgeHtml?.sheets || []).some(s => s.includes('sheet')));
  check('probe: shop sells mega stones + orbs', probe.extras?.shop?.hasStone && probe.extras?.shop?.hasOrb, JSON.stringify(probe.extras?.shop));
  check('probe: regional forms in wild pools', probe.extras?.alolaHasForm === true, JSON.stringify(probe.extras?.alolaFormIds));
  check('probe: chapter gym metadata', probe.extras?.gymCheck?.boss?.badge === 'Trio (Unys)', JSON.stringify(probe.extras?.gymCheck));
} else warn.push('verify/ext-probe.json missing — run npm run gens:probe');

const report = {
  at: new Date().toISOString(),
  pack: 'gen 5-9 (species + forms + gyms/league)',
  species: { entries: entries.length, legendary: legend, mythical: myth, learnRefs, moves: Object.keys(ALL_MOVES).length },
  evolutions: Object.keys(evo).length,
  moves: Object.keys(movesExtra).length,
  forms: { total: forms.length, regional: forms.filter(f => f.kind === 'regional').length, mega: forms.filter(f => f.kind === 'mega').length, primal: forms.filter(f => f.kind === 'primal').length, items: Object.keys(stones).length },
  story: { regions: 5, chapters: chapters.length, gyms: gymSteps.length, badges: Object.values(formsManifest ? {} : {}), leagueChapters: chapters.filter(c => c.league).length },
  assets: { speciesFiles: 532 * 6, formFiles: forms.length * 6, itemIcons: Object.keys(stones).length, badges: 5 },
  checksPassed: ok.length,
  checksFailed: fail.length,
  failed: fail,
  warnings: warn,
  passed: fail.length === 0,
};
writeFileSync('verify/ext-audit.json', JSON.stringify(report, null, 1));
console.log(`checks passed: ${ok.length} | failed: ${fail.length}`);
for (const f of fail) console.log('FAIL', f);
for (const w of warn) console.log('warn', w);
console.log(`species ${entries.length} | evolutions ${Object.keys(evo).length} | extra moves ${Object.keys(movesExtra).length} | forms ${forms.length} (${report.forms.regional}/${report.forms.mega}/${report.forms.primal}) | gyms ${gymSteps.length} | league ${chapters.filter(c => c.league).length} | assets ${532 * 6 + forms.length * 6} files`);
console.log(fail.length ? 'EXT AUDIT: FAILED' : 'EXT AUDIT: PASSED');
process.exit(fail.length ? 1 : 0);
