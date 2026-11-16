// debug.mjs — inspect the running game's internals in headless Chrome.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const URL_ = (process.argv.find(a => a.startsWith('--url=')) || '').split('=')[1] || 'http://127.0.0.1:4318';
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => existsSync(p));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--mute-audio'], defaultViewport: { width: 1400, height: 900 } });
const page = await browser.newPage();
const logs = [];
page.on('console', m => logs.push(`[${m.type()}] ${m.text().slice(0, 300)}`));
page.on('pageerror', e => logs.push('[pageerror] ' + String(e).slice(0, 400)));
page.on('requestfailed', r => logs.push('[reqfail] ' + r.url() + ' ' + r.failure()?.errorText));

await page.goto(URL_, { waitUntil: 'domcontentloaded' });
await new Promise(r => setTimeout(r, 6000));

const dump = await page.evaluate(() => {
  const out = {};
  out.globals = Object.keys(window).filter(k => /^(t|App|UI|Screens|Game|CatchUp|Clock|Cloud|Adventure|TabLock|CONFIG)$/.test(k) || k.startsWith('pc') || k.startsWith('poke'));
  out.ls = Object.keys(localStorage);
  out.chapterBtn = { html: document.querySelector('#side-chapter')?.innerHTML.slice(0, 200), text: document.querySelector('#side-chapter')?.textContent };
  out.chapterBtn2 = document.querySelector('#chapter-btn')?.innerHTML.slice(0, 120);
  out.advEmpty = { hidden: document.querySelector('#adv-empty')?.hidden, text: document.querySelector('#adv-empty')?.textContent };
  out.battleLog = document.querySelector('#battle-log')?.textContent;
  out.screens = [...document.querySelectorAll('.screen')].map(s => ({ id: s.id, active: s.classList.contains('active'), kids: s.children.length }));
  out.zonePanel = document.querySelector('#zone-panel')?.innerHTML.slice(0, 200);
  out.tabs = [...document.querySelectorAll('#tabs button')].map(b => b.dataset.screen || b.className.slice(0, 30));
  return out;
});
console.log('GLOBALS:', JSON.stringify(dump.globals));
console.log('LS:', JSON.stringify(dump.ls));
console.log('chapterBtn:', JSON.stringify(dump.chapterBtn));
console.log('chapterBtn2:', JSON.stringify(dump.chapterBtn2));
console.log('advEmpty:', JSON.stringify(dump.advEmpty));
console.log('battleLog:', JSON.stringify(dump.battleLog));
console.log('zonePanel:', JSON.stringify(dump.zonePanel));
console.log('tabs:', JSON.stringify(dump.tabs));
console.log('screens:', JSON.stringify(dump.screens, null, 1));

// click Progression (map) and watch
const clickResult = await page.evaluate(async () => {
  const btn = document.querySelector('#tabs button[data-screen="map"]');
  const out = { found: !!btn };
  if (btn) {
    btn.click();
    await new Promise(r => setTimeout(r, 1200));
    out.active = document.querySelector('#screen-map')?.classList.contains('active');
    out.whichActive = [...document.querySelectorAll('.screen.active')].map(s => s.id);
    out.mapKids = document.querySelector('#map-root')?.children.length;
  }
  return out;
});
console.log('click map:', JSON.stringify(clickResult));

// try direct App.show if global exists
const direct = await page.evaluate(() => {
  const r = {};
  for (const name of ['App', 'Game', 'UI']) {
    r[name] = typeof window[name];
  }
  try { window.App?.show?.('map'); r.appShowCalled = true; } catch (e) { r.appShowError = String(e); }
  return r;
});
console.log('direct:', JSON.stringify(direct));
await page.screenshot({ path: 'verify/debug.png' });
console.log('\n--- console/page logs ---');
for (const l of logs.slice(0, 60)) console.log(l);
await browser.close();
