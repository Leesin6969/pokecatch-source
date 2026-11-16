// probe-no-fx.mjs — verifies ALL custom skill effects are gone and the game runs on base BattleFX.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL_ = process.argv[2] || 'http://127.0.0.1:4481/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', protocolTimeout: 120000, args: ['--no-sandbox'], defaultViewport: { width: 1400, height: 950 } });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e).slice(0, 180)));
page.on('console', m => { if (m.type() === 'error') errors.push('console:' + m.text().slice(0, 160)); });
await page.evaluateOnNewDocument(() => {
  try { localStorage.setItem('pokecatch.lang', 'fr'); } catch {}
  try { localStorage.removeItem('pokecatch.fx'); } catch {}
  const P = window.Proxy; window.__c = [];
  window.Proxy = new P(P, { construct(t, a) { const p = Reflect.construct(t, a); try { if (a[0] && Object.getPrototypeOf(a[0]) === null) window.__c.push(p); } catch {} return p; } });
  window.__T = () => window.__c.find(c => c.App);
});
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await sleep(900);
await page.evaluate(() => {
  const t = window.__T(); const g = t.Game;
  const ids = [6, 9, 65];
  g.S.mons = ids.map((id, i) => ({ uid: 'u' + i, id, level: 50, xp: 0, caughtAt: Date.now(), shiny: false }));
  g.S.team = ['u0', 'u1', 'u2'];
  g.S.dex = Object.fromEntries(ids.map(id => [id, { caught: 1, seen: 1, shiny: 0, firstAt: Date.now() }]));
  g.S.seen = Object.fromEntries(ids.map(id => [id, 1]));
  g.S.trainer = { name: 'Test', sprite: 'red', id: '1', since: Date.now(), tag: '0001' };
  g.S.adv = { chapter: 5, unlocked: 999, badges: [], gifts: {}, nodes: [], node: 0, battle: null, pending: null, capture: { on: false, target: 'none', shiny: false }, speed: 1, paused: false, loops: [], runs: 0, kept: {}, layout: 4 };
  g.save();
});
await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await sleep(700);
await page.evaluate(() => { const b = [...document.querySelectorAll('.title-fx button')].find(x => /Continuer/i.test(x.textContent)); b?.click(); });
await sleep(2200);
for (let i = 0; i < 5; i++) { await page.evaluate(() => { const m = document.querySelector('#modal-root')?.firstElementChild; if (m) [...m.querySelectorAll('button')].at(-1)?.click(); }); await sleep(180); }
await page.evaluate(() => window.__T().App.show('adventure'));
await page.evaluate(() => { try { window.__T().Screens.adventure.goChapter(5); } catch {} });
await page.waitForFunction(() => !!document.querySelector('#ally-slots .ally') && !!document.querySelector('#enemy-slot .enemy'), { timeout: 30000 });
await sleep(1800);
const report = await page.evaluate(() => {
  const t = window.__T();
  return {
    pixelFX: typeof t.PixelFX,
    moveFX: typeof t.MOVE_FX,
    movePalettes: typeof t.MOVE_FX_PALETTES,
    pfxCanvas: !!document.querySelector('.pfx-canvas, #arena-fx canvas.pfx-canvas'),
    pfxStyle: !!document.getElementById('pfx-style'),
    pfxBanner: !!document.querySelector('.pfx-banner'),
    assetFixStyle: !!document.getElementById('pc-asset-visibility'),
    baseBattleFX: !!(t.BattleFX && typeof t.BattleFX.play === 'function'),
    fighters: document.querySelectorAll('#ally-slots .ally').length + '/' + document.querySelectorAll('#enemy-slot .enemy').length,
  };
});
await page.screenshot({ path: 'verify/assets-no-fx.png' });
writeFileSync('verify/no-fx.json', JSON.stringify({ ...report, errors }, null, 1));
console.log('no-fx:', JSON.stringify(report), 'errors:', errors.length);
const ok = report.pixelFX === 'undefined' && report.moveFX === 'undefined' && report.movePalettes === 'undefined' &&
  !report.pfxCanvas && !report.pfxStyle && !report.pfxBanner && report.assetFixStyle && report.baseBattleFX && report.fighters !== '0/0' && errors.length === 0;
console.log(ok ? 'NO-FX PROBE PASS' : 'NO-FX PROBE FAIL');
await browser.close();
process.exit(ok ? 0 : 1);
