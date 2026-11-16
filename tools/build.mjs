// build.mjs — reassemble the game from src/ into a runnable, deployable dist/.
//
//   node tools/build.mjs                 # local build (unminified, fast, readable)
//   node tools/build.mjs --minify        # production-style build (terser)
//   node tools/build.mjs --dev           # build for tools/dev.mjs (adds live reload)
//   node tools/build.mjs --out=.cache/dist
//
// Everything under dist/ is generated: src/ is the single source of truth.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, rmSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import * as terser from 'terser';

const args = new Set(process.argv.slice(2));
const flag = (name, fallback = null) => {
  const hit = process.argv.slice(2).find(a => a.startsWith(`--${name}=`));
  return hit ? hit.split('=')[1] : fallback;
};
const MINIFY = args.has('--minify');
const DEV = args.has('--dev');
const OUT = flag('out', 'dist');
const CDN = flag('cdn', '');              // '' = same origin (assets resolve relative to the page); set to
                                          // 'https://cdn.example/' to build a split CDN + page deployment
const ORIGIN = flag('origin', '');
const SW = args.has('--sw');
const t0 = Date.now();

const hash = buf => createHash('sha256').update(buf).digest('hex').slice(0, 10);
const strip = t => t.replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
const log = (...a) => console.log('  ' + a.join(' '));

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(join(OUT, 'bundle'), { recursive: true });

// ---------------------------------------------------------------- 1. app bundle
const jsDir = flag('src', 'src/js');   // --src=src/readable/js builds the de-mangled tree
// Authored extension layer (gen 5-9 content pack): files are numbered `003b`, `004b`, `014b`, `094b`
// so a single filename sort interleaves them with the recovered modules at the right point.
const extDir = 'src/ext/js';
const recovered = readdirSync(jsDir).filter(f => f.endsWith('.js'));
const extended = existsSync(extDir) ? readdirSync(extDir).filter(f => f.endsWith('.js')) : [];
const files = [...recovered, ...extended].sort();
const preludeFile = files.find(f => f.startsWith('000-'));
if (!preludeFile) throw new Error('src/js/000-prelude.js is missing');
const moduleFiles = files.filter(f => f !== preludeFile);
const srcPathOf = f => (existsSync(join(jsDir, f)) ? join(jsDir, f) : join(extDir, f));
const prelude = strip(readFileSync(join(jsDir, preludeFile), 'utf8')).trim();
const modules = moduleFiles.map(f => ({ file: f, code: strip(readFileSync(srcPathOf(f), 'utf8')).trim() }));

let appCode = `(function(){\n${prelude}\n${modules.map(m => m.code).join('\n')}\n})();\n`;
log(`app source: ${preludeFile} + ${modules.length} modules (${extended.length} extension files) = ${(appCode.length / 1024 / 1024).toFixed(2)} MB`);

if (MINIFY) {
  const res = await terser.minify(appCode, {
    compress: { passes: 2, drop_debugger: false },
    mangle: true,
    format: { comments: false, ascii_only: false },
  });
  if (res.error) throw res.error;
  appCode = res.code + '\n';
  log(`app minified: ${(appCode.length / 1024 / 1024).toFixed(2)} MB`);
}
const appHash = hash(appCode);
const appName = `app.${appHash}.js`;
writeFileSync(join(OUT, 'bundle', appName), appCode);

// module map: lets a reader jump from a browser stack trace line number back to src/js/<file>
writeFileSync(join(OUT, 'bundle', 'app.map.json'), JSON.stringify({
  bundle: appName, minified: MINIFY, files: modules.map(m => m.file),
}, null, 1));

// ---------------------------------------------------------------- 2. css
const cssSrc = readFileSync('src/css/app.css', 'utf8');
const cssCode = cssSrc;
const cssHash = hash(cssCode);
const cssName = `app.${cssHash}.css`;
writeFileSync(join(OUT, 'bundle', cssName), cssCode);
log(`css: ${cssName} ${(cssCode.length / 1024).toFixed(0)} KB`);

// ---------------------------------------------------------------- 3. vendor (third-party, shipped verbatim)
const vendorBuf = readFileSync('src/vendor/supabase.js');
const vendorName = `vendor-supabase.${hash(vendorBuf)}.js`;
writeFileSync(join(OUT, 'bundle', vendorName), vendorBuf);
log(`vendor: ${vendorName}`);

