import React from 'react';
import { Heart, CheckCircle2, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { MOMO_CONFIG } from '../data/products';

interface OurImpactViewProps {
  onOpenEnquiry: (type?: any) => void;
}

export const OurImpactView: React.FC<OurImpactViewProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-700/50 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700 text-xs font-bold">
          <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          <span>COMMUNITY & CHILD NUTRITION OUTREACH</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          One Egg. A Healthier Beginning.
        </h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
          Agriculture should do more than generate profit. Kerd Farms partners with rural primary schools in Ghana to supply fresh eggs to school children, targeting childhood stunting and protein malnutrition.
        </p>
      </div>

      {/* STATS HIGHLIGHT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">12,500+</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Fresh Eggs Distributed</div>
          <div className="text-[11px] text-slate-400">Direct to school meals</div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">8</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Partner Schools</div>
          <div className="text-[11px] text-slate-400">Volta & Eastern Regions</div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">1,400+</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Children Reached</div>
          <div className="text-[11px] text-slate-400">Ages 4 to 12</div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">6.3g</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Protein per Egg</div>
          <div className="text-[11px] text-slate-400">Plus Choline, B12 & Iron</div>
        </div>
      </div>

      {/* WHY EGGS FOR CHILD NUTRITION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Why Eggs Matter in Childhood Development
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In many rural communities across West Africa, children's daily diets are heavily starch-based. Eggs are one of nature's most complete, bioavailable sources of protein, essential fatty acids, and micronutrients critical for brain growth and immune health.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Prevents Stunting:</strong> Daily egg consumption in early childhood reduces stunting prevalence by up to 47%.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Boosts Cognitive Focus:</strong> Choline and Iodine in egg yolk support memory and classroom attentiveness.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Locally Produced:</strong> Sourced directly from Kerd Farms laying flocks in Ghana.</span>
            </li>
          </ul>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80"
            alt="One Egg Outreach - Kerd Farms"
            className="w-full h-72 object-cover rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
          />
        </div>
      </div>

      {/* PARTNER / SUPPORT CTA */}
      <div className="bg-amber-500 text-slate-950 p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-lg">
        <h2 className="text-2xl font-extrabold">Partner With Us on Child Nutrition</h2>
        <p className="text-xs sm:text-sm text-slate-900 max-w-xl mx-auto leading-relaxed">
          Are you an NGO, school board, or corporate sponsor wanting to support egg feeding programmes in Ghana? All partnership enquiries go directly to <strong>info@kerdfarms.com</strong> and <strong>kerdfarms@gmail.com</strong>.
        </p>
        <button
          onClick={() => onOpenEnquiry('Impact / One Egg')}
          className="px-8 py-3.5 bg-slate-950 text-white hover:bg-slate-900 rounded-xl font-bold text-xs transition-colors shadow"
        >
          Send Impact Partnership Enquiry
        </button>
      </div>

    </div>
  );
};
