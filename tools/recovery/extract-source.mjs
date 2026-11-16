// extract-source.mjs — split the shipped bundle back into its original per-file source tree.
//
// The bundle (bundle/app.<hash>.js) is a single IIFE whose body is:
//   (function(){ <prelude statements>; <expr0>,<expr1>,...,<expr94> })();
// Each <exprN> is one original source file (a `t.X = ...` assignment, or an IIFE), joined with commas.
// Splitting at those exact byte boundaries and rejoining reproduces the shipped bundle byte for byte
// (verified below), so nothing is lost or reinterpreted.
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import * as acorn from 'acorn';

const BUNDLE = 'mirror/bundle/app.js';
const src = readFileSync(BUNDLE, 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 2024, sourceType: 'script', allowReturnOutsideFunction: true });

const iifeOpen = '(function(){';
const iife = ast.body[0].expression;
const fn = iife.type === 'CallExpression' ? iife.callee : iife;
const body = fn.body.body;
const PRELUDE_START = fn.body.start + 1;  // just after the opening '{' of the IIFE
const PRELUDE_END = body[2].end;          // end of the namespace/proxy statements
const SEQ = body[3].expression;
const SEQ_END = SEQ.end;
const SUFFIX = src.slice(SEQ_END);        // '})();\n'
if (!src.startsWith(iifeOpen)) throw new Error('unexpected bundle prefix');

// ---- module names, in original file order ------------------------------------------------
const NAMES = [
  'tab-lock', 'clock', 'data/pokedex', 'data/evolutions', 'data/moves', 'data/item-names',
  'data/encounters-kanto', 'data/base-exp-kanto',
  'data/encounters-johto-headbutt', 'data/base-exp-johto',
  'data/encounters-hoenn', 'data/base-exp-hoenn',
  'data/encounters-sinnoh', 'data/base-exp-sinnoh',
  'data/unown', 'data/specials', 'data/forms', 'data/config', 'data/item-names-2',
  'data/types', 'data/type-chart', 'i18n', 'i18n-t', 'data/daytime', 'data/weather',
  'data/habitats', 'data/status', 'data/story', 'data/scenes',
  'game', 'data/league-teams', 'adventure', 'data/underground', 'events',
  'data/raid-swaps', 'raids', 'worldboss', 'tower', 'candy-run', 'legend-zones', 'roaming',
  'sfx', 'music', 'data/sprite-bounds', 'ui-core', 'perf', 'elite-frames', 'frames',
  'badge-shine', 'battle-fx', 'capture-fx', 'item-fx', 'link-fx', 'raid-draw', 'heal-fx',
  'shiny-glint', 'gift-fx', 'geode-fx', 'rank-fx', 'weather-fx', 'vgrid', 'event-ui',
  'event-team', 'screen-adventure', 'screen-map-event', 'screen-raid', 'worldboss-view',
  'screen-tower', 'screen-candy', 'screen-underground', 'screen-achievements', 'screen-team',
  'screen-pension', 'pension-berry-fx', 'berry-bites', 'screen-pokedex', 'screen-shop',
  'screen-casino', 'screen-trade', 'screen-market', 'screen-friends', 'trainer-card',
  'names', 'cloud', 'gifts', 'screen-admin-loader', 'options', 'data/changelog',
  'changelog', 'guide', 'news', 'title', 'update', 'sleep', 'app-boot',
];
if (NAMES.length !== SEQ.expressions.length) {
  throw new Error(`name table ${NAMES.length} != ${SEQ.expressions.length} chunks`);
}

// ---- module API surface (what each file attaches to the public `t` namespace) ------------
function dotPaths(node) {
  const out = new Set();
  (function walk(n) {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression') {
      const parts = [];
      let m = n.left;
      while (m.type === 'MemberExpression' && !m.computed) { parts.unshift(m.property.name); m = m.object; }
      if (m.type === 'Identifier' && m.name === 't') out.add('t.' + parts.join('.'));
    }
    for (const k of Object.keys(n)) {
      if (['start', 'end', 'loc'].includes(k)) continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v.type === 'string') walk(v);
    }
  })(node);
  return [...out].sort();
}

