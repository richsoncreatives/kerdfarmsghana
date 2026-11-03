import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { EnquiryModal } from './components/EnquiryModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { PoultryEggsView } from './views/PoultryEggsView';
import { FruitsVegetablesView } from './views/FruitsVegetablesView';
import { SeedlingsManureView } from './views/SeedlingsManureView';
import { OurImpactView } from './views/OurImpactView';
import { AboutUsView } from './views/AboutUsView';
import { InsightsView } from './views/InsightsView';
import { ContactView } from './views/ContactView';
import { TrackOrderView } from './views/TrackOrderView';

import { Product } from './data/products';
import { CartItem, OrderSubmission } from './services/formService';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('kerdfarms_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // Modal Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // Enquiry Modal Config
  const [enquiryType, setEnquiryType] = useState<any>('General');
  const [enquiryProductName, setEnquiryProductName] = useState<string>('');

  // Active / Last Completed Order
  const [activeOrder, setActiveOrder] = useState<OrderSubmission | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kerdfarms_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    showToast(`Added ${product.name} to cart. Pay via MoMo on checkout!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenEnquiryModal = (type: any = 'General', productName: string = '') => {
    setEnquiryType(type);
    setEnquiryProductName(productName);
    setIsEnquiryOpen(true);
  };

  const handleOrderCompleted = (order: OrderSubmission) => {
    setActiveOrder(order);
    setIsTrackingModalOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-600 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-emerald-700 rounded-lg transition-colors ml-2"
          >
            <X className="w-4 h-4 text-emerald-200" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pt-4">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={setCurrentTab}
            onAddToCart={handleAddToCart}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentTab === 'shop' && (
          <ShopView
            onAddToCart={handleAddToCart}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentTab === 'eggs' && (
          <PoultryEggsView
            onAddToCart={handleAddToCart}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentTab === 'produce' && (
          <FruitsVegetablesView
            onAddToCart={handleAddToCart}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentTab === 'seedlings' && (
          <SeedlingsManureView
            onAddToCart={handleAddToCart}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentTab === 'impact' && (
          <OurImpactView
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentTab === 'about' && (
          <AboutUsView
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentTab === 'insights' && (
          <InsightsView />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}

        {currentTab === 'track' && (
          <TrackOrderView
            initialOrderId={activeOrder?.orderId || ''}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={setCurrentTab}
        onOpenEnquiry={handleOpenEnquiryModal}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Cart & MoMo Payment Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        activeOrder={activeOrder}
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultEnquiryType={enquiryType}
        defaultProductName={enquiryProductName}
      />

      {/* GitHub & Cloudflare Pages Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

    </div>
  );
}
