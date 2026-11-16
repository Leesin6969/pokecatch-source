// compare.mjs — run the ORIGINAL site and the LOCAL build through the same headless Chrome script,
// then diff the observable state. This is the strongest fidelity check available.
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync } from 'node:fs';

const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => existsSync(p));

async function run(label, url) {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--mute-audio'], defaultViewport: { width: 1400, height: 900 },
  });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text().slice(0, 240)}`));
  page.on('pageerror', e => logs.push('[pageerror] ' + String(e).slice(0, 300)));
  page.on('requestfailed', r => {
    const u = r.url();
    if (!/supabase|discord|netlify\.app\/sw\.js/.test(u)) logs.push('[reqfail] ' + u.slice(0, 160) + ' ' + (r.failure()?.errorText || ''));
  });
  await page.evaluateOnNewDocument(() => { try { localStorage.setItem('pokecatch.lang', 'fr'); } catch {} });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await new Promise(r => setTimeout(r, 9000));

  const snap = async () => page.evaluate(() => {
    const q = s => document.querySelector(s);
    const txt = s => q(s)?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 120) ?? null;
    return {
      hidden: document.hidden,
      hasApp: !!q('#app'),
      money: txt('#money'),
      chapterBtn: txt('#side-chapter'),
      chapterBtnHtmlLen: q('#side-chapter')?.innerHTML.length ?? -1,
      zonePanelLen: q('#zone-panel')?.innerHTML.length ?? -1,
      bagPanelLen: q('#bag-panel')?.innerHTML.length ?? -1,
      battleLog: txt('#battle-log'),
      advEmptyHidden: q('#adv-empty')?.hidden ?? null,
      newsbar: txt('#newsbar'),
      teamSlotsLen: q('#team-slots')?.innerHTML.length ?? -1,
      pcGridLen: q('#pc-grid')?.innerHTML.length ?? -1,
      activeScreen: [...document.querySelectorAll('.screen.active')].map(s => s.id),
      lsKeys: Object.keys(localStorage).sort(),
      saveBytes: localStorage.getItem('pokecatch.save')?.length ?? 0,
      imgs: document.images.length,
      brokenImgs: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length,
    };
  });

  const before = await snap();
  // real mouse click on the "Progression" tab
  const clicked = [];
  for (const [sel, name] of [
    ['#tabs button[data-screen="map"]', 'map'],
    ['#tabs button[data-screen="team"]', 'team'],
    ['#tabs button[data-screen="pokedex"]', 'pokedex'],
  ]) {
    try {
      await page.click(sel);
      await new Promise(r => setTimeout(r, 1200));
      const st = await page.evaluate(name => ({
        name,
        active: [...document.querySelectorAll('.screen.active')].map(s => s.id),
        nodes: document.querySelector(`#screen-${name}`)?.querySelectorAll('*').length ?? -1,
      }), name);
      clicked.push(st);
    } catch (e) { clicked.push({ name, error: String(e).slice(0, 160) }); }
  }
  await page.screenshot({ path: `verify/compare-${label}.png` });
  const after = await snap();
  await browser.close();
  return { label, url, before, clicked, after, logs: logs.slice(0, 40) };
}

const original = await run('original', 'https://pokecatch-online.netlify.app/');
console.log('=== ORIGINAL ===');
console.log(JSON.stringify({ before: original.before, clicked: original.clicked }, null, 1));

const local = await run('local', 'http://127.0.0.1:4318/');
console.log('=== LOCAL ===');
console.log(JSON.stringify({ before: local.before, clicked: local.clicked }, null, 1));

console.log('\n=== DIFF (before) ===');
const keys = new Set([...Object.keys(original.before), ...Object.keys(local.before)]);
for (const k of keys) {
  const a = JSON.stringify(original.before[k]), b = JSON.stringify(local.before[k]);
  if (a !== b) console.log(`  ${k}: original=${a} local=${b}`);
}
console.log('\n=== DIFF (clicked) ===');
console.log('  original:', JSON.stringify(original.clicked));
console.log('  local   :', JSON.stringify(local.clicked));
console.log('\n=== LOGS ===');
console.log('original:', original.logs.slice(0, 12));
console.log('local   :', local.logs.slice(0, 12));
writeFileSync('verify/compare.json', JSON.stringify({ original, local }, null, 1));
