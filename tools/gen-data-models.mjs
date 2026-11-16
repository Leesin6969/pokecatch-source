// gen-data-models.mjs — docs/DATA-MODELS.md: shape of every data table (from data/*.json + AST).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { parse } from '@babel/parser';

const load = f => existsSync('data/' + f) ? JSON.parse(readFileSync('data/' + f, 'utf8')) : null;
const typeOf = v => Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v;
const sample = v => {
  const s = JSON.stringify(v);
  return s && s.length > 90 ? s.slice(0, 88) + '…' : s;
};
const fieldsOf = obj => {
  if (!obj || typeof obj !== 'object') return [];
  const keys = new Map();
  const take = o => { if (o && typeof o === 'object' && !Array.isArray(o)) for (const [k, v] of Object.entries(o)) if (!keys.has(k)) keys.set(k, v); };
  if (Array.isArray(obj)) obj.slice(0, 40).forEach(take); else take(obj);
  return [...keys].map(([k, v]) => `| \`${k}\` | ${typeOf(v)} | \`${sample(v)}\` |`);
};

// STORY: AST key extraction (the module has methods, so we read its literal structure)
function storyShape() {
  const code = readFileSync('src/js/028-story.js', 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
  const ast = parse(code, { sourceType: 'script' });
  let story = null;
  const walk = n => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && n.left.property.name === 'STORY' && n.right.type === 'ObjectExpression') story = n.right;
    for (const k of Object.keys(n)) { const v = n[k]; if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v.type === 'string') walk(v); }
  };
  walk(ast);
  if (!story) return null;
  const top = story.properties.filter(p => p.key).map(p => p.key.name ?? p.key.value);
  const getObj = name => story.properties.find(p => p.key && (p.key.name ?? p.key.value) === name)?.value;
  const out = { top };
  const chapters = getObj('CHAPTERS');
  if (chapters && chapters.type === 'ArrayExpression') {
    const first = chapters.elements[0];
    if (first && first.type === 'ObjectExpression') {
      out.chapter = first.properties.filter(p => p.key).map(p => p.key.name ?? p.key.value);
      const steps = first.properties.find(p => p.key && p.key.name === 'steps')?.value;
      if (steps && steps.type === 'ArrayExpression') {
        const byKind = {};
        for (const st of steps.elements) {
          if (!st || st.type !== 'ObjectExpression') continue;
          const kindProp = st.properties.find(p => p.key && p.key.name === 'kind');
          const kind = kindProp && kindProp.value.type === 'StringLiteral' ? kindProp.value.value : '?';
          if (!byKind[kind]) byKind[kind] = [...new Set(st.properties.filter(p => p.key).map(p => p.key.name))];
        }
        out.stepKinds = byKind;
      }
    }
  }
  const regions = getObj('REGIONS');
  if (regions && regions.type === 'ArrayExpression') {
    const first = regions.elements[0];
    if (first && first.type === 'ObjectExpression') out.region = first.properties.filter(p => p.key).map(p => p.key.name ?? p.key.value);
  }
  return out;
}

const md = [];
md.push('# Data models — shape của mọi bảng dữ liệu\n');
md.push('Sinh tự động bởi `tools/gen-data-models.mjs`. Các bảng literal lấy từ `data/*.json` (chạy `npm run data:export`),');
md.push('các bảng có getter/hàm lấy trực tiếp từ AST của module nguồn.\n');

