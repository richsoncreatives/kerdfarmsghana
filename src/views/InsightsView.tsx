import React, { useState, useMemo } from 'react';
import { BookOpen, ArrowRight, Clock, ChevronDown, ChevronUp, Search, Tag, Filter, X } from 'lucide-react';

export interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

const INSIGHT_CATEGORIES = [
  'All Topics',
  'Poultry Farming',
  'Egg Production and Marketing',
  'Fruits and Vegetables',
  'Ghanaian Agricultural Markets',
  'African Agribusiness',
  'Manure, Compost and Fertilizers',
  'Soil Health and Sustainable Farming',
  'Agricultural Distribution and Logistics',
  'Child Nutrition and Food Education',
] as const;

export const InsightsView: React.FC = () => {
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');
  // Search query state
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Expanded article content state
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleArticle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const articles: InsightArticle[] = [
    {
      id: 'poultry-ghana',
      title: 'The Poultry Industry in Ghana: Opportunities, Challenges and Growth',
      excerpt: 'Eggs are one of the most accessible animal-source proteins in Ghana. This analysis looks at local production, feed cost dynamics, and wholesale supply chains.',
      content: 'The Ghanaian poultry sector plays a critical role in national food security, nutritional intake, and rural employment. However, local farmers face substantial hurdles primarily driven by high feed costs (such as imported maize and soy), veterinary supply expenses, and competition from subsidized imported frozen chicken. Despite these challenges, demand for fresh, locally produced table eggs remains robust across urban centers like Accra, Tema, and Kumasi. Scaling up efficient biosecurity protocols, investing in local grain production, and establishing direct institutional supply chains (such as hotels, schools, and hospitals) offer sustainable pathways for poultry enterprises to achieve profitability and long-term resilience.',
      date: 'October 2026',
      readTime: '6 min read',
      category: 'Poultry Farming',
      tags: ['Poultry Farming', 'Egg Production and Marketing', 'Ghanaian Agricultural Markets', 'African Agribusiness'],
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
    {
      id: 'egg-production-marketing',
      title: 'Commercial Egg Production: Grading, Packaging & Distribution in West Africa',
      excerpt: 'Grade standards, crate integrity, and direct restaurant delivery channels make the difference between fragile retail margins and sustainable flock turnover.',
      content: 'Egg marketing in Ghana requires precise attention to post-collection grading, crate sanitation, and thermal shock prevention. When fresh eggs are properly categorized by size (Small, Medium, Large, Jumbo) and packed into shock-absorbent paper pulp or sanitized plastic crates, breakage rates drop by over 85%. Furthermore, building standing weekly supply contracts with bakeries, hotels, quick-service eateries, and school caterers eliminates reliance on unpredictable spot markets, stabilizing cash flow and allowing commercial layers to plan flock replenishment effectively.',
      date: 'October 2026',
      readTime: '5 min read',
      category: 'Egg Production and Marketing',
      tags: ['Egg Production and Marketing', 'Poultry Farming', 'Agricultural Distribution and Logistics', 'Ghanaian Agricultural Markets'],
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'manure-compost-fertilizer',
      title: "Understanding Manure, Compost and Fertilizer: What's the Difference?",
      excerpt: 'Manure, compost, and processed fertilizers all improve soil, but they behave differently, are applied at different rates, and serve distinct crop stages.',
      content: 'Navigating soil nutrition requires understanding the distinct roles of organic and inorganic inputs. Raw or aged manure provides valuable organic matter and slow-release nutrients that improve soil structure and water retention, though it requires proper composting to eliminate weed seeds and pathogens. Compost is fully decomposed organic matter teeming with beneficial microbial life that enriches the soil ecosystem. Processed chemical fertilizers, by contrast, deliver precise, highly concentrated, and immediate nutrient availability (such as N-P-K ratios) to boost rapid crop growth during peak demand. Combining organic amendments for long-term soil health with targeted fertilizers yields the best results for commercial and smallholder farms in Ghana.',
      date: 'September 2026',
      readTime: '5 min read',
      category: 'Manure, Compost and Fertilizers',
      tags: ['Manure, Compost and Fertilizers', 'Soil Health and Sustainable Farming', 'Ghanaian Agricultural Markets'],
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'soil-health-regeneration',
      title: 'Soil Health and Conditioning: Restoring Degraded Farmland in Southern Ghana',
      excerpt: 'Continuous cropping and heavy leaching deplete essential topsoil minerals. How organic chicken manure and cover crops regenerate vital microbial ecosystems.',
      content: 'Soil degradation along the coastal savanna and forest-savanna transition zones poses a major ceiling on crop productivity in southern Ghana. Intense seasonal downpours rapidly leach nitrogen and potassium from sandy-loam soils lacking organic binding agents. By incorporating well-cured poultry manure, green manure cover crops (such as Mucuna pruriens), and biochar, farmers can dramatically increase Cation Exchange Capacity (CEC), retain soil moisture during short dry spells, and create an ideal biological rhizosphere for root vegetables and staple cereals.',
      date: 'September 2026',
      readTime: '7 min read',
      category: 'Soil Health and Sustainable Farming',
      tags: ['Soil Health and Sustainable Farming', 'Manure, Compost and Fertilizers', 'Fruits and Vegetables'],
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'post-harvest-loss',
      title: 'How Farmers & Vendors Can Reduce Post-Harvest Losses in Fresh Produce',
      excerpt: 'Fresh produce lost between field and market wastes water, labor, and inputs. Practical handling, shade management, and gentle crates protect yield value.',
      content: "In Ghana, post-harvest losses for perishable fruits and vegetables (such as tomatoes, peppers, leafy greens, and citrus) can reach alarming levels due to rough handling, inadequate transport infrastructure, and exposure to intense tropical heat. Mitigating these losses requires simple, cost-effective interventions across the supply chain: harvesting during cooler morning hours, using well-ventilated plastic crates instead of heavy sacks that crush lower layers, keeping produce out of direct sunlight during transit, and establishing prompt cold-chain or shade storage at market stalls. Preserving product integrity directly safeguards farmers' margins and ensures consumers receive high-quality produce.",
      date: 'August 2026',
      readTime: '7 min read',
      category: 'Fruits and Vegetables',
      tags: ['Fruits and Vegetables', 'Agricultural Distribution and Logistics', 'Ghanaian Agricultural Markets'],
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'agric-cold-chain-logistics',
      title: 'Agricultural Cold Chains & Logistics: Moving Food from Farm Gate to Urban Accra',
      excerpt: 'Logistics bottlenecks represent the single greatest cost driver in urban food pricing. Here is how direct farm-to-door distribution cuts waste and overhead.',
      content: 'The journey from peri-urban farms in Greater Accra, Eastern, and Central regions to central retail markets like Agbogbloshie, Makola, and Madina is fraught with logistical inefficiencies. Middlemen markups, transit delays, and improper stacking during open-truck transport inflate consumer prices while leaving growers underpaid. Kerd Farms demonstrates that integrated dispatch—combining pre-sorted crating, scheduled temperature-monitored vans, and direct customer communication via digital channels—drastically cuts transit shrinkage while preserving peak freshness for urban kitchens.',
      date: 'August 2026',
      readTime: '6 min read',
      category: 'Agricultural Distribution and Logistics',
      tags: ['Agricultural Distribution and Logistics', 'Ghanaian Agricultural Markets', 'Fruits and Vegetables', 'African Agribusiness'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ghana-market-seasonality',
      title: 'Ghanaian Agricultural Markets: Price Volatility, Seasonality and Wholesaling',
      excerpt: 'Navigating dry season tomato surges and festive egg peaks requires forward contracting, reliable storage, and diversified agricultural divisions.',
      content: 'Commodity price swings in Ghana are heavily driven by rainfall seasonality, holiday consumption spikes (such as Easter, Eid, and Christmas), and cross-border trade flows with Burkina Faso and Togo. For institutional buyers such as boarding schools, hotels, and food processors, unpredictable spot-market pricing undermines budgeting. Forward supply agreements, combined with multi-division farm resilience (balancing eggs, fresh vegetables, and organic manure), insulate both producers and institutional clients from extreme price volatility.',
      date: 'August 2026',
      readTime: '5 min read',
      category: 'Ghanaian Agricultural Markets',
      tags: ['Ghanaian Agricultural Markets', 'African Agribusiness', 'Poultry Farming', 'Fruits and Vegetables'],
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'childhood-nutrition',
      title: 'Why Childhood Nutrition Deserves a Place in Agricultural Development',
      excerpt: 'Childhood stunting impacts cognitive capacity and future economic participation. Integrating egg distribution with agricultural supply creates lasting impact.',
      content: 'Agricultural development is frequently measured in tonnage, crop yields, and export revenue, but true community development begins with human capital. Childhood stunting and micronutrient deficiencies in early development permanently impair cognitive function, educational attainment, and future economic productivity. Integrating nutrient-dense foods—such as locally produced table eggs—directly into school feeding initiatives bridges the gap between agricultural surplus and public health. Programs that connect local poultry farmers directly to community nutrition initiatives ensure children receive essential proteins while creating a stable, reliable market for local producers.',
      date: 'July 2026',
      readTime: '6 min read',
      category: 'Child Nutrition and Food Education',
      tags: ['Child Nutrition and Food Education', 'Egg Production and Marketing', 'African Agribusiness'],
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'african-agribusiness-scale',
      title: 'African Agribusiness: Scaling Smallholder Value Chains and Sustainable Output',
      excerpt: 'Modern African agriculture is moving beyond subsistence. How commercial clustering, digital payments, and quality inputs empower growers.',
      content: 'The African agribusiness sector is projected to reach $1 trillion by 2030, driven by rapid urbanization, expanding middle-class consumption, and technological modernization. Moving from fragmented smallholder plots to cohesive agricultural clusters unlocks economies of scale in seed procurement, mechanized tilling, cold storage, and logistics. By embracing transparent digital ordering and mobile money settlements, modern agri-enterprises in Ghana are demonstrating that local commercial farming can compete with foreign imports while generating dignified employment across rural communities.',
      date: 'July 2026',
      readTime: '7 min read',
      category: 'African Agribusiness',
      tags: ['African Agribusiness', 'Ghanaian Agricultural Markets', 'Agricultural Distribution and Logistics'],
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Active Category Filter and Search Logic
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Category match: exact match on primary category OR inclusion in tags
      const matchesCategory =
        selectedCategory === 'All Topics' ||
        art.category.toLowerCase() === selectedCategory.toLowerCase() ||
        art.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

      // Search keyword match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.content.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query) ||
        art.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Topics');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold tracking-wide">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>FARMING &amp; MARKET KNOWLEDGE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Insights That Help Agriculture Grow.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Practical knowledge on poultry management, egg marketing, soil conditioning, post-harvest logistics, and sustainable agricultural development in Ghana and across Africa.
        </p>
      </div>

      {/* FILTER & SEARCH BAR SECTION */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Filter Articles by Topic</span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by keyword or topic..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex flex-wrap gap-2 pt-1">
          {INSIGHT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all uppercase cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-md ring-2 ring-emerald-600/50 scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700/80 hover:text-emerald-800 dark:hover:text-emerald-300 hover:border-emerald-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active Filter Info & Reset Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900 dark:text-white">{filteredArticles.length}</strong>{' '}
            {filteredArticles.length === 1 ? 'article' : 'articles'}
            {selectedCategory !== 'All Topics' && (
              <span>
                {' '}in topic: <strong className="text-emerald-700 dark:text-emerald-400">{selectedCategory}</strong>
              </span>
            )}
            {searchQuery && (
              <span>
                {' '}matching "<strong>{searchQuery}</strong>"
              </span>
            )}
          </div>

          {(selectedCategory !== 'All Topics' || searchQuery.trim() !== '') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* ARTICLES GRID */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Articles Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            There are currently no articles matching "{searchQuery || selectedCategory}". Try selecting another category or resetting the filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow"
          >
            Show All Topics ({articles.length} Articles)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => {
            const isExpanded = expandedId === art.id;
            return (
              <article
                key={art.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative overflow-hidden h-52 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur text-white shadow-sm border border-white/10">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {art.readTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{art.date}</span>
                    </div>

                    {/* Clickable Heading to toggle content */}
                    <button
                      onClick={() => toggleArticle(art.id)}
                      className="w-full text-left focus:outline-none group/title"
                      aria-expanded={isExpanded}
                    >
                      <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover/title:text-emerald-700 dark:group-hover/title:text-emerald-400 transition-colors flex items-start justify-between gap-2">
                        <span>{art.title}</span>
                        <span className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0 text-emerald-700 dark:text-emerald-400 mt-0.5">
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </span>
                      </h2>
                    </button>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {art.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {art.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          onClick={() => handleCategoryClick(tag)}
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                            selectedCategory.toLowerCase() === tag.toLowerCase()
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-700'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Full Content */}
                    {isExpanded && (
                      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 animate-in fade-in duration-200">
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
      )}

    </div>
  );
};
