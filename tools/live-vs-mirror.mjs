// live-vs-mirror.mjs — confirm the deploy version we mirrored is still the one being served.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const sha = p => createHash('sha256').update(readFileSync(p)).digest('hex');
const pairs = [
  ['mirror/boot.js', '.cache/boot-live.js'],
  ['mirror/index.html', '.cache/index-live.html'],
  ['mirror/sw.js', '.cache/sw-live.js'],
  ['mirror/apple-touch-icon.png', '.cache/icon-live.png'],
];
const out = { files: [], hashes: {}, build: {} };
for (const [a, b] of pairs) {
  const ha = sha(a), hb = sha(b);
  const sa = readFileSync(a).length, sb = readFileSync(b).length;
  out.files.push({ mirror: a, live: b, bytesMirror: sa, bytesLive: sb, identical: ha === hb, shaMirror: ha.slice(0, 16), shaLive: hb.slice(0, 16) });
}
const liveBoot = readFileSync('.cache/boot-live.js', 'utf8');
const mirBoot = readFileSync('mirror/boot.js', 'utf8');
const grab = (s, re) => (re.exec(s) || [])[1] || null;
out.build = {
  live: {
    BUILD: grab(liveBoot, /BUILD\s*=\s*"([^"]+)"/),
    app: grab(liveBoot, /bundle\/app\.([0-9a-f]{10})\.js/),
    css: grab(liveBoot, /bundle\/app\.([0-9a-f]{10})\.css/),
    vendor: grab(liveBoot, /bundle\/vendor-supabase\.([0-9a-f]{10})\.js/),
    langs: (liveBoot.match(/lang-[a-z-]+\.[0-9a-f]{10}\.js/g) || []),
    adminFiles: /ADMIN_FILES\s*=\s*(\[[^\]]*\])/.exec(liveBoot)?.[1] ?? null,
    online: grab(liveBoot, /ONLINE\s*=\s*(\d+)/),
  },
  mirror: {
    BUILD: grab(mirBoot, /BUILD\s*=\s*"([^"]+)"/),
    app: grab(mirBoot, /bundle\/app\.([0-9a-f]{10})\.js/),
    css: grab(mirBoot, /bundle\/app\.([0-9a-f]{10})\.css/),
    vendor: grab(mirBoot, /bundle\/vendor-supabase\.([0-9a-f]{10})\.js/),
    langs: (mirBoot.match(/lang-[a-z-]+\.[0-9a-f]{10}\.js/g) || []),
    adminFiles: /ADMIN_FILES\s*=\s*(\[[^\]]*\])/.exec(mirBoot)?.[1] ?? null,
    online: grab(mirBoot, /ONLINE\s*=\s*(\d+)/),
  },
};
writeFileSync('verify/live-vs-mirror.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
