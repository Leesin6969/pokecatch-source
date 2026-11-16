// check-chunks.mjs — validate translated chunks against their job sources.
import { readFileSync, readdirSync } from 'node:fs';

const OUT = '.cache/i18n/out';
const JOB = '.cache/i18n/jobs';
const tokenRe = /<[^>]+>|\{[^{}]*\}/g;
const sig = s => (s.match(tokenRe) || []).sort().join('|');
let bad = 0, checked = 0;
for (const f of readdirSync(OUT).sort()) {
  const isUi = f.startsWith('ui-');
  const job = JSON.parse(readFileSync(`${JOB}/${f}`, 'utf8'));
  const out = JSON.parse(readFileSync(`${OUT}/${f}`, 'utf8'));
  if (isUi) {
    const src = new Map(job.map(x => [x.k, x.en]));
    const keys = Object.keys(out);
    if (keys.length !== job.length) { console.log(f, 'COUNT', keys.length, '!=', job.length); bad++; }
    for (const [k, en] of src) {
      if (!(k in out)) { console.log(f, 'MISSING key', JSON.stringify(k).slice(0, 60)); bad++; continue; }
      checked++;
    if (sig(en) !== sig(out[k])) { console.log(f, 'TOKEN MISMATCH', JSON.stringify(k).slice(0, 60), '\n  en:', sig(en), '\n  vi:', sig(out[k])); bad++; }
      if (typeof out[k] !== 'string' || !out[k].trim()) { console.log(f, 'EMPTY', JSON.stringify(k).slice(0, 60)); bad++; }
    }
    for (const k of keys) if (!src.has(k)) { console.log(f, 'EXTRA key', JSON.stringify(k).slice(0, 60)); bad++; }
  } else {
    const srcIds = job.map(x => x.id);
    if (out.length !== job.length) { console.log(f, 'COUNT', out.length, '!=', job.length); bad++; }
    for (let i = 0; i < Math.min(out.length, job.length); i++) {
      if (out[i].id !== srcIds[i]) { console.log(f, 'ID MISMATCH at', i, out[i].id, '!=', srcIds[i]); bad++; }
      if (!out[i].genus?.trim() || !out[i].flavor?.trim()) { console.log(f, 'EMPTY at id', out[i].id); bad++; }
      checked++;
    }
  }
}
console.log('chunks checked:', readdirSync(OUT).length, '| items checked:', checked, '| problems:', bad);
process.exit(bad ? 1 : 0);
