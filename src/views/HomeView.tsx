import React from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Heart, Sparkles, Phone, MessageSquare, Truck, Clock, RefreshCw } from 'lucide-react';
import { PRODUCTS, Product, MOMO_CONFIG } from '../data/products';

interface HomeViewProps {
  onSelectTab: (tab: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenEnquiry: (type?: any, productName?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onAddToCart,
  onOpenEnquiry,
}) => {
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 p-8 sm:p-12 lg:p-16 border border-emerald-700/50 shadow-2xl">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>GHANA'S TRUSTED AGRICULTURAL SUPPLY PARTNER</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Growing Goodness. <br className="hidden sm:block" />
              <span className="text-amber-300">Nourishing Lives.</span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Kerd Farms supplies fresh farm eggs by the crate, market-fresh fruits & vegetables, high-yield seedlings, and organic manure soil products across Ghana. Order online with <strong>Mobile Money (MoMo)</strong> and receive direct order confirmation at <strong>{MOMO_CONFIG.email}</strong>.
            </p>

            {/* MOMO HIGHLIGHT BOX */}
            <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-700/70 max-w-xl text-xs space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
                  Mobile Money Payment
                </span>
                <span className="text-emerald-300 text-[11px] font-mono">Instant Order Dispatch</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-emerald-100 pt-1">
                <div>
                  <div className="text-[10px] text-emerald-300 font-bold">MTN MoMo:</div>
                  <div className="text-sm font-extrabold font-mono text-amber-300">{MOMO_CONFIG.mtnNumber}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-300 font-bold">Telecel / AirtelTigo:</div>
                  <div className="text-sm font-extrabold font-mono text-amber-300">{MOMO_CONFIG.telecelNumber}</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onSelectTab('shop')}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold rounded-2xl text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Catalogue & Order</span>
              </button>

              <button
                onClick={() => onOpenEnquiry('Bulk Order')}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950/80 hover:bg-emerald-950 text-white rounded-2xl font-bold text-sm border border-emerald-600/60 transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Bulk Wholesale Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Retail & Wholesale</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Manual Order Confirmation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Nationwide Ghana Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=80"
                alt="Fresh Farm Eggs and Harvest - Kerd Farms"
                className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                    DAILY FARM HARVEST
                  </span>
                  <span className="text-xs text-emerald-200">Grade A Quality</span>
                </div>
                <h3 className="text-lg font-bold">Fresh Eggs, Produce & Organic Soil Amendments</h3>
                <p className="text-xs text-slate-300">
                  Direct supply to homes, hotels, restaurants, schools, and agribusinesses in Ghana.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THREE ESSENTIAL AGRICULTURAL DIVISIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
            Three Essential Divisions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            A single agricultural partner across the food and farming value chain.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Poultry & Eggs */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center font-black text-2xl">
                🥚
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Poultry & Eggs</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Clean, Grade A farm-fresh eggs by the single crate or recurring bulk supply for supermarkets, hotels, restaurants, and schools.
              </p>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
                From GH₵ 35.00 / Crate
              </div>
            </div>

            <button
              onClick={() => onSelectTab('eggs')}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-700 hover:text-white text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Eggs & Poultry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Fresh Produce */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-2xl">
                🥬
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fruits & Vegetables</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tomatoes, onions, peppers, cucumbers, cabbage, carrots, bananas, ginger, lemons, and fruits harvested at peak freshness.
              </p>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
                From GH₵ 3.00 / Unit
              </div>
            </div>

            <button
              onClick={() => onSelectTab('produce')}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-700 hover:text-white text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Fruits & Vegetables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Seedlings & Manure */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-black text-2xl">
                🪴
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Seedlings & Organic Manure</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Healthy nursery plug seedlings (ginger, tomato, carrot) and fully cured organic manure & fertilizer bags (5kg, 15kg, 50kg).
              </p>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
                From GH₵ 1.50 / Seedling
              </div>
            </div>

            <button
              onClick={() => onSelectTab('seedlings')}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-700 hover:text-white text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Seedlings & Manure</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* FEATURED BESTSELLERS CATALOGUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
              Featured Products
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Order Fresh Farm Produce Online
            </h2>
          </div>

          <button
            onClick={() => onSelectTab('shop')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View Full Catalogue ({PRODUCTS.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {product.categoryLabel}
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Unit Price</div>
                      <div className="text-sm font-extrabold font-mono text-emerald-800 dark:text-emerald-300">
                        {product.price ? `GH₵ ${product.price.toFixed(2)}` : 'Custom Quote'}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {product.unit}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart & MoMo Pay</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOMO & ORDERING WORKFLOW HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-amber-400 text-emerald-950 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
              Seamless Ordering & Payment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              How Ordering Works at Kerd Farms
            </h2>
            <p className="text-xs text-slate-300">
              Designed for ease of access in Ghana via Mobile Money (MoMo) and automated order routing to info@kerdfarms.com and kerdfarms@gmail.com.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-white">Add Items to Cart</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select your eggs, fresh produce, seedlings, or organic manure in the quantities you need.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-white">Pay via MoMo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transfer total to MoMo number <strong>024 013 5545</strong> (Account: <strong>DANIEL KERDMOTT ESSIEN</strong>).
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-white">Confirm via WhatsApp</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click "Confirm &amp; Send Order via WhatsApp" for instant summary transmission with verification sent to <strong>info@kerdfarms.com</strong>.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2 relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-bold text-sm text-white">Track & Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get your Order Reference ID (#KF-XXXXX), track live progress, and receive your fresh delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ONE EGG IMPACT SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>Community Outreach Programme</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              One Egg. A Healthier Beginning.
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              At Kerd Farms, agriculture is more than commercial supply. Our "One Egg" initiative provides daily fresh egg protein to children in under-resourced schools in Ghana to combat childhood stunting and nutritional deficiency.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/80 dark:border-amber-800/50">
                <div className="text-lg font-extrabold text-emerald-800 dark:text-emerald-400">12,500+</div>
                <div className="text-[11px] text-slate-500">Eggs Distributed</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/80 dark:border-amber-800/50">
                <div className="text-lg font-extrabold text-emerald-800 dark:text-emerald-400">8 Schools</div>
                <div className="text-[11px] text-slate-500">Partnered in Ghana</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/80 dark:border-amber-800/50 col-span-2 sm:col-span-1">
                <div className="text-lg font-extrabold text-emerald-800 dark:text-emerald-400">6.3g</div>
                <div className="text-[11px] text-slate-500">Protein / Egg</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectTab('impact')}
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs transition-colors inline-flex items-center gap-2"
              >
                <span>Read Full Impact Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80"
              alt="School nutrition and fresh eggs - Kerd Farms Impact"
              className="w-full h-72 sm:h-80 object-cover rounded-2xl border border-amber-200/80 shadow-md"
            />
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 bg-emerald-800 text-white p-12 rounded-3xl shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold">
          Ready to Order or Request Wholesale Supply?
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Talk to our team today for eggs by the crate, fresh produce deliveries, or organic manure. We route every request directly to info@kerdfarms.com and kerdfarms@gmail.com.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onSelectTab('shop')}
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold rounded-xl text-sm shadow-md transition-colors"
          >
            Go to Shop Catalogue
          </button>
          <button
            onClick={() => onOpenEnquiry('General')}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm border border-emerald-600 transition-colors"
          >
            Send Direct Enquiry
          </button>
        </div>
      </section>

    </div>
  );
};
