// Local preview of the built site (./out) with a stand-in for the PHP form:  npm run build  then  npm run preview
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, '..', 'out');
const DATA = path.join(here, '..', '.local-data');
const PORT = process.env.PORT || 3000;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'POST' && url.pathname === '/api/enquiry.php') {
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 20000) req.destroy(); });
    req.on('end', () => {
      try { const d = JSON.parse(raw); fs.mkdirSync(DATA, { recursive: true }); fs.appendFileSync(path.join(DATA, 'enquiries.jsonl'), JSON.stringify({ ...d, at: new Date().toISOString() }) + '\n'); } catch {}
      res.writeHead(200, { 'Content-Type': 'application/json' }); res.end('{"ok":true}');
    });
    return;
  }
  let rel = decodeURIComponent(url.pathname);
  let file = path.normalize(path.join(OUT, rel));
  if (!file.startsWith(OUT)) { res.writeHead(403); return res.end('Forbidden'); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { file = path.join(OUT, '404.html'); res.statusCode = 404; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(res.statusCode === 404 ? 404 : 200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(PORT, () => console.log('Seenteco preview on http://localhost:' + PORT));
