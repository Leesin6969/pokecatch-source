// extract-intros.mjs — reverse the standalone "Atelier des intros légendaires" page.
//
// The CDN serves it as ONE 1.35 MB HTML file with three inline blocks: a 4 KB stylesheet, a 140 B
// player-mode boot line, and a 1.27 MB application script. This tool splits it into maintainable
// sources and proves the split is exact (shell + parts re-assembled byte-for-byte equals the file
// that was downloaded), then beautifies the script/stylesheets.
//
//   src/intros/shell.html   page markup with {{APP_CSS}} / {{BOOT_JS}} / {{APP_JS}} tokens
//   src/intros/app.css      the stylesheet
//   src/intros/boot.js      the ?player boot line
//   src/intros/app.js       the application (beautified)
//
// tools/build.mjs renders the single file back into dist/intros/.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import * as prettier from 'prettier';

const RAW = 'mirror/intros/legend-intros.html';
const OUT = 'src/intros';
mkdirSync(OUT, { recursive: true });
const html = readFileSync(RAW, 'utf8');

const style = /<style(\s[^>]*)?>([\s\S]*?)<\/style>/.exec(html);
if (!style) throw new Error('no inline <style>');
const scriptRe = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/g;
const scripts = [];
let m;
while ((m = scriptRe.exec(html))) scripts.push(m);
if (scripts.length !== 2) throw new Error('expected 2 inline scripts, got ' + scripts.length);

const cssContent = style[2];
const bootContent = scripts[0][2];
const appContent = scripts[1][2];

// shell = page with the three inline payloads replaced by tokens, built back-to-front so the
// original byte offsets stay valid
const blocks = [
  { index: style.index, len: style[0].length, token: `<style${style[1] || ''}>{{APP_CSS}}</style>` },
  { index: scripts[0].index, len: scripts[0][0].length, token: `<script${scripts[0][1] || ''}>{{BOOT_JS}}</script>` },
  { index: scripts[1].index, len: scripts[1][0].length, token: `<script${scripts[1][1] || ''}>{{APP_JS}}</script>` },
].sort((a, b) => b.index - a.index);
let shell = html;
for (const b of blocks) shell = shell.slice(0, b.index) + b.token + shell.slice(b.index + b.len);
const s0 = scripts[0], s1 = scripts[1];

// ---- prove the split is exact ----------------------------------------------------------------
const rendered = shell
  .replace('{{APP_CSS}}', cssContent)
  .replace('{{BOOT_JS}}', bootContent)
  .replace('{{APP_JS}}', appContent);
if (rendered !== html) {
  console.error('SPLIT NOT EXACT — refusing to continue');
  process.exitCode = 1;
} else {
  console.log('split verified: re-assembling the parts reproduces the CDN file byte-for-byte');
}

// ---- write readable sources -------------------------------------------------------------------
const cssPretty = await prettier.format(cssContent, { parser: 'css', printWidth: 140 });
const bootPretty = await prettier.format(bootContent, { parser: 'babel', printWidth: 140 });
const appPretty = await prettier.format(appContent, { parser: 'babel', printWidth: 140 });

writeFileSync(`${OUT}/shell.html`, shell.replace(
  '<!doctype html>',
  '<!doctype html>\n<!-- Generator: tools/build.mjs assembles this shell + app.css + boot.js + app.js\n     into the single-file page the game loads as GAME_INTRO. Recovered by tools/extract-intros.mjs. -->\n'));
writeFileSync(`${OUT}/app.css`, cssPretty);
writeFileSync(`${OUT}/boot.js`, `// Recovered by tools/extract-intros.mjs — the tiny boot line of the intro workshop page.\n${bootPretty}`);
writeFileSync(`${OUT}/app.js`, appPretty.replace(/^/, `/**
 * Atelier des intros légendaires — application script (${appContent.length} original bytes, beautified).
 *
 * Recovered by tools/extract-intros.mjs from the single-file page the game opens as GAME_INTRO.
 * It is a standalone editor: it can decode animated sprite sheets (ImageDecoder), compose an intro
 * cinematic and hand the result back to the game. It talks to the game only through the URLs it is
 * opened with.
 */
`));

const stats = {
  css: cssContent.length, boot: bootContent.length, app: appContent.length,
  appMinBytes: appContent.length, appPrettyBytes: appPretty.length,
  shellBytes: shell.length,
};
writeFileSync(`${OUT}/_split.json`, JSON.stringify(stats, null, 1));
console.log('intros sources written:', stats);
