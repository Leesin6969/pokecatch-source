// extract-assets.mjs — copy assets / vendor / icons / intros into src/, format CSS + language bundles.
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

mkdirSync('src/assets', { recursive: true });
cpSync('mirror/assets', 'src/assets', { recursive: true });
console.log('assets copied:', countFiles('src/assets'), 'files');

mkdirSync('src/vendor', { recursive: true });
cpSync('mirror/bundle/vendor-supabase.js', 'src/vendor/supabase.js');
console.log('vendor: src/vendor/supabase.js', statSync('src/vendor/supabase.js').size, 'bytes (supabase-js 2.65.0 UMD, third-party, shipped verbatim)');

// the intro workshop is split separately (tools/extract-intros.mjs) into shell.html + app.css +
// boot.js + app.js; tools/build.mjs renders the single-file page back from those parts.
console.log('intros: split by tools/extract-intros.mjs (shell.html + app.css + boot.js + app.js)');

cpSync('mirror/apple-touch-icon.png', 'src/shell/apple-touch-icon.png');
console.log('icon: src/shell/apple-touch-icon.png');
// the real favicon lives on the Netlify shell deploy (not the CDN); mirror/deploy/favicon.ico holds it
if (existsSync('mirror/deploy/favicon.ico')) {
  cpSync('mirror/deploy/favicon.ico', 'src/shell/favicon.ico');
  console.log('favicon: src/shell/favicon.ico (from mirror/deploy, byte-identical to deploy)');
}

// CSS: one file, formatter treats it below
writeFileSync('src/css/app.css', readFileSync('mirror/bundle/app.css', 'utf8'));
console.log('css: src/css/app.css', statSync('src/css/app.css').size, 'bytes (raw; formatted by format-src.mjs)');

// language bundles: one file per locale, French is built into the app itself
const LANGS = ['en', 'es', 'de', 'zh-Hans', 'zh-Hant', 'ko', 'ja'];
const files = readdirSync('mirror/bundle').filter(f => /^lang-.+\.js$/.test(f));
mkdirSync('src/lang', { recursive: true });
for (const lang of LANGS) {
  const hit = files.find(f => f.startsWith(`lang-${lang}.`));
  if (!hit) throw new Error('missing lang bundle for ' + lang);
  writeFileSync(`src/lang/${lang}.js`, readFileSync(join('mirror/bundle', hit), 'utf8'));
  console.log(`lang: src/lang/${lang}.js  <- bundle/${hit}`);
}

function countFiles(dir) {
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += countFiles(join(dir, e.name));
    else n++;
  }
  return n;
}
