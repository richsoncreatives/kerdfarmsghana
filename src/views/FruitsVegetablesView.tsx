import React, { useState } from 'react';
import { ShoppingBag, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product, MOMO_CONFIG } from '../data/products';

interface FruitsVegetablesViewProps {
  onAddToCart: (product: Product) => void;
  onOpenEnquiry: (type?: any, productName?: string) => void;
}

export const FruitsVegetablesView: React.FC<FruitsVegetablesViewProps> = ({
  onAddToCart,
  onOpenEnquiry,
}) => {
  const produce = PRODUCTS.filter(p => p.category === 'vegetables' || p.category === 'fruits');
  const [filterType, setFilterType] = useState<'all' | 'vegetables' | 'fruits'>('all');

  const filteredProduce = produce.filter(p => filterType === 'all' || p.category === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-emerald-700/50 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-xs font-bold text-amber-300">
          <span>FRESH PRODUCE DIVISION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Fresh From the Farm. Ready for Your Market.
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          High-grade Ghanaian vegetables and fresh fruits harvested at peak flavor and crispness. Supplied to households, market traders, hotels, restaurants, and food processors.
        </p>
      </div>

      {/* SUB-CATEGORY SELECTOR */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'all'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Fresh Produce ({produce.length})
          </button>
          <button
            onClick={() => setFilterType('vegetables')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'vegetables'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Vegetables
          </button>
          <button
            onClick={() => setFilterType('fruits')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'fruits'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Fruits
          </button>
        </div>

        <button
          onClick={() => onOpenEnquiry('Produce')}
          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline hidden sm:block"
        >
          Custom Bulk Produce Order →
        </button>
      </div>

      {/* PRODUCE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProduce.map((product) => (
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
                {product.unit}
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
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Price:</span>
                  <span className="text-sm font-extrabold font-mono text-emerald-800 dark:text-emerald-300">
                    GH₵ {product.price?.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => onOpenEnquiry('Produce', product.name)}
                    className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Bulk
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
