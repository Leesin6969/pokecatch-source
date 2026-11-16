// audit-all.mjs — run the whole verification suite in one go and print a summary.
//   node tools/audit-all.mjs            (about 10-15 minutes)
// The individual tools write their JSON/logs into verify/; this orchestrator only sequences them.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const run = (args, opts = {}) => new Promise(res => {
  const c = spawn(process.execPath, args, { stdio: 'inherit', ...opts });
  c.on('exit', code => res(code));
});
const step = async (label, args) => {
  console.log(`\n=== ${label} ===`);
  const code = await run(args);
  console.log(`--- ${label}: ${code === 0 ? 'PASS' : 'FAIL (exit ' + code + ')'}`);
  return code;
};

mkdirSync('verify', { recursive: true });
const results = {};
results.build = await step('build canonical', ['tools/build.mjs']);
results.download = await step('download completeness (deploy artifacts + hidden paths)', ['tools/audit-download.mjs']);
results.references = await step('static references (every path the code can request)', ['tools/audit-references.mjs']);
const server = spawn(process.execPath, ['tools/serve.mjs', '--dir=dist', '--port=4418'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1500));
try {
  results.boot = await step('boot check', ['tools/verify.mjs', '--url=http://127.0.0.1:4418/']);
  results.data = await step('asset audit (data-driven)', ['tools/audit-data.mjs']);
  results.i18n = await step('i18n sweep (8 languages)', ['tools/audit-i18n.mjs', '--url=http://127.0.0.1:4418/', '--label=local']);
  results.runtime = await run(['tools/audit-runtime.mjs', '--url=http://127.0.0.1:4418/', '--label=local', '--deep']);
} finally { server.kill(); }
results.requests = await step('runtime requests vs local tree', ['tools/audit-requests-diff.mjs']);
results.readable = await step('readable tree (alpha-equivalence + boot)', ['tools/verify-readable.mjs']);
results.intros = await step('intro workshop (split + parity)', ['tools/verify-intros.mjs']);
results.diff = await step('live-vs-local diff', ['tools/audit-diff.mjs']);
results.logs = await step('log audit (every verification log)', ['tools/audit-logs.mjs']);

writeFileSync('verify/audit-all.json', JSON.stringify(results, null, 1));
console.log('\n=== SUMMARY ===');
for (const [k, v] of Object.entries(results)) console.log(String(k).padEnd(10), v === 0 ? 'PASS' : 'FAIL/exit ' + v);
const ok = Object.entries(results).every(([, v]) => v === 0);
console.log('\nAUDIT SUITE:', ok ? 'PASSED' : 'FAILED');
process.exit(ok ? 0 : 1);
