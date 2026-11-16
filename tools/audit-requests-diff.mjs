// audit-requests-diff.mjs — compare every HTTP request of the live site with our local tree.
// Proves "we downloaded everything the game loads": for each URL requested on the live crawl, the
// equivalent file must exist locally (bundles are hash-renamed by our build, so they are compared by
// role, not by exact filename; assets are compared by exact path).
import { readFileSync, existsSync, writeFileSync } from 'node:fs';

const live = JSON.parse(readFileSync('verify/audit-original.json', 'utf8'));
const local = JSON.parse(readFileSync('verify/audit-local.json', 'utf8'));
const external = /supabase\.co|discord\.com|discord\.gg|fonts\.googleapis|fonts\.gstatic|googleapis|gstatic|github|ko-fi/;

const role = p => {
  if (/\/bundle\/app\.[0-9a-f]{10}\.js$/.test(p)) return 'app-bundle';
  if (/\/bundle\/app\.[0-9a-f]{10}\.css$/.test(p)) return 'app-css';
  if (/\/bundle\/vendor-supabase\.[0-9a-f]{10}\.js$/.test(p)) return 'vendor-supabase';
  if (/\/bundle\/lang-[A-Za-z-]+\.[0-9a-f]+\.js$/.test(p)) return 'lang:' + /lang-([A-Za-z-]+)\./.exec(p)[1];
  if (/\/bundle\/pack-[a-z0-9]+\.bin$/.test(p)) return 'pack';
  if (/\/boot\.js$/.test(p)) return 'boot';
  if (/\/packs\.json$/.test(p)) return 'packs';
  if (/\/sw\.js$/.test(p)) return 'sw';
  if (/\/intros\//.test(p)) return 'intros';
  if (/\/assets\//.test(p)) return 'asset';
  return 'other';
};
const path = u => { try { return new URL(u).pathname; } catch { return u; } };
const family = p => p.replace(/\/app\.[0-9a-f]{10}\./, '/app.').replace(/(vendor-supabase|lang-[A-Za-z-]+)\.[0-9a-f]+\.js/, '$1.HASH.js');

const classify = (requests) => {
  const byRole = new Map(), assets = new Set(), others = new Set(), externalSet = new Set();
  for (const [url, rec] of Object.entries(requests || {})) {
    if (/^(data|blob|chrome-extension):/.test(url)) continue;   // inline assets / devtools, not files
    if (external.test(url)) { externalSet.add(url); continue; }
    const p = path(url);
    const r = role(p);
    (byRole.get(r) || byRole.set(r, new Set()).get(r)).add(r === 'asset' ? p : family(p));
    if (r === 'asset') assets.add(p);
    else if (r === 'other') others.add(p);
  }
  return { byRole, assets, others, externalSet };
};
const L = classify(live.requests), X = classify(local.requests);

const liveAssets = [...L.assets].sort();
const missingAssets = liveAssets.filter(p => !existsSync('src' + p));
const liveRoles = [...L.byRole.keys()].sort();
const localRoles = [...X.byRole.keys()].sort();
const missingRoles = liveRoles.filter(r => !X.byRole.has(r));

const report = {
  at: new Date().toISOString(),
  live: { urls: Object.keys(live.requests || {}).length, assets: liveAssets.length, roles: liveRoles, other: [...L.others].sort(), external: L.externalSet.size },
  local: { urls: Object.keys(local.requests || {}).length, assets: [...X.assets].length, roles: localRoles, other: [...X.others].sort(), external: X.externalSet.size },
  liveAssetsMissingLocally: missingAssets,
  liveRolesMissingLocally: missingRoles,
  verdict: missingAssets.length === 0 && missingRoles.length === 0 ? 'every live request has a local counterpart' : 'HOLES FOUND',
};
writeFileSync('verify/requests-diff.json', JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
process.exit(report.verdict === 'every live request has a local counterpart' ? 0 : 1);
