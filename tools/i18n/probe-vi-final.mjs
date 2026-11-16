// probe-vi-final.mjs — end-to-end Vietnamese language switch + screenshots.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL_ = process.argv[2] || 'http://127.0.0.1:4470/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', protocolTimeout: 120000, args: ['--no-sandbox'], defaultViewport: { width: 1400, height: 950 } });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 150)));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 150)); });
page.on('response', r => { if (r.status() >= 400) errors.push('http ' + r.status() + ' ' + r.url().slice(-60)); });
await page.evaluateOnNewDocument(() => {
  try { if (!localStorage.getItem('pokecatch.lang')) localStorage.setItem('pokecatch.lang', 'en'); } catch {}
  const P = window.Proxy; window.__c = [];
  window.Proxy = new P(P, { construct(t, a) { const p = Reflect.construct(t, a); try { if (a[0] && Object.getPrototypeOf(a[0]) === null) window.__c.push(p); } catch {} return p; } });
  window.__T = () => window.__c.find(c => c.App);
});
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await sleep(1200);
const before = await page.evaluate(() => ({ lang: window.__T().I18n.lang, title: document.querySelector('.title-fx')?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 90), nav: [...document.querySelectorAll('#tabs .l')].map(e => e.textContent.trim()).slice(0, 4) }));
console.log('before:', JSON.stringify(before));

// switch to Vietnamese exactly like the options row does (I18n.set -> save + reload)
await page.evaluate(() => { setTimeout(() => window.__T().I18n.set('vi'), 0); });
await sleep(800);
await page.waitForSelector('.title-fx', { timeout: 40000 }).catch(() => {});
await sleep(2500);
const after = await page.evaluate(() => ({
  lang: window.__T().I18n.lang,
  title: document.querySelector('.title-fx')?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 120),
  nav: [...document.querySelectorAll('#tabs .l')].map(e => e.textContent.trim()).slice(0, 8),
  buttons: [...document.querySelectorAll('.title-fx button')].map(b => b.textContent.trim()).filter(Boolean).slice(0, 6),
}));
console.log('after:', JSON.stringify(after));

// playable: start a new game and dismiss dialogs, then screenshot the adventure screen
await page.evaluate(() => { const b = [...document.querySelectorAll('.title-fx button')].find(x => /Chơi mới/.test(x.textContent)); b?.click(); });
await sleep(1500);
for (let i = 0; i < 8; i++) { await page.evaluate(() => { const m = document.querySelector('#modal-root')?.firstElementChild; if (m) [...m.querySelectorAll('button')].at(-1)?.click(); }); await sleep(350); }
await sleep(1200);
await page.screenshot({ path: 'verify/vi-adventure.png' });
const adventure = await page.evaluate(() => ({ text: document.body.innerText.replace(/\s+/g, ' ').slice(0, 300) }));
console.log('adventure:', JSON.stringify(adventure));

writeFileSync('verify/vi-final-probe.json', JSON.stringify({ before, after, adventure, errors }, null, 1));
const ok = after.lang === 'vi' && after.nav.includes('Phiêu lưu') && errors.length === 0;
console.log('switch-to-vi:', ok ? 'PASS' : 'FAIL', '| errors:', JSON.stringify(errors.slice(0, 4)));
await browser.close();
process.exit(ok ? 0 : 1);
