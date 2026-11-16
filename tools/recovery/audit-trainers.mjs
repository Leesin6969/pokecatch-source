// audit-trainers.mjs — find every trainer sprite key the game can ask for.
import { readFileSync, readdirSync } from 'node:fs';

const files = readdirSync('src/js').filter(f => f.endsWith('.js'));
const keys = new Set();
const sources = new Map();
for (const f of files) {
  const s = readFileSync('src/js/' + f, 'utf8');
  // sprite:"key" / sprite: "key" / look:"key" / face:"key"
  for (const m of s.matchAll(/\b(?:sprite|look|face|avatar|portrait)\s*:\s*"([a-z0-9_-]+)"/g)) {
    keys.add(m[1]); sources.set(m[1], (sources.get(m[1]) || new Set()).add(f));
  }
  // lists like ["red","leaf",...] under a trainers/avatars key
  for (const m of s.matchAll(/(?:trainers|avatars|LOOKS|SPRITES|FACES)\s*[:=]\s*\[([^\]]{10,2000})\]/g)) {
    for (const k of m[1].matchAll(/"([a-z0-9_-]+)"/g)) { keys.add(k[1]); sources.set(k[1], (sources.get(k[1]) || new Set()).add(f)); }
  }
}
console.log('candidate trainer sprite keys:', keys.size);
console.log([...keys].sort().join(' '));
