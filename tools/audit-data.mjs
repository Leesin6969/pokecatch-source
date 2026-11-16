// audit-data.mjs — load the recovered data modules in a sandbox and check every asset they can name.
//
//   node tools/audit-data.mjs
//
// Writes verify/audit-data.json (machine readable) and prints the gaps it found.
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

mkdirSync('verify', { recursive: true });

// ---- sandbox: a fake `t` namespace + the few browser globals the data modules touch ----------
const t = {};
const e = (s) => (typeof s === 'string' ? s : '');
const log = [];
const noop = () => {};
const stubs = {
  console: { log: noop, warn: noop, error: noop, info: noop },
  document: {
    createElement: () => ({ style: {}, classList: { add: noop, remove: noop, toggle: noop }, appendChild: noop, setAttribute: noop, addEventListener: noop, insertAdjacentHTML: noop }),
    addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], body: { appendChild: noop, classList: { add: noop, remove: noop } },
    head: { appendChild: noop }, documentElement: {},
  },
  localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  matchMedia: () => ({ matches: false, addEventListener: noop }),
  navigator: { language: 'fr', languages: ['fr'], userAgent: 'node' },
  window: {},
  requestAnimationFrame: noop,
  setTimeout: noop,
  setInterval: noop,
  addEventListener: noop,
  location: { origin: 'http://localhost', href: 'http://localhost/' },
  Image: function () { return { style: {}, addEventListener: noop }; },
  fetch: () => Promise.reject(new Error('no network in audit')),
  Audio: function () { return { play: noop, pause: noop }; },
};
const PARAMS = ['t', 'e', ...Object.keys(stubs)];
const ARGS = [t, e, ...Object.values(stubs)];

