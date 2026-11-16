// dump-save.mjs — produce a real save from a first-run playthrough (to learn the exact save shape).
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync } from 'node:fs';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL_ = (process.argv.find(a => a.startsWith('--url=')) || '').split('=')[1] || 'http://127.0.0.1:4400/';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--mute-audio'], defaultViewport: { width: 1400, height: 900 } });
const page = await browser.newPage();
const logs = [];
page.on('console', m => logs.push(`[${m.type()}] ${m.text().slice(0, 200)}`));
page.on('pageerror', e => logs.push('[pageerror] ' + String(e).slice(0, 200)));
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForSelector('.title-fx', { timeout: 90000 });
await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Nouvelle partie/i.test(b.textContent))?.click());
await new Promise(r => setTimeout(r, 1200));
for (let i = 0; i < 40; i++) {
  const st = await page.evaluate(() => ({
    skip: !!document.querySelector('.lab-skip'), av: document.querySelectorAll('.lab-av').length,
    ok: !!document.querySelector('.lab-ok'), name: !!document.querySelector('.lab-name input'),
    save: !!Object.keys(localStorage).find(k => /save/i.test(k)),
  }));
  if (st.save && !st.av && !st.name && !st.skip) break;
  if (st.name) {
    await page.evaluate(() => {
      const inp = document.querySelector('.lab-name input');
      inp.value = 'Red'; inp.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('.lab-name').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    await new Promise(r => setTimeout(r, 1200));
  } else if (st.av && st.ok) {
    await page.evaluate(() => { document.querySelector('.lab-av')?.click(); });
    await new Promise(r => setTimeout(r, 250));
    await page.evaluate(() => document.querySelector('.lab-ok')?.click());
    await new Promise(r => setTimeout(r, 800));
  } else if (st.skip) {
    await page.evaluate(() => document.querySelector('.lab-skip')?.click());
    await new Promise(r => setTimeout(r, 900));
  } else {
    await page.evaluate(() => document.querySelector('.lab-fx')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })));
    await new Promise(r => setTimeout(r, 600));
  }
}
await new Promise(r => setTimeout(r, 4000));
const save = await page.evaluate(() => {
  const e = Object.entries(localStorage).find(([k]) => /save/i.test(k));
  return e ? JSON.parse(e[1]) : null;
});
writeFileSync('verify/sample-save.json', JSON.stringify(save, null, 1));
console.log('save keys:', save ? Object.keys(save) : null);
console.log('sample:', JSON.stringify(save, null, 1).slice(0, 2600));
console.log('logs:', logs.slice(0, 10));
await browser.close();
