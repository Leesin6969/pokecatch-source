// check.mjs — one command: build, serve, boot the game in headless Chrome, prove it runs, report.
//
//   node tools/check.mjs                # build + verify dist/
//   node tools/check.mjs --play         # also play through the first-run flow (title -> starter -> battle)
//   node tools/check.mjs --dir=.cache/dev
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const arg = (n, d = null) => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1] || d;
const PLAY = process.argv.includes('--play');
const DIR = arg('dir', 'dist');
const PORT = Number(arg('port', 4399));
const URL_ = `http://127.0.0.1:${PORT}`;

const run = (cmd, args, opts = {}) => new Promise((resolve, reject) => {
  const child = spawn(cmd, args, { stdio: 'inherit', ...opts });
  child.on('exit', code => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`))));
});

mkdirSync('verify', { recursive: true });
console.log('\n== 1/4 build');
await run(process.execPath, ['tools/build.mjs', `--out=${DIR}`]);

console.log('\n== 2/4 serve');
const server = spawn(process.execPath, ['tools/serve.mjs', `--dir=${DIR}`, `--port=${PORT}`], { stdio: 'inherit' });
await new Promise(r => setTimeout(r, 1200));

let ok = true;
try {
  console.log('\n== 3/4 boot + screen walk');
  await run(process.execPath, ['tools/verify.mjs', `--url=${URL_}/`]);
  if (PLAY) {
    console.log('\n== 4/4 first-run playthrough');
    await run(process.execPath, ['tools/play.mjs', `--url=${URL_}/`, '--label=check']);
  }
} catch (e) {
  ok = false;
  console.error('\nCHECK FAILED:', e.message);
} finally {
  server.kill();
}
writeFileSync('verify/last-check.json', JSON.stringify({ ok, dir: DIR, play: PLAY, at: new Date().toISOString() }, null, 1));
console.log(ok ? '\n== CHECK PASSED' : '\n== CHECK FAILED');
process.exit(ok ? 0 : 1);