const sections = [
  ['POKEDEX', 'POKEDEX.json', 'Mỗi entry là một loài: tên, key sprite, hệ, base stats, captureRate, learnset…'],
  ['MOVES', 'MOVES.json', 'Bảng chiêu: hệ, power, accuracy, category, hiệu ứng.'],
  ['EVOLUTIONS', 'EVOLUTIONS.json', 'Đồ thị tiến hoá `{from: [{to, level?, item?, …}]}`.'],
  ['ENCOUNTERS', 'ENCOUNTERS.json', 'Bảng gặp theo zone: mảng `[id, minLv, maxLv, weight, điều kiện]`.'],
  ['HABITATS', 'HABITATS.json', 'Metadata zone/habitat: vùng, bg, danh sách loài, spawn.'],
  ['SCENES', 'SCENES.json', 'Background: catalog (scene id → webp) + places + css().'],
  ['LEAGUE_TEAMS', 'LEAGUE_TEAMS.json', 'Đội hình Elite Four / Champion theo vùng.'],
  ['CHANGELOG', 'CHANGELOG.json', 'Entry changelog: title, date, notes…'],
  ['SPRITE_BOUNDS', 'SPRITE_BOUNDS.json', 'Bounding box cắt sprite: `{path: [x, y, w, h]}`.'],
];
for (const [name, file, desc] of sections) {
  const data = load(file);
  if (!data) continue;
  md.push(`## ${name}\n\n${desc}\n`);
  const entry = Array.isArray(data) ? data[0] : Object.values(data)[0];
  const rows = fieldsOf(Array.isArray(data) ? data : entry);
  md.push('| trường | kiểu | ví dụ |');
  md.push('|---|---|---|');
  md.push(...rows);
  md.push('');
}
{
  const story = storyShape();
  if (story) {
    md.push('## STORY\n\nChiến dịch: REGIONS → CHAPTERS → steps. Shape đọc từ AST `src/js/028-story.js`.\n');
    md.push('| cấp | trường |');
    md.push('|---|---|');
    if (story.top) md.push(`| STORY | ${story.top.map(k => '`' + k + '`').join(', ')} |`);
    if (story.region) md.push(`| REGIONS[0] | ${story.region.map(k => '`' + k + '`').join(', ')} |`);
    if (story.chapter) md.push(`| CHAPTERS[0] | ${story.chapter.map(k => '`' + k + '`').join(', ')} |`);
    if (story.stepKinds) for (const [kind, keys] of Object.entries(story.stepKinds)) md.push(`| step kind \`${kind}\` | ${keys.map(k => '`' + k + '`').join(', ')} |`);
    md.push('');
  }
}
{
  const cfg = load('CONFIG.json');
  if (cfg) {
    md.push('## CONFIG — 131 hằng số, nhóm chính\n');
    const groups = {
      'Save & tiến trình': ['SAVE_KEY', 'VERSION', 'START_MONEY', 'START_ITEMS', 'TEAM_SIZE'],
      'Chiến đấu': ['ENEMY_DAMAGE', 'POWER_SLOPE', 'TYPE_POWER', 'TYPE_EFF_MAX', 'TYPE_EFF_MIN', 'CRIT_CHANCE', 'CRIT_MULT', 'LEVEL_GAP', 'MAX_ROUNDS'],
      'Bắt & shiny': ['CAPTURE_BONUS', 'CAPTURE_MAX', 'LEGENDARY_CAPTURE_RATE', 'SHINY_RATE', 'SHINY_STAT_BONUS'],
      'XP & level': ['XP_WINS_PER_LEVEL', 'XP_SCALE', 'XP_BASE_REF', 'XP_ACTIVE_BONUS', 'MAX_LEVEL', 'OFFLINE_XP_MULT', 'BUDDY_XP_MULT'],
      'Kinh tế': ['WILD_MONEY', 'TRAINER_MONEY', 'MONEY_GAIN', 'SHOP', 'SELL', 'SHOP_QTY'],
      'Chế độ': ['PENSION', 'TOWER', 'CANDY_RUN', 'UNDERGROUND', 'RAIDS', 'RAID', 'EVENT', 'WORLDBOSS', 'CASINOS', 'COINS'],
      'Online': ['ONLINE_TRADE', 'MARKET', 'PLAYER_NAMES'],
    };
    md.push('| nhóm | key |');
    md.push('|---|---|');
    for (const [g, keys] of Object.entries(groups)) {
      const present = keys.filter(k => k in cfg);
      md.push(`| ${g} | ${present.map(k => '`' + k + '`').join(', ')}${keys.length !== present.length ? ' …' : ''} |`);
    }
    md.push('');
  }
}

mkdirSync('docs', { recursive: true });
writeFileSync('docs/DATA-MODELS.md', md.join('\n') + '\n');
console.log('docs/DATA-MODELS.md written:', md.length, 'lines');
