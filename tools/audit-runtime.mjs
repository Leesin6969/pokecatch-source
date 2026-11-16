// audit-runtime.mjs — deep runtime audit of a build: walk every screen/module, drive every modal,
// capture every log line / error / failed request / broken image.
//
//   node tools/serve.mjs --dir=dist --port=4400 &
//   node tools/audit-runtime.mjs --url=http://127.0.0.1:4400/ --label=local
//   node tools/audit-runtime.mjs --url=https://pokecatch-online.netlify.app/ --label=original
//
// Two instrumentation hooks, neither of which changes behaviour:
//   * a Proxy wrapper records the game's own namespace proxy as window.__T() (lets the audit open
//     screens and modals a human would need hours of play to reach)
//   * window.onerror / unhandledrejection are mirrored into window.__errs
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const arg = (n, d = null) => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1] || d;
const URL_ = arg('url', 'http://127.0.0.1:4400/');
const LABEL = arg('label', 'local');
const DEEP = process.argv.includes('--deep');
const CAP = DEEP ? 140 : 24;     // how many elements per screen the audit clicks
const MODAL_CAP = DEEP ? 220 : 18;
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
mkdirSync('verify', { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---- a generous, valid save so every gated screen renders ----------------------------------
const now = Date.now();
const mon = (id, level, shiny = false, uid = `m${id}`) => ({ uid, id, level, xp: 0, caughtAt: now, shiny, reg: 'kanto' });
const mons = [
  mon(25, 100), mon(6, 100, true), mon(150, 100), mon(1, 60), mon(4, 60), mon(7, 60),
  mon(249, 90), mon(250, 90, true), mon(201, 50), mon(20101, 50), mon(20127, 50, true),
  mon(493, 80), mon(49301, 80), mon(387, 70), mon(132, 40), mon(133, 45, true), mon(137, 40),
];
const monsBig = [...mons, ...Array.from({ length: 24 }, (_, i) => mon(1 + i, 30 + i, i % 5 === 0, `b${i}`))];
const uids = mons.map(m => m.uid);
const SAVE = {
  v: 2, money: 987654, mons: monsBig, team: uids.slice(0, 6), eventTeams: {},
  dex: Object.fromEntries(monsBig.map(m => [m.id, { caught: 1, seen: 1, shiny: m.shiny ? 1 : 0, firstAt: now }])),
  seen: Object.fromEntries(monsBig.map(m => [m.id, 1])),
  seenShiny: Object.fromEntries(monsBig.filter(m => m.shiny).map(m => [m.id, 1])),
  buffs: {}, items: {
    'poke-ball': 999, 'great-ball': 500, 'ultra-ball': 300, 'master-ball': 9, coin: 99999,
    'rare-candy': 30, 'exp-candy-s': 30, 'exp-candy-m': 30, 'exp-candy-xl': 30, 'exp-candy-big': 20,
    'fire-stone': 5, 'water-stone': 5, 'thunder-stone': 5, 'leaf-stone': 5, 'moon-stone': 5,
    'sun-stone': 5, 'shiny-stone': 5, 'dusk-stone': 5, 'dawn-stone': 5, 'ice-stone': 5,
    'link-cable': 5, 'berry-oran': 9, 'berry-sitrus': 9, 'berry-pecha': 9, 'berry-leppa': 9,
    'auroraticket': 3, 'exp-share': 2, 'shiny-charm': 1, 'oval-charm': 1, 'coin-case': 1,
    'pokedex-red': 1, 'town-map': 1, 'vs-seeker': 1, 'vs-recorder': 1, 'ss-anne': 1,
    'explorer-kit': 1, 'box-link': 1, 'orange-mail': 1, 'medal-gold': 1, 'medal-silver': 1,
    'medal-bronze': 1, 'nugget': 3, 'relic-gold': 2, 'calcium': 3, 'potion': 20,
    'deep-sea-scale': 2, 'deep-sea-tooth': 2, 'dragon-scale': 2, 'dragon-fang': 2, 'electirizer': 2,
    'magmarizer': 2, 'metal-coat': 2, 'kings-rock': 2, 'up-grade': 2, 'dubious-disc': 2,
    'prism-scale': 2, 'shed-shell': 2, 'adamant-orb': 1, 'lustrous-orb': 1, 'griseous-orb': 1,
  },
  buddy: { uid: 'm25', ko: 0 },
  pension: { mons: [{ mon: mon(132, 40, false, 'p1'), candy: 0 }, { mon: mon(132, 40, true, 'p2'), candy: 0 }], eggs: [], laid: 0, open: { slots: 4, eggs: 4 } },
  trades: [], lastTick: now,
  stats: {
    throws: 100, caught: 300, battles: 100, trades: 1, wins: 100, evolutions: 10, hatched: 5,
    playMs: 36e5 * 5, awayMs: 36e5 * 2, earned: 1e5, moneyIn: 1e5, coinIn: 100, coinOut: 10,
    itemIn: {}, itemOut: {}, moneySeen: 987654, coinSeen: 99999, itemSeen: {},
  },
  trainer: { name: 'Red', sprite: 'red', id: '12345', since: now - 864e5, tag: '0001' },
  muted: true,
  adv: {
    chapter: 0, unlocked: 999, badges: ['Roche', 'Cascade', 'Foudre', 'Prisme', 'Âme', 'Marais', 'Volcan', 'Terre', 'Maître', 'Zéphyr', 'Essaim', 'Plaine', 'Brume', 'Choc', 'Minéral', 'Glacier', 'Lever', 'Maître Johto', 'Légende', 'Roche (Hoenn)', 'Forêt'],
    gifts: { starter: true }, nodes: [], node: 0, battle: null, pending: null,
    capture: { on: true, target: 'new', shiny: true }, speed: 3, paused: false,
    loops: [], runs: 3, kept: {}, layout: 6,
  },
  placeSince: now, updatedAt: now, shellGiven: 1, auroraRefund: 1,
};

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--mute-audio'],
  defaultViewport: { width: 1400, height: 900 },
});
const page = await browser.newPage();

