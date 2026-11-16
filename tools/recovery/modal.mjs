// modal.mjs — reach the starter modal and dump its DOM.
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync } from 'node:fs';
const URL_ = 'http://127.0.0.1:4318/';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--mute-audio'], defaultViewport: { width: 1400, height: 900 } });
const page = await browser.newPage();
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForSelector('.title-fx', { timeout: 90000 });
await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => [...document.querySelectorAll('button')].find(b => /Nouvelle partie/i.test(b.textContent))?.click());
for (let i = 0; i < 40; i++) {
  const st = await page.evaluate(() => ({
    skip: !!document.querySelector('.lab-skip'), av: document.querySelectorAll('.lab-av').length,
    ok: !!document.querySelector('.lab-ok'), name: !!document.querySelector('.lab-name input'),
    save: !!Object.keys(localStorage).find(k => /save/i.test(k)), modal: document.querySelector('#modal-root')?.children.length ?? 0,
  }));
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
    await page.evaluate(() => { document.querySelector('.lab-ok')?.click(); });
    await new Promise(r => setTimeout(r, 800));
  } else if (st.skip) {
    await page.evaluate(() => document.querySelector('.lab-skip')?.click());
    await new Promise(r => setTimeout(r, 800));
  } else if (st.modal) break;
  else { await page.evaluate(() => document.querySelector('.lab-fx')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))); await new Promise(r => setTimeout(r, 500)); }
}
await new Promise(r => setTimeout(r, 1500));
const dump = await page.evaluate(() => {
  const root = document.querySelector('#modal-root');
  const pick = sel => [...(root?.querySelectorAll(sel) || [])].map(e => ({ tag: e.tagName, cls: e.className?.toString().slice(0, 60), text: e.textContent.replace(/\s+/g, ' ').trim().slice(0, 60), attrs: [...e.attributes].map(a => a.name + '=' + a.value.slice(0, 30)).slice(0, 6) }));
  return {
    modalClass: root?.firstElementChild?.className,
    html: root?.innerHTML.slice(0, 2500),
    buttons: pick('button'), selects: pick('select'), options: pick('option'), imgs: pick('img'),
  };
});
console.log('modalClass:', dump.modalClass);
console.log('buttons:', JSON.stringify(dump.buttons, null, 1));
console.log('selects:', JSON.stringify(dump.selects));
console.log('options:', JSON.stringify(dump.options));
console.log('imgs:', JSON.stringify(dump.imgs.slice(0, 8), null, 1));
writeFileSync('verify/modal-dump.json', JSON.stringify(dump, null, 1));
await browser.close();
