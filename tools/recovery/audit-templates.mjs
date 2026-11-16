// audit-templates.mjs — list every dynamically-built asset path in the recovered source.
import { readFileSync, readdirSync } from 'node:fs';

const files = readdirSync('src/js').filter(f => f.endsWith('.js'));
const tpl = new Map();
for (const f of files) {
  const src = readFileSync('src/js/' + f, 'utf8');
  // template literals (may span lines) containing assets/ and ${...}
  for (const m of src.matchAll(/`([^`]{0,400}?)`/gs)) {
    const body = m[1];
    if (!body.includes('assets/')) continue;
    // normalise whitespace, keep the template
    const norm = body.replace(/\s+/g, ' ').trim();
    if (!norm.includes('${')) continue;
    tpl.set(norm, (tpl.get(norm) || 0) + 1);
  }
  // concatenations: "assets/..." + x + "..."
  for (const m of src.matchAll(/(["'])(assets\/[A-Za-z0-9_./-]*)\1\s*\+/g)) {
    tpl.set('CONCAT ' + m[2] + ' + …', 1);
  }
}
const list = [...tpl.keys()].sort();
console.log('dynamic asset templates:', list.length);
for (const l of list) console.log('-', l);
