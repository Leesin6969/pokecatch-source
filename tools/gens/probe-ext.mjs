// probe-ext.mjs — functional test of the gen 5–9 extension in the real browser.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL_ = process.argv[2] || 'http://127.0.0.1:4430/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--mute-audio'], defaultViewport: { width: 1400, height: 950 } });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 300)));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 300)); });
page.on('response', r => { if (r.status() >= 400) errors.push('http ' + r.status() + ' ' + r.url().slice(-80)); });
await page.evaluateOnNewDocument(() => {
  const OrigProxy = Proxy;
  window.__tCands = [];
  window.Proxy = new OrigProxy(OrigProxy, { construct(t, a) { const p = Reflect.construct(t, a); try { if (a[0] && typeof a[0] === 'object' && Object.getPrototypeOf(a[0]) === null) window.__tCands.push(p); } catch {} return p; } });
  window.__T = () => { for (const c of window.__tCands || []) { try { if (c.POKEDEX && c.App) return c; } catch {} } return null; };
});
await page.evaluateOnNewDocument(() => { try { localStorage.setItem('pokecatch.lang', 'fr'); } catch {} });
await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForSelector('.title-fx', { timeout: 90000 });
await sleep(1000);

// ---- seed a save that is already in the post-game (chapter 66 = first Unys chapter) ----------
const seeded = await page.evaluate(() => {
  const t = window.__T();
  if (!t) return { ok: false, why: 'no namespace' };
  const g = t.Game;
  const mon = (id, uid, lv) => ({ uid, id, level: lv, xp: 0, caughtAt: Date.now(), shiny: false });
  g.S.money = 9999999;
  g.S.items = { 'poke-ball': 999, 'great-ball': 999, 'ultra-ball': 999, 'master-ball': 99 };
  g.S.mons = [mon(1, 'u1', 95), mon(4, 'u2', 95), mon(7, 'u3', 95), mon(25, 'u4', 95), mon(133, 'u5', 95), mon(150, 'u6', 95)];
  g.S.team = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'];
  g.S.dex = { 1: { caught: 1, seen: 1, shiny: 0, firstAt: Date.now() } };
  g.S.seen = { 1: 1 };
  g.S.trainer = { name: 'Test', sprite: 'red', id: '1', since: Date.now(), tag: '0001' };
  g.S.adv = { chapter: 66, unlocked: 999, badges: [], gifts: {}, nodes: [], node: 0, battle: null, pending: null, capture: { on: false, target: 'new', shiny: false }, speed: 1, paused: false, loops: [], runs: 0, kept: {}, layout: 3 };
  g.S.lastTick = Date.now();
  g.save();
  return { ok: true, pokedex: t.POKEDEX.length, chapters: t.STORY.CHAPTERS.length, regions: t.STORY.REGIONS.length };
});
console.log('seeded:', JSON.stringify(seeded));
await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForSelector('.title-fx', { timeout: 90000 });
await sleep(800);
// continue
await page.evaluate(() => { const b = [...document.querySelectorAll('.title-fx button')].find(x => /Continuer|Nouvelle/i.test(x.textContent)); b?.click(); });
await sleep(6000);
// dismiss any modal / lab leftovers
for (let i = 0; i < 6; i++) {
  await page.evaluate(() => { const m = document.querySelector('#modal-root')?.firstElementChild; if (m) { const b = [...m.querySelectorAll('button')].at(-1); b?.click(); } });
  await sleep(400);
}

const state = await page.evaluate(() => {
  const t = window.__T();
  const g = t.Game;
  const unovaFirst = t.STORY.firstChapterOf('unova');
  return {
    pokedex: t.POKEDEX.length,
    dexEntries: Object.keys(g.DEX || {}).length,
    regions: t.STORY.REGIONS.map(r => ({ name: r.name, key: r.key, dex: r.dex, open: !!r.open })),
    chapters: t.STORY.CHAPTERS.length,
    unovaFirst,
    chapterNow: g.S.adv?.chapter,
    unlocked: g.S.adv?.unlocked,
    regionNow: t.STORY.regionOf(g.S.adv?.chapter)?.name,
    zonePool66: (() => { try { const p = t.Adventure.zonePool(66); return Array.isArray(p) ? { n: p.length, min: Math.min(...p.map(x => x.id)), max: Math.max(...p.map(x => x.id)), sample: p.slice(0, 5).map(x => x.id) } : null; } catch (e) { return 'err ' + e.message; } })(),
    hasGen5Dex: !!g.DEX[494], hasGen9Dex: !!g.DEX[1025],
    evo494: t.EVOLUTIONS[494], baseExp494: t.BASE_EXP[494],
  };
});
console.log('state:', JSON.stringify(state, null, 1));