// ---- verify byte-exact round trip ---------------------------------------------------------
const chunks = SEQ.expressions.map((e, i) => ({ i, start: e.start, end: e.end, text: src.slice(e.start, e.end) }));
const rebuilt = src.slice(0, PRELUDE_END) + '\n' + chunks.map(c => c.text).join(',') + SUFFIX;
if (rebuilt !== src) {
  // the prelude/suffix carry the only formatting difference: our own assembly inserts one newline
  const rebuilt2 = src.slice(0, PRELUDE_END) + chunks.map(c => c.text).join(',') + SUFFIX;
  if (rebuilt2 !== src) throw new Error('byte-exact round trip FAILED');
  console.log('round trip: byte-exact (whitespace-normalised assembly confirmed)');
} else {
  console.log('round trip: byte-exact');
}

// ---- write source tree --------------------------------------------------------------------
const sha = s => createHash('sha256').update(s).digest('hex').slice(0, 16);
const outDir = 'src/js';
if (existsSync(outDir)) rmSync(outDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

const preludeText = src.slice(PRELUDE_START, PRELUDE_END);
const manifest = { build: null, bundle: { bytes: src.length, sha256: sha(src) }, prelude: null, modules: [] };

function header({ file, title, apis, bytes, sha16, note }) {
  const lines = ['/**'];
  lines.push(` * ${title}`);
  if (apis.length) lines.push(` *`, ` * Public API on the game namespace \`t\`: ${apis.join(', ')}`);
  if (note) lines.push(` *`, ` * ${note}`);
  lines.push(' *', ` * Recovered from the shipped bundle — original chunk #${file.index} at byte ${file.start} (${bytes} bytes, sha256:${sha16}).`);
  lines.push(' * This file is one original source file; the build concatenates them in filename order.');
  lines.push(' */');
  return lines.join('\n');
}

// 000-prelude.js — the IIFE prelude: module slots, bound timers, the `t` namespace proxy
{
  const text = preludeText;
  const f = `src/js/000-prelude.js`;
  writeFileSync(f, `${header({
    file: { index: 'prelude', start: PRELUDE_START }, title: 'Module namespace prelude — read this first.',
    apis: ['t (Proxy)'], bytes: text.length, sha16: sha(text),
    note: 'Declares one slot per module, the timer/animation-frame wrappers bound to the real window, and the `t` namespace proxy that every other file writes to. Keep this file first.',
  })}\n${text}\n`);
  manifest.prelude = { file: '000-prelude.js', bytes: text.length, sha256: sha(text) };
  console.log('wrote 000-prelude.js');
}

for (const c of chunks) {
  const name = NAMES[c.i];
  const apis = dotPaths(SEQ.expressions[c.i]).filter(p => !p.includes('onbeforeunload') && !/^t\.(setTimeout|setInterval)$/.test(p));
  const base = name.split('/').pop();
  const fileName = `${String(c.i + 1).padStart(3, '0')}-${base}.js`;
  const title = name.split('/').pop().replace(/-/g, ' ');
  const text = c.text;
  // A chunk that is an immediately-invoked function is not a valid statement on its own; parenthesise it.
  // Parentheses are insignificant to the AST, so the module stays identical to the shipped code.
  const statement = text.startsWith('function') ? `(${text});` : `${text};`;
  const head = header({
    file: { index: c.i, start: c.start }, title,
    apis, bytes: text.length, sha16: sha(text),
    note: c.i === 0 ? null : undefined,
  });
  writeFileSync(`src/js/${fileName}`, `${head}\n${statement}\n`);
  manifest.modules.push({ index: c.i, file: fileName, name, apis, start: c.start, bytes: text.length, sha256: sha(text) });
}
writeFileSync('src/js/_manifest.json', JSON.stringify(manifest, null, 1));
console.log(`wrote ${chunks.length} module files + prelude`);
console.log('\nmodule order:');
for (const m of manifest.modules) console.log(String(m.index).padStart(3), m.file.padEnd(38), `${String(m.bytes).padStart(7)}b`, m.apis.slice(0, 3).join(' '));
