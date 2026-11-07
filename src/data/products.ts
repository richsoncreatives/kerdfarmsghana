export interface Product {
  id: string;
  name: string;
  category: 'eggs' | 'vegetables' | 'fruits' | 'seedlings' | 'manure';
  categoryLabel: string;
  price: number | null; // null for custom quote / bulk
  unit: string;
  minOrder?: string;
  description: string;
  image: string;
  featured?: boolean;
  inStock: boolean;
  specs?: string[];
}

export const PRODUCTS: Product[] = [
  // --- POULTRY & EGGS ---
  {
    id: 'eggs-crate',
    name: 'Fresh Farm Eggs — Crate',
    category: 'eggs',
    categoryLabel: 'Poultry & Eggs',
    price: 38.00,
    unit: 'Crate (30 eggs)',
    description: 'Farm-fresh Grade A eggs collected daily. Clean, thick shells with rich golden yolks. Packed securely in 30-egg crates.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true,
    specs: ['30 Eggs per Crate', 'Daily Collection', 'Size: Medium/Large', 'Cracker-safe packaging']
  },
  {
    id: 'eggs-bulk',
    name: 'Fresh Farm Eggs — Bulk Wholesale',
    category: 'eggs',
    categoryLabel: 'Poultry & Eggs',
    price: 35.00,
    unit: 'Crate (Min 10 Crates)',
    minOrder: '10 Crates',
    description: 'Discounted recurring volume supply for supermarkets, hotels, bakeries, school cafeterias, and food distributors.',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true,
    specs: ['10+ Crates Minimum', 'Contract Pricing', 'Weekly Scheduled Delivery', 'Grade A Guarantee']
  },
  {
    id: 'dressed-chicken',
    name: 'Farm Dressed Broiler Chicken',
    category: 'eggs',
    categoryLabel: 'Poultry & Eggs',
    price: 85.00,
    unit: 'Bird (~2.2kg)',
    description: 'Hygienically processed and dressed farm broilers. Raised on balanced natural feed without antibiotics. Whole or cut.',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true,
    specs: ['Average weight 2.0kg - 2.4kg', 'Vacuum chilled packaging', 'Halal processed', 'Fresh or frozen']
  },

  // --- FRUITS & VEGETABLES ---
  {
    id: 'tomatoes-1kg',
    name: 'Fresh Farm Tomatoes',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 32.00,
    unit: '1 KG',
    description: 'Firm, juicy, deep-red tomatoes grown under protective cover. Perfect for Ghanaian stews, soups, and fresh salads.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true,
    specs: ['Vine-ripened', 'Long shelf life', 'No chemical wax']
  },
  {
    id: 'red-onion-5kg',
    name: 'Red Onions — 5KG Mesh Bag',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 103.00,
    unit: '5 KG Bag',
    description: 'Pungent, dry-cured red onions sourced for maximum storage life. Ideal for restaurants, caterers, and bulk home use.',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true,
    specs: ['5KG Net Bag', 'Cured for long storage', 'Medium to Large bulbs']
  },
  {
    id: 'white-onion-1kg',
    name: 'Crisp White Onions',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 22.00,
    unit: '1 KG',
    description: 'Mild, sweet white onions cleaned and sorted. Excellent for fresh salsa, grilling, and kitchen preparations.',
    image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'cucumber-1kg',
    name: 'Crisp Green Cucumbers',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 35.00,
    unit: '1 KG',
    description: 'Cool, hydrated, firm cucumbers harvested at peak sweetness. Zero bitterness, ideal for juicing and salads.',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'spring-onion-05kg',
    name: 'Fresh Spring Onions',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 3.00,
    unit: '0.5 KG Bundle',
    description: 'Vibrant green scallions with crisp white stems. Harvested same morning as dispatch.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'spinach-1kg',
    name: 'Fresh Leafy Spinach',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 33.00,
    unit: '1 KG',
    description: 'Tender, nutrient-rich green spinach leaves. Washed and packed for direct kitchen use.',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'cabbage-1kg',
    name: 'Fresh Green Cabbage',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 23.00,
    unit: '1 KG',
    description: 'Dense, crunchy green cabbage heads, pesticide-monitored and graded for commercial or family cooking.',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'white-cabbage-1kg',
    name: 'Premium White Cabbage',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 23.00,
    unit: '1 KG',
    description: 'Tight white cabbage heads with fine leaves, ideal for coleslaw, salad bars, and steaming.',
    image: 'https://images.unsplash.com/photo-1598170845058-12ef4a45753b?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'garlic-1kg',
    name: 'Clean Garlic Bulbs',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 40.00,
    unit: '1 KG',
    description: 'Plump garlic cloves with high essential oil content for intense kitchen flavor.',
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'ginger-1kg',
    name: 'Fresh Aromatic Ginger',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 94.00,
    unit: '1 KG',
    description: 'Fleshy, spicy ginger rhizomes for beverages, medicinal tea, marinades, and food manufacture.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true
  },
  {
    id: 'radish-05kg',
    name: 'Peppery Red Radish',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 84.00,
    unit: '0.5 KG',
    description: 'Fresh, vibrant red radishes with crisp white flesh and zesty bite.',
    image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'beetroot-1kg',
    name: 'Fresh Red Beetroot',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 85.00,
    unit: '1 KG',
    description: 'Earthy, sweet red beetroot loaded with antioxidants. Perfect for salads, roasting, and juicing.',
    image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'potatoes-1kg',
    name: 'Firm Irish Potatoes',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 20.00,
    unit: '1 KG',
    description: 'Selected Irish potatoes with golden skin and fluffy interior when cooked. Great for chips, boiling, or baking.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'carrot-10kg',
    name: 'Sweet Carrots — 10KG Sack',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 290.00,
    unit: '10 KG Sack',
    description: 'Bulk 10KG bag of washed, crunchy orange carrots for institutions, restaurants, and retail markets.',
    image: 'https://images.unsplash.com/photo-1598170845058-12ef4a45753b?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true
  },
  {
    id: 'green-local-pepper-05kg',
    name: 'Local Green Hot Pepper',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 22.00,
    unit: '0.5 KG',
    description: 'Pungent Ghanaian hot green pepper for traditional shito, sauces, and soups.',
    image: 'https://images.unsplash.com/photo-1588879460418-090623250e24?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'green-pepper-1kg',
    name: 'Sweet Green Bell Pepper',
    category: 'vegetables',
    categoryLabel: 'Fruits & Vegetables',
    price: 43.00,
    unit: '1 KG',
    description: 'Thick-walled green bell peppers for salads, stir-fries, and food service.',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'banana-1kg',
    name: 'Naturally Ripe Bananas',
    category: 'fruits',
    categoryLabel: 'Fruits & Vegetables',
    price: 11.00,
    unit: '1 KG',
    description: 'Sweet, chemical-free ripe table bananas grown on our agro-ecological partner farms.',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'green-lemon-1kg',
    name: 'Fresh Green Lemons',
    category: 'fruits',
    categoryLabel: 'Fruits & Vegetables',
    price: 38.00,
    unit: '1 KG',
    description: 'Thin-skinned, high-juice green lemons for beverages, marinades, and natural dressing.',
    image: 'https://images.unsplash.com/photo-1534531141161-e416049a463d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'yellow-lemon-1kg',
    name: 'Juicy Yellow Lemons',
    category: 'fruits',
    categoryLabel: 'Fruits & Vegetables',
    price: 55.00,
    unit: '1 KG',
    description: 'Fragrant, bright yellow lemons packed with vitamin C.',
    image: 'https://images.unsplash.com/photo-1534531141161-e416049a463d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'lime-05kg',
    name: 'Fresh Limes',
    category: 'fruits',
    categoryLabel: 'Fruits & Vegetables',
    price: 27.00,
    unit: '0.5 KG',
    description: 'Aromatic green limes for cocktail bars, kitchens, and natural health drinks.',
    image: 'https://images.unsplash.com/photo-1534531141161-e416049a463d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'red-apple-1kg',
    name: 'Crisp Red Apples',
    category: 'fruits',
    categoryLabel: 'Fruits & Vegetables',
    price: 54.00,
    unit: '1 KG',
    description: 'Crisp, sweet red apples selected for premium crunch and flavor.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'dry-coconut-1pc',
    name: 'Mature Dry Coconut',
    category: 'fruits',
    categoryLabel: 'Fruits & Vegetables',
    price: 9.00,
    unit: '1 Piece',
    description: 'Full-kernel mature dry coconut for coconut oil extraction, baking, or fresh grating.',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'passion-fruit-1kg',
    name: 'Fresh Passion Fruit',
    category: 'fruits',
    categoryLabel: 'Fruits & Vegetables',
    price: 47.00,
    unit: '1 KG',
    description: 'Intensely fragrant purple/yellow passion fruit for juices, cocktails, and desserts.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true
  },

  // --- SEEDLINGS & ORGANIC MANURE ---
  {
    id: 'ginger-seedlings',
    name: 'Ginger Seedlings (Nursery Raised)',
    category: 'seedlings',
    categoryLabel: 'Seedlings & Nursery',
    price: 2.50,
    unit: 'Seedling',
    description: 'Vigorous ginger setts and young plants in seedling cells, hardened off for fast establishment in rich soil.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true,
    specs: ['Rooted cell tray plant', 'High disease resistance', 'Guaranteed high rhizome yield']
  },
  {
    id: 'carrot-seedlings',
    name: 'Carrot Seedlings (Tray Plug)',
    category: 'seedlings',
    categoryLabel: 'Seedlings & Nursery',
    price: 1.50,
    unit: 'Seedling',
    description: 'Uniform, nursery-raised carrot seedlings grown in plug trays for an even stand and quick growth.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'passion-fruit-seedlings',
    name: 'Passion Fruit Seedlings (Staked)',
    category: 'seedlings',
    categoryLabel: 'Seedlings & Nursery',
    price: 5.00,
    unit: 'Seedling',
    description: 'Healthy staked climbing passion fruit seedlings ready for trellis or orchard planting.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true
  },
  {
    id: 'tomato-seedlings',
    name: 'Tomato Seedlings (F1 Hybrid)',
    category: 'seedlings',
    categoryLabel: 'Seedlings & Nursery',
    price: 2.00,
    unit: 'Seedling',
    description: 'Sturdy tomato seedlings with strong stem structure and early flowering potential.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'manure-small',
    name: 'Organic Manure — Small Garden Bag (5KG)',
    category: 'manure',
    categoryLabel: 'Soil Amendments & Manure',
    price: 15.00,
    unit: '5 KG Bag',
    description: 'Fully composted organic manure rich in humus, nitrogen, and beneficial soil microbes. Safe for home gardens and potted plants.',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true,
    specs: ['Odorless cured compost', '100% Organic', 'Safe for vegetables & flowers']
  },
  {
    id: 'manure-medium',
    name: 'Organic Manure — Medium Bag (15KG)',
    category: 'manure',
    categoryLabel: 'Soil Amendments & Manure',
    price: 25.00,
    unit: '15 KG Bag',
    description: 'Ideal 15kg size for smallholdings, greenhouse beds, and backyard vegetable gardens.',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    inStock: true
  },
  {
    id: 'manure-large',
    name: 'Organic Manure — Large Ag Sack (50KG)',
    category: 'manure',
    categoryLabel: 'Soil Amendments & Manure',
    price: 40.00,
    unit: '50 KG Bag',
    description: 'Heavy-duty 50kg agricultural sack of matured poultry manure & composted biomass for farm field broadcasting.',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true,
    specs: ['50KG Woven Poly Sack', 'High Nitrogen & Potassium', 'Improves soil water retention']
  },
  {
    id: 'processed-fertilizer-bulk',
    name: 'Processed Organic Fertilizer — Bulk Ton',
    category: 'manure',
    categoryLabel: 'Soil Amendments & Manure',
    price: 65.00,
    unit: '50 KG Bag (Bulk Rate)',
    minOrder: '10 Sacks',
    description: 'Screened, pelletized/granulated organic soil amendment for commercial crop production and soil restoration.',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    inStock: true,
    specs: ['Uniform Granules', 'Slow Release Nutrients', 'Tested N-P-K Value']
  }
];

export const MOMO_CONFIG = {
  accountName: 'DANIEL KERDMOTT ESSIEN',
  businessName: 'KERD FARMS',
  mtnNumber: '024 013 5545',
  telecelNumber: '024 013 5545',
  airtelTigoNumber: '024 013 5545',
  primaryPhone: '+233 24 013 5545',
  email: 'info@kerdfarms.com',
  primaryEmail: 'info@kerdfarms.com',
  secondaryEmail: 'kerdfarms@gmail.com',
  location: 'Abokobi, Accra & Volta Region, Ghana',
  whatsappNumber: '233240135545'
};