const report = {
  label: LABEL, url: URL_, console: [], consoleWarnings: [], consoleInfo: [], pageErrors: [],
  failedRequests: [], httpErrors: [], brokenImages: [], modals: [], screens: [], steps: 0, i18n: [],
};
const seenMsg = new Set();
const note = (kind, text) => {
  const key = kind + '|' + String(text).slice(0, 300);
  if (seenMsg.has(key)) return;
  seenMsg.add(key);
  (report[kind] ||= []).push(String(text).slice(0, 1200));
};
page.on('console', m => {
  const t = m.type();
  const txt = m.text();
  if (t === 'error') note('console', txt);
  else if (t === 'warning') note('consoleWarnings', txt);
  else if (!/^\[regions\]/.test(txt)) note('consoleInfo', txt);
});
page.on('pageerror', e => note('pageErrors', String(e && e.stack ? e.stack : e)));
page.on('request', r => {
  (report.requests ||= {})[r.url()] = { status: null, type: null, method: r.method(), resourceType: r.resourceType() };
});
page.on('requestfailed', r => {
  const u = r.url();
  const rec = (report.requests ||= {})[u] || (report.requests[u] = { status: null, type: null, method: r.method(), resourceType: r.resourceType() });
  rec.failed = r.failure()?.errorText || 'failed';
  if (/supabase|discord|google|gstatic/.test(u)) return;
  note('failedRequests', u + ' :: ' + (r.failure()?.errorText || ''));
});
page.on('response', r => {
  const u = r.url();
  const rec = (report.requests ||= {})[u] || (report.requests[u] = { method: 'GET', resourceType: r.request().resourceType() });
  rec.status = r.status();
  rec.type = r.headers()['content-type'] || '';
  if (u.includes('/assets/')) {
    (report.assets ||= {})[u] = r.status();
  }
  if (r.status() >= 400) note('httpErrors', r.status() + ' ' + u);
});