// go to the map screen and look at the region list
await page.evaluate(() => document.querySelector('#side [data-screen="map"]')?.click());
await sleep(2500);
const map = await page.evaluate(() => ({
  cards: [...document.querySelectorAll('.rg')].map(el => ({ txt: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 80), cls: el.className, depart: el.getAttribute('data-depart') })),
}));
console.log('map cards:', JSON.stringify(map.cards, null, 1));
await page.screenshot({ path: 'verify/ext-map.png' });

// travel to Unys: select the region card, then start its first chapter through the game's own API
const traveled = await page.evaluate(() => {
  const card = document.querySelector('.rg[data-rg="unova"]');
  if (card) card.click();
  const t = window.__T();
  const ok = t.Screens.adventure.goChapter(66);
  return { clicked: !!card, goChapter66: ok };
});
await sleep(2500);
await page.evaluate(() => { const m = document.querySelector('#modal-root')?.firstElementChild; if (m) [...m.querySelectorAll('button')].at(-1)?.click(); });
await sleep(1500);
const after = await page.evaluate(() => {
  const t = window.__T(); const g = t.Game;
  return {
    traveled: t.STORY.regionOf(g.S.adv?.chapter)?.name, chapter: g.S.adv?.chapter, unlocked: g.S.adv?.unlocked,
    nodes: (t.Adventure.state?.nodes || []).length,
    nodeKinds: (t.Adventure.state?.nodes || []).slice(0, 8).map(n => n.type),
    battle: g.S.adv?.battle ? { enemies: (g.S.adv.battle.enemies || []).map(e => e.id), kind: g.S.adv.battle.kind } : null,
    zonePool: (() => { try { const p = t.Adventure.zonePool(66); return p ? { n: p.length, min: Math.min(...p.map(x => x.id)), max: Math.max(...p.map(x => x.id)), sample: p.slice(0, 6).map(x => x.id) } : null; } catch (e) { return 'err ' + e.message; } })(),
  };
});
console.log('after travel:', JSON.stringify(after));
// let the idle engine roll encounters for a while and collect enemy ids
const seenEnemies = [];
for (let i = 0; i < 30; i++) {
  await sleep(700);
  const b = await page.evaluate(() => {
    const t = window.__T(); const g = t.Game;
    const bat = g.S.adv?.battle;
    return bat ? (bat.enemies || []).map(e => e.id) : null;
  });
  if (b) for (const id of b) if (!seenEnemies.includes(id)) seenEnemies.push(id);
  if (seenEnemies.filter(id => id >= 494).length >= 3) break;
}
console.log('wild enemies seen in Unys:', JSON.stringify(seenEnemies));
await page.screenshot({ path: 'verify/ext-unova.png' });

// ---- user-facing travel flow: map → region card → chapter row → start button ---------------
const uiTravel = {};
uiTravel.back = await page.evaluate(() => { const t = window.__T(); return t.Screens.adventure.goChapter(0); });
await sleep(1500);
uiTravel.nav = await page.evaluate(() => { document.querySelector('#side [data-screen="map"]')?.click(); return true; });
await sleep(1800);
uiTravel.region = await page.evaluate(() => { const c = document.querySelector('.rg[data-rg="unova"]'); c?.click(); return !!c; });
await sleep(1200);
uiTravel.row = await page.evaluate(() => { const r = document.querySelector('.mp-row[data-ch]'); r?.click(); return r?.dataset.ch || null; });
await sleep(1200);
uiTravel.go = await page.evaluate(() => { const b = document.querySelector('.mp-go[data-go]'); const ch = b?.dataset.go; b?.click(); return ch || null; });
await sleep(2500);
uiTravel.result = await page.evaluate(() => {
  const t = window.__T(); const g = t.Game;
  return { region: t.STORY.regionOf(g.S.adv?.chapter)?.name, chapter: g.S.adv?.chapter, nodes: (t.Adventure.state?.nodes || []).length };
});
console.log('ui travel:', JSON.stringify(uiTravel));

