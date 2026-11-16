// probe-vi-options.mjs — open the options modal and dump the language list.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL_ = process.argv[2] || 'http://127.0.0.1:4470/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', protocolTimeout: 120000, args: ['--no-sandbox'], defaultViewport: { width: 1400, height: 950 } });
const page = await browser.newPage();
console.log('stage: goto');
await page.evaluateOnNewDocument(() => {
  try { localStorage.setItem('pokecatch.lang', window.__LANG__ || 'vi'); } catch {}
  const P = window.Proxy; window.__c = [];
  window.Proxy = new P(P, { construct(t, a) { const p = Reflect.construct(t, a); try { if (a[0] && Object.getPrototypeOf(a[0]) === null) window.__c.push(p); } catch {} return p; } });
  window.__T = () => window.__c.find(c => c.App);
});
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 60000 });
await sleep(1200);
console.log('stage: options open');
await page.evaluate(() => { window.__T().Options.open(); });
await sleep(1800);
console.log('stage: language tab');
await page.evaluate(() => { const n = [...document.querySelectorAll('.modal *')].find(x => x.children.length === 0 && /Ngôn ngữ|Langue|Language/.test(x.textContent)); n?.click(); });
await sleep(1200);
console.log('stage: dump');
const options = await page.evaluate(() => {
  const rows = [...document.querySelectorAll('[data-lang]')].map(r => ({ lang: r.dataset.lang, label: r.innerText.replace(/\s+/g, ' ').trim() }));
  return { count: rows.length, hasVietnamese: rows.some(r => r.lang === 'vi'), rowsRaw: [...document.querySelectorAll('[data-lang]')].map(x=>x.tagName+'.'+x.className+':'+x.dataset.lang), modalText: document.body.innerText.replace(/\\s+/g,' ').slice(0,700), modal: !!document.querySelector('.modal') };
});
console.log('options:', JSON.stringify(options));
await page.screenshot({ path: 'verify/vi-options.png' });
writeFileSync('verify/vi-options-probe.json', JSON.stringify({ count: options.count, hasVietnamese: options.hasVietnamese, rows: options.rows }, null, 1));
console.log('done');
await browser.close();
