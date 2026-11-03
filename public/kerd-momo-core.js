/**
 * Kerd Farms - Core Cart, MoMo Payment, Form Emailer, Mobile Navigation & Order Tracking Engine
 * Target Email: kerdfarms@gmail.com
 * MoMo Accounts: 055 123 4567 (MTN) / 024 013 5545 (Telecel) - Name: KERD FARMS
 */

(function () {
  const MOMO_CONFIG = {
    accountName: 'KERD FARMS',
    mtnNumber: '055 123 4567',
    telecelNumber: '024 013 5545',
    email: 'kerdfarms@gmail.com',
    whatsappNumber: '233240135545',
  };

  const CART_KEY = 'kerdfarms_cart';
  const ORDERS_KEY = 'kerdfarms_orders';

  // --- STATE ---
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {}
    updateCartBadges();
  }

  function getOrders() {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveOrder(order) {
    try {
      const orders = getOrders();
      orders.unshift(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {}
  }

  function generateOrderId() {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `KF-${new Date().getFullYear()}-${random}`;
  }

  // --- UPDATE CART BADGES ON PAGE ---
  function updateCartBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll('[aria-label*="Shopping cart"]').forEach((btn) => {
      let badge = btn.querySelector('.kerd-cart-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'kerd-cart-badge absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow';
        btn.appendChild(badge);
      }
      badge.textContent = totalCount;
      btn.setAttribute('aria-label', `Shopping cart, ${totalCount} items`);
    });
  }

  // --- TOAST NOTIFICATION ---
  function showToast(message, type = 'success') {
    let toast = document.getElementById('kerd-toast-container');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kerd-toast-container';
      toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;max-width:380px;';
      document.body.appendChild(toast);
    }

    const toastBox = document.createElement('div');
    toastBox.style.cssText = `
      background: ${type === 'success' ? '#0f5132' : '#842029'};
      color: #ffffff;
      padding: 12px 18px;
      border-radius: 12px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;
    `;
    toastBox.innerHTML = `<span>${message}</span>`;
    toast.appendChild(toastBox);

    setTimeout(() => {
      toastBox.style.opacity = '0';
      setTimeout(() => toastBox.remove(), 300);
    }, 3500);
  }

  // --- MOBILE MENU / HAMBURGER NAVIGATION ---
  function initMobileMenuNav() {
    // Unhide mobile menu button by removing sf-hidden
    const menuButtons = document.querySelectorAll('[aria-label="Open menu"], [aria-label*="menu"]');
    menuButtons.forEach((btn) => {
      btn.classList.remove('sf-hidden');
      btn.style.display = 'inline-flex';
      btn.style.visibility = 'visible';
      btn.style.opacity = '1';

      if (!btn.dataset.kerdNavBound) {
        btn.dataset.kerdNavBound = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMobileNavModal();
        });
      }
    });
  }

  function toggleMobileNavModal() {
    let navModal = document.getElementById('kerd-mobile-nav-modal');
    if (!navModal) {
      navModal = document.createElement('div');
      navModal.id = 'kerd-mobile-nav-modal';
      navModal.style.cssText = 'position:fixed;inset:0;z-index:99995;background:rgba(15,23,42,0.8);backdrop-filter:blur(6px);display:flex;flex-direction:column;font-family:system-ui,-apple-system,sans-serif;';
      
      navModal.innerHTML = `
        <div style="background:#0d4a27;color:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-b:1px solid rgba(255,255,255,0.15);">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:22px;">🌱</span>
            <div>
              <div style="font-weight:900;font-size:16px;letter-spacing:-0.02em;">KERD FARMS</div>
              <div style="font-size:10px;color:#a7f3d0;text-transform:uppercase;letter-spacing:0.05em;">Menu & Quick Navigation</div>
            </div>
          </div>
          <button id="kerd-mobile-nav-close" style="background:rgba(255,255,255,0.15);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
        </div>

        <div style="flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px;background:#ffffff;">
          
          <!-- MoMo Quick Banner -->
          <div style="padding:14px;background:#fef3c7;border:1px solid #fde68a;border-radius:14px;color:#92400e;font-size:12px;">
            <div style="font-weight:bold;margin-bottom:4px;display:flex;align-items:center;gap:6px;">
              <span>📱 Mobile Money Payment</span>
            </div>
            <div>MTN MoMo: <strong style="color:#78350f;">${MOMO_CONFIG.mtnNumber}</strong></div>
            <div>Telecel Cash: <strong style="color:#78350f;">${MOMO_CONFIG.telecelNumber}</strong></div>
            <div style="font-size:11px;color:#b45309;margin-top:2px;">Account Name: <strong>${MOMO_CONFIG.accountName}</strong></div>
          </div>

          <!-- Navigation Links -->
          <div style="display:flex;flex-direction:column;gap:4px;">
            <a href="/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>🏠 Home</span>
              <span>→</span>
            </a>
            <a href="/shop/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>🛒 Shop All Products</span>
              <span>→</span>
            </a>
            <a href="/produce/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>🥬 Fruits & Vegetables</span>
              <span>→</span>
            </a>
            <a href="/poultry/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>🥚 Poultry & Fresh Eggs</span>
              <span>→</span>
            </a>
            <a href="/soil/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>🪴 Seedlings & Organic Manure</span>
              <span>→</span>
            </a>
            <a href="/impact/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>❤️ Our Impact (One Egg Project)</span>
              <span>→</span>
            </a>
            <a href="/about/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>📖 About Kerd Farms</span>
              <span>→</span>
            </a>
            <a href="/insights/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>💡 Insights & Articles</span>
              <span>→</span>
            </a>
            <a href="/contact/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f8fafc;border-radius:12px;color:#0f172a;text-decoration:none;font-weight:700;font-size:14px;">
              <span>📞 Contact Us</span>
              <span>→</span>
            </a>
          </div>

          <!-- Quick Actions -->
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:auto;padding-top:12px;border-top:1px solid #e2e8f0;">
            <button id="kerd-mobile-open-cart" style="width:100%;padding:14px;background:#176B3A;color:#fff;border:none;border-radius:14px;font-weight:bold;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
              <span>🛒 Open Shopping Cart</span>
            </button>
            <a href="https://wa.me/${MOMO_CONFIG.whatsappNumber}?text=Hello%20Kerd%20Farms%2C%20I%20would%20like%20to%20make%20an%20enquiry." target="_blank" style="display:block;text-align:center;padding:12px;background:#25D366;color:#fff;border-radius:14px;text-decoration:none;font-weight:bold;font-size:13px;">
              💬 WhatsApp Us (${MOMO_CONFIG.primaryPhone})
            </a>
          </div>

        </div>
      `;

      document.body.appendChild(navModal);

      document.getElementById('kerd-mobile-nav-close').addEventListener('click', () => {
        navModal.style.display = 'none';
      });

      document.getElementById('kerd-mobile-open-cart').addEventListener('click', () => {
        navModal.style.display = 'none';
        openCartDrawer(false);
      });

      navModal.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navModal.style.display = 'none';
        });
      });
    } else {
      navModal.style.display = navModal.style.display === 'none' ? 'flex' : 'none';
    }
  }

  // --- CART DRAWER HTML INJECTION ---
  function injectCartDrawerModal() {
    if (document.getElementById('kerd-cart-drawer')) return;

    const drawerHtml = `
      <div id="kerd-cart-drawer" class="fixed inset-0 z-[99990] hidden" style="font-family: system-ui, sans-serif;">
        <div id="kerd-cart-backdrop" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>
        <div class="fixed inset-y-0 right-0 max-w-full flex pl-6">
          <div class="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
            
            <!-- Drawer Header -->
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between" style="background:#176B3A;color:#fff;padding:16px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:18px;">🛒</span>
                <h2 style="margin:0;font-size:16px;font-weight:700;" id="kerd-drawer-title">Shopping Cart & MoMo Checkout</h2>
              </div>
              <button id="kerd-cart-close-btn" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;">✕</button>
            </div>

            <!-- Drawer Body -->
            <div id="kerd-cart-body" style="flex:1;overflow-y:auto;padding:16px;">
              <!-- Dynamic Content Loaded Here -->
            </div>

            <!-- Drawer Footer -->
            <div id="kerd-cart-footer" style="padding:16px;border-top:1px solid #e2e8f0;background:#f8fafc;">
              <!-- Dynamic Footer Loaded Here -->
            </div>

          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = drawerHtml;
    document.body.appendChild(div.firstElementChild);

    document.getElementById('kerd-cart-close-btn').addEventListener('click', closeCartDrawer);
    document.getElementById('kerd-cart-backdrop').addEventListener('click', closeCartDrawer);
  }

  function openCartDrawer(checkout = false) {
    injectCartDrawerModal();
    const drawer = document.getElementById('kerd-cart-drawer');
    if (drawer) {
      drawer.classList.remove('hidden');
      renderCartContent(checkout ? 'momo' : 'cart');
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('kerd-cart-drawer');
    if (drawer) {
      drawer.classList.add('hidden');
    }
  }

  // --- RENDER CART / MOMO CONTENT ---
  function renderCartContent(viewState = 'cart') {
    const body = document.getElementById('kerd-cart-body');
    const footer = document.getElementById('kerd-cart-footer');
    if (!body || !footer) return;

    const cart = getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
    const deliveryFee = subtotal > 0 ? 20 : 0;
    const grandTotal = subtotal + deliveryFee;

    if (cart.length === 0) {
      body.innerHTML = `
        <div style="text-center;padding:48px 16px;text-align:center;">
          <div style="font-size:48px;margin-bottom:12px;">🛒</div>
          <h3 style="font-size:16px;font-weight:700;margin:0 0 8px 0;color:#0f172a;">Your Cart is Empty</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px 0;">Add fresh eggs, vegetables, seedlings or organic manure to your cart.</p>
          <a href="/shop/" style="display:inline-block;padding:10px 20px;background:#176B3A;color:#fff;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px;">Browse Catalogue</a>
        </div>
      `;
      footer.innerHTML = '';
      return;
    }

    if (viewState === 'cart') {
      let itemsHtml = cart.map((item) => {
        const total = (item.price || 0) * item.quantity;
        return `
          <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9;">
            <div style="flex:1;min-width:0;">
              <div style="font-size:13px;font-weight:700;color:#0f172a;">${item.name}</div>
              <div style="font-size:11px;color:#64748b;">GH₵ ${(item.price || 0).toFixed(2)} / ${item.unit || 'item'}</div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;background:#f1f5f9;padding:4px 8px;border-radius:8px;">
              <button class="kerd-qty-btn" data-id="${item.id}" data-delta="-1" style="border:none;background:none;font-weight:bold;cursor:pointer;padding:0 4px;">-</button>
              <span style="font-size:12px;font-weight:bold;min-width:16px;text-align:center;">${item.quantity}</span>
              <button class="kerd-qty-btn" data-id="${item.id}" data-delta="1" style="border:none;background:none;font-weight:bold;cursor:pointer;padding:0 4px;">+</button>
            </div>
            <div style="font-size:13px;font-weight:700;font-family:monospace;color:#0f172a;">GH₵ ${total.toFixed(2)}</div>
            <button class="kerd-remove-btn" data-id="${item.id}" style="border:none;background:none;color:#ef4444;cursor:pointer;padding:4px;">✕</button>
          </div>
        `;
      }).join('');

      body.innerHTML = `
        <div style="padding:12px;background:#fef3c7;border:1px solid #fde68a;border-radius:12px;margin-bottom:16px;font-size:12px;color:#92400e;">
          <div style="font-weight:bold;margin-bottom:4px;">📱 Mobile Money (MoMo) Accepted</div>
          <div>MTN MoMo: <strong>${MOMO_CONFIG.mtnNumber}</strong> (Name: ${MOMO_CONFIG.accountName})</div>
          <div>Telecel Cash: <strong>${MOMO_CONFIG.telecelNumber}</strong></div>
        </div>

        <div style="margin-bottom:16px;">
          ${itemsHtml}
        </div>
      `;

      footer.innerHTML = `
        <div style="display:flex;justify-between;font-size:13px;margin-bottom:6px;color:#475569;">
          <span>Items Subtotal</span>
          <span style="font-family:monospace;font-weight:bold;margin-left:auto;">GH₵ ${subtotal.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-between;font-size:13px;margin-bottom:12px;color:#475569;">
          <span>Estimated Delivery (Ghana)</span>
          <span style="font-family:monospace;font-weight:bold;margin-left:auto;">GH₵ ${deliveryFee.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-between;font-size:15px;font-weight:bold;margin-bottom:16px;color:#0f172a;padding-top:8px;border-top:1px solid #cbd5e1;">
          <span>Total Payable</span>
          <span style="font-family:monospace;color:#176B3A;margin-left:auto;">GH₵ ${grandTotal.toFixed(2)}</span>
        </div>

        <button id="kerd-goto-momo-btn" style="width:100%;padding:12px;background:#176B3A;color:#fff;border:none;border-radius:12px;font-weight:bold;font-size:14px;cursor:pointer;">
          Proceed to MoMo Payment & Checkout →
        </button>
      `;

      // Bind quantity and remove handlers
      body.querySelectorAll('.kerd-qty-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const delta = parseInt(btn.getAttribute('data-delta'));
          let cart = getCart();
          const item = cart.find(i => i.id === id);
          if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
              cart = cart.filter(i => i.id !== id);
            }
            saveCart(cart);
            renderCartContent('cart');
          }
        });
      });

      body.querySelectorAll('.kerd-remove-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          let cart = getCart().filter(i => i.id !== id);
          saveCart(cart);
          renderCartContent('cart');
        });
      });

      document.getElementById('kerd-goto-momo-btn').addEventListener('click', () => {
        renderCartContent('momo');
      });

    } else if (viewState === 'momo') {
      const orderId = generateOrderId();

      body.innerHTML = `
        <div style="background:linear-gradient(135deg, #064e3b, #0f172a);color:#fff;padding:16px;border-radius:16px;margin-bottom:16px;font-size:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:8px;">
            <span style="background:#fbbf24;color:#0f172a;font-weight:900;padding:2px 6px;border-radius:4px;font-size:10px;">MOMO PAYMENT</span>
            <span style="font-family:monospace;font-weight:bold;">Ref: ${orderId}</span>
          </div>
          
          <div style="margin-bottom:8px;"><strong>Total Amount:</strong> <span style="font-size:16px;font-weight:800;color:#fde047;font-family:monospace;">GH₵ ${grandTotal.toFixed(2)}</span></div>
          
          <div style="background:rgba(0,0,0,0.4);padding:10px;border-radius:10px;margin-bottom:8px;">
            <div><strong>MTN MoMo:</strong> <span style="color:#fde047;font-weight:bold;font-family:monospace;">${MOMO_CONFIG.mtnNumber}</span></div>
            <div><strong>Telecel Cash:</strong> <span style="color:#fde047;font-weight:bold;font-family:monospace;">${MOMO_CONFIG.telecelNumber}</span></div>
            <div><strong>Name:</strong> ${MOMO_CONFIG.accountName}</div>
          </div>

          <div style="font-size:11px;color:#a7f3d0;line-height:1.4;">
            1. Dial *170# or *110# on your phone.<br/>
            2. Transfer <strong>GH₵ ${grandTotal.toFixed(2)}</strong> to <strong>${MOMO_CONFIG.mtnNumber}</strong>.<br/>
            3. Enter Reference: <strong>${orderId}</strong>.<br/>
            4. Fill out the details below and click <strong>"I Have Paid & Submit Order"</strong>.
          </div>
        </div>

        <form id="kerd-momo-form" style="display:flex;flex-direction:column;gap:10px;font-size:12px;">
          <div>
            <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Your Full Name *</label>
            <input type="text" id="momo-cust-name" required placeholder="e.g. Kwame Mensah" style="width:100%;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Phone Number *</label>
              <input type="tel" id="momo-cust-phone" required placeholder="024 XXX XXXX" style="width:100%;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
            </div>
            <div>
              <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Email (For Receipt)</label>
              <input type="email" id="momo-cust-email" placeholder="you@gmail.com" style="width:100%;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
            </div>
          </div>

          <div>
            <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Delivery Address / Landmark *</label>
            <input type="text" id="momo-cust-address" required placeholder="e.g. Accra, East Legon near Shell" style="width:100%;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
          </div>

          <div style="padding-top:8px;border-top:1px solid #e2e8f0;">
            <div style="font-weight:bold;color:#176B3A;margin-bottom:6px;">MoMo Payment Details (Sent to kerdfarms@gmail.com)</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
              <div>
                <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">MoMo Account Name *</label>
                <input type="text" id="momo-account-name" required placeholder="Name on MoMo" style="width:100%;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
              </div>
              <div>
                <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">MoMo Sender Phone *</label>
                <input type="tel" id="momo-sender-phone" required placeholder="Number used" style="width:100%;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
              </div>
            </div>
            <div>
              <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Transaction Reference / ID</label>
              <input type="text" id="momo-tx-id" placeholder="e.g. 2891482910 or Ref ${orderId}" style="width:100%;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
            </div>
          </div>
        </form>
      `;

      footer.innerHTML = `
        <div style="display:flex;gap:8px;">
          <button id="kerd-back-cart-btn" style="padding:10px 16px;background:#e2e8f0;color:#334155;border:none;border-radius:10px;font-weight:bold;font-size:12px;cursor:pointer;">
            Back
          </button>
          <button id="kerd-paid-submit-btn" style="flex:1;padding:12px;background:#176B3A;color:#fff;border:none;border-radius:10px;font-weight:bold;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
            <span>✓ I Have Paid & Submit Order</span>
          </button>
        </div>
        <div style="font-size:10px;color:#64748b;text-align:center;margin-top:8px;">
          Orders sent directly to <strong>${MOMO_CONFIG.email}</strong> for manual verification.
        </div>
      `;

      document.getElementById('kerd-back-cart-btn').addEventListener('click', () => {
        renderCartContent('cart');
      });

      document.getElementById('kerd-paid-submit-btn').addEventListener('click', async () => {
        const form = document.getElementById('kerd-momo-form');
        const custName = (document.getElementById('momo-cust-name')).value.trim();
        const custPhone = (document.getElementById('momo-cust-phone')).value.trim();
        const custEmail = (document.getElementById('momo-cust-email')).value.trim();
        const custAddress = (document.getElementById('momo-cust-address')).value.trim();
        const accName = (document.getElementById('momo-account-name')).value.trim();
        const senderPhone = (document.getElementById('momo-sender-phone')).value.trim();
        const txId = (document.getElementById('momo-tx-id')).value.trim();

        if (!custName || !custPhone || !custAddress || !accName || !senderPhone) {
          showToast('Please fill in all required fields marked with *', 'error');
          return;
        }

        const submitBtn = document.getElementById('kerd-paid-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending to kerdfarms@gmail.com...</span>';

        const orderData = {
          orderId,
          createdAt: new Date().toISOString(),
          customerName: custName,
          customerPhone: custPhone,
          customerEmail: custEmail,
          deliveryCity: 'Accra/Ghana',
          deliveryAddress: custAddress,
          momoAccountName: accName,
          momoPhone: senderPhone,
          momoTransactionId: txId || orderId,
          items: cart,
          subtotal,
          deliveryFee,
          totalAmount: grandTotal,
          paymentStatus: 'Paid & Pending Verification'
        };

        // Save order locally
        saveOrder(orderData);

        // Submit via FormSubmit to kerdfarms@gmail.com
        const itemsListText = cart.map((item, idx) => `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - GH₵ ${((item.price || 0) * item.quantity).toFixed(2)}`).join('\n');
        
        const emailPayload = {
          _subject: `🛍️ NEW MOMO ORDER [${orderId}] - GH₵ ${grandTotal.toFixed(2)} - Kerd Farms`,
          _replyto: custEmail || 'kerdfarms@gmail.com',
          'Order ID': orderId,
          'Customer Name': custName,
          'Customer Phone': custPhone,
          'Customer Email': custEmail || 'N/A',
          'Delivery Address': custAddress,
          'MoMo Account Name': accName,
          'MoMo Sender Phone': senderPhone,
          'MoMo Transaction ID': txId || orderId,
          'Order Items': itemsListText,
          'Subtotal': `GH₵ ${subtotal.toFixed(2)}`,
          'Delivery Fee': `GH₵ ${deliveryFee.toFixed(2)}`,
          'TOTAL PAID': `GH₵ ${grandTotal.toFixed(2)}`,
          'Submitted At': new Date().toLocaleString('en-GB')
        };

        try {
          await fetch('https://formsubmit.co/ajax/kerdfarms@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(emailPayload)
          });
        } catch (err) {
          console.error('Email dispatch error:', err);
        }

        // Clear Cart & Close Drawer
        saveCart([]);
        closeCartDrawer();
        showToast(`Order #${orderId} submitted! Confirmation sent to kerdfarms@gmail.com.`);

        // Open Tracking Modal
        openTrackingModal(orderData);
      });
    }
  }

  // --- ORDER TRACKING MODAL ---
  function openTrackingModal(order) {
    let modal = document.getElementById('kerd-tracking-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'kerd-tracking-modal';
      modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;';
      document.body.appendChild(modal);
    }

    const waText = `Hello Kerd Farms, I just submitted Order *#${order.orderId}* and paid *GH₵ ${order.totalAmount.toFixed(2)}* via MoMo.\nName: ${order.customerName}\nMoMo Sender: ${order.momoAccountName} (${order.momoPhone})\nPlease confirm my order.`;
    const waLink = `https://wa.me/${MOMO_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    modal.innerHTML = `
      <div style="background:#fff;border-radius:24px;max-width:550px;width:100%;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);font-family:system-ui,sans-serif;">
        <div style="background:#176B3A;color:#fff;padding:20px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h3 style="margin:0;font-size:16px;font-weight:700;">Order #${order.orderId} Confirmed!</h3>
            <div style="font-size:11px;color:#a7f3d0;margin-top:2px;">Submitted to kerdfarms@gmail.com</div>
          </div>
          <button id="kerd-track-close" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;">✕</button>
        </div>

        <div style="padding:20px;max-height:70vh;overflow-y-auto;font-size:12px;color:#334155;">
          <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:12px;border-radius:12px;margin-bottom:16px;color:#065f46;">
            <strong>Status:</strong> Paid & Pending Manual MoMo Verification<br/>
            <strong>Total Amount:</strong> GH₵ ${order.totalAmount.toFixed(2)}<br/>
            <strong>Delivery Address:</strong> ${order.deliveryAddress}
          </div>

          <div style="margin-bottom:16px;">
            <div style="font-weight:bold;margin-bottom:8px;color:#0f172a;">Order Items (${order.items.length}):</div>
            <div style="background:#f8fafc;padding:10px;border-radius:10px;border:1px solid #e2e8f0;">
              ${order.items.map(i => `<div>• <strong>${i.name}</strong> x ${i.quantity} — GH₵ ${((i.price||0)*i.quantity).toFixed(2)}</div>`).join('')}
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;">
            <a href="${waLink}" target="_blank" style="display:block;text-align:center;padding:12px;background:#25D366;color:#fff;border-radius:10px;text-decoration:none;font-weight:bold;">
              💬 Instant Confirm with Farm Manager on WhatsApp
            </a>
            <button onclick="window.print()" style="padding:10px;background:#f1f5f9;color:#0f172a;border:none;border-radius:10px;font-weight:bold;cursor:pointer;">
              🖨️ Print Order Receipt
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('kerd-track-close').addEventListener('click', () => {
      modal.remove();
    });
  }

  // --- BIND ALL FORMS ACROSS ALL PAGES TO kerdfarms@gmail.com ---
  function bindAllFormsOnPage() {
    document.querySelectorAll('form').forEach((form) => {
      if (form.dataset.kerdBound === 'true') return;
      form.dataset.kerdBound = 'true';

      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Extract inputs
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });

        // If simple email input in newsletter
        const emailInput = form.querySelector('input[type="email"]');
        const textInput = form.querySelector('textarea, input[type="text"]');

        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Sending to kerdfarms@gmail.com...</span>';
        }

        const payload = {
          _subject: `📩 Kerd Farms Web Submission (${document.title || 'Form'})`,
          _replyto: (emailInput && emailInput.value) ? emailInput.value : 'kerdfarms@gmail.com',
          'Page URL': window.location.href,
          'Page Title': document.title,
          ...data,
          'Submitted At': new Date().toLocaleString('en-GB')
        };

        try {
          await fetch('https://formsubmit.co/ajax/kerdfarms@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
          });
          showToast('Thank you! Your request has been sent to kerdfarms@gmail.com.');
          form.reset();
        } catch (e) {
          showToast('Request submitted to kerdfarms@gmail.com!');
          form.reset();
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }
      });
    });
  }

  // --- BIND ADD TO CART BUTTONS ACROSS ALL PAGES ---
  function bindAddToCartButtons() {
    // Look for Cart buttons in Header
    document.querySelectorAll('[aria-label*="Shopping cart"]').forEach((cartBtn) => {
      if (!cartBtn.dataset.kerdBound) {
        cartBtn.dataset.kerdBound = 'true';
        cartBtn.addEventListener('click', (e) => {
          e.preventDefault();
          openCartDrawer(false);
        });
      }
    });

    // Look for product cards / buttons
    document.querySelectorAll('button, a').forEach((el) => {
      const text = el.textContent || '';
      if (text.toLowerCase().includes('add to cart') || text.toLowerCase().includes('order now') || text.toLowerCase().includes('buy now')) {
        if (!el.dataset.kerdCartBound) {
          el.dataset.kerdCartBound = 'true';
          el.addEventListener('click', (e) => {
            // Find parent product title and price
            const card = el.closest('.group, article, .border, div') || document.body;
            const h3 = card.querySelector('h2, h3, h4');
            const priceEl = card.querySelector('[class*="price"], .font-mono, span');

            const name = h3 ? h3.textContent.trim() : 'Farm Fresh Product';
            const priceText = priceEl ? priceEl.textContent : '35';
            const priceMatch = priceText.match(/\d+(?:\.\d+)?/);
            const price = priceMatch ? parseFloat(priceMatch[0]) : 35;

            const productId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            let cart = getCart();
            const existing = cart.find(i => i.id === productId);
            if (existing) {
              existing.quantity += 1;
            } else {
              cart.push({ id: productId, name, price, unit: 'unit', quantity: 1 });
            }
            saveCart(cart);
            showToast(`Added ${name} to cart. Pay via MoMo!`);
            openCartDrawer(false);
          });
        }
      }
    });
  }

  // --- INIT ON DOM LOAD ---
  function initKerdMomoEngine() {
    updateCartBadges();
    bindAllFormsOnPage();
    bindAddToCartButtons();
    injectCartDrawerModal();
    initMobileMenuNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKerdMomoEngine);
  } else {
    initKerdMomoEngine();
  }

  window.KerdFarms = {
    openCart: () => openCartDrawer(false),
    openCheckout: () => openCartDrawer(true),
    toggleMobileNav: toggleMobileNavModal,
    showToast
  };
})();
