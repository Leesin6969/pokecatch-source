// dev.mjs — local development server: builds src/ into .cache/dev, serves it, rebuilds on change.
//
//   node tools/dev.mjs             # http://127.0.0.1:4317
//   node tools/dev.mjs --port=8080
//
// Only src/ is served from disk for the assets (no copying), the JS/CSS/boot files are rebuilt in
// memory-sized chunks and pushed to the browser through a live-reload SSE channel.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, watch, mkdirSync, rmSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { spawn } from 'node:child_process';

const PORT = Number((process.argv.find(a => a.startsWith('--port=')) || '').split('=')[1] || 4317);
const OUT = '.cache/dev';
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif',
  '.woff2': 'font/woff2', '.bin': 'application/octet-stream', '.ico': 'image/x-icon',
};

const clients = new Set();
let building = false;
let pending = false;

function runBuild() {
  return new Promise((resolve, reject) => {
    if (building) { pending = true; return resolve(false); }
    building = true;
    const child = spawn(process.execPath, ['tools/build.mjs', '--dev', `--out=${OUT}`], { stdio: 'inherit' });
    child.on('exit', code => {
      building = false;
      if (pending) { pending = false; runBuild(); return resolve(true); }
      code === 0 ? resolve(true) : reject(new Error('build failed: ' + code));
    });
  });
}

function serveFile(res, file, { head = false } = {}) {
  if (!existsSync(file) || !statSync(file).isFile()) return false;
  const body = readFileSync(file);
  res.writeHead(200, {
    'content-type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
    'content-length': body.length,
    'cache-control': 'no-store',
    'access-control-allow-origin': '*',
  });
  if (!head) res.end(body);
  else res.end();
  return true;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const path = decodeURIComponent(url.pathname);
  const head = req.method === 'HEAD';

  if (path === '/__livereload') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-store', connection: 'keep-alive' });
    res.write('retry: 1000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // generated build files (boot.js, index.html, bundle/*, build.json, sw.js)
  if (path === '/' || path === '/index.html') {
    if (serveFile(res, join(OUT, 'index.html'), { head })) return;
    res.writeHead(503, { 'content-type': 'text/plain' });
    return res.end('build not ready');
  }
  if (!path.includes('..')) {
    if (serveFile(res, join(OUT, path.slice(1)), { head })) return;
    // game assets are served straight from src/ (no copy step in dev)
    const srcPath = path.startsWith('/assets/') || path.startsWith('/intros/') || path === '/apple-touch-icon.png';
    if (srcPath && serveFile(res, join('src', path.slice(1)), { head })) return;
  }
  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('404 ' + path);
});

// ---- watcher --------------------------------------------------------------------------
function notify() {
  for (const c of clients) c.write('data: reload\n\n');
}
let timer = null;
function scheduleRebuild(reason) {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const t = Date.now();
    try {
      const built = await runBuild();
      if (built) console.log(`[dev] rebuilt in ${Date.now() - t} ms (${reason}) — reloading browsers`);
      notify();
    } catch (e) {
      console.error('[dev] ' + e.message);
    }
  }, 120);
}
for (const dir of ['src/js', 'src/ext/js', 'src/ext/data', 'src/css', 'src/boot', 'src/shell', 'src/lang']) {
  watch(dir, { recursive: true }, (_event, file) => {
    if (file && /\.(js|css|html)$/.test(file)) scheduleRebuild(`${dir}/${file}`);
  });
}

console.log('[dev] building...');
await runBuild();
server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Poke'Catch dev server -> http://127.0.0.1:${PORT}\n`);
  console.log('  src/js/**  src/ext/**  src/css/app.css  src/shell/**  →  rebuilt and reloaded automatically');
  console.log('  press Ctrl+C to stop\n');
});
