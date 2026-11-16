// intros-assets-loop.mjs — close the remaining intros asset holes by observing the page boot.
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const CDN = 'https://pokecatch-online.pages.dev/';
const run = (cmd, args) => new Promise(res => { const c = spawn(cmd, args, { stdio: 'inherit' }); c.on('exit', res); });

for (let round = 1; round <= 3; round++) {
  if (existsSync('verify/intros-report.json')) unlinkSync('verify/intros-report.json');
  await run(process.execPath, ['tools/verify-intros.mjs']);
  let rep;
  try { rep = JSON.parse(readFileSync('verify/intros-report.json', 'utf8')); } catch { console.log('no report, stop'); break; }
  const paths = [...new Set([...(rep.rebuilt.fails || [])]
    .map(f => { const m = /(\/assets\/[^\s?]+)/.exec(f); return m ? m[1].replace(/^\//, '') : null; })
    .filter(Boolean))];
  console.log(`round ${round}: ${paths.length} failing asset path(s)`);
  if (!paths.length) { console.log('intros assets complete'); break; }
  let got = 0;
  for (const p of paths) {
    if (existsSync(join('src', p))) continue;
    const r = await fetch(CDN + p, { headers: { 'user-agent': UA } });
    const ct = r.headers.get('content-type') || '';
    if (r.status === 200 && !ct.startsWith('text/html')) {
      const buf = Buffer.from(await r.arrayBuffer());
      mkdirSync(dirname(join('src', p)), { recursive: true });
      writeFileSync(join('src', p), buf);
      got++;
    } else console.log('  absent upstream:', p);
  }
  console.log(`  downloaded ${got}`);
  if (!got) break;
  await run(process.execPath, ['tools/build.mjs']);
}
