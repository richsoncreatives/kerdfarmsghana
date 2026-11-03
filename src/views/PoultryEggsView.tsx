import React from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, Phone } from 'lucide-react';
import { PRODUCTS, Product, MOMO_CONFIG } from '../data/products';

interface PoultryEggsViewProps {
  onAddToCart: (product: Product) => void;
  onOpenEnquiry: (type?: any, productName?: string) => void;
}

export const PoultryEggsView: React.FC<PoultryEggsViewProps> = ({
  onAddToCart,
  onOpenEnquiry,
}) => {
  const eggProducts = PRODUCTS.filter(p => p.category === 'eggs');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-700/50 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/60 text-xs font-bold text-amber-300">
          <span>EGGS & POULTRY DIVISION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Fresh Farm Eggs. Reliable Supply.
        </h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
          Quality Grade A eggs collected daily from our farm layers. From a single crate for your household to standing weekly supply contracts for hotels, restaurants, schools, and distributors in Ghana.
        </p>
      </div>

      {/* PRODUCTS LIST */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
          Egg & Poultry Lines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eggProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {product.description}
                  </p>

                  {product.specs && (
                    <ul className="text-[11px] text-slate-500 space-y-1 pt-1">
                      {product.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Price per unit:</span>
                    <span className="text-sm font-extrabold font-mono text-emerald-700 dark:text-emerald-400">
                      GH₵ {product.price?.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart & MoMo Pay</span>
                    </button>
                    <button
                      onClick={() => onOpenEnquiry('Egg Supply', product.name)}
                      className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EGG CARE & HANDLING GUIDANCE */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          General Guidance for Keeping Eggs in Good Condition
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">Store Point Down</div>
            <div>Keep eggs stored with pointed end down to preserve egg yolk centered and fresh.</div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">Cool Environment</div>
            <div>Store in a cool, dark room or refrigerator away from strong smelling foods.</div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">Do Not Wash Early</div>
            <div>Natural egg bloom coating protects against bacteria. Wash only right before cooking.</div>
          </div>
        </div>
      </div>

      {/* ENQUIRY BANNER */}
      <div className="bg-emerald-800 text-white p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-xl font-bold">Require Standing Weekly Egg Deliveries?</h3>
        <p className="text-xs text-emerald-100 max-w-xl mx-auto">
          We arrange standing weekly supply for bakeries, boarding schools, hotels, and retail shops across Accra, Kumasi, and Volta Region.
        </p>
        <button
          onClick={() => onOpenEnquiry('Egg Supply')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs shadow transition-colors"
        >
          Request Egg Supply Contract
        </button>
      </div>

    </div>
  );
};
