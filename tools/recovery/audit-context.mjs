// audit-context.mjs — print the code around each dynamic asset template so we can enumerate values.
import { readFileSync, readdirSync } from 'node:fs';
const needles = [
  'assets/pokemon/anim/', 'assets/pokemon/art/${ze}.gif', '.gif`',
  'assets/ui/marks/', 'assets/ui/underground/geode-', 'assets/ui/underground/rock-',
  'assets/ui/frame-candy/', '?v=1019', 'assets/badges/frlg-',
];
for (const f of readdirSync('src/js').filter(x => x.endsWith('.js'))) {
  const s = readFileSync('src/js/' + f, 'utf8');
  for (const n of needles) {
    let i = s.indexOf(n);
    while (i >= 0) {
      const start = Math.max(0, i - 520);
      console.log(`\n===== ${f} @${i} [${n}] =====`);
      console.log(s.slice(start, i + 260).replace(/\n\s*/g, ' ').slice(-760));
      i = s.indexOf(n, i + 1);
      if (i > 0 && s.slice(i - 200, i).includes('\n===')) break;
    }
  }
}
