// lab.mjs — step-by-step observer of the title -> trainer-lab handoff.
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
await page.waitForSelector('.title-fx', { timeout: 90000 });
await new Promise(r => setTimeout(r, 2000));
const info = await page.evaluate(() => {
  const btns = [...document.querySelectorAll('.title-fx button, .title-fx a')].map(b => ({ t: b.textContent.replace(/\s+/g, ' ').trim().slice(0, 40), cls: b.className.slice(0, 40) }));
  return { btns, titleHtml: document.querySelector('.title-fx')?.innerHTML.length };
});
console.log('title buttons:', JSON.stringify(info.btns));

await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Nouvelle partie/i.test(b.textContent))?.click());
for (let i = 0; i < 22; i++) {
  await new Promise(r => setTimeout(r, 1000));
  const st = await page.evaluate(() => {
    const lab = document.querySelector('.lab');
    return {
      t: Math.round(performance.now()),
      lab: !!lab, labCls: lab?.className,
      chen: document.querySelector('.chen-text')?.textContent?.trim().slice(0, 60),
      avatars: document.querySelectorAll('.lab-av').length,
      okBtn: !!document.querySelector('.lab-ok'),
      okDisabled: document.querySelector('.lab-ok')?.disabled,
      nameInput: !!document.querySelector('.lab-name input'),
      titleFx: !!document.querySelector('.title-fx'),
      modalRoot: document.querySelector('#modal-root')?.children.length,
      save: Object.keys(localStorage).filter(k => /save/i.test(k)),
      bodyText: document.body.innerText.replace(/\s+/g, ' ').slice(0, 160),
    };
  });
  console.log(JSON.stringify(st));
  if (st.save.length) break;
}
console.log('\nlogs:', logs.slice(0, 15));
await browser.close();