await page.evaluateOnNewDocument(SAVE_AND_HOOKS, SAVE);
async function SAVE_AND_HOOKS(save) {
  try { localStorage.setItem('gachamon-save-v1', JSON.stringify(save)); } catch {}
  try { localStorage.setItem('pokecatch.lang', 'fr'); localStorage.removeItem('pokecatch.theme'); } catch {}
  window.__errs = [];
  window.addEventListener('error', e => window.__errs.push('error: ' + (e.message || e.error)));
  window.addEventListener('unhandledrejection', e => window.__errs.push('rejection: ' + (e.reason && (e.reason.stack || e.reason.message) || e.reason)));
  const OrigProxy = Proxy;
  window.__tCands = [];
  window.Proxy = new Proxy(OrigProxy, {
    construct(target, args) {
      const p = Reflect.construct(target, args);
      try {
        if (args[0] && typeof args[0] === 'object' && Object.getPrototypeOf(args[0]) === null) window.__tCands.push(p);
      } catch {}
      return p;
    },
  });
  window.__T = () => {
    for (const c of window.__tCands || []) {
      try { if (c.POKEDEX || c.App || c.UI || c.Screens) return c; } catch {}
    }
    return null;
  };
}

const api = {
  sleep,
  async shot(name) {
    if (report.screens.length > 6) return;
    await page.screenshot({ path: `verify/audit-${LABEL}-${name}.png` }).catch(() => {});
  },
  async closedOverlays() {
    // close any open modal / sheet so the next step starts clean
    await page.evaluate(() => {
      const root = document.querySelector('#modal-root');
      if (root && root.children.length) {
        const btns = [...root.querySelectorAll('button')];
        const close = btns.find(b => /^(✕|×|Fermer|Annuler|Retour)$/i.test((b.textContent || '').trim())) || root.querySelector('.dc-x');
        (close || btns[btns.length - 1])?.click();
      }
      document.querySelectorAll('.nav-grp.sheet').forEach(g => g.classList.remove('sheet'));
    });
    await sleep(120);
  },
};

console.log(`[${LABEL}] loading ${URL_}`);
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForFunction(() => window.__T() && document.querySelector('#tabs [data-screen]'), { timeout: 45000 });

// title screen: with a non-empty save it says "Continuer" and skips the trainer lab
await sleep(1500);
const titleState = await page.evaluate(() => ({
  title: !!document.querySelector('.title-fx'),
  buttons: [...document.querySelectorAll('.title-fx button')].map(b => (b.textContent || '').replace(/\s+/g, ' ').trim()),
}));
if (titleState.title) {
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('.title-fx button')]
      .find(x => /Continuer|Nouvelle partie|New game/i.test(x.textContent || ''));
    b?.click();
  });
  await sleep(2500);
}
await page.waitForFunction(() => !document.querySelector('.title-fx'), { timeout: 40000 }).catch(() => {});
await sleep(2500);
report.titleState = titleState;

// wait for the app bootstrap to finish (namespace App + screens populated)
await page.waitForFunction(() => window.__T() && (window.__T()||{}).App && document.querySelector('#side-chapter')?.textContent?.trim(), { timeout: 40000 }).catch(() => {});
await sleep(2000);
const screens = await page.evaluate(() => Object.keys(window.__T().Screens || {}));
// the module registry names come from the recovered prelude (77 public module names)
const modNames = [...readFileSync('src/js/000-prelude.js', 'utf8').matchAll(/get ([A-Za-z_$][\w$]*)\(\)/g)].map(m => m[1]);
const modules = await page.evaluate(names => names.filter(n => { try { return window.__T()[n] !== undefined; } catch { return false; } }), modNames);
report.modules = modules;
report.screensAvailable = screens;
console.log('modules:', modules.length, '| screens:', screens.join(','));
await page.screenshot({ path: `verify/audit-${LABEL}-boot.png` });

