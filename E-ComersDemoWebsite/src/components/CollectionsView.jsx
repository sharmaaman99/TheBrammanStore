import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * CollectionsView (Screen 04 from UX Showcase)
 * Features:
 * - Editorial Hero Banner: "Collections - Find your vibe. Wear your story."
 * - 6 category photo cards with hover zoom and "Explore →"
 *   - Graphic Tees
 *   - Plain Tees
 *   - Oversized
 *   - Polo T-Shirts
 *   - Half Sleeve
 *   - Full Sleeve
 * - Clicking "Explore →" navigates to Shop filtered by that category.
 */
export default function CollectionsView({ onSelectCategory = () => {}, onNavigate = () => {} }) {
  const collections = [
    {
      id: 'graphic-tees',
      name: 'Graphic Tees',
      tagline: 'Vedic symbolism meets bold brutalist printwork',
      count: '14 Styles',
      image: '/lookbook/creator_ishaan.jpg',
      badge: 'Best Seller',
    },
    {
      id: 'plain-tees',
      name: 'Plain Tees',
      tagline: 'Unbranded luxury, pure 260 GSM combed cotton',
      count: '10 Styles',
      image: '/lookbook/creator_rohan.jpg',
      badge: 'Essential',
    },
    {
      id: 'oversized',
      name: 'Oversized',
      tagline: 'Engineered dropped shoulder architectural drape',
      count: '18 Styles',
      image: '/lookbook/creator_aarav.jpg',
      badge: 'Signature',
    },
    {
      id: 'polo-tshirts',
      name: 'Polo T-Shirts',
      tagline: 'Structured collar luxury streetwear with tactile knit',
      count: '8 Styles',
      image: '/lookbook/creator_kabir.jpg',
      badge: 'Premium',
    },
    {
      id: 'half-sleeve',
      name: 'Half Sleeve',
      tagline: 'Daily high-rotation cuts for year-round comfort',
      count: '16 Styles',
      image: '/lookbook/creator_ananya.jpg',
      badge: 'Trending',
    },
    {
      id: 'full-sleeve',
      name: 'Full Sleeve',
      tagline: 'Heavyweight thermal layers & cold-weather armor',
      count: '9 Styles',
      image: '/lookbook/creator_tanya.jpg',
      badge: 'Winter Drop',
    },
  ];

  const handleCardClick = (catId, catName) => {
    onSelectCategory(catId);
    if (onNavigate) {
      onNavigate('Shop');
    }
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen">
      {/* ============================================================== */}
      {/* 1. HERO BANNER: "Collections" (Screen 04)                        */}
      {/* ============================================================== */}
      <section className="relative w-full bg-[#111317] text-white overflow-hidden">
        {/* Subtle background glow & texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Banner Text Left */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-neutral-300 text-[11px] font-mono uppercase tracking-widest border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>The Silhouette Archive 2026</span>
              </div>
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
                Collections
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 font-sans max-w-xl leading-relaxed">
                Find your vibe. Wear your story.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-neutral-400 font-mono">
                <span>06 Distinct Categories</span>
                <span>•</span>
                <span>Heavyweight 260 GSM Bio-Washed</span>
                <span>•</span>
                <span>Made in Bharat</span>
              </div>
            </div>

            {/* Banner Model Photo Right */}
            <div className="md:col-span-5 relative flex justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
                <img
                  src="/model_indra_boy_8k.png"
                  alt="Collections Editorial"
                  className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/teevibe_hero_model_clean.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-neutral-300 flex justify-between items-center">
                  <span>Brahmman Silhouette Study</span>
                  <span className="text-amber-300 font-semibold">Drop 04 // 2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. 6 CATEGORY PHOTO CARDS (Screen 04 Grid)                      */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              Curated Silhouettes
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight">
              Explore By Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-2 sm:mt-0">
            Handcrafted heavy cotton, pre-shrunk & designed for lifetime longevity.
          </p>
        </div>

        {/* 6 Category Cards Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat.id, cat.name)}
              className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-neutral-400 transition-all duration-300 overflow-hidden"
            >
              {/* Photo Box with Hover Zoom */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = '/cat_1_mens.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge Top Left */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-black/80 text-white rounded-full backdrop-blur-sm">
                    {cat.badge}
                  </span>
                </div>

                {/* Count Badge Top Right */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 text-[10px] font-mono bg-white/90 text-neutral-800 rounded-full shadow-xs backdrop-blur-sm">
                    {cat.count}
                  </span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-heading font-black text-lg sm:text-xl text-neutral-900 group-hover:text-black transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans mt-1 line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>

                {/* Explore Link with Arrow */}
                <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 group-hover:text-black group-hover:underline inline-flex items-center gap-1.5 transition-colors">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase">
                    View Drop →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
