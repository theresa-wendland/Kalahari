// Serve only public site files, under the same project prefix as GitHub Pages.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pages = new Set(['index.html', 'pearl-and-poise.html', 'stone-and-soul.html', 'glass-and-glow.html', 'styles.css', 'script.js']);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  const relative = pathname.startsWith('/Kalahari/') ? pathname.slice('/Kalahari/'.length) || 'index.html' : '';
  const file = path.resolve(root, relative);
  if ((!pages.has(relative) && !relative.startsWith('assets/')) || !file.startsWith(root + path.sep)) {
    res.writeHead(404).end('Not found'); return;
  }
  fs.readFile(file, (error, content) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(content);
  });
}).listen(4173, '127.0.0.1');
