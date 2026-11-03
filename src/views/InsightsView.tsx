import React from 'react';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';

export const InsightsView: React.FC = () => {
  const articles = [
    {
      id: 'poultry-ghana',
      title: 'The Poultry Industry in Ghana: Opportunities, Challenges and Growth',
      excerpt: 'Eggs are one of the most accessible animal-source proteins in Ghana. This analysis looks at local production, feed cost dynamics, and wholesale supply chains.',
      date: 'October 2026',
      readTime: '6 min read',
      category: 'Poultry & Markets',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'manure-compost-fertilizer',
      title: 'Understanding Manure, Compost and Fertilizer: What\'s the Difference?',
      excerpt: 'Manure, compost, and processed fertilizers all improve soil, but they behave differently, are applied at different rates, and serve distinct crop stages.',
      date: 'September 2026',
      readTime: '5 min read',
      category: 'Soil Science',
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'post-harvest-loss',
      title: 'How Farmers & Vendors Can Reduce Post-Harvest Losses in Fresh Produce',
      excerpt: 'Fresh produce lost between field and market wastes water, labor, and inputs. Practical handling, shade management, and gentle crates protect yield value.',
      date: 'August 2026',
      readTime: '7 min read',
      category: 'Produce Logistics',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'childhood-nutrition',
      title: 'Why Childhood Nutrition Deserves a Place in Agricultural Development',
      excerpt: 'Childhood stunting impacts cognitive capacity and future economic participation. Integrating egg distribution with agricultural supply creates lasting impact.',
      date: 'July 2026',
      readTime: '4 min read',
      category: 'Community Impact',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>FARMING & MARKET KNOWLEDGE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Insights That Help Agriculture Grow.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Practical knowledge on poultry management, soil conditioning, produce shelf-life, and agricultural development in Ghana.
        </p>
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.date}</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {art.title}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 group-hover:underline">
                Read Full Insight
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
