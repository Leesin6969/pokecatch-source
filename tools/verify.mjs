// verify.mjs — boot check: does the built game load, render its shell and reach the title screen
// with zero errors and zero missing files? (the deep test is tools/play.mjs)
//
//   node tools/serve.mjs            # or tools/dev.mjs, in another process
//   node tools/verify.mjs --url=http://127.0.0.1:4318
import puppeteer from 'puppeteer-core';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const arg = name => (process.argv.find(a => a.startsWith(`--${name}=`)) || '').split('=')[1];
const URL_ = arg('url') || 'http://127.0.0.1:4318/';
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(p => existsSync(p));
if (!CHROME) throw new Error('no Chrome/Edge found');
mkdirSync('verify', { recursive: true });

const report = { url: URL_, chrome: CHROME, consoleErrors: [], pageErrors: [], failedRequests: [], ok: false };

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--mute-audio'],
  defaultViewport: { width: 1400, height: 900 },
});
const page = await browser.newPage();
page.on('console', m => { if (m.type() === 'error') report.consoleErrors.push(m.text().slice(0, 400)); });
page.on('pageerror', e => report.pageErrors.push(String(e).slice(0, 500)));
page.on('requestfailed', r => {
  const u = r.url();
  if (!/supabase|discord/.test(u)) report.failedRequests.push({ url: u, err: r.failure()?.errorText });
});
page.on('response', r => {
  if (r.status() >= 400) report.failedRequests.push({ url: r.url(), status: r.status() });
});

console.log('loading', URL_);
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 90000 });

// shell markup injected by boot.js, bundle executed, title screen drawn
await page.waitForFunction(() => document.querySelector('#app') && document.querySelectorAll('#tabs button').length > 4, { timeout: 60000 });
await page.waitForSelector('.title-fx', { timeout: 90000 });
await new Promise(r => setTimeout(r, 1500));

const boot = await page.evaluate(() => {
  const q = s => document.querySelector(s);
  const txt = s => q(s)?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 120) ?? null;
  return {
    title: document.title,
    lang: document.documentElement.lang,
    theme: document.documentElement.dataset.theme || '(dark)',
    appChildren: q('#app')?.querySelectorAll('*').length ?? 0,
    screens: document.querySelectorAll('.screen').length,
    navButtons: [...document.querySelectorAll('#tabs button[data-screen]')].map(b => b.dataset.screen),
    titleButtons: [...document.querySelectorAll('.title-fx button')].map(b => b.textContent.replace(/\s+/g, ' ').trim()),
    titleText: txt('.title-fx'),
    canvas: document.querySelectorAll('canvas').length,
    imgs: document.images.length,
    brokenImgs: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length,
    cssLoaded: getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)',
    puppeteerVisible: !!q('.title-fx'),
  };
});
report.boot = boot;
console.log('boot:', JSON.stringify(boot, null, 1));
await page.screenshot({ path: 'verify/01-boot.png' });

// open the "Comment jouer" title modal to exercise the modal layer once
const modal = await page.evaluate(() => {
  const b = [...document.querySelectorAll('.title-fx button')].find(x => /Comment jouer/i.test(x.textContent));
  if (!b) return null;
  b.click();
  return new Promise(res => setTimeout(() => {
    const box = document.querySelector('#modal-root .modal, #modal-root > *');
    res(box ? { cls: box.className, chars: box.textContent.length } : null);
  }, 500));
});
report.modal = modal;
await page.screenshot({ path: 'verify/02-modal.png' });
console.log('modal:', JSON.stringify(modal));

report.ok = boot.appChildren > 200 && boot.screens >= 14 && boot.navButtons.length >= 12 &&
  boot.brokenImgs === 0 && boot.cssLoaded && !!boot.titleText &&
  report.pageErrors.length === 0 && report.consoleErrors.length === 0 && report.failedRequests.length === 0;

writeFileSync('verify/report.json', JSON.stringify(report, null, 1));
console.log('\n--- summary ---');
console.log('app nodes      :', boot.appChildren);
console.log('screens        :', boot.screens, '| nav buttons:', boot.navButtons.length);
console.log('title screen   :', JSON.stringify(boot.titleText?.slice(0, 60)));
console.log('images broken  :', boot.brokenImgs);
console.log('console errors :', report.consoleErrors.length, report.consoleErrors.slice(0, 3));
console.log('page errors    :', report.pageErrors.length, report.pageErrors.slice(0, 3));
console.log('failed requests:', report.failedRequests.length, report.failedRequests.slice(0, 4));
console.log('BOOT CHECK', report.ok ? 'PASSED' : 'FAILED');
await browser.close();
process.exit(report.ok ? 0 : 1);
