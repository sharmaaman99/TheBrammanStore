import React from 'react';
import { ArrowRight, Sparkles, Shield, Compass, Flame, Heart, Star, Users, Layers } from 'lucide-react';

/**
 * AboutUsView (Screen 10 from UX Showcase)
 * Features:
 * - 2-Column Layout:
 *   - Left: High-impact streetwear photo of models
 *   - Right: 'About The Brahmman Store'
 *     - Narrative: "We're not just a clothing brand. We're a movement for those who think different. The Brahmman Store is built for dreamers, creators and the bold."
 *     - "Streetwear with a deeper meaning."
 *     - 3 Clean Stat Counters:
 *       - 1K+ Happy Customers
 *       - 50+ Collections
 *       - 4.8 Average Rating
 */
export default function AboutUsView({ onNavigate = () => {} }) {
  const stats = [
    {
      value: '1K+',
      label: 'Happy Customers',
      icon: Users,
    },
    {
      value: '50+',
      label: 'Collections',
      icon: Layers,
    },
    {
      value: '4.8',
      label: 'Average Rating',
      icon: Star,
    },
  ];

  const pillars = [
    {
      title: 'Ancient Philosophy',
      desc: 'Sanskrit mantras and sacred symbolism decoded into raw street silhouettes.',
    },
    {
      title: '260 GSM Combed Cotton',
      desc: 'Substantial, structured heavyweight fabric engineered to resist wear and tear.',
    },
    {
      title: 'Bio-Washed & Pre-Shrunk',
      desc: 'Silken exterior handfeel with guaranteed dimensional stability after wash.',
    },
    {
      title: 'Proudly Made in Bharat',
      desc: 'Handcrafted by generational artisans in Tirupur with ethical trade practices.',
    },
  ];

  return (
    <div className="w-full bg-[#fafafa] min-h-screen">
      {/* Top Breadcrumb Header */}
      <section className="bg-white border-b border-neutral-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <button
              onClick={() => onNavigate('Home')}
              className="hover:text-black transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-black font-semibold">About Us</span>
          </div>
        </div>
      </section>

      {/* Main Screen 10 2-Column Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: Streetwear Photo of Models (Screen 10)                    */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Frame */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)] group">
                <img
                  src="/teevibe_hero_model_clean.png"
                  alt="The Brahmman Store Models"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = '/model_indra_boy_8k.png';
                  }}
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Corner Architectural Stamp */}
                <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono uppercase px-3 py-1.5 rounded-full border border-white/20">
                  Est. 2026 // New Delhi
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-mono text-xs opacity-80 uppercase tracking-widest">
                    The Modern Vedic Movement
                  </p>
                  <p className="font-heading font-black text-lg">
                    Rebels With A Higher Cause
                  </p>
                </div>
              </div>

              {/* Decorative background geometric accent */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-neutral-200/50 -z-10 blur-2xl" />
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: About The Brahmman Store Narrative & Stats (Screen 10)  */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[11px] font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Our Manifesto</span>
              </div>
              
              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight leading-tight">
                About The Brahmman Store
              </h1>

              {/* Exact narrative from UX Showcase / prompt: */}
              <p className="text-lg sm:text-xl font-heading font-medium text-neutral-800 leading-snug">
                "We're not just a clothing brand. We're a movement for those who think different. The Brahmman Store is built for dreamers, creators and the bold."
              </p>

              {/* Exact callout quote from prompt: */}
              <div className="border-l-4 border-black pl-4 py-1">
                <p className="font-heading font-black text-base sm:text-lg text-neutral-900 italic">
                  Streetwear with a deeper meaning.
                </p>
              </div>

              <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
                Founded at the confluence of ancient Vedic philosophy and contemporary street rebellion, The Brahmman Store strips away fleeting fast-fashion disposable trends. Every single silhouette is built from scratch with ultra-heavyweight 260 GSM combed cotton, custom drop-shoulder cuts, and screenprints designed to outlast ordinary garments.
              </p>
            </div>

            {/* ============================================================== */}
            {/* 3 CLEAN STAT COUNTERS (Screen 10)                              */}
            {/* ============================================================== */}
            <div className="pt-4 border-t border-neutral-200">
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs group hover:border-black transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <div className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                        {s.value}
                      </div>
                      <div className="text-xs text-neutral-500 font-sans mt-0.5 font-medium">
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explore Button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('Shop')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('Lookbook')}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white border border-neutral-300 text-neutral-800 hover:text-black hover:border-black transition-all font-heading font-bold text-xs uppercase tracking-wider"
              >
                <span>View Lookbook</span>
              </button>
            </div>

          </div>

        </div>

        {/* 4 Brand Pillars Mini Section */}
        <div className="mt-20 pt-16 border-t border-neutral-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              The Architecture
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900">
              Four Principles of Every Garment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={p.title}
                className="p-6 bg-white rounded-2xl border border-neutral-200 hover:shadow-md transition-shadow space-y-2"
              >
                <span className="text-xs font-mono font-bold text-neutral-400">
                  0{idx + 1} //
                </span>
                <h3 className="font-heading font-black text-base text-neutral-900">
                  {p.title}
                </h3>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
