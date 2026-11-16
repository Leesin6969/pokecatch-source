// gen-arch.mjs — dependency graph + architecture doc from the canonical tree.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const files = readdirSync('src/js').filter(f => /^\d{3}-.*\.js$/.test(f)).sort();
const manifest = JSON.parse(readFileSync('src/js/_manifest.json', 'utf8'));
const read = f => readFileSync(join('src/js', f), 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');

// module name → file (from the manifest api lists) — data tables and screens included
const owner = new Map();
for (const m of manifest.modules) {
  for (const api of m.apis) {
    const parts = api.split('.');
    if (parts[1] === 'Screens' && parts[2]) owner.set('Screens.' + parts[2], m.file);
    else if (parts[1]) owner.set(parts[1], m.file);
  }
}
const names = [...owner.keys()].sort((a, b) => b.length - a.length);

const deps = {};   // file -> Set(names)
for (const f of files) {
  const code = read(f);
  let ast;
  try { ast = parse(code, { sourceType: 'script', allowReturnOutsideFunction: true, plugins: ['optionalChaining', 'nullishCoalescingOperator', 'classProperties'] }); }
  catch { deps[f] = new Set(); continue; }
  const set = new Set();
  traverse(ast, {
    MemberExpression(p) {
      if (p.node.computed || p.node.object.type !== 'Identifier' || p.node.object.name !== 't') return;
      const prop = p.node.property.name;
      if (owner.has(prop)) set.add(prop);
      const parent = p.parentPath && p.parentPath.node;
      if (parent && parent.type === 'MemberExpression' && !parent.computed && parent.object === p.node && parent.property.type === 'Identifier' && prop === 'Screens') {
        const sub = 'Screens.' + parent.property.name;
        if (owner.has(sub)) set.add(sub);
      }
    },
  });
  deps[f] = set;
}

const byModule = {};
for (const [name, file] of owner) (byModule[file] ||= []).push(name);

// layer classification
function layerOf(f) {
  const name = manifest.modules.find(m => m.file === f)?.name || f;
  if (f.startsWith('000')) return '0 prelude';
  if (name.startsWith('data/')) return '1 data tables';
  if (['i18n', 'i18n-t', 'config', 'names', 'perf', 'clock', 'tab-lock', 'sleep', 'sfx', 'music', 'status', 'types', 'type-chart', 'daytime', 'weather', 'scenes', 'habitats', 'story', 'pokedex', 'moves', 'evolutions', 'encounters', 'base-exp', 'forms', 'unown', 'specials', 'sprite-bounds', 'changelog', 'league-teams', 'raid-swaps', 'underground'].some(k => name.includes(k))) return '1 data tables';
  if (['game'].includes(name)) return '2 state';
  if (name === 'adventure') return '3 simulation';
  if (['cloud', 'gifts', 'events', 'raids', 'worldboss', 'tower', 'candy-run', 'legend-zones', 'roaming', 'pension-berry-fx', 'berry-bites'].some(k => name.includes(k))) return '4 systems';
  if (['ui-core', 'frames', 'elite-frames', 'vgrid', 'trainer-card'].some(k => name.includes(k))) return '5 UI core';
  if (name.endsWith('-fx') || name.includes('badge-shine') || name.includes('raid-draw') || name.includes('elite-frames') || name.includes('frames') || name.includes('vgrid')) return '6 effects';
  if (name.startsWith('screen-') || name.startsWith('worldboss-view') || name.includes('event-ui') || name.includes('event-team')) return '7 screens';
  if (['title', 'update', 'app-boot', 'options', 'guide', 'news', 'changelog'].some(k => name.includes(k))) return '8 shell/flow';
  return '3 simulation';
}

const rows = [];
for (const f of files) {
  const m = manifest.modules.find(x => x.file === f);
  const referenced = new Set();
  for (const d of deps[f] || []) {
    const target = owner.get(d);
    if (target && target !== f) referenced.add(d);
  }
  rows.push({
    file: f,
    modules: byModule[f] || [],
    name: m ? m.name : 'prelude',
    layer: layerOf(f),
    bytes: m ? m.bytes : 10721,
    deps: [...referenced].sort(),
    depFiles: [...new Set([...referenced].map(d => owner.get(d)).filter(x => x && x !== f))],
  });
}
// strongly connected components (Tarjan) — a readable summary of the file↔file cycles
const graph = new Map(rows.map(r => [r.file, r.depFiles]));
const index = new Map(), low = new Map(), onStack = new Set(), stack = [], sccs = [];
let counter = 0;
function strongconnect(v) {
  index.set(v, counter); low.set(v, counter); counter++; stack.push(v); onStack.add(v);
  for (const w of graph.get(v) || []) {
    if (!index.has(w)) { strongconnect(w); low.set(v, Math.min(low.get(v), low.get(w))); }
    else if (onStack.has(w)) low.set(v, Math.min(low.get(v), index.get(w)));
  }
  if (low.get(v) === index.get(v)) {
    const comp = [];
    let w;
    do { w = stack.pop(); onStack.delete(w); comp.push(w); } while (w !== v);
    if (comp.length > 1) sccs.push(comp.sort());
  }
}
for (const r of rows) if (!index.has(r.file)) strongconnect(r.file);
const cycles = sccs.sort((a, b) => b.length - a.length);

// mermaid: only layer-level edges to stay readable
const layerEdges = new Map();
for (const r of rows) for (const d of r.depFiles) {
  const target = rows.find(x => x.file === d);
  const key = r.layer + '→' + target.layer;
  if (r.layer !== target.layer) layerEdges.set(key, (layerEdges.get(key) || 0) + 1);
}
const layers = [...new Set(rows.map(r => r.layer))].sort();
const mm = ['flowchart LR'];
for (const l of layers) mm.push(`  L${layers.indexOf(l)}["${l}"]`);
for (const [k, n] of [...layerEdges].sort()) {
  const [a, b] = k.split('→');
  mm.push(`  L${layers.indexOf(a)} -->|${n}| L${layers.indexOf(b)}`);
}

const md = [];
md.push('# Architecture — bản đồ phụ thuộc của game gốc\n');
md.push(`Sinh tự động bởi \`tools/gen-arch.mjs\` từ \`src/js/\` (${files.length} file, ${owner.size} module export).\n`);
md.push('## Các tầng\n');
md.push('```mermaid\n' + mm.join('\n') + '\n```\n');
md.push('| tầng | file | mô tả |');
md.push('|---|---|---|');
const layerDesc = {
  '0 prelude': 'Mở IIFE, khai slot module, timers, proxy `t`',
  '1 data tables': 'Dex, move, story, scene, config… dữ liệu thuần',
  '2 state': 'Savegame: load/save/migrate, money, team, PC, XP, shop',
  '3 simulation': 'Idle engine: chọn zone, battle loop, catch, chapter',
  '4 systems': 'Cloud, raids, tower, underground, events, pension…',
  '5 UI core': 'Router screen, helper DOM, modal, bar, grid, card',
  '6 effects': 'FX canvas cho battle/capture/heal/badge/weather…',
  '7 screens': 'Từng screen UI',
  '8 shell/flow': 'Title, options, update, boot cuối cùng',
};
for (const l of layers) {
  const list = rows.filter(r => r.layer === l).map(r => r.file);
  md.push(`| ${l} | ${list.length} | ${layerDesc[l] || ''} |`);
}
md.push('\n## Phụ thuộc giữa các tầng\n');
md.push('| từ | tới | số cạnh |');
md.push('|---|---|---|');
for (const [k, n] of [...layerEdges].sort()) {
  const [a, b] = k.split('→');
  md.push(`| ${a} | ${b} | ${n} |`);
}
md.push('\n## File, module và phụ thuộc\n');
md.push('| file | module export | tầng | size | phụ thuộc (module) |');
md.push('|---|---|---|---|---|');
for (const r of rows.sort((a, b) => a.file.localeCompare(b.file))) {
  md.push(`| ${r.file} | ${r.modules.join('<br>') || '—'} | ${r.layer} | ${(r.bytes / 1024).toFixed(1)} KB | ${r.deps.slice(0, 14).join(', ') || '—'}${r.deps.length > 14 ? ' …' : ''} |`);
}
md.push('\n## Cụm phụ thuộc vòng (strongly connected components)\n');
if (!cycles.length) md.push('Không có cụm vòng file→file.');
else {
  md.push(`Vòng phụ thuộc ở bản phục hồi là bình thường: các screen và decorator gọi nhau qua namespace \`t\` lúc runtime, đây không phải import tĩnh. Có ${cycles.length} cụm, lớn nhất ${cycles[0].length} file.`);
  for (const c of cycles.slice(0, 15)) md.push('- ' + c.join(', '));
}
md.push('\n## Điểm vào runtime\n');
md.push('1. `boot.js` (sinh từ `src/boot/`) nạp language bundle, chèn markup `src/shell/app.html`, rồi nạp `vendor-supabase` + `bundle/app.js`.');
md.push('2. `app.js` = prelude + 95 module nối tiếp; module cuối `095-app-boot.js` chạy `jt()` để khởi động.');
md.push('3. `jt()`: init TabLock → load save → Cloud.init → `Title.show()` → Cloud/Clock ready → `Adventure.ensure()` → offline catch-up → render → gắn handler → `App` sẵn sàng.');
md.push('4. Vòng lặp: `setInterval(5s)` tick sim; `requestAnimationFrame` cho FX; event `daytime`/`weather`/`visibilitychange` cập nhật.');

mkdirSync('docs', { recursive: true });
writeFileSync('docs/ARCHITECTURE.md', md.join('\n') + '\n');
writeFileSync('docs/dep-graph.json', JSON.stringify({ nodes: rows.map(r => ({ file: r.file, layer: r.layer, modules: r.modules, deps: r.deps })), cycles }, null, 1));
console.log('docs/ARCHITECTURE.md written:', md.length, 'lines | files:', rows.length, '| cycles:', cycles.length);
