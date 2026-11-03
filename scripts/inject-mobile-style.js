import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

const styleSnippet = `
<style>
/* Unhide mobile/tablet hamburger menu button */
@media (max-width: 1279px) {
  button[aria-label="Open menu"], button[aria-label*="menu"], .lucide-menu {
    display: inline-flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}
</style>
`;

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && item.endsWith('.html')) {
      let html = fs.readFileSync(fullPath, 'utf8');
      if (!html.includes('/* Unhide mobile/tablet hamburger menu button */')) {
        html = html.replace('</head>', styleSnippet + '\n</head>');
        fs.writeFileSync(fullPath, html, 'utf8');
        console.log(`Injected mobile menu style into ${fullPath}`);
      }
    }
  });
}

processDirectory(publicDir);

// Also root index.html
const rootIndex = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(rootIndex)) {
  let html = fs.readFileSync(rootIndex, 'utf8');
  if (!html.includes('/* Unhide mobile/tablet hamburger menu button */')) {
    html = html.replace('</head>', styleSnippet + '\n</head>');
    fs.writeFileSync(rootIndex, html, 'utf8');
    console.log(`Injected mobile menu style into root index.html`);
  }
}
