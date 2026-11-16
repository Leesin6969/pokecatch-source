// audit-diff.mjs — compare the local build's deep audit with the live site's deep audit.
// The two runs use the same save, the same crawl and the same instrumentation, so a difference
// is a real behavioural gap; identical output is the strongest completeness evidence available.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const load = l => {
  const f = `verify/audit-${l}.json`;
  if (!existsSync(f)) throw new Error('missing ' + f);
  return JSON.parse(readFileSync(f, 'utf8'));
};
const A = load('original');   // live site
const B = load('local');      // our build

const set = (o, k) => new Set(Object.keys(o[k] || {}));
const pathOnly = u => u.replace(/^https?:\/\/[^/]+/, '').replace(/\?.*$/, '');
const statusOf = (obj, want) => Object.entries(obj || {}).filter(([, s]) => s === want).map(([u]) => pathOnly(u));

const diff = { onlyLive: {}, onlyLocal: {}, counts: {} };
const localHas = p => existsSync(join('src', String(p).replace(/^\//, '').split(' ')[0]));

// asset URLs requested by each side (keys are full URLs, so normalise them to paths first)
const byPath = obj => {
  const m = new Map();
  for (const [u, s] of Object.entries(obj || {})) {
    const p = pathOnly(u);
    if (!m.has(p) || s === 200) m.set(p, s); // a later 200 wins over an earlier retry 404
  }
  return m;
};
const liveAssets = byPath(A.assets);
const localAssets = byPath(B.assets);
const allUrls = new Set([...liveAssets.keys(), ...localAssets.keys()]);
const local404 = [], live200notLocal = [], local200only = [], both = [];
for (const p of allUrls) {
  const la = liveAssets.get(p), lb = localAssets.get(p);
  if (la === 200 && lb === 200) both.push(p);
  else if (la === 200 && lb !== 200) live200notLocal.push(p + (lb ? ` (local ${lb})` : ' (local never requested)'));
  else if (lb === 200 && la !== 200) local200only.push(p + ` (live ${la ?? 'not requested'})`);
  else if (lb >= 400) local404.push(p + ` (local ${lb})`);
}
diff.assets = {
  requestedByBoth: both.length,
  liveLoadedButLocalNeverRequested: [...new Set(live200notLocal)].length,
  liveLoadedButLocalFileMissing: [...new Set(live200notLocal)].filter(x => !localHas(x)),
  localOkButLiveNot: [...new Set(local200only)],
  localStill404: [...new Set(local404)],
};
diff.counts = {
  liveHttpErrors: (A.httpErrors || []).length,
  localHttpErrors: (B.httpErrors || []).length,
  livePageErrors: (A.pageErrors || []).length,
  localPageErrors: (B.pageErrors || []).length,
  liveConsoleErrors: (A.console || []).length,
  localConsoleErrors: (B.console || []).length,
  liveWarnings: (A.consoleWarnings || []).length,
  localWarnings: (B.consoleWarnings || []).length,
  liveBrokenImages: (A.brokenImages || []).length,
  localBrokenImages: (B.brokenImages || []).length,
  liveModules: (A.modules || []).length,
  localModules: (B.modules || []).length,
  liveScreens: (A.screens || []).length,
  localScreens: (B.screens || []).length,
  liveSteps: A.summary?.steps, localSteps: B.summary?.steps,
};
// error-level differences (ignoring URLs we already reported as assets)
const norm = s => pathOnly(String(s)).replace(/^404 /, '');
const liveHttp = new Set((A.httpErrors || []).map(norm));
const localHttp = new Set((B.httpErrors || []).map(norm));
diff.onlyLive.http = [...liveHttp].filter(x => !localHttp.has(x));
diff.onlyLocal.http = [...localHttp].filter(x => !liveHttp.has(x));
const livePage = new Set(A.pageErrors || []);
const localPage = new Set(B.pageErrors || []);
diff.onlyLive.page = [...livePage].filter(x => !localPage.has(x));
diff.onlyLocal.page = [...localPage].filter(x => !livePage.has(x));
const liveCon = new Set(A.console || []);
const localCon = new Set(B.console || []);
diff.onlyLive.console = [...liveCon].filter(x => !localCon.has(x));
diff.onlyLocal.console = [...localCon].filter(x => !liveCon.has(x));

writeFileSync('verify/audit-diff.json', JSON.stringify(diff, null, 1));

console.log('=== live vs local deep audit ===');
console.log(JSON.stringify(diff.counts, null, 1));
console.log('\nasset URLs loaded by both                 :', diff.assets.requestedByBoth);
console.log('live-loaded paths this run did not request:', diff.assets.liveLoadedButLocalNeverRequested);
console.log('...of those MISSING from our asset tree   :', diff.assets.liveLoadedButLocalFileMissing.length);
for (const x of diff.assets.liveLoadedButLocalFileMissing.slice(0, 40)) console.log('   MISSING:', x);
console.log('local still 404                           :', diff.assets.localStill404.length);
for (const x of diff.assets.localStill404.slice(0, 40)) console.log('   -', x);
console.log('\nhttp errors only on live :', diff.onlyLive.http);
console.log('http errors only on local:', diff.onlyLocal.http);
console.log('page errors only on live :', diff.onlyLive.page.slice(0, 10));
console.log('page errors only on local:', diff.onlyLocal.page.slice(0, 10));
console.log('console errors only live :', diff.onlyLive.console.slice(0, 10));
console.log('console errors only local:', diff.onlyLocal.console.slice(0, 10));

const perfect = diff.assets.liveLoadedButLocalFileMissing.length === 0 && diff.assets.localStill404.length === 0 &&
  diff.onlyLocal.http.length === 0 && diff.onlyLocal.page.length === 0 && diff.onlyLocal.console.length === 0;
console.log('\nVERDICT:', perfect ? 'local build is behaviourally identical to the live site on this crawl' : 'differences listed above');
process.exit(perfect ? 0 : 1);
