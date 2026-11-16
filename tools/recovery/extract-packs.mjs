// extract-packs.mjs — split CDN packs (concatenated files) back into the real assets/ tree.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const manifest = JSON.parse(readFileSync('mirror/packs.json', 'utf8'));
const outRoot = 'mirror';
let count = 0, bytes = 0;
const types = {};

for (const [group, info] of Object.entries(manifest)) {
  const pack = readFileSync(join('mirror/packs', `${group}.bin`));
  const entries = Object.entries(info.files);
  console.log(`${group}: pack ${pack.length}B, ${entries.length} files`);
  for (const [path, [off, len, type]] of entries) {
    const buf = pack.subarray(off, off + len);
    if (buf.length !== len) throw new Error(`${path}: expected ${len}, got ${buf.length}`);
    const dest = join(outRoot, path.replace(/^\//, ''));
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    count++; bytes += len;
    types[type] = (types[type] || 0) + 1;
  }
}
console.log(`\nextracted ${count} files, ${bytes} bytes (${(bytes / 1024).toFixed(0)} KB)`);
console.log('mime types:', types);
