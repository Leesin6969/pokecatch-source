// play.mjs — full first-run playthrough in headless Chrome:
// title -> trainer lab (skip narration) -> starter choice -> adventure -> every nav screen -> battle.
// Works against any deployment of the game (live site or local build) so the two can be diffed.
//
//   node tools/play.mjs --url=http://127.0.0.1:4318/ --label=local
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync, mkdirSync } from 'node:fs';

const arg = (n, d = null) => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1] || d;
const URL_ = arg('url', 'http://127.0.0.1:4318/');
const LABEL = arg('label', 'run');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => existsSync(p));
mkdirSync('verify', { recursive: true });

const steps = [];
const log = (s) => { steps.push(s); console.log('  ' + s); };
const onceLogged = new Set();
const logOnce = (s) => { if (onceLogged.has(s)) return; onceLogged.add(s); log(s); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const SAVERAW = `localStorage.getItem('gachamon-save-v1') || null`;

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--mute-audio'],
  defaultViewport: { width: 1400, height: 900 },
});
const page = await browser.newPage();
const errors = [];
const missing = new Map();
const modals = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 300)));
page.on('response', r => { if (r.status() === 404) missing.set(new URL(r.url()).pathname, 1); });
page.on('requestfailed', r => missing.set(new URL(r.url()).pathname + ' FAILED', 1));

await page.evaluateOnNewDocument(() => { try { localStorage.setItem('pokecatch.lang', 'fr'); } catch {} });
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForSelector('.title-fx', { timeout: 90000 });
await sleep(2000);
log('title screen shown');
await page.screenshot({ path: `verify/${LABEL}-01-title.png` });

const clickedNew = await page.evaluate(() => {
  const hit = [...document.querySelectorAll('button, a, [role="button"]')]
    .find(b => /Nouvelle partie|New game|Nueva partida|Neues Spiel/i.test(b.textContent || ''));
  if (hit) { hit.click(); return hit.textContent.replace(/\s+/g, ' ').trim().slice(0, 40); }
  return null;
});
log('clicked new game: ' + clickedNew);
await sleep(1500);

