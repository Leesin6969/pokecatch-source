// probe-visibility.mjs — verifies no Pokémon sprite is painted as a solid-black silhouette (CSS bug)
// and that the real artwork is visible in the Pokédex.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL_ = process.argv[2] || 'http://127.0.0.1:4481/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', protocolTimeout: 120000, args: ['--no-sandbox'], defaultViewport: { width: 1400, height: 950 } });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
await page.evaluateOnNewDocument(() => {
  try { localStorage.setItem('pokecatch.lang', 'fr'); } catch {}
  const P = window.Proxy; window.__c = [];
  window.Proxy = new P(P, { construct(t, a) { const p = Reflect.construct(t, a); try { if (a[0] && Object.getPrototypeOf(a[0]) === null) window.__c.push(p); } catch {} return p; } });
  window.__T = () => window.__c.find(c => c.App);
});
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await sleep(900);
await page.evaluate(() => {
  const t = window.__T(); const g = t.Game;
  const ids = Array.from({ length: 40 }, (_, i) => i + 1);
  g.S.mons = ids.map((id, i) => ({ uid: 'u' + i, id, level: 20, xp: 0, caughtAt: Date.now(), shiny: false }));
  g.S.team = ['u0', 'u1', 'u2'];
  g.S.dex = Object.fromEntries(ids.map((id, i) => [id, { caught: i < 8 ? 1 : 0, seen: 1, shiny: 0, firstAt: Date.now() }]));
  g.S.seen = Object.fromEntries(ids.map(id => [id, 1]));
  g.S.trainer = { name: 'Test', sprite: 'red', id: '1', since: Date.now(), tag: '0001' };
  g.S.adv = { chapter: 1, unlocked: 999, badges: [], gifts: {}, nodes: [], node: 0, battle: null, pending: null, capture: { on: false, target: 'none', shiny: false }, speed: 1, paused: true, loops: [], runs: 0, kept: {}, layout: 4 };
  g.save();
});
await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await sleep(700);
await page.evaluate(() => { const b = [...document.querySelectorAll('.title-fx button')].find(x => /Continuer/i.test(x.textContent)); b?.click(); });
await sleep(2200);
for (let i = 0; i < 5; i++) { await page.evaluate(() => { const m = document.querySelector('#modal-root')?.firstElementChild; if (m) [...m.querySelectorAll('button')].at(-1)?.click(); }); await sleep(180); }
await page.evaluate(() => window.__T().App.show('pokedex'));
await sleep(1200);
const before = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].filter(i => /assets\/(pokemon|shiny|art)\//.test(i.getAttribute('src') || ''));
  const black = imgs.filter(i => {
    const f = getComputedStyle(i).filter || '';
    return /brightness\(0\)/.test(f) && !/invert/.test(f);
  });
  return { total: imgs.length, black: black.length, broken: imgs.filter(i => i.complete && i.naturalWidth === 0).length, style: !!document.getElementById('pc-asset-visibility') };
});
await page.screenshot({ path: 'verify/assets-dex-visible.png' });
// scroll dex grid and re-check
await page.evaluate(() => { const g = document.querySelector('.dex-grid'); if (g) g.scrollTop = 600; });
await sleep(400);
const after = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].filter(i => /assets\/(pokemon|shiny|art)\//.test(i.getAttribute('src') || ''));
  const black = imgs.filter(i => {
    const f = getComputedStyle(i).filter || '';
    return /brightness\(0\)/.test(f) && !/invert/.test(f);
  });
  return { total: imgs.length, black: black.length, broken: imgs.filter(i => i.complete && i.naturalWidth === 0).length };
});
await page.screenshot({ path: 'verify/assets-dex-visible-2.png' });
const report = { before, after, errors };
writeFileSync('verify/asset-visibility.json', JSON.stringify(report, null, 1));
console.log('visibility:', JSON.stringify(report));
const ok = before.total > 20 && after.total > 20 && before.black === 0 && after.black === 0 && before.broken === 0 && after.broken === 0 && before.style && errors.length === 0;
console.log(ok ? 'VISIBILITY PROBE PASS' : 'VISIBILITY PROBE FAIL');
await browser.close();
process.exit(ok ? 0 : 1);
