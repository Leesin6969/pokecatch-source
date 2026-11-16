// verify-intros.mjs — boot the rebuilt intro workshop and compare it with the original CDN page.
//   node tools/verify-intros.mjs
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sleep = ms => new Promise(r => setTimeout(r, ms));
mkdirSync('verify', { recursive: true });

const run = (cmd, args) => new Promise(res => { const c = spawn(cmd, args, { stdio: 'ignore' }); c.on('exit', res); });
const server = spawn(process.execPath, ['tools/serve.mjs', '--dir=dist', '--port=4415'], { stdio: 'ignore' });
await sleep(1500);
// the baseline is the live CDN page (serving a local mirror root would 404 on assets that are not
// mirrored, which says nothing about the rebuild)
const ORIGINAL_URL = 'https://pokecatch-online.pages.dev/intros/legend-intros';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--mute-audio'], defaultViewport: { width: 1280, height: 900 } });

async function probe(url) {
  const page = await browser.newPage();
  const errors = [], fails = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 220)); });
  page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 220)));
  page.on('requestfailed', r => fails.push(r.url() + ' ' + (r.failure()?.errorText || '')));
  page.on('response', r => { if (r.status() >= 400) fails.push(r.status() + ' ' + r.url()); });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sleep(3500);
  const state = await page.evaluate(() => ({
    title: document.title,
    buttons: document.querySelectorAll('button').length,
    selects: document.querySelectorAll('select').length,
    inputs: document.querySelectorAll('input').length,
    canvas: document.querySelectorAll('canvas').length,
    textLen: document.body.innerText.length,
    hasAtelierTitle: /Atelier des intros/i.test(document.body.innerText),
  }));
  await page.close();
  return { url, state, errors, fails };
}

const original = await probe(ORIGINAL_URL);
const rebuilt = await probe('http://127.0.0.1:4415/intros/legend-intros.html');
await browser.close();
server.kill();

const report = { original, rebuilt };
const same = original.state.title === rebuilt.state.title &&
  Math.abs(original.state.buttons - rebuilt.state.buttons) === 0 &&
  Math.abs(original.state.textLen - rebuilt.state.textLen) < 200;
report.sameShell = same;
report.ok = same && rebuilt.errors.length === 0 && rebuilt.fails.length === 0;
writeFileSync('verify/intros-report.json', JSON.stringify(report, null, 1));
console.log('original:', original.state, '| errors:', original.errors.length, '| fails:', original.fails.length);
console.log('rebuilt :', rebuilt.state, '| errors:', rebuilt.errors.length, '| fails:', rebuilt.fails.length);
if (rebuilt.errors.length) console.log('errors:', rebuilt.errors.slice(0, 5));
if (rebuilt.fails.length) console.log('fails:', rebuilt.fails.slice(0, 5));
console.log('INTROS VERIFIED:', report.ok);
process.exit(report.ok ? 0 : 1);
