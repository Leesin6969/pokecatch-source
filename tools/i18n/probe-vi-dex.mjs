// probe-vi-dex.mjs — open the Pokédex species sheet and check the Vietnamese translation.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL_ = process.argv[2] || 'http://127.0.0.1:4470/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', protocolTimeout: 120000, args: ['--no-sandbox'], defaultViewport: { width: 1400, height: 950 } });
const page = await browser.newPage();
console.log('stage: goto');
await page.evaluateOnNewDocument(() => {
  try { localStorage.setItem('pokecatch.lang', 'vi'); } catch {}
  const P = window.Proxy; window.__c = [];
  window.Proxy = new P(P, { construct(t, a) { const p = Reflect.construct(t, a); try { if (a[0] && Object.getPrototypeOf(a[0]) === null) window.__c.push(p); } catch {} return p; } });
  window.__T = () => window.__c.find(c => c.App);
});
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await sleep(1000);
console.log('stage: seed');
await page.evaluate(() => {
  const t = window.__T(); const g = t.Game;
  const mon = { uid: 'u1', id: 1, level: 30, xp: 0, caughtAt: Date.now(), shiny: false };
  g.S.mons = [mon]; g.S.team = ['u1'];
  g.S.dex = { 1: { caught: 1, seen: 1, shiny: 0, firstAt: Date.now() } };
  g.S.seen = { 1: 1 }; g.S.money = 123456;
  g.S.trainer = { name: 'Test', sprite: 'red', id: '1', since: Date.now(), tag: '0001' };
  g.S.adv = { chapter: 0, unlocked: 999, badges: [], gifts: {}, nodes: [], node: 0, battle: null, pending: null, capture: { on: false, target: 'new', shiny: false }, speed: 1, paused: true, loops: [], runs: 0, kept: {}, layout: 3 };
  g.save();
});
await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await sleep(900);
await page.evaluate(() => { const b = [...document.querySelectorAll('.title-fx button')].find(x => /Tiếp tục/i.test(x.textContent)); b?.click(); });
await sleep(4500);
for (let i = 0; i < 5; i++) { await page.evaluate(() => { const m = document.querySelector('#modal-root')?.firstElementChild; if (m) [...m.querySelectorAll('button')].at(-1)?.click(); }); await sleep(350); }
console.log('stage: pokedex');
await page.evaluate(() => window.__T().App.show('pokedex'));
await sleep(2200);
const before = await page.evaluate(() => ({ cards: document.querySelectorAll('#screen-pokedex .dex-cell').length, text: document.querySelector('#screen-pokedex')?.innerText.replace(/\s+/g, ' ').slice(0, 200) }));
console.log('before:', JSON.stringify(before));
console.log('stage: click card');
await page.evaluate(() => { const c = document.querySelector('#screen-pokedex [data-dex], #screen-pokedex .dex-card, #screen-pokedex .dx-card'); c?.click(); });
await page.evaluate(() => { document.querySelector('#screen-pokedex .dex-cell.caught')?.click(); });
const detail = await page.evaluate(() => {
  const txt = document.body.innerText.replace(/\s+/g, ' ');
  return { hasVnFlavor: /dưỡng chất|hạt giống|Khi còn nhỏ|trong khi còn nhỏ/i.test(txt), text: txt.slice(0, 500) };
});
console.log('detail:', JSON.stringify(detail));
await page.screenshot({ path: 'verify/vi-dex.png' });
writeFileSync('verify/vi-dex-probe.json', JSON.stringify({ hasVnFlavor: detail.hasVnFlavor, detail: detail.text.slice(0, 300) }, null, 1));
console.log('done');
await browser.close();