const ORDER = [
  '003-pokedex.js', '004-evolutions.js', '005-moves.js', '006-item-names.js',
  '007-encounters-kanto.js', '008-base-exp-kanto.js', '009-encounters-johto-headbutt.js',
  '010-base-exp-johto.js', '011-encounters-hoenn.js', '012-base-exp-hoenn.js',
  '013-encounters-sinnoh.js', '014-base-exp-sinnoh.js', '015-unown.js', '016-specials.js',
  '017-forms.js', '018-config.js', '019-item-names-2.js', '020-types.js', '021-type-chart.js',
  '024-daytime.js', '025-weather.js', '026-habitats.js', '027-status.js', '028-story.js',
  '029-scenes.js', '031-league-teams.js', '033-underground.js', '035-raid-swaps.js',
  '044-sprite-bounds.js', '088-changelog.js',
];
const loaded = {};
for (const f of ORDER) {
  const file = readdirSync('src/js').find(x => x.endsWith(f.slice(4)));
  if (!file) { log.push(['MISSING MODULE', f]); continue; }
  let src = readFileSync(join('src/js', file), 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
  try {
    new Function(...PARAMS, src)(...ARGS);
    loaded[file] = true;
  } catch (err) {
    log.push(['EVAL FAIL', file, String(err).slice(0, 200)]);
  }
}
const tables = Object.fromEntries(Object.entries(t).map(([k, v]) => [k, v]));
console.log('data modules evaluated:', Object.keys(loaded).length, '/', ORDER.length);
console.log('namespace keys:', Object.keys(tables).join(', '));
for (const l of log) console.log('  !', l.join(' | '));

// ---- expected assets -----------------------------------------------------------------------
const expected = new Map(); // path -> why
const add = (p, why) => { if (p && !expected.has(p)) expected.set(p, why); };

// pokémon sprites + artwork (base dex + every 5-digit form id the code names)
const dexIds = new Set((t.POKEDEX || []).map(p => p.id));
const bounds = t.SPRITE_BOUNDS || {};
for (const p of Object.keys(bounds)) {
  const m = /assets\/pokemon\/art\/still\/(\d+)\.png$/.exec(p);
  if (m) dexIds.add(+m[1]);
}
for (const form of Object.values(t.FORMS || {})) {
  if (typeof form === 'number') dexIds.add(form);
  else if (form && typeof form === 'object') {
    for (const v of Object.values(form)) if (typeof v === 'number' && v > 100 && v < 60000) dexIds.add(v);
  }
}
for (const id of dexIds) {
  add(`assets/pokemon/${id}.png`, 'sprite');
  add(`assets/pokemon/shiny/${id}.png`, 'shiny sprite');
  add(`assets/pokemon/art/still/${id}.png`, 'artwork');
  add(`assets/pokemon/art/shiny/still/${id}.png`, 'shiny artwork');
}
for (const p of Object.keys(bounds)) if (p.startsWith('assets/')) add(p, 'sprite-bounds key');

// items: every id the shop / start pack / berries / evolutions / towers / underground can name
const itemIds = new Set();
const items = t.ITEM_NAMES || {};
Object.keys(items).forEach(id => itemIds.add(id));
Object.keys(t.CONFIG?.START_ITEMS || {}).forEach(id => itemIds.add(id));
for (const s of t.CONFIG?.SHOP || []) itemIds.add(s.id);
Object.keys(t.CONFIG?.EXP_CANDIES || {}).forEach(id => itemIds.add(id));
Object.keys(t.CONFIG?.PENSION?.BERRIES || {}).forEach(id => itemIds.add(id));
Object.keys(t.CONFIG?.BUFF_BERRIES || {}).forEach(id => itemIds.add(id));
for (const edge of Object.values(t.EVOLUTIONS || {})) for (const e2 of edge) if (e2.item) itemIds.add(e2.item);
for (const it of t.UNDERGROUND?.LOOT?.ITEMS || []) { if (it.id) itemIds.add(it.id); (it.of || []).forEach(x => itemIds.add(x)); }
for (const it of t.CONFIG?.TOWER?.SHOP || []) itemIds.add(it.id);
const NON_IMAGE = new Set(['money', 'shards', 'stone', 'stone2', 'coin', 'plate', 'fossil', 'gem']);
for (const id of itemIds) if (!NON_IMAGE.has(id)) add(`assets/items/${id}.png`, 'item sprite');

// badges: the bag/league screens render badge art from a region+index table
const badgeFiles = existsSync('src/assets/badges') ? readdirSync('src/assets/badges') : [];
for (const f of badgeFiles) add(`assets/badges/${f}`, 'badge art');
const badgeIds = new Set();
const collectBadge = (o) => {
  if (!o || typeof o !== 'object') return;
  if (typeof o.badge === 'string') badgeIds.add(o.badge);
  if (typeof o.badge === 'number') badgeIds.add(o.badge);
  for (const v of Object.values(o)) collectBadge(v);
};
collectBadge(t.STORY || {});
collectBadge(t.LEAGUE_TEAMS || {});
console.log('badge ids found in data:', [...badgeIds].slice(0, 20));

// scenes: the module exposes { catalog, places, css() } — check every declared scene file
const sceneCatalog = Object.values(t.SCENES?.catalog || {});
const scenePlaces = Object.values(t.SCENES?.places || {});
for (const s of [...sceneCatalog, ...scenePlaces]) {
  if (s && typeof s === 'object') for (const k of ['src', 'bg', 'file']) if (typeof s[k] === 'string' && s[k].startsWith('assets/')) add(s[k], 'scene');
}
for (const zone of Object.values(t.HABITATS || {})) {
  if (!zone || typeof zone !== 'object') continue;
  if (typeof zone.bg === 'string' && zone.bg.startsWith('assets/')) add(zone.bg, 'habitat bg');
  if (typeof zone.scene === 'string') {
    // scene keys resolve through SCENES; check the key exists
    if ((t.SCENES || {})[zone.scene] === undefined) console.log('  ? habitat scene key without SCENES entry:', zone.scene);
  }
}

// trainer sprites: every character the story/league/lab can show
const trainerKeys = new Set();
const collectTrainer = (o) => {
  if (!o || typeof o !== 'object') return;
  for (const k of ['sprite', 'look', 'face', 'avatar']) if (typeof o[k] === 'string') trainerKeys.add(o[k]);
  for (const v of Object.values(o)) collectTrainer(v);
};
collectTrainer(t.STORY || {});
collectTrainer(t.LEAGUE_TEAMS || {});
collectTrainer(t.CONFIG?.TRAINER_LOOKS || {});
for (const k of ['red', 'leaf']) trainerKeys.add(k);
for (const k of trainerKeys) {
  add(`assets/trainers/${k}.png`, 'trainer portrait');
  add(`assets/trainers/still/${k}.png`, 'trainer battle still');
}

// underground themes
for (const th of t.CONFIG?.UNDERGROUND?.THEMES || []) add(`assets/bg/underground/${th.key}.png`, 'underground theme');
add('assets/bg/underground/crystal.png', 'underground crystal');

// ---- verify --------------------------------------------------------------------------------
const missing = [];
for (const [p, why] of [...expected].sort()) {
  if (!existsSync(join('src', p))) missing.push({ path: p, why });
}
const extraChecks = [];
// packs.json manifest: every packed file must exist
const packs = JSON.parse(readFileSync('mirror/packs.json', 'utf8'));
let packed = 0;
for (const g of Object.values(packs)) for (const p of Object.keys(g.files)) {
  packed++;
  if (!existsSync(join('src', p))) extraChecks.push({ path: p, why: 'packs.json' });
}
// literal references from bundle + css
const bundle = readFileSync('mirror/bundle/app.js', 'utf8');
const css = readFileSync('mirror/bundle/app.css', 'utf8');
const lit = new Set();
for (const m of bundle.matchAll(/["'`](assets\/[A-Za-z0-9_./-]+)["'`]/g)) lit.add(m[1]);
for (const m of css.matchAll(/url\((assets\/[A-Za-z0-9_./-]+)\)/g)) lit.add(m[1]);
let litMissing = [];
for (const p of lit) if (!existsSync(join('src', p))) litMissing.push(p);

// dist must contain exactly the same asset tree
let distMismatch = 0;
const walk = (dir, base = '') => {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? base + '/' + ent.name : ent.name;
    if (ent.isDirectory()) walk(join(dir, ent.name), rel);
    else if (!existsSync(join('dist/assets', rel))) distMismatch++;
  }
};
if (existsSync('dist/assets')) walk('src/assets');
const srcCount = (dir) => readdirSync(dir, { withFileTypes: true }).reduce((n, d) => n + (d.isDirectory() ? srcCount(join(dir, d.name)) : 1), 0);

// A path the game references but that does not exist on the CDN is the original game's own gap
// (its code falls back). Split those out so only real recovery holes are reported.
const upstreamAbsent = new Set();
try {
  const p = JSON.parse(readFileSync('verify/probe-cdn.json', 'utf8'));
  for (const a of p.absent || []) upstreamAbsent.add(String(a).split(' ')[0]);
} catch {}
// the CDN has no per-letter Unown artwork either (verified: the URL returns the SPA fallback)
for (const p of missing) {
  if (/\/art\/(shiny\/)?still\/201\d\d\.png$/.test(p.path)) upstreamAbsent.add(p.path);
  if (/\/art\/(shiny\/)?20\d{3}\.(gif|png)$/.test(p.path)) upstreamAbsent.add(p.path);
}
const missingUpstreamAbsent = missing.filter(p => upstreamAbsent.has(p.path));
const missingReal = missing.filter(p => !upstreamAbsent.has(p.path));

const report = {
  dataModules: Object.keys(loaded).length,
  tables: Object.keys(tables),
  expectedAssets: expected.size,
  missing,
  missingReal,
  missingUpstreamAbsentCount: missingUpstreamAbsent.length,
  packsFiles: packed,
  packsMissing: extraChecks.length,
  literalRefs: lit.size,
  literalMissing: litMissing,
  trainerKeys: trainerKeys.size,
  dexIds: dexIds.size,
  itemIds: itemIds.size,
  scenes: (Object.keys(t.SCENES?.catalog || {}).length + Object.keys(t.SCENES?.places || {}).length),
  assetsOnDisk: srcCount('src/assets'),
  distMissingAssets: distMismatch,
  evalProblems: log,
};
writeFileSync('verify/audit-data.json', JSON.stringify(report, null, 1));

console.log('\n=== asset audit ===');
console.log('expected asset paths derived from data :', expected.size);
console.log('assets on disk                        :', srcCount('src/assets'));
console.log('packs.json files verified             :', packed);
console.log('literal refs in bundle+css            :', lit.size);
console.log('MISSING and absent upstream too       :', missingUpstreamAbsent.length, '(original game falls back on these, not a recovery hole)');
for (const m of missingUpstreamAbsent.slice(0, 6)) console.log('   ~', m.path);
console.log('MISSING for real                      :', missingReal.length);
for (const m of missingReal.slice(0, 40)) console.log('   -', m.path, '(', m.why, ')');
console.log('MISSING from packs.json               :', extraChecks.length, extraChecks.slice(0, 10));
console.log('MISSING literal refs                  :', litMissing.length, litMissing.slice(0, 20));
console.log('dist asset tree mismatches            :', distMismatch);
console.log('scenes / trainers / dex / items       :', report.scenes, '/', trainerKeys.size, '/', dexIds.size, '/', itemIds.size);
