import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && item.endsWith('.html')) {
      let html = fs.readFileSync(fullPath, 'utf8');
      if (!html.includes('kerd-momo-core.js')) {
        html = html + '\n<script src="/kerd-momo-core.js"></script>\n';
        fs.writeFileSync(fullPath, html, 'utf8');
        console.log(`Successfully appended kerd-momo-core.js to ${fullPath}`);
      } else {
        console.log(`Already contains script: ${fullPath}`);
      }
    }
  });
}

processDirectory(publicDir);

// Also process root index.html
const rootIndex = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(rootIndex)) {
  let html = fs.readFileSync(rootIndex, 'utf8');
  if (!html.includes('kerd-momo-core.js')) {
    html = html + '\n<script src="/kerd-momo-core.js"></script>\n';
    fs.writeFileSync(rootIndex, html, 'utf8');
    console.log(`Successfully appended kerd-momo-core.js to root index.html`);
  }
}
