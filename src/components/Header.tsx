import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu, X, CheckCircle, Search, ShieldCheck, HelpCircle } from 'lucide-react';
import { MOMO_CONFIG } from '../data/products';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenDeployGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenDeployGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Catalogue' },
    { id: 'eggs', label: 'Poultry & Eggs' },
    { id: 'produce', label: 'Fruits & Veg' },
    { id: 'seedlings', label: 'Seedlings & Manure' },
    { id: 'impact', label: 'Our Impact' },
    { id: 'about', label: 'About Us' },
    { id: 'insights', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
    { id: 'track', label: 'Track Order' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-emerald-800 text-emerald-50 px-4 py-2 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded text-[11px] tracking-wide">
              MOMO PAYMENT
            </span>
            <span>
              Pay via MTN / Telecel MoMo (<strong>{MOMO_CONFIG.mtnNumber}</strong>) & Orders Sent Directly to <strong>{MOMO_CONFIG.email}</strong>!
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenDeployGuide}
              className="underline text-emerald-200 hover:text-white transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              GitHub & Cloudflare Pages Ready
            </button>
            <a
              href={`https://wa.me/${MOMO_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hidden sm:inline-block font-semibold text-amber-300"
            >
              WhatsApp: {MOMO_CONFIG.primaryPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* ZONE 1: Single element brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:bg-emerald-800 transition-colors">
                🌱
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                  KERD FARMS
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase -mt-1">
                  Ghana Agriculture
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: Single-line navigation links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'hover:text-emerald-600 dark:hover:text-emerald-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick MoMo Info Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-emerald-900 dark:text-emerald-200 font-medium">
                MoMo: <span className="font-bold">{MOMO_CONFIG.mtnNumber}</span>
              </span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-sm shadow-sm hover:shadow transition-all active:scale-98 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="ml-1 bg-amber-400 text-emerald-950 font-extrabold text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  currentTab === link.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 space-y-3">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <span>📱 Mobile Money Payment Info</span>
              </div>
              <div>MTN MoMo: <strong>{MOMO_CONFIG.mtnNumber}</strong></div>
              <div>Telecel Cash: <strong>{MOMO_CONFIG.telecelNumber}</strong></div>
              <div className="text-[11px] text-amber-800 dark:text-amber-300">
                Account Name: <strong>{MOMO_CONFIG.accountName}</strong>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onOpenCart();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 bg-emerald-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                View Cart ({cartCount})
              </button>
              <button
                onClick={() => {
                  onOpenDeployGuide();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-medium text-xs flex items-center justify-center gap-1"
              >
                <HelpCircle className="w-4 h-4" />
                Deploy
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
