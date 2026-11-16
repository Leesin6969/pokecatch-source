// gen-network.mjs — generate docs/NETWORK.md from the cloud client source.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const file = 'src/js/084-cloud.js';
const code = readFileSync(file, 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
const ast = parse(code, { sourceType: 'script', allowReturnOutsideFunction: true, plugins: ['optionalChaining', 'nullishCoalescingOperator'] });

const rpcs = new Map();      // name -> Set(argKeys)
const tables = new Map();    // table -> Set(methods)
traverse(ast, {
  CallExpression(p) {
    const callee = p.node.callee;
    // supabase.rpc("name", { … })
    if (callee.type === 'MemberExpression' && !callee.computed && callee.property.type === 'Identifier' && callee.property.name === 'rpc') {
      const [nameArg, payload] = p.node.arguments;
      if (nameArg && nameArg.type === 'StringLiteral') {
        const args = rpcs.get(nameArg.value) || new Set();
        if (payload && payload.type === 'ObjectExpression') for (const prop of payload.properties) if (prop.key) args.add(prop.key.name ?? prop.key.value);
        rpcs.set(nameArg.value, args);
      }
    }
    if (callee.type === 'MemberExpression' && !callee.computed && callee.property.type === 'Identifier' && callee.property.name === 'from') {
      const [tbl] = p.node.arguments;
      if (tbl && tbl.type === 'StringLiteral') {
        const set = tables.get(tbl.value) || new Set();
        // method chained after .from(...) is the parent member: supabase.from("x").select(...)
        const parent = p.parentPath && p.parentPath.node;
        if (parent && parent.type === 'MemberExpression' && parent.property.type === 'Identifier') set.add(parent.property.name);
        tables.set(tbl.value, set);
      }
    }
  },
});

// auth surface
const auth = new Set();
traverse(ast, {
  MemberExpression(p) {
    if (!p.node.computed && p.node.object.type === 'MemberExpression' && !p.node.object.computed &&
      p.node.object.object.type === 'Identifier' && p.node.object.property.name === 'auth' && p.node.property.type === 'Identifier') auth.add(p.node.property.name);
  },
});

// local storage keys
const keys = new Set();
for (const m of code.matchAll(/"((?:pokecatch|gachamon)[\w.-]*)"/g)) keys.add(m[1]);

const md = [];
md.push('# Network layer — reverse từ `src/js/084-cloud.js`\n');
md.push('Client dùng **supabase-js 2.65.0** (bundle `src/vendor/supabase.js`) tới project Supabase của game.');
md.push('Server (bảng, policy, RPC body) là phần backend **không** nằm trong frontend — tài liệu này liệt kê đầy đủ');
md.push('hợp đồng mà client gọi (tên RPC + tham số + bảng), đủ để dựng lại backend tương thích.\n');

md.push('## 1. Khởi tạo\n');
md.push('```js');
md.push('// src/js/084-cloud.js');
md.push('const URL = ["https:", "", ["qglircqqrtgdvxawisoz", "supabase", "co"].join(".")].join("/");');
md.push('client = createClient(URL, ANON_KEY, { global: { fetch: ... } });');
md.push('// ANON_KEY là key công khai nhúng trong app (mọi client cần nó để chạy)');
md.push('```\n');
md.push('Tên project: `qglircqqrtgdvxawisoz.supabase.co`. Client có wrapper fetch riêng (retry/timeout/offline gate).\n');

md.push('## 2. Xác thực & phiên\n');
md.push(`Phương thức auth client dùng: ${[...auth].sort().map(a => '`' + a + '`').join(', ')}.\n`);
md.push('- **Khách không tài khoản:** không có Supabase anonymous user. Client tạo một UUID thiết bị (`crypto.randomUUID()`) lưu ở `pokecatch-anon`, dùng làm `anon`/`sid` cho telemetry và cho phép chơi hoàn toàn offline (save local).');
md.push('- **Tài khoản thật:** OAuth **Discord** / **Google** (`signInWithOAuth`, Discord xin scope `identify`); đăng nhập rồi mới bật save cloud.');
md.push('- Sign-out cục bộ (`scope: "local"`) để không mất save máy; key `pokecatch-signout` đánh dấu trạng thái;');
md.push('- Khi auth đổi, client tự tải save cloud và so với save local (dialog xung đột: giữ máy / lấy cloud).\n');

md.push('## 3. RPC catalog\n');
md.push(`Tổng **${rpcs.size}** RPC. Cột tham số là key của payload client gửi.\n`);
md.push('| RPC | tham số | nhóm |');
md.push('|---|---|---|');
const groupOf = n => /^admin_/.test(n) ? 'admin' : /^(trade|linked)/.test(n) ? 'trade' : /^mkt_/.test(n) ? 'market' : /^(friend)/.test(n) ? 'friends' : /^(raid|zone|tower)/.test(n) ? 'leaderboard' : /^(wb)/.test(n) ? 'world boss' : /^(cloud|save|log)/.test(n) ? 'save/cloud' : /^gift/.test(n) ? 'gift' : /^candy/.test(n) ? 'candy' : 'other';
for (const name of [...rpcs.keys()].sort()) {
  md.push(`| \`${name}\` | ${[...rpcs.get(name)].map(x => '`' + x + '`').join(', ') || '—'} | ${groupOf(name)} |`);
}
md.push('');
md.push('## 4. Bảng\n');
md.push('| bảng | thao tác |');
md.push('|---|---|');
for (const [t, set] of [...tables].sort()) md.push(`| \`${t}\` | ${[...set].map(x => '`' + x + '`').join(', ')} |`);
md.push('');
md.push('## 5. Khôi phục / ngoại tuyến\n');
md.push('- Mọi lời gọi đi qua wrapper có timeout + retry; khi offline chúng bị "gate" (không xếp hàng vô hạn) và UI dùng dữ liệu local.');
md.push('- Save local là nguồn chính khi chơi offline; cloud chỉ đồng bộ khi online. `TabLock` ngăn 2 tab ghi đè nhau.');
md.push('- Board/leaderboard (raid, zone, tower, world boss) là read-mostly, gửi entry một chiều (`*_submit_many`).');
md.push('- `admin_*` chỉ tồn tại trong client để loader admin gọi khi `window.ADMIN_FILES` có file (bản phát hành để rỗng).\n');
md.push('## 6. Key localStorage liên quan\n');
md.push('| key | ý nghĩa |');
md.push('|---|---|');
const purpose = {
  'gachamon-save-v1': 'save chính (JSON state)',
  'pokecatch-anon': 'id danh tính ẩn danh',
  'pokecatch-ban': 'thông tin bị ban (nếu có)',
  'pokecatch-bat-offer': 'lời mời battle từ bạn bè',
  'pokecatch-cloud-user': 'user id cloud đã liên kết',
  'pokecatch-cloud-wiped': 'cờ save trên máy đã bị xoá bởi cloud',
  'pokecatch-changelog-seen': 'changelog đã đọc',
  'pokecatch-guide-seen': 'guide đã đọc',
  'pokecatch-mkt-recent': 'cache chợ đen',
  'pokecatch-perf': 'tuỳ chọn hiệu năng',
  'pokecatch-raid-boards': 'cache bảng raid',
  'pokecatch-save-btn': 'trạng thái nút save',
  'pokecatch-save-post': 'mốc cloud save-post',
  'pokecatch-signout': 'đánh dấu đã đăng xuất',
  'pokecatch-tab': 'heartbeat TabLock',
  'pokecatch-tower-boards': 'cache bảng tower',
  'pokecatch-zone-boards': 'cache bảng zone',
  'pokecatch.clock': 'offset đồng hồ server',
  'pokecatch.lang': 'ngôn ngữ đã chọn',
  'pokecatch.theme': 'theme đã chọn',
  'pokecatch.update': 'trạng thái cập nhật',
  'pokecatch.updated': 'build đã cập nhật',
  'pokecatch-signout': 'đã đăng xuất',
};
for (const k of [...keys].sort()) md.push(`| \`${k}\` | ${purpose[k] || ''} |`);

mkdirSync('docs', { recursive: true });
writeFileSync('docs/NETWORK.md', md.join('\n') + '\n');
console.log('docs/NETWORK.md written:', md.length, 'lines | rpcs:', rpcs.size, '| tables:', tables.size, '| auth:', [...auth].join(','));
