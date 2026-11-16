// missing.mjs — play through first-run and report every HTTP 404 + localStorage keys.
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync } from 'node:fs';

const URL_ = (process.argv.find(a => a.startsWith('--url=')) || '').split('=')[1] || 'http://127.0.0.1:4318/';
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => existsSync(p));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--mute-audio'], defaultViewport: { width: 1400, height: 900 } });
const page = await browser.newPage();
const missing = new Map();
page.on('response', r => { if (r.status() === 404) missing.set(new URL(r.url()).pathname, r.status()); });
page.on('requestfailed', r => missing.set(new URL(r.url()).pathname + ' (failed)', 0));

await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await new Promise(r => setTimeout(r, 2000));
await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Nouvelle partie/i.test(b.textContent))?.click());
await new Promise(r => setTimeout(r, 1500));
for (let i = 0; i < 25; i++) {
  const st = await page.evaluate(() => ({
    av: document.querySelectorAll('.lab-av').length, ok: !!document.querySelector('.lab-ok'),
    inp: !!document.querySelector('.lab-name input'), save: Object.keys(localStorage).filter(k => k.startsWith('pokecatch')),
  }));
  if (st.inp) {
    await page.evaluate(() => {
      const inp = document.querySelector('.lab-name input');
      inp.value = 'Red'; inp.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('.lab-name').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    await new Promise(r => setTimeout(r, 1200));
  } else if (st.av && st.ok) {
    await page.evaluate(() => { document.querySelector('.lab-av')?.click(); });
    await new Promise(r => setTimeout(r, 250));
    await page.evaluate(() => { document.querySelector('.lab-ok')?.click(); });
    await new Promise(r => setTimeout(r, 700));
  } else { await page.mouse.click(700, 600); await new Promise(r => setTimeout(r, 600)); }
  if (st.save.length > 2) break;
}
await new Promise(r => setTimeout(r, 3000));

// open every screen so any lazy image is requested
for (const s of ['map', 'team', 'pokedex', 'pension', 'friends', 'trade', 'shop', 'achievements', 'adventure']) {
  await page.evaluate(scr => document.querySelector(`#side [data-screen="${scr}"]`)?.click(), s);
  await new Promise(r => setTimeout(r, 700));
}
await new Promise(r => setTimeout(r, 2000));

const state = await page.evaluate(() => ({
  ls: Object.fromEntries(Object.keys(localStorage).map(k => [k, String(localStorage.getItem(k)).slice(0, 120)])),
  saveKeys: Object.keys(localStorage).filter(k => /save/i.test(k)),
  money: document.querySelector('#money')?.textContent,
  battleLog: document.querySelector('#battle-log')?.textContent,
}));
console.log('localStorage:', JSON.stringify(state.ls, null, 1));
console.log('save-ish keys:', state.saveKeys);
console.log('money:', state.money, '| battleLog:', state.battleLog);
console.log('\n404 / failed requests:', missing.size);
for (const [p, s] of [...missing].sort()) console.log('  ', s, p);
writeFileSync('verify/missing.json', JSON.stringify([...missing].map(([path, status]) => ({ path, status })), null, 1));
await browser.close();
