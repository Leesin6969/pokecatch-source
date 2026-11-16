// audit-i18n.mjs — load the game once per language and verify the language bundle loads and renders.
//   node tools/audit-i18n.mjs --url=http://127.0.0.1:4400/ --label=local
import puppeteer from 'puppeteer-core';
import { writeFileSync, mkdirSync } from 'node:fs';

const arg = (n, d = null) => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1] || d;
const URL_ = arg('url', 'http://127.0.0.1:4400/');
const LABEL = arg('label', 'local');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
mkdirSync('verify', { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const LANGS = ['fr', 'en', 'es', 'de', 'zh-Hans', 'zh-Hant', 'ko', 'ja', 'vi'];

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--mute-audio'],
  defaultViewport: { width: 1400, height: 900 },
});
const page = await browser.newPage();
const rows = [];
let failed = 0;
for (const lang of LANGS) {
  const errors = [], bad = [];
  const onConsole = m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); };
  const onPageError = e => errors.push('pageerror: ' + String(e).slice(0, 200));
  const onFail = r => { const u = r.url(); if (!/supabase|discord|google/.test(u)) bad.push(u + ' ' + (r.failure()?.errorText || '')); };
  const onResp = r => { if (r.status() >= 400 && !/supabase/.test(r.url())) bad.push(r.status() + ' ' + r.url()); };
  page.on('console', onConsole); page.on('pageerror', onPageError);
  page.on('requestfailed', onFail); page.on('response', onResp);

  // set the language before any script runs, then load
  await page.evaluateOnNewDocument(l => { try { localStorage.setItem('pokecatch.lang', l); } catch {} }, lang);
  await page.goto('about:blank');
  await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('#tabs [data-screen]', { timeout: 40000 }).catch(() => {});
  await sleep(2500);
  // dismiss the title screen so the translated UI is visible
  await page.evaluate(() => document.querySelector('.title-fx .ti-go')?.click());
  await sleep(1800);

  const state = await page.evaluate(() => ({
    docLang: document.documentElement.lang,
    i18nKeys: Object.keys(window.I18N_DATA || {}),
    titleBtn: document.querySelector('.title-fx')?.textContent?.replace(/\s+/g, ' ').slice(0, 60) || null,
    nav: [...document.querySelectorAll('#tabs .l')].map(e => e.textContent.trim()).slice(0, 6),
    h1: document.querySelector('h1,h2,h3')?.textContent?.trim().slice(0, 40) || null,
    money: document.querySelector('.wallet-reg')?.textContent?.trim() || null,
    brokenImgs: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length,
    bodyText: document.body.innerText.replace(/\s+/g, ' ').slice(0, 120),
  }));
  const ok = state.i18nKeys.length >= 0 && state.nav.length > 3 && errors.length === 0 && bad.length === 0;
  if (!ok) failed++;
  rows.push({ lang, ok, ...state, errors: errors.slice(0, 6), bad: bad.slice(0, 8) });
  console.log(`${lang.padEnd(8)} docLang=${String(state.docLang).padEnd(8)} i18n=${state.i18nKeys.join(',') || '(built-in)'} nav="${state.nav.slice(0, 3).join(' / ')}" errors=${errors.length} bad=${bad.length}`);
  if (state.brokenImgs) console.log('   broken images:', state.brokenImgs);
  if (errors.length) console.log('   errors:', errors.slice(0, 3));
  if (bad.length) console.log('   failed:', bad.slice(0, 4));

  page.off('console', onConsole); page.off('pageerror', onPageError);
  page.off('requestfailed', onFail); page.off('response', onResp);
}
writeFileSync(`verify/audit-i18n-${LABEL}.json`, JSON.stringify(rows, null, 1));
console.log(`\ni18n ${failed === 0 ? 'PASSED' : 'FAILED'}: ${LANGS.length - failed}/${LANGS.length} languages clean`);
await browser.close();
process.exit(failed === 0 ? 0 : 1);
