import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { MOMO_CONFIG } from '../data/products';
import { submitNewsletterToEmail } from '../services/formService';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenEnquiry: (type?: any) => void;
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenEnquiry,
  onOpenDeployGuide,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubmitting(true);
    await submitNewsletterToEmail(newsletterEmail.trim());
    setIsSubmitting(false);
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      
      {/* Top Value Strip */}
      <div className="bg-emerald-900/80 border-b border-emerald-800/80 px-4 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-emerald-100">
          <div className="flex items-center gap-3 p-3 bg-emerald-950/60 rounded-2xl border border-emerald-800/50">
            <div className="p-3 bg-emerald-800 text-amber-300 rounded-xl font-bold text-lg shrink-0">
              📱
            </div>
            <div className="text-xs">
              <div className="font-bold text-white text-sm">Mobile Money (MoMo) Accepted</div>
              <div className="text-emerald-200 mt-0.5">MTN: <strong>{MOMO_CONFIG.mtnNumber}</strong> | Name: <strong>{MOMO_CONFIG.accountName}</strong></div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-emerald-950/60 rounded-2xl border border-emerald-800/50">
            <div className="p-3 bg-emerald-800 text-amber-300 rounded-xl font-bold text-lg shrink-0">
              💬
            </div>
            <div className="text-xs">
              <div className="font-bold text-white text-sm">Official WhatsApp Line</div>
              <div className="text-emerald-200 mt-0.5">Chat instantly at <a href="https://wa.me/233240135545?text=Hello%20Kerd%20Farms%2C%20I%20would%20like%20to%20make%20an%20enquiry." target="_blank" rel="noopener noreferrer" className="underline text-amber-300 hover:text-white">+233 24 013 5545</a></div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-emerald-950/60 rounded-2xl border border-emerald-800/50">
            <div className="p-3 bg-emerald-800 text-amber-300 rounded-xl font-bold text-lg shrink-0">
              🚚
            </div>
            <div className="text-xs">
              <div className="font-bold text-white text-sm">Reliable Delivery Across Ghana</div>
              <div className="text-emerald-200 mt-0.5">Accra, Kumasi, Takoradi, Volta Region, Tamale & Nationwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1: Brand Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
              🌱
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white">
                KERD FARMS
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase -mt-1">
                Ghana Agriculture & Fresh Produce
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
            Kerd Farms is an integrated Ghanaian agricultural enterprise supplying fresh farm eggs by the crate, fresh fruits and vegetables, nursery-raised seedlings, and organic manure soil amendments to households, retailers, hotels, restaurants, and institutions.
          </p>

          <div className="pt-2 space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span>Email: <a href="mailto:info@kerdfarms.com" className="font-bold text-white hover:text-emerald-300 transition-colors">info@kerdfarms.com</a></span>
                <span className="text-[11px] text-slate-400"><a href="mailto:kerdfarms@gmail.com" className="hover:text-emerald-300 transition-colors">kerdfarms@gmail.com</a></span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp Line: <a href="https://wa.me/233240135545?text=Hello%20Kerd%20Farms%2C%20I%20need%20support." target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">+233 24 013 5545</a></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Location: {MOMO_CONFIG.location}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Product Divisions */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Supply Divisions
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onSelectTab('eggs')} className="hover:text-emerald-400 transition-colors">
                Poultry & Fresh Eggs
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('produce')} className="hover:text-emerald-400 transition-colors">
                Fresh Fruits & Vegetables
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('seedlings')} className="hover:text-emerald-400 transition-colors">
                Seedlings & Nursery Plugs
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('seedlings')} className="hover:text-emerald-400 transition-colors">
                Organic Manure & Compost
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('shop')} className="hover:text-emerald-400 transition-colors">
                All Products Catalogue
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation & Impact */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Company & Outreach
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onSelectTab('about')} className="hover:text-emerald-400 transition-colors">
                About Kerd Farms
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('impact')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <span>Our Impact (One Egg Project)</span>
                <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('insights')} className="hover:text-emerald-400 transition-colors">
                Agricultural Insights & Blog
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('contact')} className="hover:text-emerald-400 transition-colors">
                Contact & Support
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('track')} className="hover:text-emerald-400 transition-colors font-semibold text-amber-300">
                Track Your Order
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter Subscription */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Stay Connected
          </h3>
          <p className="text-xs text-slate-400">
            Subscribe for fresh crop harvest updates, wholesale egg price alerts, and farming tips.
          </p>

          {newsletterSubmitted ? (
            <div className="p-3 bg-emerald-900/50 border border-emerald-700/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Subscribed! Updates will be routed to your email.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-[10px] text-slate-500">
                Submissions automatically sent to info@kerdfarms.com &amp; kerdfarms@gmail.com.
              </div>
            </form>
          )}

          <div className="pt-2">
            <button
              onClick={onOpenDeployGuide}
              className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-[11px] font-medium border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GitHub & Cloudflare Pages Guide</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Kerd Farms. All Rights Reserved. Ghana's trusted partner in agriculture.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span>MoMo Verified: <strong>{MOMO_CONFIG.accountName}</strong></span>
            <span aria-hidden="true">·</span>
            <span><a href="mailto:info@kerdfarms.com" className="hover:text-emerald-400 underline">info@kerdfarms.com</a></span>
            <span aria-hidden="true">·</span>
            <span><a href="mailto:kerdfarms@gmail.com" className="hover:text-emerald-400 underline">kerdfarms@gmail.com</a></span>
            <span aria-hidden="true">·</span>
            <span>Accra &amp; Volta Region</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
