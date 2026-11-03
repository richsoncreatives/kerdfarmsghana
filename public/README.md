# KERD FARMS — Cloudflare Pages static export

The supplied page designs and content are preserved. The Shop control in the desktop main navigation now opens a click-operated dropdown with these links:
- All Products → `/shop/`
- Fruits & Vegetables → `/produce/`
- Poultry & Eggs → `/poultry/`
- Seedlings & Manure → `/soil/`

The original Richson Creatives footer credit is retained on all nine supplied pages. The floating Base44 edit badge is removed.

## Pages
- `/` — Home
- `/about/` — About Us
- `/shop/` — All Products
- `/produce/` — Fruits & Vegetables
- `/poultry/` — Poultry & Eggs
- `/soil/` — Seedlings & Manure
- `/impact/` — Our Impact
- `/insights/` — Insights
- `/contact/` — Contact

## Deploy to Cloudflare Pages via GitHub
1. Extract this ZIP and upload its contents to the root of a GitHub repository.
2. Create a Cloudflare Pages project connected to that repository.
3. Select no framework preset, leave the build command blank, and set the output directory to `/`.
4. Deploy.

Images that were hosted on Base44's media CDN remain linked there, so those URLs must stay accessible. This is a static export; Base44-dependent backend features are not recreated.
