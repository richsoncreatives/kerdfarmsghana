import React, { useState, useMemo } from 'react';
import { ShoppingBag, Search, Filter, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { PRODUCTS, Product, MOMO_CONFIG } from '../data/products';

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  onOpenEnquiry: (type?: any, productName?: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onAddToCart,
  onOpenEnquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'eggs', label: 'Poultry & Eggs' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'fruits', label: 'Fresh Fruits' },
    { id: 'seedlings', label: 'Seedlings' },
    { id: 'manure', label: 'Organic Manure' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === 'price-high') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      
      {/* PAGE HEADER */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold mb-2">
              <span>PRODUCE & FARM CATALOGUE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Everything We Supply, In One Catalogue.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Order fresh farm eggs, fruits, vegetables, seedlings, and organic manure. Pay via <strong>Mobile Money (MoMo)</strong> and receive direct order confirmation at <strong>{MOMO_CONFIG.email}</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs space-y-1 shrink-0">
            <div className="font-bold text-amber-300">📱 MoMo Payment Info</div>
            <div className="text-slate-200">MTN: <strong>{MOMO_CONFIG.mtnNumber}</strong></div>
            <div className="text-slate-200">Telecel: <strong>{MOMO_CONFIG.telecelNumber}</strong></div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Filter Tabs (Single-line interactive button bar) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="default">Default Sort</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

        </div>
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <div className="text-3xl">🔍</div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No products found</h3>
          <p className="text-xs text-slate-500">
            No items matched your search query "{searchQuery}". Try clearing your filters or search term.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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

                  <div className="flex gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    
                    <button
                      onClick={() => onOpenEnquiry('Bulk Order', product.name)}
                      className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                      title="Enquire for bulk quote"
                    >
                      Bulk
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BULK ENQUIRY CTA BANNER */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Need Contract / Wholesale Institutional Supply?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
            Supermarkets, hotels, restaurants, schools, and distributors can request custom wholesale quotes and standing weekly deliveries routed directly to kerdfarms@gmail.com.
          </p>
        </div>

        <button
          onClick={() => onOpenEnquiry('Bulk Order')}
          className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs whitespace-nowrap shrink-0 shadow transition-colors"
        >
          Request Wholesale Quote
        </button>
      </div>

    </div>
  );
};
