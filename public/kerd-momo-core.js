/**
 * Kerd Farms - Unified Navigation, Mobile Dropdown Menu, Cart, MoMo Checkout & Form Engine
 * Official MoMo & Contact Number: 024 013 5545 (KERD FARMS)
 * Official Email: kerdfarms@gmail.com
 */

(function () {
  const MOMO_CONFIG = {
    accountName: 'DANIEL KERDMOTT ESSIEN',
    businessName: 'KERD FARMS',
    momoNumber: '024 013 5545',
    primaryPhone: '+233 24 013 5545',
    email: 'info@kerdfarms.com',
    secondaryEmail: 'kerdfarms@gmail.com',
    whatsappNumber: '233240135545',
  };

  const CART_KEY = 'kerdfarms_cart';
  const ORDERS_KEY = 'kerdfarms_orders';

  // --- CART & ORDER STATE ---
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

  // --- UPDATE CART BADGES ---
  function updateCartBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll('[aria-label*="Shopping cart"]').forEach((btn) => {
      let badge = btn.querySelector('.kerd-cart-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'kerd-cart-badge';
        badge.style.cssText =
          'position:absolute;top:-2px;right:-2px;background:#176B3A;color:#fff;font-weight:800;font-size:10px;padding:1px 5px;border-radius:9999px;min-width:17px;text-align:center;line-height:14px;box-shadow:0 2px 6px rgba(0,0,0,0.2);';
        btn.appendChild(badge);
      }
      badge.textContent = String(totalCount);
      btn.setAttribute('aria-label', `Shopping cart, ${totalCount} items`);
    });

    const mobileCartCount = document.getElementById('kerd-mobile-cart-count');
    if (mobileCartCount) {
      mobileCartCount.textContent = String(totalCount);
    }
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
      background: ${type === 'success' ? '#10472b' : '#842029'};
      color: #ffffff;
      padding: 12px 18px;
      border-radius: 10px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 12px 28px -5px rgba(0,0,0,0.3);
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: opacity 0.25s ease, transform 0.25s ease;
    `;
    toastBox.innerHTML = `<span>${message}</span>`;
    toast.appendChild(toastBox);

    setTimeout(() => {
      toastBox.style.opacity = '0';
      toastBox.style.transform = 'translateY(6px)';
      setTimeout(() => toastBox.remove(), 260);
    }, 3200);
  }

  // --- MOBILE & TABLET DROPDOWN MENU ---
  function ensureMobileDropdownCreated() {
    const header = document.querySelector('header');
    if (!header) return null;

    const menuBtns = header.querySelectorAll('button[aria-label="Open menu"], button[aria-label="Close menu"], #kerd-hamburger-btn');
    menuBtns.forEach((btn) => {
      btn.classList.remove('sf-hidden');
      btn.id = 'kerd-hamburger-btn';
      btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') || 'false');
    });

    let dropdown = document.getElementById('kerd-mobile-dropdown');
    if (dropdown) return dropdown;

    const currentPath = window.location.pathname;
    const isActive = (p) => {
      if (p === '/') return currentPath === '/' || currentPath === '/index.html';
      return currentPath.startsWith(p);
    };

    dropdown = document.createElement('div');
    dropdown.id = 'kerd-mobile-dropdown';
    dropdown.setAttribute('aria-hidden', 'true');
    dropdown.style.cssText = `
      display: none;
      background: #ffffff;
      border-top: 1px solid rgba(16, 71, 43, 0.12);
      border-bottom: 1px solid rgba(16, 71, 43, 0.16);
      box-shadow: 0 20px 40px -12px rgba(16, 71, 43, 0.18);
      width: 100%;
      z-index: 9998;
      font-family: inherit;
    `;

    const linkStyle = (active) => `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 20px;
      color: ${active ? '#176B3A' : '#102a1d'};
      background: ${active ? '#edf6f0' : 'transparent'};
      font-weight: ${active ? '700' : '500'};
      font-size: 15px;
      text-decoration: none;
      border-bottom: 1px solid rgba(16, 71, 43, 0.07);
    `;

    const subLinkStyle = (active) => `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 11px 20px 11px 36px;
      color: ${active ? '#176B3A' : '#2d4b3c'};
      background: ${active ? '#e5f2e9' : '#f8fbf9'};
      font-weight: ${active ? '700' : '500'};
      font-size: 13.5px;
      text-decoration: none;
      border-bottom: 1px solid rgba(16, 71, 43, 0.06);
    `;

    dropdown.innerHTML = `
      <div style="max-width:90rem;margin:0 auto;">
        <nav aria-label="Mobile Navigation" style="display:flex;flex-direction:column;">
          <a href="/" style="${linkStyle(isActive('/'))}">
            <span>Home</span>
            <span style="font-size:12px;opacity:0.55;">→</span>
          </a>
          <a href="/about/" style="${linkStyle(isActive('/about'))}">
            <span>About Us</span>
            <span style="font-size:12px;opacity:0.55;">→</span>
          </a>

          <!-- Shop Collapsible Section -->
          <div style="border-bottom:1px solid rgba(16, 71, 43, 0.07);">
            <button type="button" id="kerd-mobile-shop-toggle" aria-expanded="true" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:13px 20px;background:transparent;border:none;color:#102a1d;font-weight:600;font-size:15px;cursor:pointer;text-align:left;font-family:inherit;">
              <span>Shop</span>
              <span id="kerd-mobile-shop-chevron" style="font-size:12px;transition:transform 0.2s ease;transform:rotate(180deg);">▼</span>
            </button>
            <div id="kerd-mobile-shop-sub" style="display:flex;flex-direction:column;">
              <a href="/shop/" style="${subLinkStyle(isActive('/shop'))}">
                <span>All Products Catalogue</span>
                <span style="font-size:11px;opacity:0.5;">→</span>
              </a>
              <a href="/produce/" style="${subLinkStyle(isActive('/produce'))}">
                <span>Fruits &amp; Vegetables</span>
                <span style="font-size:11px;opacity:0.5;">→</span>
              </a>
              <a href="/poultry/" style="${subLinkStyle(isActive('/poultry'))}">
                <span>Poultry &amp; Eggs</span>
                <span style="font-size:11px;opacity:0.5;">→</span>
              </a>
              <a href="/soil/" style="${subLinkStyle(isActive('/soil'))}">
                <span>Seedlings &amp; Manure</span>
                <span style="font-size:11px;opacity:0.5;">→</span>
              </a>
            </div>
          </div>

          <a href="/impact/" style="${linkStyle(isActive('/impact'))}">
            <span>Our Impact</span>
            <span style="font-size:12px;opacity:0.55;">→</span>
          </a>
          <a href="/insights/" style="${linkStyle(isActive('/insights'))}">
            <span>Insights</span>
            <span style="font-size:12px;opacity:0.55;">→</span>
          </a>
          <a href="/contact/" style="${linkStyle(isActive('/contact'))}">
            <span>Contact</span>
            <span style="font-size:12px;opacity:0.55;">→</span>
          </a>
        </nav>

        <div style="padding:14px 20px;background:#f4f8f5;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;">
          <div style="font-size:12px;color:#10472b;">
            <strong>MoMo Number:</strong> <span style="font-family:monospace;font-weight:700;">${MOMO_CONFIG.momoNumber}</span> (${MOMO_CONFIG.accountName})
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" id="kerd-mobile-menu-cart-btn" style="padding:8px 14px;background:#176B3A;color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;">
              View Cart (<span id="kerd-mobile-cart-count">0</span>)
            </button>
            <a href="https://wa.me/${MOMO_CONFIG.whatsappNumber}?text=Hello%20Kerd%20Farms%2C%20I%20would%20like%20to%20make%20an%20enquiry." target="_blank" rel="noopener noreferrer" style="padding:8px 14px;background:#10472b;color:#fff;border-radius:6px;font-size:12px;font-weight:700;text-decoration:none;">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;

    header.appendChild(dropdown);

    const shopToggle = dropdown.querySelector('#kerd-mobile-shop-toggle');
    const shopSub = dropdown.querySelector('#kerd-mobile-shop-sub');
    const shopChevron = dropdown.querySelector('#kerd-mobile-shop-chevron');
    if (shopToggle && shopSub) {
      shopToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isExpanded = shopToggle.getAttribute('aria-expanded') === 'true';
        shopToggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        shopSub.style.display = isExpanded ? 'none' : 'flex';
        if (shopChevron) {
          shopChevron.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      });
    }

    const mobileCartBtn = dropdown.querySelector('#kerd-mobile-menu-cart-btn');
    if (mobileCartBtn) {
      mobileCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileDropdown();
        openCartDrawer(false);
      });
    }

    updateCartBadges();
    return dropdown;
  }

  function setHamburgerIconState(isOpen) {
    const btn = document.querySelector('#kerd-hamburger-btn, button[aria-label="Open menu"], button[aria-label="Close menu"]');
    if (!btn) return;
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    if (isOpen) {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-5 w-5"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;
    } else {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`;
    }
  }

  function closeMobileDropdown() {
    const dropdown = document.getElementById('kerd-mobile-dropdown');
    if (dropdown) {
      dropdown.style.display = 'none';
      dropdown.setAttribute('aria-hidden', 'true');
    }
    setHamburgerIconState(false);
  }

  function toggleMobileDropdown(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const dropdown = ensureMobileDropdownCreated();
    if (!dropdown) return;
    const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
    if (isHidden) {
      dropdown.style.display = 'block';
      dropdown.setAttribute('aria-hidden', 'false');
      setHamburgerIconState(true);
    } else {
      closeMobileDropdown();
    }
  }

  // --- DESKTOP SHOP DROPDOWN MENU FIX ---
  function initDesktopShopMenu() {
    document.querySelectorAll('nav button, nav a, header button, header div').forEach((el) => {
      const text = (el.textContent || '').trim();
      if (text.startsWith('Shop') || text.includes('Shop ▾') || text.includes('Shop ▼')) {
        el.style.cursor = 'pointer';
        let dropdownMenu = el.nextElementSibling || el.parentElement.querySelector('div, ul');
        
        el.addEventListener('click', (e) => {
          const hasSubmenu = dropdownMenu && (dropdownMenu.querySelectorAll('a').length > 0 || dropdownMenu.id === 'kerd-shop-menu');
          if (hasSubmenu) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dropdownMenu.style.display === 'block';
            document.querySelectorAll('.kerd-desktop-dropdown').forEach(d => d.style.display = 'none');
            dropdownMenu.style.display = isOpen ? 'none' : 'block';
            dropdownMenu.classList.add('kerd-desktop-dropdown');
            dropdownMenu.style.position = 'absolute';
            dropdownMenu.style.zIndex = '9999';
            el.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
          }
        });
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav') && !e.target.closest('header')) {
        document.querySelectorAll('.kerd-desktop-dropdown').forEach(d => d.style.display = 'none');
      }
    });
  }

  // --- DISMISS ANNOUNCEMENT BANNER ---
  function initAnnouncementDismiss() {
    document.querySelectorAll('button[aria-label="Dismiss announcement"]').forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        const banner = btn.closest('.bg-deep');
        if (banner) banner.style.display = 'none';
      };
    });
  }

  // --- FAQ ACCORDIONS ---
  function initFaqAccordions() {
    document.querySelectorAll('button[aria-expanded]').forEach((btn) => {
      if (
        btn.id === 'kerd-hamburger-btn' ||
        btn.id === 'kerd-mobile-shop-toggle' ||
        btn.getAttribute('aria-label') === 'Order on WhatsApp'
      ) {
        return;
      }
      const content = btn.nextElementSibling;
      if (!content) return;

      btn.onclick = (e) => {
        e.preventDefault();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        content.style.display = expanded ? 'none' : 'block';
      };
    });
  }

  // --- SHOP CATEGORY FILTERING & SEARCH ---
  function initShopFiltering() {
    const searchInput = document.querySelector('input[placeholder*="Search"], input[type="search"]');
    const productCards = Array.from(document.querySelectorAll('h3 a[href^="/product/"]')).map((a) =>
      a.closest('article, .border, .group, div.flex.flex-col') || a.parentElement.parentElement
    );

    if (productCards.length === 0) return;

    function filterCards(queryText, categoryFilter) {
      const q = (queryText || '').toLowerCase().trim();
      const cat = (categoryFilter || 'all').toLowerCase().trim();

      productCards.forEach((card) => {
        if (!card) return;
        const text = (card.textContent || '').toLowerCase();
        const matchesQuery = !q || text.includes(q);
        let matchesCat = true;
        if (cat && cat !== 'all' && cat !== 'all categories') {
          if (cat.includes('poultry') || cat.includes('egg')) {
            matchesCat = text.includes('egg') || text.includes('poultry') || text.includes('crate');
          } else if (cat.includes('fruit') && cat.includes('veg')) {
            matchesCat = text.includes('fruits') || text.includes('vegetables') || text.includes('kg') || text.includes('piece');
          } else if (cat.includes('fruit')) {
            matchesCat = text.includes('fruits') || text.includes('coconut') || text.includes('passion') || text.includes('banana') || text.includes('lemon') || text.includes('lime') || text.includes('apple');
          } else if (cat.includes('veg')) {
            matchesCat = text.includes('vegetables');
          } else if (cat.includes('manure') || cat.includes('fertilizer') || cat.includes('soil') || cat.includes('compost')) {
            matchesCat = text.includes('manure') || text.includes('fertilizer') || text.includes('compost') || text.includes('inputs');
          }
        }
        card.style.display = matchesQuery && matchesCat ? '' : 'none';
      });
    }

    if (searchInput) {
      searchInput.oninput = (e) => {
        filterCards(e.target.value, 'all');
      };
    }
  }

  // --- INSIGHTS TOPIC CATEGORY FILTERING ---
  function initInsightsFiltering() {
    const filterButtons = Array.from(document.querySelectorAll('button')).filter((b) => {
      const text = (b.textContent || '').trim().toUpperCase();
      return (
        text === 'ALL TOPICS' ||
        text === 'POULTRY FARMING' ||
        text === 'EGG PRODUCTION AND MARKETING' ||
        text === 'FRUITS AND VEGETABLES' ||
        text === 'GHANAIAN AGRICULTURAL MARKETS' ||
        text === 'AFRICAN AGRIBUSINESS' ||
        text === 'MANURE, COMPOST AND FERTILIZERS' ||
        text === 'SOIL HEALTH AND SUSTAINABLE FARMING' ||
        text === 'AGRICULTURAL DISTRIBUTION AND LOGISTICS' ||
        text === 'CHILD NUTRITION AND FOOD EDUCATION'
      );
    });

    if (filterButtons.length === 0) return;

    const articleCards = Array.from(document.querySelectorAll('article.group, .mt-12 article, .mt-16 article'));
    const searchInput = document.querySelector('input[placeholder*="Search articles"]');

    let currentCategory = 'ALL TOPICS';
    let currentSearch = '';

    function applyFilter() {
      const cat = currentCategory.toUpperCase();
      const q = currentSearch.toLowerCase();

      articleCards.forEach((card) => {
        const text = (card.textContent || '').toLowerCase();
        let matchesCategory = false;

        if (cat === 'ALL TOPICS') {
          matchesCategory = true;
        } else if (cat === 'POULTRY FARMING') {
          matchesCategory = text.includes('poultry') || text.includes('egg');
        } else if (cat === 'EGG PRODUCTION AND MARKETING') {
          matchesCategory = text.includes('egg') || text.includes('poultry') || text.includes('market');
        } else if (cat === 'FRUITS AND VEGETABLES') {
          matchesCategory = text.includes('fruit') || text.includes('vegetable') || text.includes('produce') || text.includes('post-harvest');
        } else if (cat === 'GHANAIAN AGRICULTURAL MARKETS') {
          matchesCategory = text.includes('ghana') || text.includes('market') || text.includes('producer') || text.includes('poultry');
        } else if (cat === 'AFRICAN AGRIBUSINESS') {
          matchesCategory = text.includes('agribusiness') || text.includes('africa') || text.includes('ghana') || text.includes('development');
        } else if (cat === 'MANURE, COMPOST AND FERTILIZERS') {
          matchesCategory = text.includes('manure') || text.includes('compost') || text.includes('fertilizer') || text.includes('soil');
        } else if (cat === 'SOIL HEALTH AND SUSTAINABLE FARMING') {
          matchesCategory = text.includes('soil') || text.includes('manure') || text.includes('compost') || text.includes('sustainable');
        } else if (cat === 'AGRICULTURAL DISTRIBUTION AND LOGISTICS') {
          matchesCategory = text.includes('distribution') || text.includes('logistics') || text.includes('post-harvest') || text.includes('transport');
        } else if (cat === 'CHILD NUTRITION AND FOOD EDUCATION') {
          matchesCategory = text.includes('child') || text.includes('nutrition') || text.includes('stunting') || text.includes('food');
        } else {
          matchesCategory = text.includes(cat.toLowerCase());
        }

        const matchesQuery = !q || text.includes(q);
        const shouldShow = matchesCategory && matchesQuery;

        const container = card.closest('div[style*="opacity"], .group') || card;
        container.style.display = shouldShow ? '' : 'none';
      });

      // Update button visual styles
      filterButtons.forEach((btn) => {
        const btnText = (btn.textContent || '').trim().toUpperCase();
        if (btnText === cat) {
          btn.className = 'px-4 py-2.5 text-[0.65rem] font-semibold tracking-[0.12em] transition bg-primary text-white';
          btn.style.backgroundColor = '#176B3A';
          btn.style.color = '#ffffff';
          btn.style.borderColor = '#176B3A';
        } else {
          btn.className = 'px-4 py-2.5 text-[0.65rem] font-semibold tracking-[0.12em] transition border border-primary/15 text-ink/70 hover:border-primary/40';
          btn.style.backgroundColor = 'transparent';
          btn.style.color = '';
          btn.style.borderColor = '';
        }
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategory = (btn.textContent || '').trim().toUpperCase();
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim();
        applyFilter();
      });
    }
  }

  // --- IMPACT PAGE NUMBER COUNTERS (150.2, 42.8, 466, 673, 17%) ---
  function initImpactNumberCounters() {
    const numberSpans = Array.from(document.querySelectorAll('.font-display')).filter((el) => {
      const text = (el.textContent || '').trim();
      return (
        text === '150.2' ||
        text === '42.8' ||
        text === '466' ||
        text === '673' ||
        text === '17%'
      );
    });

    if (numberSpans.length === 0) return;

    function easeOutExpo(x) {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    function animateNumber(element, targetNum, decimals, suffix, duration = 2000) {
      let startTime = null;
      element.textContent = '0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : '') + suffix;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = easeOutExpo(progress);
        const current = targetNum * eased;
        element.textContent = current.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = targetNum.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              observer.unobserve(el);
              const text = (el.textContent || '').trim();
              const hasPercent = text.includes('%');
              const rawNumber = parseFloat(text.replace('%', ''));
              const decimals = text.includes('.') ? 1 : 0;
              const suffix = hasPercent ? '%' : '';

              if (!isNaN(rawNumber)) {
                animateNumber(el, rawNumber, decimals, suffix, 2000);
              }
            }
          });
        },
        { threshold: 0.15 }
      );

      numberSpans.forEach((span) => observer.observe(span));
    }
  }

  // --- CART & MOMO PAYMENT DRAWER ---
  function injectCartDrawerModal() {
    if (document.getElementById('kerd-cart-drawer')) return;

    const drawerHtml = `
      <div id="kerd-cart-drawer" style="position:fixed;inset:0;z-index:99990;display:none;font-family:system-ui,-apple-system,sans-serif;">
        <div id="kerd-cart-backdrop" style="position:fixed;inset:0;background:rgba(15,23,42,0.6);backdrop-filter:blur(3px);"></div>
        <div style="position:fixed;top:0;bottom:0;right:0;max-width:100%;display:flex;padding-left:24px;">
          <div style="width:100vw;max-width:440px;background:#ffffff;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;border-left:1px solid #e2e8f0;">
            <div style="background:#176B3A;color:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:18px;">🛒</span>
                <h2 style="margin:0;font-size:15px;font-weight:700;">Shopping Cart &amp; MoMo Checkout</h2>
              </div>
              <button type="button" id="kerd-cart-close-btn" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1;">✕</button>
            </div>
            <div id="kerd-cart-body" style="flex:1;overflow-y:auto;padding:18px;"></div>
            <div id="kerd-cart-footer" style="padding:16px 18px;border-top:1px solid #e2e8f0;background:#f8fafc;"></div>
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
      drawer.style.display = 'block';
      renderCartContent(checkout ? 'momo' : 'cart');
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('kerd-cart-drawer');
    if (drawer) {
      drawer.style.display = 'none';
    }
  }

  function renderCartContent(viewState = 'cart') {
    const body = document.getElementById('kerd-cart-body');
    const footer = document.getElementById('kerd-cart-footer');
    if (!body || !footer) return;

    const cart = getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
    const hasQuoteItems = cart.some((item) => !item.price || item.price === 0);
    const deliveryFee = subtotal > 0 ? 20 : 0;
    const grandTotal = subtotal + deliveryFee;

    if (cart.length === 0) {
      body.innerHTML = `
        <div style="padding:48px 16px;text-align:center;">
          <div style="font-size:44px;margin-bottom:12px;">🛒</div>
          <h3 style="font-size:16px;font-weight:700;margin:0 0 8px 0;color:#0f172a;">Your Cart is Empty</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 18px 0;">Add fresh eggs, fruits, vegetables, seedlings or organic manure to your cart.</p>
          <a href="/shop/" style="display:inline-block;padding:11px 22px;background:#176B3A;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">Browse Catalogue</a>
        </div>
      `;
      footer.innerHTML = '';
      return;
    }

    if (viewState === 'cart') {
      const itemsHtml = cart
        .map((item) => {
          const isQuote = !item.price || item.price === 0;
          const total = (item.price || 0) * item.quantity;
          return `
          <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #f1f5f9;">
            <div style="flex:1;min-width:0;">
              <div style="font-size:13px;font-weight:700;color:#0f172a;">${item.name}</div>
              <div style="font-size:11px;color:#64748b;">${isQuote ? 'Price confirmed on order' : `GH₵ ${item.price.toFixed(2)} / ${item.unit || 'unit'}`}</div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;background:#f1f5f9;padding:4px 8px;border-radius:8px;">
              <button type="button" class="kerd-qty-btn" data-id="${item.id}" data-delta="-1" style="border:none;background:none;font-weight:bold;cursor:pointer;padding:0 4px;">-</button>
              <span style="font-size:12px;font-weight:bold;min-width:16px;text-align:center;">${item.quantity}</span>
              <button type="button" class="kerd-qty-btn" data-id="${item.id}" data-delta="1" style="border:none;background:none;font-weight:bold;cursor:pointer;padding:0 4px;">+</button>
            </div>
            <div style="font-size:13px;font-weight:700;font-family:monospace;color:#0f172a;">
              ${isQuote ? 'Quote' : `GH₵ ${total.toFixed(2)}`}
            </div>
            <button type="button" class="kerd-remove-btn" data-id="${item.id}" style="border:none;background:none;color:#ef4444;cursor:pointer;padding:4px;">✕</button>
          </div>
        `;
        })
        .join('');

      body.innerHTML = `
        <div style="padding:13px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;margin-bottom:16px;font-size:12px;color:#065f46;">
          <div style="font-weight:800;margin-bottom:4px;color:#047857;">📱 Mobile Money (MoMo) Payment Details</div>
          <div>MoMo Number: <strong style="font-size:13.5px;font-family:monospace;">${MOMO_CONFIG.momoNumber}</strong></div>
          <div>Account Name: <strong>${MOMO_CONFIG.accountName}</strong></div>
        </div>
        <div>${itemsHtml}</div>
      `;

      footer.innerHTML = `
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;color:#475569;">
          <span>Items Subtotal</span>
          <span style="font-family:monospace;font-weight:bold;">GH₵ ${subtotal.toFixed(2)}${hasQuoteItems ? ' + Quote items' : ''}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:10px;color:#475569;">
          <span>Estimated Delivery</span>
          <span style="font-family:monospace;font-weight:bold;">GH₵ ${deliveryFee.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:bold;margin-bottom:14px;color:#0f172a;padding-top:8px;border-top:1px solid #cbd5e1;">
          <span>Total Payable</span>
          <span style="font-family:monospace;color:#176B3A;">GH₵ ${grandTotal.toFixed(2)}</span>
        </div>
        <button type="button" id="kerd-send-wa-cart-btn" style="width:100%;padding:14px;background:#176B3A;color:#fff;border:none;border-radius:10px;font-weight:800;font-size:13.5px;cursor:pointer;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(23,107,58,0.35);">
          <span>Confirm &amp; Send Order via WhatsApp</span>
        </button>
        <button type="button" id="kerd-goto-momo-btn" style="width:100%;padding:10px;background:#f8fafc;color:#1e293b;border:1px solid #cbd5e1;border-radius:8px;font-weight:600;font-size:12px;cursor:pointer;">
          Enter MoMo Transaction ID &amp; Address →
        </button>
      `;

      body.querySelectorAll('.kerd-qty-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const delta = parseInt(btn.getAttribute('data-delta'), 10);
          let current = getCart();
          const item = current.find((i) => i.id === id);
          if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
              current = current.filter((i) => i.id !== id);
            }
            saveCart(current);
            renderCartContent('cart');
          }
        });
      });

      body.querySelectorAll('.kerd-remove-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const current = getCart().filter((i) => i.id !== id);
          saveCart(current);
          renderCartContent('cart');
        });
      });

      const waBtn = document.getElementById('kerd-send-wa-cart-btn');
      if (waBtn) {
        waBtn.addEventListener('click', () => {
          const currentCart = getCart();
          if (currentCart.length === 0) return;
          const orderId = generateOrderId();
          const itemLines = currentCart
            .map(
              (i, idx) =>
                `${idx + 1}. *${i.name}* (${i.unit || 'Standard Pack'})\n   • Qty: ${i.quantity} | Price: GH₵ ${Number(i.price || 0).toFixed(2)} | Total: GH₵ ${(Number(i.price || 0) * i.quantity).toFixed(2)}`
            )
            .join('\n\n');

          const messageText = 
`Hello Kerd Farms (+233 24 013 5545), I would like to place an order from kerdfarms.com.

*Order Reference:* ${orderId}

*--- ORDERED PRODUCTS ---*
${itemLines}

*--- ORDER TOTALS (GH₵) ---*
• Items Subtotal: GH₵ ${subtotal.toFixed(2)}
• Estimated Delivery Fee: GH₵ ${deliveryFee.toFixed(2)}
• *TOTAL AMOUNT PAYABLE: GH₵ ${grandTotal.toFixed(2)}*

*--- MOBILE MONEY (MoMo) PAYMENT DETAILS ---*
• MoMo Account Name: ${MOMO_CONFIG.accountName}
• Official MoMo Number: ${MOMO_CONFIG.momoNumber}
• Payment Status: Ready for verification upon order review

Please confirm product availability, delivery scheduling, and final arrangements. Thank you!`;

          window.open('https://wa.me/233240135545?text=' + encodeURIComponent(messageText), '_blank');

          saveOrder({
            orderId,
            createdAt: new Date().toISOString(),
            customerName: 'WhatsApp Order',
            customerPhone: '',
            customerEmail: 'info@kerdfarms.com',
            deliveryAddress: 'To be confirmed on WhatsApp',
            momoAccountName: MOMO_CONFIG.accountName,
            momoPhone: MOMO_CONFIG.momoNumber,
            items: currentCart,
            subtotal,
            deliveryFee,
            totalAmount: grandTotal,
            paymentStatus: 'Submitted via WhatsApp (Pending Confirmation)',
          });

          saveCart([]);
          closeCartDrawer();
          showToast('Order summary opened in WhatsApp!');
        });
      }

      document.getElementById('kerd-goto-momo-btn').addEventListener('click', () => {
        renderCartContent('momo');
      });
    } else if (viewState === 'momo') {
      const orderId = generateOrderId();
      body.innerHTML = `
        <div style="background:linear-gradient(135deg, #10472b, #0f172a);color:#fff;padding:16px;border-radius:12px;margin-bottom:16px;font-size:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:8px;">
            <span style="background:#fbbf24;color:#0f172a;font-weight:900;padding:2px 7px;border-radius:4px;font-size:10px;">MOMO PAYMENT</span>
            <span style="font-family:monospace;font-weight:bold;">Order Ref: ${orderId}</span>
          </div>
          <div style="margin-bottom:8px;"><strong>Amount to Pay:</strong> <span style="font-size:16px;font-weight:800;color:#fde047;font-family:monospace;">GH₵ ${grandTotal.toFixed(2)}</span></div>
          <div style="background:rgba(0,0,0,0.35);padding:10px 12px;border-radius:8px;margin-bottom:8px;">
            <div style="font-size:13px;"><strong>MoMo Number:</strong> <span style="color:#fde047;font-weight:800;font-family:monospace;">${MOMO_CONFIG.momoNumber}</span></div>
            <div><strong>Account Name:</strong> ${MOMO_CONFIG.accountName}</div>
          </div>
        </div>
        <form id="kerd-momo-form" style="display:flex;flex-direction:column;gap:10px;font-size:12px;">
          <div>
            <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Your Full Name *</label>
            <input type="text" id="momo-cust-name" required placeholder="e.g. Kwame Mensah" style="width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Phone Number *</label>
              <input type="tel" id="momo-cust-phone" required placeholder="024 XXX XXXX" style="width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
            </div>
            <div>
              <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Email Address</label>
              <input type="email" id="momo-cust-email" placeholder="you@gmail.com" style="width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
            </div>
          </div>
          <div>
            <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">Delivery Location / Address *</label>
            <input type="text" id="momo-cust-address" required placeholder="e.g. East Legon, Accra" style="width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
          </div>
          <div style="padding-top:8px;border-top:1px solid #e2e8f0;">
            <div style="font-weight:bold;color:#176B3A;margin-bottom:6px;">MoMo Payment Confirmation</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
              <div>
                <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">MoMo Sender Name *</label>
                <input type="text" id="momo-account-name" required placeholder="Name on MoMo" style="width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
              </div>
              <div>
                <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">MoMo Sender Number *</label>
                <input type="tel" id="momo-sender-phone" required placeholder="Number used to pay" style="width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
              </div>
            </div>
            <div>
              <label style="display:block;font-weight:bold;margin-bottom:4px;color:#0f172a;">MoMo Transaction ID / Reference</label>
              <input type="text" id="momo-tx-id" placeholder="e.g. Transaction ID" style="width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;box-sizing:border-box;" />
            </div>
          </div>
        </form>
      `;

      footer.innerHTML = `
        <div style="display:flex;gap:8px;">
          <button type="button" id="kerd-back-cart-btn" style="padding:11px 16px;background:#e2e8f0;color:#334155;border:none;border-radius:8px;font-weight:bold;font-size:12px;cursor:pointer;">← Back</button>
          <button type="button" id="kerd-paid-submit-btn" style="flex:1;padding:12px;background:#176B3A;color:#fff;border:none;border-radius:8px;font-weight:bold;font-size:13px;cursor:pointer;">✓ I Have Paid &amp; Submit Order</button>
        </div>
      `;

      document.getElementById('kerd-back-cart-btn').addEventListener('click', () => {
        renderCartContent('cart');
      });

      document.getElementById('kerd-paid-submit-btn').addEventListener('click', async () => {
        const custName = document.getElementById('momo-cust-name').value.trim();
        const custPhone = document.getElementById('momo-cust-phone').value.trim();
        const custEmail = document.getElementById('momo-cust-email').value.trim();
        const custAddress = document.getElementById('momo-cust-address').value.trim();
        const accName = document.getElementById('momo-account-name').value.trim();
        const senderPhone = document.getElementById('momo-sender-phone').value.trim();
        const txId = document.getElementById('momo-tx-id').value.trim();

        if (!custName || !custPhone || !custAddress || !accName || !senderPhone) {
          showToast('Please fill in all required fields marked with *', 'error');
          return;
        }

        const submitBtn = document.getElementById('kerd-paid-submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Order...';

        const orderData = {
          orderId,
          createdAt: new Date().toISOString(),
          customerName: custName,
          customerPhone: custPhone,
          customerEmail: custEmail,
          deliveryAddress: custAddress,
          momoAccountName: accName,
          momoPhone: senderPhone,
          momoTransactionId: txId || orderId,
          items: cart,
          subtotal,
          deliveryFee,
          totalAmount: grandTotal,
          paymentStatus: 'Paid & Pending Confirmation',
        };

        saveOrder(orderData);

        // Send notification via FormSubmit
        const itemsListText = cart
          .map((item, idx) => `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - GH₵ ${((item.price || 0) * item.quantity).toFixed(2)}`)
          .join('\n');

        const emailPayload = {
          _subject: `🛍️ NEW MOMO ORDER [${orderId}] - GH₵ ${grandTotal.toFixed(2)} - Kerd Farms`,
          _replyto: custEmail || MOMO_CONFIG.email,
          _template: 'table',
          _captcha: 'false',
          'Order ID': orderId,
          'Customer Name': custName,
          'Customer Phone': custPhone,
          'Delivery Address': custAddress,
          'MoMo Sender Name': accName,
          'MoMo Sender Phone': senderPhone,
          'Order Items': itemsListText,
          'TOTAL AMOUNT': `GH₵ ${grandTotal.toFixed(2)}`,
        };

        try {
          await fetch('https://formsubmit.co/ajax/info@kerdfarms.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(emailPayload),
          });
        } catch (err) {}
        try {
          await fetch('/api/submit-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
          });
        } catch (err) {}

        saveCart([]);
        closeCartDrawer();
        showToast(`Order #${orderId} submitted successfully!`);
      });
    }
  }

  // --- ADD PRODUCT FROM CARD ---
  function addProductFromCardElement(triggerEl) {
    const card =
      triggerEl.closest('article, .group, .border, div.flex.flex-col') ||
      triggerEl.parentElement?.parentElement ||
      document.body;
    const titleEl = card.querySelector('h3, h2, h4');
    const name = titleEl ? titleEl.textContent.trim() : 'Kerd Farms Product';

    const cardText = card.textContent || '';
    const priceMatch = cardText.match(/GH[₵S¢]\s*(\d+(?:\.\d+)?)/i);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const unitMatch = cardText.match(/\/\s*(kg|piece|crate|sack|bag)/i);
    const unit = unitMatch ? unitMatch[1] : 'unit';
    const productId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const cart = getCart();
    const existing = cart.find((i) => i.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: productId, name, price, unit, quantity: 1 });
    }
    saveCart(cart);
    showToast(`Added "${name}" to cart`);
    openCartDrawer(false);
  }

  // --- GLOBAL DELEGATED CLICK HANDLER (WORKS ON ALL PAGES) ---
  function initGlobalDelegation() {
    if (window.__kerdDelegationBound) return;
    window.__kerdDelegationBound = true;

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!target || !target.closest) return;

      const menuBtn = target.closest('#kerd-hamburger-btn, button[aria-label="Open menu"], button[aria-label="Close menu"]');
      if (menuBtn) {
        toggleMobileDropdown(e);
        return;
      }

      const cartBtn = target.closest('button[aria-label*="Shopping cart"]');
      if (cartBtn) {
        e.preventDefault();
        closeMobileDropdown();
        openCartDrawer(false);
        return;
      }

      // Universal Add to Cart / Order button catcher for all pages
      const btn = target.closest('button, a');
      if (btn) {
        const txt = (btn.textContent || '').trim().toUpperCase();
        if (txt.includes('ADD TO CART') || txt.includes('ADD TO QUOTE') || txt.includes('ORDER') || txt.includes('BUY NOW')) {
          e.preventDefault();
          addProductFromCardElement(btn);
          return;
        }
      }
    });
  }

  function initKerdAll() {
    ensureMobileDropdownCreated();
    initDesktopShopMenu();
    initAnnouncementDismiss();
    initFaqAccordions();
    initShopFiltering();
    initInsightsFiltering();
    initImpactNumberCounters();
    updateCartBadges();
    injectCartDrawerModal();
    initGlobalDelegation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKerdAll);
  } else {
    initKerdAll();
  }
})();
