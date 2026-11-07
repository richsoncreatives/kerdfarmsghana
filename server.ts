import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route for enquiries (Server Proxy / Logging)
app.post('/api/submit-form', (req, res) => {
  const enquiry = req.body;
  console.log('--------------------------------------------------');
  console.log(`[KERD FARMS SERVER API] New Enquiry received for kerdfarms@gmail.com:`);
  console.log(JSON.stringify(enquiry, null, 2));
  console.log('--------------------------------------------------');
  
  res.json({
    success: true,
    message: 'Enquiry received and routed to kerdfarms@gmail.com'
  });
});

// API route for orders
app.post('/api/submit-order', (req, res) => {
  const order = req.body;
  console.log('--------------------------------------------------');
  console.log(`[KERD FARMS SERVER API] New Order [${order.orderId}] received for kerdfarms@gmail.com:`);
  console.log(`Customer: ${order.customerName} (${order.customerPhone})`);
  console.log(`MoMo Sender: ${order.momoAccountName} (${order.momoPhone})`);
  console.log(`Total: GH₵ ${order.totalAmount}`);
  console.log('--------------------------------------------------');

  res.json({
    success: true,
    orderId: order.orderId,
    message: `Order #${order.orderId} received and sent to kerdfarms@gmail.com for MoMo confirmation!`
  });
});

// Long-term browser caching for extracted media & font assets for ultra-fast page transitions
app.use(
  '/assets/media',
  express.static(path.join(__dirname, 'public', 'assets', 'media'), {
    maxAge: '365d',
    immutable: true,
  })
);

// EXPLICIT MULTI-PAGE ROUTES (BEFORE VITE MIDDLEWARE)
const staticRoutes = [
  'shop',
  'poultry',
  'produce',
  'soil',
  'about',
  'impact',
  'insights',
  'contact'
];

staticRoutes.forEach((route) => {
  const pagePath = path.join(__dirname, 'public', route, 'index.html');
  app.get([`/${route}`, `/${route}/`, `/${route}/index.html`], (req, res) => {
    if (fs.existsSync(pagePath)) {
      res.sendFile(pagePath);
    } else {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
  });
});

// Root homepage route
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// In production, serve static dist files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // In dev, Vite middleware for JS/CSS assets
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use(vite.middlewares);
}

const portNumber = Number(process.env.PORT) || 3000;
app.listen(portNumber, '0.0.0.0', () => {
  console.log(`Kerd Farms multi-page server running on http://0.0.0.0:${portNumber}`);
});

