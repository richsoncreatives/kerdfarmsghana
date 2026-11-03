import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = '/tmp/kerdfarms_fixed';
const publicDir = path.join(__dirname, '..', 'public');
const mediaDir = path.join(publicDir, 'assets', 'media');

if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

const mimeToExt = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'font/woff2': 'woff2',
  'font/woff': 'woff',
  'font/ttf': 'ttf',
  'application/font-woff2': 'woff2',
};

let extractedCount = 0;
let savedBytes = 0;

function extractDataUris(html) {
  return html.replace(/data:([a-zA-Z0-9\/+-]+);base64,([a-zA-Z0-9+\/=]+)/g, (fullMatch, mime, b64) => {
    // Keep tiny icons inline (< 1.5KB)
    if (b64.length < 2048) {
      return fullMatch;
    }
    const ext = mimeToExt[mime.toLowerCase()] || 'bin';
    const hash = crypto.createHash('sha1').update(b64).digest('hex').substring(0, 16);
    const filename = `${hash}.${ext}`;
    const filePath = path.join(mediaDir, filename);

    if (!fs.existsSync(filePath)) {
      const buf = Buffer.from(b64, 'base64');
      fs.writeFileSync(filePath, buf);
      extractedCount++;
    }
    savedBytes += fullMatch.length;
    return `/assets/media/${filename}`;
  });
}

const mobileMenuAndTransitionCss = `
<style id="kerd-enhanced-styles">
  html {
    scroll-behavior: smooth;
  }
  body {
    opacity: 1;
    transition: opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  }
  body.kerd-page-transitioning {
    opacity: 0.65;
  }
  /* Ensure 3-line hamburger menu button is always visible and clickable on mobile & tablet (< 1280px) */
  @media (max-width: 1279px) {
    button[aria-label="Open menu"],
    button[aria-label="Close menu"],
    #kerd-hamburger-btn {
      display: inline-flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      cursor: pointer !important;
      align-items: center !important;
      justify-content: center !important;
    }
  }
  /* Mobile dropdown panel animation */
  #kerd-mobile-dropdown {
    transition: max-height 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease, transform 0.22s ease;
    transform-origin: top center;
  }
</style>
`;

function transformHtml(rawHtml) {
  let html = rawHtml;

  // 1. Remove SingleFile Content-Security-Policy meta tag that blocks external scripts & FormSubmit AJAX
  html = html.replace(/<meta[^>]*http-equiv=["']?content-security-policy["']?[^>]*>/gi, '');

  // 2. Remove sf-hidden from the mobile menu button so it is visible on phones & tablets
  html = html.replace(
    /(<button[^>]*aria-label=["']?Open menu["']?[^>]*class=["'][^"']*)\bsf-hidden\b([^"']*["'][^>]*>)/gi,
    '$1$2'
  );
  // Also handle unquoted class or different attribute order
  html = html.replace(
    /<button([^>]*aria-label=["']?Open menu["']?[^>]*)>/gi,
    (match, attrs) => {
      const cleaned = attrs.replace(/\bsf-hidden\b/g, '');
      return `<button id="kerd-hamburger-btn" type="button"${cleaned}>`;
    }
  );

  // 3. Extract heavy base64 images & fonts into /assets/media/ for fast loading
  html = extractDataUris(html);

  // 4. Add lazy decoding hints to images for smoother scrolling
  html = html.replace(/<img\s+/gi, '<img decoding="async" ');

  // 5. Remove any previous duplicate script/style tags if re-running
  html = html.replace(/<script src="\/kerd-momo-core\.js"><\/script>/g, '');

  // 6. Inject enhanced CSS before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${mobileMenuAndTransitionCss}\n</head>`);
  } else {
    html = mobileMenuAndTransitionCss + '\n' + html;
  }

  // 7. Inject kerd-momo-core.js at the end
  if (html.includes('</body>')) {
    html = html.replace('</body>', '<script src="/kerd-momo-core.js" defer></script>\n</body>');
  } else {
    html = html + '\n<script src="/kerd-momo-core.js" defer></script>\n';
  }

  return html;
}

function processDirRecursive(sourceDir, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const entries = fs.readdirSync(sourceDir);
  for (const entry of entries) {
    const srcPath = path.join(sourceDir, entry);
    const dstPath = path.join(targetDir, entry);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      processDirRecursive(srcPath, dstPath);
    } else if (entry.endsWith('.html')) {
      const raw = fs.readFileSync(srcPath, 'utf8');
      const optimized = transformHtml(raw);
      fs.writeFileSync(dstPath, optimized, 'utf8');
      console.log(
        `Optimized ${ path.relative(publicDir, dstPath) }: ${(raw.length / 1024).toFixed(1)} KB -> ${(optimized.length / 1024).toFixed(1)} KB`
      );
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

processDirRecursive(srcDir, publicDir);

// Also copy optimized public/index.html to root /app/applet/index.html
fs.copyFileSync(path.join(publicDir, 'index.html'), path.join(__dirname, '..', 'index.html'));

console.log(`Done! Extracted ${extractedCount} unique media files, saved ${(savedBytes / (1024 * 1024)).toFixed(2)} MB across HTML pages.`);
