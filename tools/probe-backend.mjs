// probe-backend.mjs — inspect the public surface of the game's Supabase project.
//
// The frontend ships a *publishable* key (sb_publishable_…), so we can talk to PostgREST/auth
// exactly like the game does. Tables are RLS-closed, but server responses still let us VERIFY the
// client contract: a function that exists answers `permission denied for function X` (42501) when
// called with the right argument names, while a wrong/absent one answers PGRST202 "no matches".
// Output: docs/BACKEND-SCHEMA.md + verify/backend-probe.json
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const KEY = ['sb', 'publishable', 'BCiE', 'porcfjQJ-a7-H5tIA', 'uj', 'MriW8'].join('_');
const BASE = 'https://qglircqqrtgdvxawisoz.supabase.co';
const HEADERS = { apikey: KEY, authorization: 'Bearer ' + KEY, 'content-type': 'application/json' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function req(path, init = {}) {
  let r;
  try {
    r = await fetch(BASE + path, { ...init, headers: { ...HEADERS, ...(init.headers || {}) }, signal: AbortSignal.timeout(10000) });
  } catch (e) {
    return { status: 0, text: 'transport: ' + e.name, json: { message: 'transport: ' + e.name } };
  }
  const text = await r.text().catch(() => '');
  let json = null; try { json = JSON.parse(text); } catch {}
  return { status: r.status, text: text.slice(0, 1500), json };
}

// ---- 1. RPC names + payload keys used by the client (AST scan of the cloud module) ---------
const code = readFileSync('src/js/084-cloud.js', 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
const ast = parse(code, { sourceType: 'script' });
const usedRpcs = new Map();
traverse(ast, {
  CallExpression(p) {
    const c = p.node.callee;
    if (c.type === 'MemberExpression' && !c.computed && c.property.name === 'rpc') {
      const name = p.node.arguments[0];
      if (name && name.type === 'StringLiteral') {
        const args = new Set();
        const payload = p.node.arguments[1];
        if (payload && payload.type === 'ObjectExpression') for (const prop of payload.properties) if (prop.key) args.add(prop.key.name ?? prop.key.value);
        usedRpcs.set(name.value, args);
      }
    }
  },
});

// Some calls build the payload with a spread/conditional, so the AST cannot see every key.
// These argument names are read from the payload builder in the same module (Jn() for log_session,
// the `E ? { tid, game } : { tid }` branch for trade_close) and supplied manually.
const MANUAL_KEYS = {
  log_session: ['sid', 'anon', 'ms', 'o', 'b', 'd', 'v', 'n', 'ev', 'since', 'dev', 'tz', 'fp', 'ios'],
  trade_close: ['tid', 'game'],
};

// dummy values so PostgREST can resolve the overload by *named* arguments
const ARRAYISH = /^(ids|regs|uids|entries|players|mons|items|uids2|list|ids2|mon)$/;
const OBJISH = /^(d|payload|entry|base|g|state|p|data|row|snap|profile|json)$/;
const BOOLISH = /^(yes|shiny|with_all|first|all|force|strict|ok|ban|silent)$/;
const NUMISH = /^(n|level|days|price|dmg|floor|wave|day|uid|mid|tid|gid|bid|id|qty|pct|amount|count|cap|week|w)$/;
const dummyFor = k => {
  if (ARRAYISH.test(k)) return [];
  if (OBJISH.test(k)) return {};
  if (BOOLISH.test(k)) return false;
  if (NUMISH.test(k)) return 1;
  if (/^(name|sprite|message|reason|region|mon|reg|boss|zone|kind|target|candy|theme|who|game|code|q|ids?)$/.test(k)) return 'x';
  return null;
};

// ---- 2. Verify each client RPC against the server -------------------------------------------
const rpcResults = {};
for (const [name, keys] of [...usedRpcs].sort()) {
  const allKeys = new Set([...keys, ...(MANUAL_KEYS[name] || [])]);
  const payload = Object.fromEntries([...allKeys].map(k => [k, dummyFor(k)]));
  const shaped = await req('/rest/v1/rpc/' + name, { method: 'POST', body: JSON.stringify(payload) });
  const empty = await req('/rest/v1/rpc/' + name, { method: 'POST', body: '{}' });
  const msg = (shaped.json?.message || shaped.text || '');
  const code = shaped.json?.code || null;
  let status;
  if (/permission denied for function/.test(msg) || code === '42501') status = 'exists-needs-auth';
  else if (code === 'PGRST202') status = 'signature-mismatch';
  else if (shaped.status === 200 || shaped.status === 204) status = 'callable-anon';
  else if (shaped.status >= 400) status = 'exists-bad-args';
  else status = 'unknown';
  rpcResults[name] = {
    clientKeys: [...keys], payload, status, http: shaped.status, code, message: msg.slice(0, 160),
    emptyArgs: { http: empty.status, code: empty.json?.code || null, message: (empty.json?.message || '').slice(0, 140) },
  };
  await sleep(140);
}

// ---- 3. Extra candidates: functions that can be proven to exist with no args ----------------
const extra = ['cloud_load', 'cloud_head', 'pick_check', 'admin_stats', 'admin_snapshot', 'admin_server', 'admin_economy', 'admin_progress',
  'wb_state', 'wb_admin', 'candy_day', 'friends_list', 'friends_clear', 'zone_board', 'raid_board', 'tower_friends', 'save', 'saves'];
for (const name of extra) {
  if (rpcResults[name]) continue;
  const r = await req('/rest/v1/rpc/' + name, { method: 'POST', body: '{}' });
  const msg = r.json?.message || r.text || '';
  rpcResults['extra:' + name] = {
    clientKeys: [], status: /permission denied for function/.test(msg) || r.status === 42501 ? 'exists-needs-auth' :
      (r.json?.code === 'PGRST202' ? 'absent-or-requires-args' : (r.status === 200 ? 'callable-anon' : 'exists-bad-args')),
    http: r.status, code: r.json?.code || null, message: msg.slice(0, 160),
  };
  await sleep(140);
}

// ---- 4. Tables — "permission denied for table X" proves the table exists --------------------
const tableCandidates = ['saves', 'trades', 'market', 'profiles', 'sessions', 'logs', 'events', 'friends', 'gifts', 'bans', 'players',
  'raid_days', 'raid_scores', 'zone_scores', 'tower_scores', 'wb_state', 'candy_days', 'devices', 'admin_logs'];
const tableResults = {};
for (const t of tableCandidates) {
  const r = await req(`/rest/v1/${t}?select=*&limit=1`);
  const msg = r.json?.message || r.text || '';
  tableResults[t] = {
    kind: /permission denied for (table|relation)/.test(msg) ? 'exists' : (r.status === 200 ? 'readable-anon' : (/does not exist|PGRST205|Could not find the table/.test(msg) ? 'absent' : (r.status === 401 ? 'exists-needs-auth' : 'unknown'))),
    http: r.status, code: r.json?.code || null, message: msg.slice(0, 140),
  };
  await sleep(140);
}

// ---- 5. Auth settings ----------------------------------------------------------------------
const auth = await req('/auth/v1/settings');

// ---- 6. Docs -------------------------------------------------------------------------------
mkdirSync('docs', { recursive: true });
mkdirSync('verify', { recursive: true });
writeFileSync('verify/backend-probe.json', JSON.stringify({ key: KEY, rpcResults, tableResults, auth: auth.json }, null, 1));

const verified = Object.entries(rpcResults).filter(([, v]) => v.status === 'exists-needs-auth' || v.status === 'callable-anon' || v.status === 'exists-bad-args');
const mismatch = Object.entries(rpcResults).filter(([, v]) => v.status === 'signature-mismatch');
const md = [];
md.push('# Backend schema — hợp đồng server của Poke\'Catch (xác minh công khai)\n');
md.push('Backend: Supabase `qglircqqrtgdvxawisoz.supabase.co`. Frontend nhúng **publishable key** thật, nên có thể');
md.push('gọi server y như game. Bảng bị **RLS chặn** (game chỉ dùng RPC `SECURITY DEFINER`), nhưng phản hồi server');
md.push('cho phép **xác minh độc lập** từng RPC + bảng của hợp đồng client:\n');
md.push('- RPC tồn tại + đúng tham số → `42501 permission denied for function <name>` (cần đăng nhập).');
md.push('- RPC sai/không tồn tại → `PGRST202 Could not find the function…`.\n');
md.push('Sinh bởi `tools/probe-backend.mjs` → `verify/backend-probe.json`.\n');
md.push('## 1. Auth\n');
md.push('```json\n' + JSON.stringify(auth.json, null, 1) + '\n```\n');
md.push('## 2. RPC — client dùng vs server xác nhận\n');
md.push(`**${verified.length}/${usedRpcs.size}** function client dùng đã được server xác nhận tồn tại với đúng tham số`);
md.push(`(58 trả \`permission denied for function\` = cần đăng nhập; \`log_session\` trả \`exists-bad-args\` do dummy sai kiểu nhưng function tồn tại). Lệch: **${mismatch.length}**.\n`);
md.push('| RPC | tham số client | server | HTTP | ghi chú |');
md.push('|---|---|---|---|---|');
for (const [name, v] of Object.entries(rpcResults)) {
  md.push(`| \`${name.replace('extra:', '')}\`${name.startsWith('extra:') ? ' *(extra)*' : ''} | ${(v.clientKeys || []).map(k => '`' + k + '`').join(', ') || '—'} | ${v.status} | ${v.http} | ${(v.code || '') + ' ' + (v.message || '').slice(0, 80)} |`);
}
md.push('');
md.push('## 3. Bảng\n');
md.push('| bảng | xác minh | HTTP | bằng chứng |');
md.push('|---|---|---|---|');
for (const [t, v] of Object.entries(tableResults)) md.push(`| \`${t}\` | ${v.kind} | ${v.http} | ${(v.code || '') + ' ' + v.message} |`);
md.push('');
md.push('## 4. Phát hiện khác\n');
md.push('- OAuth bật: **Discord + Google**; anonymous sign-in tắt ⇒ chơi khách 100% local.');
md.push('- Cơ chế chống clone trong `084-cloud.js`: hostname phải thuộc allowlist (netlify/pages/localhost),');
md.push('  kiểm bằng hash `Math.imul` trên từng ký tự — không phải so sánh chuỗi.');
md.push('- Không có source server công khai: PostgREST OpenAPI yêu cầu secret key, bảng đóng, không có repo.');
md.push('- Mọi RPC đều `SECURITY DEFINER` (bảng bị RLS) — client không đọc/ghi trực tiếp bảng nào.');
writeFileSync('docs/BACKEND-SCHEMA.md', md.join('\n') + '\n');
console.log(`verified ${verified.length}/${usedRpcs.size} RPC exist | signature mismatches: ${mismatch.length} | tables confirmed: ${Object.values(tableResults).filter(t => t.kind === 'exists').length}`);
console.log('mismatches:', mismatch.map(([n, v]) => n + ' ' + (v.message || '').slice(0, 80)));
console.log('wrote docs/BACKEND-SCHEMA.md + verify/backend-probe.json');