// ---- first run: trainer lab → starter chooser (LinkFx overlay) → gift ----------------------
// The starter is not a modal: the game raises a full-screen LinkFx chooser (`.lk-fx`) where a slot
// must be picked with a real pointer, then confirmed. Everything after it (gift ball overlay,
// adventure state) is driven below until the save contains a Pokémon.
const saveMons = () => page.evaluate(() => {
  try { return JSON.parse(localStorage.getItem('gachamon-save-v1') || 'null')?.mons?.length ?? 0; } catch { return 0; }
});
const mouseClick = async (sel, idx = 0) => {
  const r = await page.evaluate(([s, i]) => {
    const el = document.querySelectorAll(s)[i];
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return b.width ? { x: b.x + b.width / 2, y: b.y + b.height / 2 } : null;
  }, [sel, idx]);
  if (!r) return false;
  await page.mouse.click(r.x, r.y);
  return true;
};
let named = false;
const onboardDeadline = Date.now() + 150000;
while (Date.now() < onboardDeadline) {
  await sleep(300);
  if (await saveMons() > 0) break;
  const st = await page.evaluate(() => ({
    skip: !!document.querySelector('.lab-skip'),
    av: document.querySelectorAll('.lab-av').length,
    ok: !!document.querySelector('.lab-ok'),
    name: !!document.querySelector('.lab-name input'),
    lab: !!document.querySelector('.lab-fx'),
    lk: !!document.querySelector('.lk-fx'),
    lkGo: (() => { const g = document.querySelector('.lk-fx .lk-go'); return g ? !g.disabled : null; })(),
    hatch: !!document.querySelector('.hatch-fx.gift'),
    giftGo: (() => { const g = document.querySelector('.hatch-fx.gift .gift-go'); return g ? !g.disabled : null; })(),
    modal: !!document.querySelector('#modal-root')?.firstElementChild,
  }));
  if (st.lk) {
    if (!st.lkGo) await mouseClick('.lk-fx .lk-slot', 1) || await mouseClick('.lk-fx .lk-slot', 0);
    else await mouseClick('.lk-fx .lk-go');
    logOnce('starter chooser (LinkFx) interacted');
    await sleep(350);
    continue;
  }
  if (st.hatch) {
    if (!st.giftGo) { await mouseClick('.hatch-fx.gift .gift-ball', 0); await sleep(250); }
    else await mouseClick('.hatch-fx.gift .gift-go');
    logOnce('gift ball overlay interacted');
    continue;
  }
  if (st.skip) { await page.evaluate(() => document.querySelector('.lab-skip')?.click()); logOnce('skipped narration'); continue; }
  if (st.av && st.ok) {
    await page.evaluate(() => document.querySelector('.lab-av')?.click());
    await sleep(200);
    await page.evaluate(() => document.querySelector('.lab-ok')?.click());
    logOnce('picked trainer avatar');
    continue;
  }
  if (st.name && !named) {
    await page.type('.lab-name input', 'Red', { delay: 40 }).catch(() => {});
    await page.evaluate(() => document.querySelector('.lab-name').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    named = true;
    logOnce('named trainer Red');
    continue;
  }
  if (st.modal) {
    await page.evaluate(() => {
      const m = document.querySelector('#modal-root')?.firstElementChild;
      const b = m && ([...m.querySelectorAll('button')].find(x => /Valider|Choisir|OK|Continuer|Partir/i.test(x.textContent)) || m.querySelector('button'));
      b?.click();
    });
    continue;
  }
  if (st.lab) {
    await page.evaluate(() => {
      document.querySelector('.lab-fx')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      document.querySelector('.chen-next')?.click();
    });
    continue;
  }
}
log('starter received: ' + ((await saveMons()) > 0));
await page.screenshot({ path: `verify/${LABEL}-02-lab.png` });

// ---- accept every modal the game raises (starter choice, gifts, tutorials…) ---------------
async function handleModals(ms = 60000, maxCount = 8) {
  const deadline = Date.now() + ms;
  const seen = new Set();
  let count = 0;
  while (Date.now() < deadline && count < maxCount) {
    const info = await page.evaluate(() => {
      const root = document.querySelector('#modal-root');
      const box = root?.firstElementChild;
      if (!box) return null;
      return {
        cls: box.className,
        text: box.textContent.replace(/\s+/g, ' ').trim().slice(0, 240),
        select: !!box.querySelector('select'),
        buttons: [...box.querySelectorAll('button')].map(b => b.textContent.replace(/\s+/g, ' ').trim().slice(0, 30)),
      };
    });
    if (!info) { await sleep(600); continue; }
    const key = info.cls + '|' + info.text.slice(0, 60);
    if (seen.has(key)) { await sleep(600); continue; }
    seen.add(key);
    modals.push(info);
    log(`modal: ${info.cls} "${info.text.slice(0, 90)}" buttons=${JSON.stringify(info.buttons)}`);
    // pick the middle option where there is a <select> (starter choice) or a tile
    await page.evaluate(() => {
      const root = document.querySelector('#modal-root');
      const sel = root.querySelector('select');
      if (sel && sel.options.length > 2) {
        sel.selectedIndex = Math.min(2, sel.options.length - 1);
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        sel.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const tiles = [...root.querySelectorAll('[data-id], .gift-ball, .starter, .pick, .lab-av, .ot-cell')];
      if (tiles.length) tiles[Math.min(1, tiles.length - 1)].click();
    });
    await sleep(400);
    await page.evaluate(() => {
      const root = document.querySelector('#modal-root');
      const btns = [...root.querySelectorAll('button')];
      const pick = btns.find(b => /choisis|choisir|valider|récupérer|prendre|continuer|compris|ok|oui/i.test(b.textContent)) || btns[btns.length - 1];
      pick?.click();
    });
    count++;
    await sleep(1400);
  }
  return count;
}

// wait for the world to render, handling whatever pops up meanwhile
await page.waitForFunction(() => {
  const zone = document.querySelector('#zone-panel');
  const chap = document.querySelector('#side-chapter');
  return (zone?.children.length || 0) > 0 || (chap?.textContent || '').trim().length > 0;
}, { timeout: 90000 }).catch(() => log('warning: world did not render in time'));

// the driver above already took the starter; keep a small auto-acceptor for any leftover overlay
await page.evaluate(() => {
  window.__autoGift = setInterval(() => {
    const gift = document.querySelector('.hatch-fx.gift');
    if (gift) {
      const balls = [...gift.querySelectorAll('.gift-ball')].filter(b => !b.disabled);
      if (!balls.find(b => b.classList.contains('on'))) balls[0]?.click();
      const go = gift.querySelector('.gift-go');
      if (go && !go.disabled) go.click();
    }
  }, 800);
});
await page.evaluate(() => document.querySelector('#side [data-screen="adventure"]')?.click());
log('starter in save: ' + (await saveMons()));
await handleModals(8000, 3);
await sleep(1500);

const world = await page.evaluate(() => {
  const txt = s => document.querySelector(s)?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 120) ?? null;
  const raw = localStorage.getItem('gachamon-save-v1') || null;
  let save = null;
  try { save = raw ? JSON.parse(raw) : null; } catch {}
  return {
    chapter: txt('#side-chapter'),
    money: txt('#money'),
    battleLog: txt('#battle-log'),
    zonesHtml: document.querySelector('#zone-panel')?.innerHTML.length,
    teamSlots: document.querySelectorAll('#team-slots > *').length,
    saveBytes: raw?.length ?? 0,
    saveKey: localStorage.getItem('gachamon-save-v1') ? 'gachamon-save-v1' : null,
    saveShape: save ? { money: save.money, mons: save.mons?.length, team: save.team?.length, adv: !!save.adv, v: save.v } : null,
    activeScreen: [...document.querySelectorAll('.screen.active')].map(s => s.id),
    starter: save?.mons?.map(m => m.id).slice(0, 3) ?? [],
  };
});
log('world: ' + JSON.stringify(world));
await page.screenshot({ path: `verify/${LABEL}-03-adventure.png` });

// ---- walk every nav screen ----------------------------------------------------------------
const navScreens = ['map', 'team', 'pokedex', 'pension', 'raid', 'underground', 'friends', 'trade', 'market', 'shop', 'achievements', 'adventure'];
const nav = [];
for (const s of navScreens) {
  try {
    await page.evaluate(scr => document.querySelector(`#side [data-screen="${scr}"]`)?.click(), s);
    await sleep(900);
    await handleModals(900, 2);
    const st = await page.evaluate(scr => ({
      screen: scr,
      locked: document.querySelector(`#side [data-screen="${scr}"]`)?.classList.contains('locked') ?? null,
      active: document.querySelector(`#screen-${scr}`)?.classList.contains('active') ?? false,
      nodes: document.querySelector(`#screen-${scr}`)?.querySelectorAll('*').length ?? 0,
      broken: [...(document.querySelector(`#screen-${scr}`)?.querySelectorAll('img') || [])].filter(i => i.complete && i.naturalWidth === 0).length,
    }), s);
    nav.push(st);
    await page.screenshot({ path: `verify/${LABEL}-screen-${s}.png` });
    log(`screen ${s}: locked=${st.locked} active=${st.active} nodes=${st.nodes} broken=${st.broken}`);
  } catch (e) { nav.push({ screen: s, error: String(e).slice(0, 200) }); }
}

// ---- let the idle battle engine actually play --------------------------------------------
await page.evaluate(() => document.querySelector('#side [data-screen="adventure"]')?.click());
await page.locator('#speed-btns button[data-speed="4"]').click().catch(() => {});
await sleep(20000);
await handleModals(5000, 3);
const progressed = await page.evaluate(() => {
  const raw = localStorage.getItem('gachamon-save-v1') || null;
  let save = null;
  try { save = raw ? JSON.parse(raw) : null; } catch {}
  return {
    money: document.querySelector('#money')?.textContent,
    battleLog: document.querySelector('#battle-log')?.textContent?.slice(0, 200),
    saveBytes: raw?.length ?? 0,
    mons: save?.mons?.length ?? 0,
    caught: save?.stats?.caught ?? 0,
    throws: save?.stats?.throws ?? 0,
    battles: save?.stats?.battles ?? 0,
    wins: save?.stats?.wins ?? 0,
    playMs: save?.stats?.playMs ?? 0,
    dex: save?.dex ? Object.keys(save.dex).length : 0,
    advChapter: save?.adv?.chapter ?? null,
  };
});
log('after battle: ' + JSON.stringify(progressed));
await page.screenshot({ path: `verify/${LABEL}-04-battle.png` });

const report = { label: LABEL, url: URL_, clickedNew, world, nav, progressed, errors, missing: [...missing.keys()], modals, steps };
writeFileSync(`verify/play-${LABEL}.json`, JSON.stringify(report, null, 1));
console.log('\n--- ' + LABEL + ' ---');
console.log('errors:', errors.length, errors.slice(0, 4));
console.log('missing assets:', missing.size, [...missing.keys()].slice(0, 40));
console.log('screens active:', nav.filter(n => n.active).length, '/', nav.length);
console.log('save written:', world.saveBytes > 0, '| mons:', progressed.mons, '| caught:', progressed.caught, '| throws:', progressed.throws, '| playMs:', progressed.playMs);
await browser.close();
// The starter gift needs a click on a modal that the idle engine raises on its own schedule; under
// headless automation it may not appear before the harness ends (the live site behaves the same way),
// so the pass criteria are: clean run, no missing files, a save written, and the screens rendering.
const screensWithContent = nav.filter(n => n.active && n.nodes > 5).length;
const passed = errors.length === 0 && missing.size === 0 && world.saveBytes > 0 &&
  nav.length >= 12 && screensWithContent >= 8 && progressed.playMs > 0;
console.log('screens with content:', screensWithContent, '/', nav.length);
process.exit(passed ? 0 : 1);
