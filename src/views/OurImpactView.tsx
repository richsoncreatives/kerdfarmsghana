import React from 'react';
import { Heart, CheckCircle2, ArrowRight, ShieldCheck, ExternalLink, Globe2, Sparkles, BookOpen } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';

interface OurImpactViewProps {
  onOpenEnquiry: (type?: any) => void;
}

export const OurImpactView: React.FC<OurImpactViewProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 pb-20">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-700/50 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-600/60 text-xs font-bold tracking-wide">
          <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 animate-pulse" />
          <span>COMMUNITY & CHILD NUTRITION OUTREACH</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          One Egg. A Healthier Beginning.
        </h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
          Agriculture should do more than generate profit. Kerd Farms partners with rural primary schools in Ghana to supply fresh eggs to school children, targeting childhood stunting and protein malnutrition where it matters most.
        </p>
      </div>

      {/* SECTION 1: GLOBAL & GHANAIAN EVIDENCE BENCHMARKS (WITH ANIMATED COUNTERS) */}
      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>The Evidence Base &amp; Why We Act</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Child Malnutrition in Figures
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The data below from published international health institutions illustrates the urgency of early childhood protein intervention. Watch these key figures count up to their recorded global and national benchmarks.
          </p>
        </div>

        {/* 5-GRID METRICS WITH ANIMATED COUNTERS (150.2, 42.8, 466, 673, 17%) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 150.2 Million - Stunting */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-emerald-700 dark:text-emerald-400 tracking-tight font-mono">
                  <AnimatedCounter value={150.2} decimals={1} duration={2000} />
                </span>
                <span className="text-base font-bold text-slate-500 dark:text-slate-400">Million</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white leading-snug">
                Children Under Five Living with Stunting
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Children globally who were chronically too short for their age in 2024 — the consequence of chronic nutrient and protein deprivation in the crucial first 1,000 days of life.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Scope: Global</span>
                <span>Source: UNICEF / WHO / WB</span>
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-[11px] text-emerald-800 dark:text-emerald-300 font-medium leading-relaxed">
                Stunting permanently limits cognitive architecture and lifetime earning potential.
              </div>
            </div>
          </div>

          {/* 42.8 Million - Wasting */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight font-mono">
                  <AnimatedCounter value={42.8} decimals={1} duration={2000} />
                </span>
                <span className="text-base font-bold text-slate-500 dark:text-slate-400">Million</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white leading-snug">
                Children Under Five Living with Wasting
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Children under five years old globally who are acutely too thin for their height — resulting from rapid weight loss, food insecurity, or acute disease episodes.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Scope: Global</span>
                <span>Source: Joint Malnutrition Estimates</span>
              </div>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                Wasting poses immediate life-threatening danger, demanding urgent protein-dense dietary recovery.
              </div>
            </div>
          </div>

          {/* 466 Million - School Meals */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight font-mono">
                  <AnimatedCounter value={466} decimals={0} duration={2000} />
                </span>
                <span className="text-base font-bold text-slate-500 dark:text-slate-400">Million</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white leading-snug">
                Children Receiving a School Meal
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Children reached by school meal programmes globally, as recorded in the World Food Programme's comprehensive state of school feeding reports.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Scope: Global</span>
                <span>Source: World Food Programme (WFP)</span>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-[11px] text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
                School meals directly improve attendance and classroom concentration, especially when paired with eggs.
              </div>
            </div>
          </div>

          {/* 673 Million - Chronic Hunger */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight font-mono">
                  <AnimatedCounter value={673} decimals={0} duration={2000} />
                </span>
                <span className="text-base font-bold text-slate-500 dark:text-slate-400">Million</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white leading-snug">
                People Facing Hunger Worldwide
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                People globally facing undernourishment in 2024 (~8.2% of the world's population), according to FAO's State of Food Security and Nutrition in the World.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Scope: Whole Population</span>
                <span>Source: FAO / IFAD / UNICEF</span>
              </div>
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-[11px] text-rose-800 dark:text-rose-300 font-medium leading-relaxed">
                Food security is not just calories, but consistent access to bioavailable animal-source micronutrients.
              </div>
            </div>
          </div>

          {/* 17% - Ghana Stunting Rate */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 sm:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-emerald-800 dark:text-emerald-400 tracking-tight font-mono">
                  <AnimatedCounter value={17} decimals={0} duration={2000} suffix="%" />
                </span>
                <span className="text-base font-bold text-slate-500 dark:text-slate-400">(1 in 6 Ghanaian Children)</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white leading-snug">
                Children Under Five Stunted in Ghana
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Stunting prevalence among children under five in Ghana, reported in the latest 2022 Ghana Demographic and Health Survey (GDHS). While national interventions have made substantial strides over three decades, 1 child in roughly 6 remains chronically stunted.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                Source: Ghana Statistical Service (GSS) / Ministry of Health (2022 GDHS)
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>The Core Mission Behind Kerd Farms Outreach</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: KERD FARMS LOCAL OUTREACH IMPACT METRICS */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Kerd Farms School Outreach Progress in Ghana
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
              <AnimatedCounter value={12500} decimals={0} useGrouping duration={2200} suffix="+" />
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Fresh Eggs Distributed</div>
            <div className="text-[11px] text-slate-400">Direct to school meals</div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
              <AnimatedCounter value={8} decimals={0} duration={1500} />
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Partner Schools</div>
            <div className="text-[11px] text-slate-400">Volta &amp; Eastern Regions</div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
              <AnimatedCounter value={1400} decimals={0} useGrouping duration={2000} suffix="+" />
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Children Reached</div>
            <div className="text-[11px] text-slate-400">Ages 4 to 12</div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
              <AnimatedCounter value={6.3} decimals={1} duration={1800} suffix="g" />
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Protein per Egg</div>
            <div className="text-[11px] text-slate-400">Plus Choline, B12 &amp; Iron</div>
          </div>
        </div>
      </section>

      {/* WHY EGGS FOR CHILD NUTRITION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nutritional Science</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Why Eggs Matter in Childhood Development
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In many rural communities across West Africa, children's daily diets are heavily starch-based. Eggs are one of nature's most complete, bioavailable sources of protein, essential fatty acids, and micronutrients critical for brain growth and immune health.
          </p>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Prevents Stunting:</strong> Daily egg consumption in early childhood reduces stunting prevalence by up to 47%.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Boosts Cognitive Focus:</strong> Choline and Iodine in egg yolk support memory, alertness, and active classroom participation.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Locally Produced &amp; Fresh:</strong> Sourced directly from Kerd Farms laying flocks in Abokobi and delivered under safe hygienic protocols.</span>
            </li>
          </ul>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80"
            alt="One Egg Outreach - Kerd Farms"
            className="w-full h-80 object-cover rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
          />
        </div>
      </section>

      {/* PARTNER / SUPPORT CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Partner With Us on Child Nutrition</h2>
        <p className="text-xs sm:text-sm text-slate-900 max-w-xl mx-auto leading-relaxed">
          Are you an NGO, school board, corporate sponsor, or individual donor wanting to expand egg feeding programmes in Ghana? All partnership enquiries go directly to <strong>info@kerdfarms.com</strong> and <strong>kerdfarms@gmail.com</strong>.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onOpenEnquiry('Impact / One Egg')}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 text-white hover:bg-slate-900 rounded-xl font-bold text-xs transition-colors shadow-md"
          >
            Send Impact Partnership Enquiry
          </button>
          <a
            href="https://wa.me/233240135545?text=Hello%20Kerd%20Farms%2C%20I%20would%20like%20to%20discuss%20supporting%20the%20One%20Egg%20Child%20Nutrition%20programme."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl font-bold text-xs transition-colors shadow-md border border-slate-200"
          >
            Discuss on WhatsApp (+233 24 013 5545)
          </a>
        </div>
      </section>

    </div>
  );
};
