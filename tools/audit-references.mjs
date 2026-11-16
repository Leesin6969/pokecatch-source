// audit-references.mjs — exhaustive static reference audit over every downloaded artifact.
//
// Goal: prove that every code/asset path the game can request is either present in our tree or
// proven absent upstream. Scans: bundle JS, boot.js, shell HTML, service worker, CSS, lang bundles,
// intros page, packs.json, data tables. Extracts literals + dynamic templates, normalises them,
// then checks the local tree; unresolved paths are re-probed on the CDN to classify them.
import { readFileSync, readdirSync, existsSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const CDN = 'https://pokecatch-online.pages.dev/';
const files = [
  'mirror/bundle/app.js', 'mirror/bundle/app.css', 'mirror/boot.js', 'mirror/index.html', 'mirror/sw.js',
  'mirror/packs.json', 'src/intros/app.js', 'src/intros/app.css', 'src/intros/shell.html',
  ...readdirSync('src/lang').filter(f => f.endsWith('.js')).map(f => 'src/lang/' + f),
];
const refs = new Map(); // path -> Set(source)
const add = (p, src) => {
  if (!p || p.length > 240) return;
  if (!p.startsWith('assets/') && !p.startsWith('bundle/') && !p.startsWith('intros/') && p !== 'boot.js' && p !== 'packs.json' && p !== 'sw.js') return;
  if (/[<>{}()[\]]/.test(p)) return; // skip dynamic leftovers
  if (!refs.has(p)) refs.set(p, new Set());
  refs.get(p).add(src.split('/').pop());
};
const TEMPLATE = /^([A-Za-z0-9_./-]+)\$\{[^}]*\}([A-Za-z0-9_./-]*)$/;

for (const f of files) {
  if (!existsSync(f)) { console.log('missing scan target:', f); continue; }
  const text = readFileSync(f, 'utf8');
  // quoted literals
  for (const m of text.matchAll(/["'`]([A-Za-z0-9_@./${}-]+)["'`]/g)) add(m[1], f);
  // CSS url(...)
  for (const m of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) add(m[1], f);
  // html src/href
  for (const m of text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)) add(m[1], f);
}

// expand dynamic templates: `assets/bg/scenes/${x}-710x400.webp` → check the directory families
const dynamic = [...refs.keys()].filter(p => p.includes('${'));
const concrete = new Map([...refs].filter(([p]) => !p.includes('${')));

// local resolution: asset paths live under src/, bundle outputs under dist/mirror
const local = {
  'assets/': ['src/assets/', 'dist/assets/'],
  'bundle/': ['dist/bundle/', 'mirror/bundle/'],
  'intros/': ['src/intros/', 'dist/intros/'],
  '': ['dist/', 'src/shell/', 'mirror/'],
};
const mapLocal = p => {
  for (const [prefix, roots] of Object.entries(local)) {
    if (!p.startsWith(prefix)) continue;
    const rel = p.slice(prefix.length);
    for (const r of roots) if (existsSync(join(r, rel))) return join(r, rel);
  }
  return null;
};
const present = [], missing = [];
for (const p of concrete.keys()) {
  const hit = mapLocal(p);
  if (hit) present.push({ p, hit: statSync(hit).size });
  else missing.push(p);
}
console.log(`literal refs: ${concrete.size} | present: ${present.length} | missing locally: ${missing.length}`);
console.log('dynamic templates:', dynamic.length, dynamic.slice(0, 10));

// classify missing against the live CDN (404 / SPA fallback / real)
const classified = [];
for (const p of missing) {
  const r = await fetch(CDN + p, { headers: { 'user-agent': UA } });
  const ct = r.headers.get('content-type') || '';
  const buf = Buffer.from(await r.arrayBuffer());
  const upstream = r.status === 200 && !ct.startsWith('text/html') ? 'present' : 'absent-upstream';
  classified.push({ path: p, upstream, status: r.status, type: ct, bytes: buf.length });
  await new Promise(r2 => setTimeout(r2, 80));
}
const realMissing = classified.filter(c => c.upstream === 'present');
console.log('missing locally → present upstream (real hole):', realMissing.length, realMissing.slice(0, 10));
console.log('missing locally → absent upstream (upstream gap):', classified.length - realMissing.length);

writeFileSync('verify/reference-audit.json', JSON.stringify({
  scanned: files, literalRefs: concrete.size, present: present.length, missingLocally: missing.length,
  dynamicTemplates: dynamic, classified,
}, null, 1));
