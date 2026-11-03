import React from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2, Sprout } from 'lucide-react';
import { PRODUCTS, Product, MOMO_CONFIG } from '../data/products';

interface SeedlingsManureViewProps {
  onAddToCart: (product: Product) => void;
  onOpenEnquiry: (type?: any, productName?: string) => void;
}

export const SeedlingsManureView: React.FC<SeedlingsManureViewProps> = ({
  onAddToCart,
  onOpenEnquiry,
}) => {
  const seedlings = PRODUCTS.filter(p => p.category === 'seedlings');
  const manure = PRODUCTS.filter(p => p.category === 'manure');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-emerald-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-bold">
          <Sprout className="w-3.5 h-3.5 text-amber-300" />
          <span>SEEDLINGS & SOIL NUTRITION DIVISION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Strong Seedlings. Richer Soil. Healthier Growth.
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          Nursery-hardened vegetable seedlings for high survival rates, and fully composted organic manure to restore depleted Ghanaian soil structure and boost crop yields organically.
        </p>
      </div>

      {/* SECTION 1: SEEDLINGS */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Nursery Raised Plug Seedlings
            </h2>
            <p className="text-xs text-slate-500">Raised in disease-free media for a strong crop establishment.</p>
          </div>
          <button
            onClick={() => onOpenEnquiry('Seedlings & Soil')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline hidden sm:block"
          >
            Nursery Bulk Order →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seedlings.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      GH₵ {product.price?.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      Per Seedling
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: ORGANIC MANURE & FERTILIZER */}
      <div className="space-y-6 pt-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Organic Manure, Compost & Bulk Soil Amendments
            </h2>
            <p className="text-xs text-slate-500">Fully cured, odorless organic manure for gardens, nurseries, and large farms.</p>
          </div>
          <button
            onClick={() => onOpenEnquiry('Seedlings & Soil')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline hidden sm:block"
          >
            Bulk Farm Delivery Quote →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {manure.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      GH₵ {product.price?.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {product.unit}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
