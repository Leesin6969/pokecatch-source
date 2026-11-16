// title.mjs — find and walk through the first-run title/trainer-lab flow.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const URL_ = (process.argv.find(a => a.startsWith('--url=')) || '').split('=')[1] || 'http://127.0.0.1:4318/';
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => existsSync(p));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--mute-audio'], defaultViewport: { width: 1400, height: 900 } });
const page = await browser.newPage();
const logs = [];
page.on('console', m => logs.push(`[${m.type()}] ${m.text().slice(0, 200)}`));
page.on('pageerror', e => logs.push('[pageerror] ' + String(e).slice(0, 300)));
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 90000 });
await new Promise(r => setTimeout(r, 8000));

const dom = await page.evaluate(() => ({
  bodyChildren: [...document.body.children].map(c => ({ tag: c.tagName, id: c.id, cls: c.className?.toString().slice(0, 80), kids: c.children.length })),
  overlays: [...document.querySelectorAll('body > *')].filter(e => getComputedStyle(e).position === 'fixed').map(e => ({ cls: e.className?.toString().slice(0, 60), z: getComputedStyle(e).zIndex, vis: getComputedStyle(e).visibility, op: getComputedStyle(e).opacity, html: e.innerHTML.slice(0, 200) })),
  fixedAny: [...document.querySelectorAll('*')].filter(e => { const s = getComputedStyle(e); return s.position === 'fixed' && +s.zIndex > 50; }).slice(0, 8).map(e => ({ tag: e.tagName, cls: e.className?.toString().slice(0, 60), z: getComputedStyle(e).zIndex, rect: e.getBoundingClientRect().toJSON(), txt: e.textContent.replace(/\s+/g, ' ').trim().slice(0, 100) })),
  ls: Object.keys(localStorage),
  save: localStorage.getItem('pokecatch.save')?.slice(0, 300) ?? null,
}));
console.log(JSON.stringify(dom, null, 1));

// Try to progress the intro: click in the middle of the screen several times
for (let i = 0; i < 6; i++) {
  await page.mouse.click(700, 450);
  await new Promise(r => setTimeout(r, 700));
}
await new Promise(r => setTimeout(r, 3000));
const after = await page.evaluate(() => ({
  ls: Object.keys(localStorage),
  saveBytes: localStorage.getItem('pokecatch.save')?.length ?? 0,
  chapter: document.querySelector('#side-chapter')?.textContent,
  zoneLen: document.querySelector('#zone-panel')?.innerHTML.length,
  overlayText: [...document.querySelectorAll('body > div')].map(d => d.textContent.replace(/\s+/g, ' ').trim().slice(0, 120)).filter(Boolean).slice(0, 6),
}));
console.log('AFTER CLICKS:', JSON.stringify(after, null, 1));
await page.screenshot({ path: 'verify/title.png' });
console.log('logs:', logs.slice(0, 20));
await browser.close();
