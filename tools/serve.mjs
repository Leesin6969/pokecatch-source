// serve.mjs — tiny static server for a built directory (no rebuild, no watch).
//   node tools/serve.mjs                # serves dist/ on http://127.0.0.1:4318
//   node tools/serve.mjs --dir=.cache/dev --port=5000
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const arg = name => (process.argv.find(a => a.startsWith(`--${name}=`)) || '').split('=')[1];
const DIR = arg('dir') || 'dist';
const PORT = Number(arg('port') || 4318);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif',
  '.woff2': 'font/woff2', '.bin': 'application/octet-stream', '.ico': 'image/x-icon',
};
createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  let path = decodeURIComponent(url.pathname);
  if (path === '/') path = '/index.html';
  if (path.includes('..')) { res.writeHead(400); return res.end(); }
  let file = join(DIR, path.slice(1));
  if (!existsSync(file) && !extname(file)) file += '.html'; // intros/legend-intros -> .html
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('404 ' + path);
  }
  const body = readFileSync(file);
  // extensionless files (intros/legend-intros) are HTML pages on this site
  const type = MIME[extname(file).toLowerCase()] || (path.endsWith('.html') || !extname(file) ? 'text/html; charset=utf-8' : 'application/octet-stream');
  res.writeHead(200, {
    'content-type': type,
    'content-length': body.length,
    'cache-control': 'no-store',
  });
  if (req.method === 'HEAD') return res.end();
  res.end(body);
}).listen(PORT, '127.0.0.1', () => console.log(`serving ${DIR}/ -> http://127.0.0.1:${PORT}`));
