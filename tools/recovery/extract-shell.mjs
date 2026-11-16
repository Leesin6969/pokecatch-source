// extract-shell.mjs — pull the boot loader apart: theme, config, loader, shell markup, page shell.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import * as acorn from 'acorn';

const boot = readFileSync('mirror/boot.js', 'utf8');
const page = readFileSync('mirror/index.html', 'utf8');
const sw = readFileSync('mirror/sw.js', 'utf8');
for (const d of ['src/boot', 'src/shell', 'src/css', 'src/lang', 'src/vendor', 'src/assets']) {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

const ast = acorn.parse(boot, { ecmaVersion: 2024, sourceType: 'script' });
const seq = ast.body[0].expression;
if (seq.type !== 'SequenceExpression' || seq.expressions.length !== 3) throw new Error('boot.js layout changed');
const [attrs, theme, loader] = seq.expressions.map(e => boot.slice(e.start, e.end));

writeFileSync('src/boot/00-html-attrs.js',
`/**
 * boot/00-html-attrs.js — sets <html lang="fr" class="px"> before the stylesheet paints.
 * Concatenated first by tools/build.mjs. Original chunk 0 of boot.js.
 */
${attrs}
`);
writeFileSync('src/boot/01-theme.js',
`/**
 * boot/01-theme.js — window.Theme: dark / light / auto preference, stored in localStorage 'pokecatch.theme'.
 * Original chunk 1 of boot.js.
 */
${theme}
`);

// ---- loader chunk: carve out the build values and the shell markup ---------------------------
let L = loader;

function cut(src, startMarker, endMarker, replacement) {
  const i = src.indexOf(startMarker);
  if (i < 0) throw new Error('marker not found: ' + startMarker);
  const j = src.indexOf(endMarker, i + startMarker.length);
  if (j < 0) throw new Error('end marker not found after: ' + startMarker);
  return src.slice(0, i) + replacement + src.slice(j + endMarker.length);
}

// window.LANG_FILES = { ... }
{
  const i = L.indexOf('window.LANG_FILES=');
  const brace = L.indexOf('{', i);
  let depth = 0, j = brace;
  for (; j < L.length; j++) { if (L[j] === '{') depth++; else if (L[j] === '}') { depth--; if (!depth) { j++; break; } } }
  const literal = L.slice(brace, j);
  L = L.slice(0, brace) + '__LANG_FILES__' + L.slice(j);
  writeFileSync('raw/boot-lang-files.json', literal);
}
L = cut(L, 'window.ADMIN_FILES=', ',', 'window.ADMIN_FILES=__ADMIN_FILES__,');
L = cut(L, 'window.GAME_INTRO=', ',', 'window.GAME_INTRO=__GAME_INTRO__,');
L = cut(L, 'window.CDN=', ',', 'window.CDN=__CDN__,');

// window.BUILD / window.ONLINE (may be adjacent)
{
  const m = /window\.BUILD="([0-9a-f]+)",window\.ONLINE=(\d+)/.exec(L);
  if (!m) throw new Error('BUILD/ONLINE literal not found');
  L = L.replace(m[0], 'window.BUILD=__BUILD__,window.ONLINE=__ONLINE__');
  writeFileSync('raw/boot-build-values.json', JSON.stringify({ build: m[1], online: +m[2] }));
}

// var o={css:"...",vendor:[...],js:"..."},d=`...markup...`;
{
  const iO = L.indexOf('var o={css:');
  if (iO < 0) throw new Error('assets object not found');
  const brace = L.indexOf('{', iO);
  let depth = 0, j = brace;
  for (; j < L.length; j++) { if (L[j] === '{') depth++; else if (L[j] === '}') { depth--; if (!depth) { j++; break; } } }
  const assetsObj = L.slice(brace, j);
  writeFileSync('raw/boot-assets-object.json', assetsObj);

  // markup template literal starts at `d=\``
  const iD = L.indexOf('d=`', j);
  if (iD < 0) throw new Error('markup template not found');
  const bt = iD + 2; // index of the backtick
  let k = bt + 1;
  while (k < L.length) { if (L[k] === '\\') { k += 2; continue; } if (L[k] === '`') break; k++; }
  const markup = L.slice(bt + 1, k);
  writeFileSync('src/shell/app.html', `<!--\n  The game's DOM shell (#app, header, nav, screens, modal roots), inserted into <body> by boot.js\n  before the bundle runs. Edit freely: tools/build.mjs inlines it back into dist/boot.js.\n  Original size: ${markup.length} bytes.\n-->\n${markup}\n`);

  L = L.slice(0, iO) + 'var o=__ASSETS__,d=__APP_HTML__' + L.slice(k + 1);
}

writeFileSync('src/boot/boot.template.js',
`/**
 * boot/boot.template.js — the CDN boot loader, with every deployment-specific value left as a
 * __TOKEN__ that tools/build.mjs fills in:
 *
 *   __LANG_FILES__  per-language bundle URLs            __APP_HTML__   contents of src/shell/app.html
 *   __ADMIN_FILES__ extra admin module URLs (empty)     __ASSETS__     { css, vendor[], js } URLs
 *   __GAME_INTRO__  URL of the legendary-intro workshop __CDN__        base URL for assets
 *   __BUILD__       build hash (self-update checks)      __ONLINE__     players-online seed value
 *
 * boot.js does not contain any game logic: it sets the <html> attributes and the theme, loads the
 * language bundle, injects the shell markup, then loads the vendor + app bundles.
 */
${L.slice(0, 9) !== 'function(' ? L : `(${L});`}
`);

// ---- page shell ------------------------------------------------------------------------------
let P = page;
P = P.replace('https://pokecatch-online.pages.dev/boot.js', '{{BOOT_URL}}');
P = P.replace(/window\.SW_REG = 'serviceWorker' in navigator \?[^;]*;/, 'window.SW_REG = {{SW_REG}};');
if (!P.includes('{{BOOT_URL}}') || !P.includes('{{SW_REG}}')) throw new Error('page shell templating failed');
P = P.replace('<title>Poke\'Catch</title>', `<title>Poke'Catch</title>\n  <!--Generated by tools/build.mjs from src/shell/index.html. {{BOOT_URL}} and {{SW_REG}} are filled in per build. -->`);
writeFileSync('src/shell/index.html', P);

// ---- service worker ---------------------------------------------------------------------------
const SW = sw
  .replace(/const CDN = 'https:\/\/pokecatch-online\.pages\.dev\/',/, "const CDN = __CDN_SW__,")
  .replace("const SHELL = 'c316581f00'", 'const SHELL = __SHELL_ID__');
writeFileSync('src/shell/sw.js',
`/**
 * src/shell/sw.js — service worker: serves assets/ from the CDN and keeps the page shell offline.
 * __CDN_SW__ and __SHELL_ID__ are filled in by tools/build.mjs. Only registered when the build
 * sets site.sw = true (off by default locally so a rebuild is never masked by a cache).
 */
${SW}`);
console.log('boot/theme/loader/shell/sw extracted');
console.log('loader chunks written:');
for (const f of ['src/boot/00-html-attrs.js', 'src/boot/01-theme.js', 'src/boot/boot.template.js', 'src/shell/index.html', 'src/shell/app.html', 'src/shell/sw.js']) {
  console.log('  ' + f, readFileSync(f, 'utf8').length, 'bytes');
}
