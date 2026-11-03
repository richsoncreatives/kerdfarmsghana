import React from 'react';
import { ShieldCheck, Target, Heart, CheckCircle2, Award, Users, Sprout } from 'lucide-react';
import { MOMO_CONFIG } from '../data/products';

interface AboutUsViewProps {
  onOpenEnquiry: (type?: any) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
          <span>ABOUT KERD FARMS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          An agricultural enterprise built around three essentials.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Eggs & poultry, fresh fruits and vegetables, and organic soil nutrition — integrated to build a more resilient food supply system across Ghana.
        </p>
      </div>

      {/* THREE PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Commercial Excellence</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Consistent grading, transparent pricing, and dependable supply arrangements agreed before dispatch.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Soil & Crop Health</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Restoring Ghanaian soils through composted organic manure and supplying hardy, nursery-raised seedlings.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Community Nutrition</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Providing protein-rich eggs to school children in rural communities through our One Egg initiative.
          </p>
        </div>
      </div>

      {/* VALUES & STANDARDS */}
      <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Operational Standards
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Transparent MoMo Payments</strong>
              <span>Clear Mobile Money numbers (055 123 4567) displayed at checkout with instant receipt generation.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Direct Email Dispatch</strong>
              <span>Every enquiry and order form is transmitted directly to <strong>{MOMO_CONFIG.email}</strong> for manual verification.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Cold & Fresh Logistics</strong>
              <span>Eggs, fruits, and vegetables handled with strict sanitation and temperature care during transit.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Dedicated Human Contact</strong>
              <span>Direct telephone and WhatsApp contact ({MOMO_CONFIG.primaryPhone}) with farm representatives.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
