// audit-assets-loop.mjs — close every remaining asset hole empirically:
//   run the deep audit -> take every 404 -> download the ones that exist on the CDN -> rebuild -> repeat.
//
//   node tools/serve.mjs --dir=dist --port=4400     (in another shell)
//   node tools/audit-assets-loop.mjs --url=http://127.0.0.1:4400/ [--max=4]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';

const arg = (n, d = null) => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1] || d;
const URL_ = arg('url', 'http://127.0.0.1:4400/');
const MAX = Number(arg('max', 4));
const CDN = 'https://pokecatch-online.pages.dev/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const run = (cmd, args) => new Promise(res => {
  const c = spawn(cmd, args, { stdio: 'inherit' });
  c.on('exit', code => res(code));
});

let last = [];
for (let round = 1; round <= MAX; round++) {
  console.log(`\n===== round ${round}: deep audit =====`);
  const code = await run(process.execPath, ['tools/audit-runtime.mjs', `--url=${URL_}`, `--label=loop${round}`, '--deep']);
  let audit;
  try { audit = JSON.parse(readFileSync(`verify/audit-loop${round}.json`, 'utf8')); }
  catch { console.log('audit json missing, stopping'); break; }
  const paths = [...new Set((audit.httpErrors || [])
    .map(e => { const m = /(\/assets\/[^\s?]+)/.exec(e); return m ? m[1] : null; })
    .filter(Boolean))];
  console.log(`404 assets this round: ${paths.length}`);
  if (!paths.length) { last = []; console.log('no 404 assets left'); break; }
  writeFileSync('verify/asset-404-round.json', JSON.stringify(paths, null, 1));

  const got = [], absent = [];
  for (const p of paths) {
    const rel = p.replace(/^\//, '');
    if (existsSync(join('src', rel))) { got.push(rel + ' (already local!)'); continue; }
    const r = await fetch(CDN + rel, { headers: { 'user-agent': UA } });
    const ct = r.headers.get('content-type') || '';
    if (r.status === 200 && !ct.startsWith('text/html')) {
      const buf = Buffer.from(await r.arrayBuffer());
      mkdirSync(dirname(join('src', rel)), { recursive: true });
      writeFileSync(join('src', rel), buf);
      got.push(rel);
    } else absent.push(rel);
  }
  console.log(`downloaded ${got.length}, absent upstream ${absent.length}`);
  if (got.length) console.log('  new:', got.slice(0, 20));
  const needRebuild = got.some(g => g.includes('already local') ) || got.some(g => !g.includes('already'));
  if (absent.length) console.log('  absent on CDN (original game 404s too):', absent);
  last = absent;
  if (!got.length) break;
  if (needRebuild) { console.log('rebuilding dist…'); await run(process.execPath, ['tools/build.mjs']); continue; }
  console.log('rebuilding dist…');
  await run(process.execPath, ['tools/build.mjs']);
}
writeFileSync('verify/audit-assets-final.json', JSON.stringify({ absentUpstream: last }, null, 1));
console.log('\ndone. assets absent upstream:', last.length, last);