// ---------------------------------------------------------------- 4. language bundles (fr is built into app.js)
const LANGS = ['en', 'es', 'de', 'zh-Hans', 'zh-Hant', 'ko', 'ja', 'vi'];
const LANG_FILES = { fr: [] };
for (const lang of LANGS) {
  let code = readFileSync(`src/lang/${lang}.js`, 'utf8');
  if (MINIFY) {
    const res = await terser.minify(code, { compress: false, mangle: false, format: { comments: false } });
    code = res.code + '\n';
  }
  const name = `lang-${lang}.${hash(code)}.js`;
  writeFileSync(join(OUT, 'bundle', name), code);
  LANG_FILES[lang] = [`bundle/${name}`];
}
log(`lang: ${LANGS.length} bundles -> ${Object.values(LANG_FILES).flat().length} files`);

// ---------------------------------------------------------------- 5. boot.js
const shellHtml = readFileSync('src/shell/app.html', 'utf8').replace(/^<!--[\s\S]*?-->\n/, '');
const bootTpl = readFileSync('src/boot/boot.template.js', 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
const tokens = {
  __LANG_FILES__: JSON.stringify(LANG_FILES),
  __ADMIN_FILES__: '[]',
  __GAME_INTRO__: JSON.stringify('intros/legend-intros.html'),
  __CDN__: JSON.stringify(CDN),
  __BUILD__: JSON.stringify(appHash),
  __ONLINE__: '100',
  __ASSETS__: JSON.stringify({ css: `bundle/${cssName}`, vendor: [`bundle/${vendorName}`], js: `bundle/${appName}` }),
  __APP_HTML__: JSON.stringify(shellHtml),
};
let boot = bootTpl;
for (const [k, v] of Object.entries(tokens)) {
  if (!boot.includes(k)) throw new Error(`boot template is missing ${k}`);
  boot = boot.split(k).join(v);
}
if (MINIFY) {
  const res = await terser.minify(boot, { compress: { passes: 2 }, mangle: true, format: { comments: false } });
  boot = res.code + '\n';
}
writeFileSync(join(OUT, 'boot.js'), boot);
log(`boot.js: ${(boot.length / 1024).toFixed(0)} KB (build ${appHash})`);

// ---------------------------------------------------------------- 6. page shell
let page = readFileSync('src/shell/index.html', 'utf8');
page = page.split('{{BOOT_URL}}').join('boot.js');
page = page.split('{{SW_REG}}').join(SW ? "'serviceWorker' in navigator ? navigator.serviceWorker.register('sw.js').catch(() => {}) : Promise.resolve()" : 'Promise.resolve()');
if (DEV) {
  page = page.replace('</head>', '  <script>/*dev*/new EventSource("/__livereload").onmessage=()=>location.reload();</script>\n</head>');
}
writeFileSync(join(OUT, 'index.html'), page);
log(`index.html: ${(page.length / 1024).toFixed(0)} KB`);

// ---------------------------------------------------------------- 7. service worker
const swSrc = readFileSync('src/shell/sw.js', 'utf8')
  .replace('__CDN_SW__', JSON.stringify(ORIGIN || CDN))
  .replace('__SHELL_ID__', JSON.stringify(appHash));
writeFileSync(join(OUT, 'sw.js'), swSrc);

// ---------------------------------------------------------------- 8. static trees
cpSync('src/assets', join(OUT, 'assets'), { recursive: true });
mkdirSync(join(OUT, 'intros'), { recursive: true });
// The intro workshop is served as one self-contained HTML page: render it from its split sources
// (tools/extract-intros.mjs proved the split is exact).
const introShell = readFileSync('src/intros/shell.html', 'utf8');
const introHtml = introShell
  .replace('{{APP_CSS}}', readFileSync('src/intros/app.css', 'utf8'))
  .replace('{{BOOT_JS}}', readFileSync('src/intros/boot.js', 'utf8'))
  .replace('{{APP_JS}}', readFileSync('src/intros/app.js', 'utf8'));
writeFileSync(join(OUT, 'intros/legend-intros.html'), introHtml);
writeFileSync(join(OUT, 'intros/legend-intros'), introHtml); // extensionless, like the CDN serves it
log(`intros: legend-intros.html (${(introHtml.length / 1024).toFixed(0)} KB) + extensionless copy`);
cpSync('src/shell/apple-touch-icon.png', join(OUT, 'apple-touch-icon.png'));
if (existsSync('src/shell/favicon.ico')) cpSync('src/shell/favicon.ico', join(OUT, 'favicon.ico'));
log(`assets: ${readdirSync(join(OUT, 'assets')).length} folders, ${countFiles(join(OUT, 'assets'))} files`);

// ---------------------------------------------------------------- 8. packs (small files joined into .bin)
// The shipped deployment packs its small sprites into six content-addressed .bin files and serves
// them through packs.json + the service worker (offset/length slicing). We reproduce the exact same
// six groups, in the same order, so a split page/CDN deployment behaves like the original one.
const PACKS = !args.has('--no-packs');
if (PACKS) {
  const PACK_GROUPS = {
    pokemon: p => /^assets\/pokemon\/[^/]+\.png$/.test(p),
    shiny: p => /^assets\/pokemon\/shiny\/[^/]+\.png$/.test(p),
    items: p => /^assets\/items\/[^/]+\.png$/.test(p),
    badges: p => /^assets\/badges\/[^/]+\.png$/.test(p),
    ui: p => /^assets\/ui\/[^/]+\.(png|svg)$/.test(p),
    faces: p => /^assets\/trainers\/still\/[^/]+\.png$/.test(p),
  };
  // Fidelity: when the original deployment's packs.json is available, reproduce exactly those
  // entries in the original order (so the .bin files stay byte-identical). Assets added by the
  // gen 5-9 content pack are served as normal loose files instead of being injected into the packs.
  const originalPacks = existsSync('mirror/packs.json') ? JSON.parse(readFileSync('mirror/packs.json', 'utf8')) : null;
  const packs = {};
  let packFiles = 0;
  if (originalPacks) {
    for (const [group, def] of Object.entries(originalPacks)) {
      const slices = [];
      const files = {};
      let offset = 0;
      for (const [rel, meta] of Object.entries(def.files)) {
        const local = join(OUT, rel);
        if (!existsSync(local)) { log(`packs: missing ${rel} (skipped)`); continue; }
        const buf = readFileSync(local);
        slices.push(buf);
        files[rel] = [offset, buf.length, meta[2]];
        offset += buf.length;
        packFiles++;
      }
      const bin = Buffer.concat(slices);
      const name = `pack-${group}.${hash(bin)}.bin`;
      writeFileSync(join(OUT, 'bundle', name), bin);
      packs[group] = { url: `/bundle/${name}`, files };
    }
  } else {
    const assetRoot = join(OUT, 'assets');
    const allAssets = [];
    (function walk(dir, base = '') {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const rel = base ? base + '/' + e.name : e.name;
        if (e.isDirectory()) walk(join(dir, e.name), rel);
        else allAssets.push('assets/' + rel);
      }
    })(assetRoot);
    for (const [group, match] of Object.entries(PACK_GROUPS)) {
      const members = allAssets.filter(match).sort();
      if (!members.length) continue;
      const slices = [];
      let offset = 0;
      const files = {};
      for (const rel of members) {
        const buf = readFileSync(join(OUT, rel));
        slices.push(buf);
        files['/' + rel] = [offset, buf.length, rel.endsWith('.svg') ? 'image/svg+xml' : 'image/png'];
        offset += buf.length;
        packFiles++;
      }
      const bin = Buffer.concat(slices);
      const name = `pack-${group}.${hash(bin)}.bin`;
      writeFileSync(join(OUT, 'bundle', name), bin);
      packs[group] = { url: `/bundle/${name}`, files };
    }
  }
  writeFileSync(join(OUT, 'packs.json'), JSON.stringify(packs));
  log(`packs: ${Object.keys(packs).length} groups, ${packFiles} files -> bundle/pack-*.bin + packs.json`);
}

// ---------------------------------------------------------------- 9. build metadata
const meta = {
  builtAt: new Date().toISOString(),
  build: appHash,
  minified: MINIFY,
  cdn: CDN,
  files: {
    app: `bundle/${appName}`, css: `bundle/${cssName}`, vendor: `bundle/${vendorName}`,
    lang: LANG_FILES, boot: 'boot.js',
  },
  modules: modules.length + 1,
  sourceBytes: appCode.length,
  assets: countFiles(join(OUT, 'assets')),
};
writeFileSync(join(OUT, 'build.json'), JSON.stringify(meta, null, 2));
log(`build.json written`);
console.log(`build ${appHash} done in ${Date.now() - t0} ms -> ${OUT}/`);

function countFiles(dir) {
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += countFiles(join(dir, e.name));
    else n++;
  }
  return n;
}