// ---- dex / evolution sanity for the new species -------------------------------------------
const evo = await page.evaluate(() => {
  const t = window.__T();
  const g = t.Game;
  const mon = { uid: 'x', id: 495, level: 16, xp: 0, caughtAt: Date.now(), shiny: false };
  return {
    evo495: t.EVOLUTIONS[495],
    prevo496: g.PREVO?.[496],
    dex495: g.DEX?.[495] && { name: g.DEX[495].name, types: g.DEX[495].types, cap: g.DEX[495].captureRate, learn: g.DEX[495].learn.length },
    dex1025: g.DEX?.[1025] && { name: g.DEX[1025].name, types: g.DEX[1025].types, legendary: g.DEX[1025].mythical },
    stats: (() => { try { const s = g.statsOf(mon); return { hp: s.hp, atk: s.atk, spe: s.spe }; } catch (e) { return 'err ' + e.message; } })(),
    levelEvo: (() => { try { return g.levelEvolution?.(mon)?.map?.(x => x.to) ?? g.levelEvolution?.(mon) ?? null; } catch (e) { return 'err ' + e.message; } })(),
  };
});
console.log('evolution/dex:', JSON.stringify(evo));

// ---- forms / mega / items / badges / league checks -----------------------------------------
const extras = await page.evaluate(() => {
  const t = window.__T(); const g = t.Game;
  const out = {};
  // forms
  out.form3001 = { inDex: !!g.DEX?.[3001], isForm: t.FORMS.isForm(3001), baseOf: t.FORMS.baseOf(3001), formsOf3: t.FORMS.formsOf(3), label: t.FORMS.label(3001), name: g.DEX?.[3001]?.name, types: g.DEX?.[3001]?.types, stats: g.DEX?.[3001]?.stats };
  out.artForm = (() => { try { return t.UI.artSrc(3001) || t.UI.artImg?.(3001); } catch (e) { return 'err ' + e.message; } })();
  out.artBase = (() => { try { return t.UI.artSrc(494); } catch (e) { return 'err ' + e.message; } })();
  out.formCount = t.FORMS.LIST.filter(f => f.id > 1025).length;
  // items + shop
  out.itemStone = t.ITEM_NAMES['venusaurite'];
  out.itemOrb = t.ITEM_NAMES['blue-orb'];
  out.shopHasStone = t.CONFIG.SHOP.some(x => x.id === 'venusaurite');
  // badges + gyms + league
  out.badgeSheet = t.STORY.badgeSheet('Trio (Unys)');
  out.badgeNames = t.STORY.GEN5TO9_BADGES?.unova;
  out.regionGymsUnova = t.STORY.regionGyms ? null : null;
  out.regionGyms = t.Screens.adventure.regionGyms('unova').map(x => x.badge);
  out.leagueChaptersUnova = t.STORY.chaptersOf('unova').filter(i => t.STORY.CHAPTERS[i].league).length;
  out.chaptersPerRegion = { unova: t.STORY.chaptersOf('unova').length, kalos: t.STORY.chaptersOf('kalos').length, alola: t.STORY.chaptersOf('alola').length, galar: t.STORY.chaptersOf('galar').length, paldea: t.STORY.chaptersOf('paldea').length };
  // mega evolution through the real item-evolution API
  try {
    const uid = 'megatest';
    g.S.mons.push({ uid, id: 3, level: 60, xp: 0, caughtAt: Date.now(), shiny: false });
    g.S.team = [...(g.S.team || []), uid].slice(-6);
    g.S.items['venusaurite'] = 1;
    const res = t.Game.useItem(uid, 'venusaurite');
    out.megaEvolve = { res: res ? 'ok' : 'null', monId: g.S.mons.find(m => m.uid === uid)?.id };
  } catch (e) { out.megaEvolve = 'err ' + e.message; }
  // regional form present in the Alola wild pools
  try {
    const alolaChapters = t.STORY.chaptersOf('alola');
    const pools = alolaChapters.flatMap(i => t.STORY.CHAPTERS[i].steps.filter(s => s.kind === 'route').flatMap(s => s.species || []));
    out.alolaPoolSize = pools.length;
    out.alolaHasForm = pools.some(id => t.FORMS.baseOf(id) !== id) || pools.some(id => t.FORMS.isForm(id) && id > 1025);
    out.alolaFormIds = pools.filter(id => id > 1025).slice(0, 5);
  } catch (e) { out.alolaPoolErr = String(e).slice(0, 120); }
  return out;
});
console.log('extras:', JSON.stringify(extras));

