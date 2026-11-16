/**
 * src/shell/sw.js — service worker: serves assets/ from the CDN and keeps the page shell offline.
 * __CDN_SW__ and __SHELL_ID__ are filled in by tools/build.mjs. Only registered when the build
 * sets site.sw = true (off by default locally so a rebuild is never masked by a cache).
 */
// Service worker of the site Netlify serves (tools/bundle.mjs --shell copies it to /sw.js with https://pokecatch-online.pages.dev/ filled in).
// The game asks for its images as assets/... on the CDN (boot.js puts a <base> on it, 01/11: asked of this address, the
// ones this worker didn't answer, asleep or the CDN missed, went to Netlify's proxy, paid per request and per byte):
// they are answered here from the CDN (Cloudflare Pages, free traffic). /assets/... on this address still is (an older boot.js).
// - The tiny files are joined by folder into packs (CDN packs.json: { group: { url, files: { '/assets/...': [offset,
//   length, type] } } }, the packs named after their content, cached for good): the first file asked of a group
//   downloads its pack once, then every file of it is answered here, without the network.
// - Any other /assets/ file is fetched from the CDN (CORS: a canvas may still read its pixels, js/ui.js trims sprites).
// - The CDN fails: the request goes on as asked (an older boot.js's /assets/... to Netlify's proxy, netlify.toml).
// - The phone puts this worker to sleep after a few idle seconds and it forgets everything. On waking it used to ask the
//   network for packs.json before answering any image: a round trip before each screen after a pause (22/10, Julien: « un
//   changement de page a un léger delay »). The last packs.json is now kept on the device (Cache Storage) and used at
//   once, the network's read meanwhile for the next images. A pack gone since (a deploy renamed it) costs a few images
//   asked on their own, until the fresh index is there.
// - The page itself (22/10, Netlify credits: each visit cost the page and sw.js, both billed) is kept here and answered
//   without the network. SHELL is its hash (tools/bundle.mjs): a new page is a new sw.js, which the browser installs (it
//   checks sw.js about once a day since 09/11, Julien: « go 24h »: max-age + updateViaCache 'all'; browsers never wait
//   longer than 24 h), keeping the new page at install, the old one dropped at activate. No page kept (a first visit,
//   the keep failed, Safari cleared it): the network, as before.
// Kill switch: deploy a sw.js that only does self.registration.unregister() (reaches every browser within 24 h; the
// visit after it gets the page from Netlify again).
const CDN = __CDN_SW__, SHELL = 'c316581f00', PAGE = 'pokecatch-shell-' + SHELL;
const STORE = 'pokecatch-packs', KEPT = '/packs.json';
const flatten = packs => {
  const flat = {};
  for (const p of Object.values(packs)) for (const [path, e] of Object.entries(p.files)) flat[path] = [p.url, ...e];
  return flat;
};
let index = null;
const refresh = () => fetch(CDN + 'packs.json', { cache: 'no-cache' })
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(packs => {
    caches.open(STORE).then(c => c.put(KEPT, new Response(JSON.stringify(packs)))).catch(() => {});
    return (index = Promise.resolve(flatten(packs)));
  });
const getIndex = () => index ??= caches.open(STORE).then(c => c.match(KEPT)).then(r => r && r.json()).catch(() => null)
  .then(kept => {
    const net = refresh().catch(() => { if (!kept) index = null; return {}; }); // nothing kept and offline: asked again on the next image
    return kept ? flatten(kept) : net;
  });
const mem = {};
const loadPack = url => mem[url] ??= fetch(CDN + url.replace(/^\//, ''), { mode: 'cors', credentials: 'omit' })
  .then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
  .catch(e => { // a pack gone (a deploy renamed it): the index is read again, the kept one dropped
    delete mem[url]; index = null;
    caches.open(STORE).then(c => c.delete(KEPT)).catch(() => {});
    throw e;
  });

async function answer(req, url) {
  const hit = (await getIndex())[url.pathname];
  if (hit) {
    const [pack, off, len, type] = hit;
    try {
      const buf = await loadPack(pack);
      return new Response(buf.slice(off, off + len), { headers: { 'Content-Type': type } });
    } catch { /* the file on its own below */ }
  }
  try {
    const r = await fetch(CDN + url.pathname.slice(1) + url.search, { mode: 'cors', credentials: 'omit' });
    if (r.ok) return r;
  } catch { /* the CDN can't be reached */ }
  return fetch(req);
}

// The page kept at install (a redirected answer can't be given to a navigation: not kept); failing doesn't stop the install
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(fetch('/', { cache: 'reload' }).then(r => r.ok && !r.redirected && caches.open(PAGE).then(c => c.put('/', r))).catch(() => {}));
});
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(keys => Promise.all(keys.filter(k => k.startsWith('pokecatch-shell-') && k !== PAGE).map(k => caches.delete(k)))).catch(() => {})
  .then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (e.request.mode === 'navigate' && url.origin === location.origin && (url.pathname === '/' || url.pathname === '/index.html')) {
    e.respondWith(caches.open(PAGE).then(c => c.match('/')).catch(() => null).then(r => r || fetch(e.request)));
    return;
  }
  if (!url.pathname.startsWith('/assets/') || url.origin !== location.origin && !url.href.startsWith(CDN)) return;
  e.respondWith(answer(e.request, url));
});
