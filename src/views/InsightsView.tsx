import React, { useState } from 'react';
import { BookOpen, ArrowRight, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export const InsightsView: React.FC = () => {
  // Track which article ID is currently expanded (null if none)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleArticle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const articles = [
    {
      id: 'poultry-ghana',
      title: 'The Poultry Industry in Ghana: Opportunities, Challenges and Growth',
      excerpt: 'Eggs are one of the most accessible animal-source proteins in Ghana. This analysis looks at local production, feed cost dynamics, and wholesale supply chains.',
      content: 'The Ghanaian poultry sector plays a critical role in food security, nutritional intake, and rural employment. However, local farmers face substantial hurdles primarily driven by high feed costs (such as imported maize and soy), veterinary supply expenses, and competition from subsidized imported frozen chicken. Despite these challenges, demand for fresh, locally produced table eggs remains robust across urban centers like Accra and Kumasi. Scaling up efficient biosecurity protocols, investing in local grain production, and establishing direct institutional supply chains (such as hotels, schools, and hospitals) offer sustainable pathways for poultry enterprises to achieve profitability and long-term resilience.',
      date: 'October 2026',
      readTime: '6 min read',
      category: 'Poultry & Markets',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'manure-compost-fertilizer',
      title: 'Understanding Manure, Compost and Fertilizer: What\'s the Difference?',
      excerpt: 'Manure, compost, and processed fertilizers all improve soil, but they behave differently, are applied at different rates, and serve distinct crop stages.',
      content: 'Navigating soil nutrition requires understanding the distinct roles of organic and inorganic inputs. Raw or aged manure provides valuable organic matter and slow-release nutrients that improve soil structure and water retention, though it requires proper composting to eliminate weed seeds and pathogens. Compost is fully decomposed organic matter teeming with beneficial microbial life that enriches the soil ecosystem. Processed chemical fertilizers, by contrast, deliver precise, highly concentrated, and immediate nutrient availability (such as N-P-K ratios) to boost rapid crop growth during peak demand. Combining organic amendments for long-term soil health with targeted fertilizers yields the best results for commercial and smallholder farms in Ghana.',
      date: 'September 2026',
      readTime: '5 min read',
      category: 'Soil Science',
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'post-harvest-loss',
      title: 'How Farmers & Vendors Can Reduce Post-Harvest Losses in Fresh Produce',
      excerpt: 'Fresh produce lost between field and market wastes water, labor, and inputs. Practical handling, shade management, and gentle crates protect yield value.',
      content: 'In Ghana, post-harvest losses for perishable fruits and vegetables (such as tomatoes, onions, leafy greens, and citrus) can reach alarming levels due to rough handling, inadequate transport infrastructure, and exposure to intense tropical heat. Mitigating these losses requires simple, cost-effective interventions across the supply chain: harvesting during cooler morning hours, using well-ventilated plastic crates instead of heavy sacks that crush lower layers, keeping produce out of direct sunlight during transit, and establishing prompt cold-chain or shade storage at market stalls. Preserving product integrity directly safeguards farmers\' margins and ensures consumers receive high-quality produce.',
      date: 'August 2026',
      readTime: '7 min read',
      category: 'Produce Logistics',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'childhood-nutrition',
      title: 'Why Childhood Nutrition Deserves a Place in Agricultural Development',
      excerpt: 'Childhood stunting impacts cognitive capacity and future economic participation. Integrating egg distribution with agricultural supply creates lasting impact.',
      content: 'Agricultural development is frequently measured in tonnage, crop yields, and export revenue, but true community development begins with human capital. Childhood stunting and micronutrient deficiencies in early development permanently impair cognitive function, educational attainment, and future economic productivity. Integrating nutrient-dense foods—such as locally produced table eggs—directly into school feeding initiatives bridges the gap between agricultural surplus and public health. Programs that connect local poultry farmers directly to community nutrition initiatives ensure children receive essential proteins while creating a stable, reliable market for local producers.',
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
        {articles.map((art) => {
          const isExpanded = expandedId === art.id;
          return (
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

                  {/* Clickable Heading to toggle content */}
                  <button
                    onClick={() => toggleArticle(art.id)}
                    className="w-full text-left focus:outline-none group/title"
                    aria-expanded={isExpanded}
                  >
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover/title:text-emerald-700 dark:group-hover/title:text-emerald-400 transition-colors flex items-start justify-between gap-2">
                      <span>{art.title}</span>
                      <span className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0 text-emerald-700 dark:text-emerald-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </h2>
                  </button>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {art.excerpt}
                  </p>

                  {/* Expandable Full Content */}
                  {isExpanded && (
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 animate-fadeIn">
                      <p>{art.content}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => toggleArticle(art.id)}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 hover:underline focus:outline-none"
                >
                  {isExpanded ? 'Show Less' : 'Read Full Insight'}
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
};