// ---- 1. open every screen and interact with everything clickable inside it ------------------
const NAV = ['adventure', 'map', 'team', 'pokedex', 'pension', 'casino', 'raid', 'underground', 'friends', 'trade', 'market', 'shop', 'achievements', 'event', 'tower', 'candy', 'admin'];
for (const name of screens) {
  const before = { http: report.httpErrors.length, page: report.pageErrors.length, con: report.console.length };
  try {
    await page.evaluate(n => { try { (window.__T()||{}).App.show(n); } catch (e) { window.__errs.push('show ' + n + ': ' + e.message); } }, name);
    await sleep(700);
    await api.shot(name);
    // click every visible button / row in this screen (cap = CAP, in DOM order)
    // click visible controls in small batches; a click may navigate away (login links) — recover
    let clicked = 0;
    const total = await page.evaluate(n => {
      const sec = document.querySelector('#screen-' + n);
      return sec ? [...sec.querySelectorAll('button, [role="button"], [data-zone], [data-mon], [data-id], .pc-card, .ot-cell, .rg, .rh-hb, .zone, select')].length : 0;
    }, name).catch(() => 0);
    for (let offset = 0; offset < Math.min(total, CAP); offset += 5) {
      const batch = await page.evaluate((n, from, to) => {
        const sec = document.querySelector('#screen-' + n);
        if (!sec) return 0;
        const targets = [...sec.querySelectorAll('button, [role="button"], [data-zone], [data-mon], [data-id], .pc-card, .ot-cell, .rg, .rh-hb, .zone, select')].slice(from, to);
        let n2 = 0;
        for (const el of targets) {
          try {
            if (el.tagName === 'SELECT') { if (el.options.length > 1) { el.selectedIndex = 1; el.dispatchEvent(new Event('change', { bubbles: true })); } }
            else el.click();
            n2++;
          } catch {}
        }
        return n2;
      }, name, offset, offset + 5).catch(async () => {
        // the page navigated: wait for it to settle, then get back to the screen and continue
        await sleep(1500);
        try { await page.evaluate(n => window.__T()?.App.show(n), name); } catch {}
        await sleep(600);
        return 0;
      });
      clicked += batch;
      if (!batch) break;
    }
    await sleep(900);
    // capture modal text if one opened, then close it
    const modal = await page.evaluate(() => {
      const root = document.querySelector('#modal-root');
      if (!root || !root.firstElementChild) return null;
      return { cls: root.firstElementChild.className, text: (root.textContent || '').replace(/\s+/g, ' ').slice(0, 200) };
    });
    if (modal) report.modals.push({ screen: name, ...modal });
    // broken images inside the screen
    const broken = await page.evaluate(n => {
      const sec = document.querySelector('#screen-' + n) || document;
      return [...sec.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
    }, name);
    if (broken.length) report.brokenImages.push({ screen: name, broken: broken.slice(0, 20) });
    await api.closedOverlays();
    report.screens.push({
      screen: name, clicked,
      newHttp: report.httpErrors.length - before.http,
      newPage: report.pageErrors.length - before.page,
      newConsole: report.console.length - before.con,
    });
    report.steps++;
    const newHttp = report.httpErrors.slice(before.http);
    console.log(`  screen ${name.padEnd(12)} clicked=${clicked} issues: http+${newHttp.length} page+${report.pageErrors.length - before.page}`);
    for (const u of newHttp) console.log('       404:', u);
  } catch (e) {
    note('pageErrors', 'audit(' + name + '): ' + String(e).slice(0, 400));
  }
}

// ---- 2. top bar / global modals -------------------------------------------------------------
const GLOBAL = [
  ['#trainer-btn', 'trainer card'], ['#options-btn', 'options'], ['#guide-btn', 'guide'],
  ['#save-btn', 'save'], ['#side-chapter', 'chapter picker'], ['#chapter-btn', 'chapter picker 2'],
];
for (const [sel, what] of GLOBAL) {
  try {
    await page.evaluate(s => document.querySelector(s)?.click(), sel);
    await sleep(700);
    await api.shot(what.replace(/\s+/g, '-'));
    const opened = await page.evaluate(() => {
      const root = document.querySelector('#modal-root');
      return root && root.firstElementChild ? { cls: root.firstElementChild.className, text: (root.textContent || '').replace(/\s+/g, ' ').slice(0, 200) } : null;
    });
    if (opened) report.modals.push({ screen: 'global:' + what, ...opened });
    // interact with the modal's own tabs/buttons
    await page.evaluate((cap) => {
      const root = document.querySelector('#modal-root');
      if (!root) return;
      [...root.querySelectorAll('button, [role="button"], select, [data-tab], [data-s], [data-f]')].slice(0, cap)
        .forEach(el => { try { el.click(); } catch {} });
    }, MODAL_CAP);
    await sleep(700);
    if (what === 'options') {
      // walk the options tabs and read the language list
      const langs = await page.evaluate(() => [...document.querySelectorAll('#modal-root option, #modal-root [data-lang]')].map(o => o.textContent.trim()).slice(0, 12));
      report.optionsLangs = langs;
    }
    await api.closedOverlays();
    report.steps++;
  } catch (e) { note('pageErrors', 'global(' + what + '): ' + String(e).slice(0, 300)); }
}

// ---- 3. let the idle battle engine run and drive its speed/buttons --------------------------
await page.evaluate(() => { const t=window.__T(); if (t&&t.App) t.App.show('adventure'); });
await sleep(400);
await page.evaluate(() => { document.querySelector('#speed-btns button[data-speed="4"]')?.click(); });
for (let i = 0; i < 6; i++) {
  await sleep(2000);
  await page.evaluate(() => {
    const ad = (window.__T()||{}).Screens?.adventure;
    document.querySelector('#bag-panel button')?.click();
    document.querySelector('#team-rail > *')?.click();
  });
  await api.closedOverlays();
}
report.battle = await page.evaluate(() => {
  const raw = (Object.entries(localStorage).find(([k]) => /save/i.test(k)) || [])[1] || null;
  let s = null; try { s = raw ? JSON.parse(raw) : null; } catch {}
  return {
    log: document.querySelector('#battle-log')?.textContent?.slice(0, 200),
    mons: s?.mons?.length ?? null, caught: s?.stats?.caught ?? null,
    throws: s?.stats?.throws ?? null, battles: s?.stats?.battles ?? null,
    advChapter: s?.adv?.chapter ?? null, advNode: s?.adv?.node ?? null,
  };
});
console.log('battle:', JSON.stringify(report.battle));
await api.shot('battle');

// ---- 5. final counters ---------------------------------------------------------------------
report.final = await page.evaluate(() => ({
  errors: window.__errs || [],
  brokenImgs: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')).slice(0, 40),
  imgs: document.images.length,
}));
for (const e of report.final.errors || []) note('pageErrors', e);
await page.screenshot({ path: `verify/audit-${LABEL}-final.png` });

report.summary = {
  steps: report.steps,
  screens: report.screens.length,
  consoleErrors: report.console.length,
  consoleWarnings: (report.consoleWarnings || []).length,
  pageErrors: report.pageErrors.length,
  failedRequests: report.failedRequests.length,
  httpErrors: report.httpErrors.length,
  brokenImages: report.brokenImages.length,
  modals: report.modals.length,
  modules: (report.modules || []).length,
};
writeFileSync(`verify/audit-${LABEL}.json`, JSON.stringify(report, null, 1));
console.log('\n=== AUDIT', LABEL, '===');
console.log(JSON.stringify(report.summary, null, 1));
console.log('http errors:', report.httpErrors.slice(0, 15));
console.log('page errors:', report.pageErrors.slice(0, 8));
console.log('console errors:', report.console.slice(0, 8));
console.log('warnings:', (report.consoleWarnings || []).slice(0, 8));
await browser.close();
// The harness deliberately calls App.show() on screens the game itself never opens (market is
// disabled by CONFIG.MARKET.OPEN=false, friends/admin have no submodule). The live site throws the
// same three errors for the same calls, so they are not recovery defects — everything else fails.
const KNOWN_HARNESS = /^show (market|friends|admin):/;
const unknownPageErrors = (report.pageErrors || []).filter(e => !KNOWN_HARNESS.test(e));
if (unknownPageErrors.length !== (report.summary.pageErrors || 0)) {
  console.log(`(${report.summary.pageErrors - unknownPageErrors.length} known harness artefact(s) ignored: App.show on market/friends/admin)`);
}
const ok = report.summary.consoleErrors === 0 && report.summary.failedRequests === 0 &&
  report.summary.httpErrors === 0 && report.summary.brokenImages === 0 && unknownPageErrors.length === 0;
process.exit(ok ? 0 : 1);
