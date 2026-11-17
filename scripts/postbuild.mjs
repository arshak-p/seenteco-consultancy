// After `next build`: add the PHP form handler and the Hostinger server rules to ./out (the folder to upload).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const out = path.join(root, 'out');
const src = path.join(root, 'hostinger');

if (!fs.existsSync(out)) { console.error('No ./out folder. Run `npm run build` first.'); process.exit(1); }
fs.mkdirSync(path.join(out, 'api'), { recursive: true });

for (const f of fs.readdirSync(src)) {
  if (f === 'check.html') continue;
  if (f.endsWith('.php')) fs.copyFileSync(path.join(src, f), path.join(out, 'api', f));
}

// server rules: Next.js adds small inline scripts to every page, so scripts must allow 'unsafe-inline'
let ht = fs.readFileSync(path.join(src, '.htaccess'), 'utf8');
ht = ht.replace("script-src 'self';", "script-src 'self' 'unsafe-inline';");
fs.writeFileSync(path.join(out, '.htaccess'), ht);
fs.writeFileSync(path.join(out, 'api', '.htaccess'), '<FilesMatch "\\.(log|jsonl)$">\n  Require all denied\n</FilesMatch>\n');

console.log('Ready to upload:', out);