// map region cards must show the new badge sheets
const badgeMap = await page.evaluate(() => {
  const t = window.__T();
  t.Game.S.adv.badges = ['Trio (Unys)'];
  document.querySelector('#side [data-screen="map"]')?.click();
  return true;
});
await sleep(1800);
const badgeHtml = await page.evaluate(() => {
  const els = [...document.querySelectorAll('.rg-badges .pbadge')].map(x => x.getAttribute('style') || '');
  return { count: els.length, sheets: [...new Set(els.filter(s => s.includes('unova-sheet') || s.includes('sheet'))) ].slice(0, 3) };
});
console.log('badge html:', JSON.stringify(badgeHtml));

// ---- gym chapter structure + shop rendering ------------------------------------------------
const gymCheck = await page.evaluate(() => {
  const t = window.__T(); const g = t.Game;
  const meta = t.Screens.adventure.chapterMeta(66);
  const gymStep = t.STORY.CHAPTERS[66].steps.find(s => s.kind === 'gym');
  const team = (() => { try { return t.STORY.gymTeam ? t.STORY.gymTeam(66, gymStep).map(x => x[0]) : null; } catch (e) { return 'err ' + e.message; } })();
  return {
    boss: meta.boss && { leader: meta.boss.leader, sprite: meta.boss.sprite, type: meta.boss.type, badge: meta.boss.badge, color: meta.boss.color },
    metaLv: meta.lv, gymBadge: gymStep.badge, gymTeamSize: Array.isArray(team) ? team.length : team,
    leagueOf66: null,
  };
});
console.log('gym chapter:', JSON.stringify(gymCheck));

// shop screen with 8 badges: mega stones must be listed
const shop = await page.evaluate(() => {
  const t = window.__T(); const g = t.Game;
  g.S.money = 99999999;
  g.S.adv.badges = [...(g.S.adv.badges || []), 'Trio (Unys)', 'Basique (Unys)', 'Insecte (Unys)', 'Volt (Unys)', 'Sismique (Unys)', 'Jet (Unys)', 'Glaçon (Unys)', 'Légende (Unys)'];
  g.S.items = { ...(g.S.items || {}), 'venusaurite': 1, 'master-ball': 10 };
  g.save();
  document.querySelector('#side [data-screen="shop"]')?.click();
  return true;
});
await sleep(2500);
const shopInfo = await page.evaluate(() => {
  const els = [...document.querySelectorAll('#screen-shop [data-id]')].map(x => x.getAttribute('data-id'));
  return { items: els.length, hasStone: els.includes('venusaurite'), hasOrb: els.includes('blue-orb'), sample: els.slice(0, 8) };
});
console.log('shop:', JSON.stringify(shopInfo));
await page.screenshot({ path: 'verify/ext-shop.png' });
await page.evaluate(() => document.querySelector('#side [data-screen="adventure"]')?.click());
await sleep(1000);
extras.gymCheck = gymCheck;
extras.shop = shopInfo;
await page.screenshot({ path: 'verify/ext-gym-map.png' });
await page.evaluate(() => document.querySelector('#side [data-screen="adventure"]')?.click());
await sleep(1200);

// dex screen: count regions and entries
await page.evaluate(() => document.querySelector('#side [data-screen="pokedex"]')?.click());
await sleep(2500);
const dex = await page.evaluate(() => {
  const chips = [...document.querySelectorAll('#screen-pokedex .region-badge, #screen-pokedex [data-region]')].map(x => x.textContent.trim()).filter(Boolean);
  return { chips: [...new Set(chips)].slice(0, 20), cards: document.querySelectorAll('#screen-pokedex .dex-card, #screen-pokedex [data-dex]').length, text: document.querySelector('#screen-pokedex')?.innerText.replace(/\s+/g, ' ').slice(0, 220) };
});
console.log('dex screen:', JSON.stringify(dex));
await page.screenshot({ path: 'verify/ext-dex.png' });

writeFileSync('verify/ext-probe.json', JSON.stringify({ seeded, state, map, uiTravel, evo, wildEnemies: seenEnemies, extras, badgeHtml, after, dex, errors }, null, 1));
console.log('errors:', errors.slice(0, 10));
await browser.close();
process.exit(errors.length ? 1 : 0);
