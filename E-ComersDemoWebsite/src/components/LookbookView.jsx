import React, { useState } from 'react';
import { ArrowRight, Instagram, Heart, Sparkles, MapPin, Tag, ExternalLink, X, ShoppingBag } from 'lucide-react';

/**
 * LookbookView (Screen 09 from UX Showcase)
 * Features:
 * - Header: 'Lookbook - Real people. Real fits. Real street.'
 * - 6-card creator editorial grid showing high-fashion street styling
 *   with creator name, city, tag '#TheBrahmmanStore', and 'View More →'
 * - Interactive fit detail modal with outfit breakdown & shop link
 */
export default function LookbookView({ onSelectProduct = () => {}, onNavigate = () => {} }) {
  const [activeModalLook, setActiveModalLook] = useState(null);
  const [likedLooks, setLikedLooks] = useState({});
  const [showAllLooks, setShowAllLooks] = useState(false);

  const creators = [
    {
      id: 'look-aarav',
      creator: '@aarav.fits',
      name: 'Aarav Mehta',
      city: 'Mumbai, MH',
      likes: 1420,
      image: '/lookbook/creator_aarav.jpg',
      tag: '#TheBrahmmanStore',
      item: 'Kundalini Oversized Tee (260 GSM)',
      fitBreakdown: 'Kundalini Tee in Size L, paired with custom Japanese raw selvedge denim and technical trail sneakers.',
      specs: '100% Bio-Washed Combed Cotton • Drop Shoulder Silhouette',
    },
    {
      id: 'look-kabir',
      creator: '@kabir.streetwear',
      name: 'Kabir Varma',
      city: 'New Delhi, DL',
      likes: 2180,
      image: '/lookbook/creator_kabir.jpg',
      tag: '#TheBrahmmanStore',
      item: 'Tat Tvam Asi Signature Drop',
      fitBreakdown: 'Tat Tvam Asi Raw Cream Tee (Size XL) with relaxed pleated slate trousers and sterling silver accessories.',
      specs: 'Screenprinted Sanskrit Verse • Heavyweight Ribbed Neck',
    },
    {
      id: 'look-ananya',
      creator: '@ananya.drips',
      name: 'Ananya Rao',
      city: 'Bengaluru, KA',
      likes: 3410,
      image: '/lookbook/creator_ananya.jpg',
      tag: '#TheBrahmmanStore',
      item: 'Indra Heavyweight Vajra Drop',
      fitBreakdown: 'Indra Vajra Tee (Size M) tucked into high-waist ripstop cargo trousers and chunky lug-sole boots.',
      specs: 'Mythological Metallic Discharge Print • 260 GSM French Terry',
    },
    {
      id: 'look-ishaan',
      creator: '@ishaan.archive',
      name: 'Ishaan Kapoor',
      city: 'Chandigarh, PB',
      likes: 1890,
      image: '/lookbook/creator_ishaan.jpg',
      tag: '#TheBrahmmanStore',
      item: 'Parshuram Axe Edition',
      fitBreakdown: 'Parshuram Heavy Terry Tee (Size L) styled with utility carpenter jeans and cross-body sling.',
      specs: 'High-Density Puff Print • Reinforced Double-Needle Seams',
    },
    {
      id: 'look-rohan',
      creator: '@rohan.street',
      name: 'Rohan Deshmukh',
      city: 'Pune, MH',
      likes: 1250,
      image: '/lookbook/creator_rohan.jpg',
      tag: '#TheBrahmmanStore',
      item: 'Shunya Void Minimal Tee',
      fitBreakdown: 'Shunya Void Minimal Tee (Size L) layered with minimalist overshirt and tapered workwear chinos.',
      specs: 'Deep Jet Black bio-silicon wash • Minimalist chest typography',
    },
    {
      id: 'look-tanya',
      creator: '@tanya.fits',
      name: 'Tanya Sharma',
      city: 'Jaipur, RJ',
      likes: 2740,
      image: '/lookbook/creator_tanya.jpg',
      tag: '#TheBrahmmanStore',
      item: 'Maya Illusion Thermal Layer',
      fitBreakdown: 'Maya Illusion Full Sleeve (Size M) matched with oversized washed skater denim and vintage shades.',
      specs: '280 GSM Heavy Interlock • Pre-Shrunk & Colorfast',
    },
  ];

  const handleToggleLike = (id, e) => {
    e.stopPropagation();
    setLikedLooks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen">
      {/* ============================================================== */}
      {/* 1. HEADER: "Lookbook - Real people. Real fits. Real street."   */}
      {/* ============================================================== */}
      <section className="bg-white border-b border-neutral-200/90 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-mono tracking-widest uppercase border border-neutral-200">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Community Archive // Streetwear Editorial</span>
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight">
            Lookbook
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-sans max-w-2xl mx-auto">
            Real people. Real fits. Real street.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-neutral-500">
            <span>Tag</span>
            <span className="font-bold text-black bg-neutral-100 px-2 py-0.5 rounded-sm">
              #TheBrahmmanStore
            </span>
            <span>on Instagram to get featured</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. 6-CARD CREATOR EDITORIAL GRID (Screen 09)                    */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((look) => {
            const isLiked = likedLooks[look.id];
            const displayLikes = isLiked ? look.likes + 1 : look.likes;

            return (
              <div
                key={look.id}
                onClick={() => setActiveModalLook(look)}
                className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] hover:border-neutral-400 transition-all duration-300 overflow-hidden"
              >
                {/* Photo Container with Hover Zoom */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={look.image}
                    alt={look.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = '/cat_1_mens.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[11px] font-mono text-white bg-black/75 rounded-full backdrop-blur-md flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-amber-300" />
                      {look.tag}
                    </span>

                    {/* Like Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(look.id, e)}
                      aria-label="Like fit"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isLiked
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-white/80 text-neutral-800 hover:bg-white hover:text-rose-500'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Bottom Creator Overlay in Photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-black text-sm tracking-wide">
                        {look.creator}
                      </span>
                      <span className="text-[11px] font-mono opacity-80 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {look.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-1">
                      <span>{look.name}</span>
                      <span>{displayLikes.toLocaleString()} likes</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-neutral-900 group-hover:text-black line-clamp-1">
                      {look.item}
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans mt-1 line-clamp-2">
                      {look.fitBreakdown}
                    </p>
                  </div>

                  {/* "View More →" link matching Screen 09 */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 group-hover:text-black group-hover:underline inline-flex items-center gap-1 transition-colors">
                      Inspect Styling
                    </span>
                    <span className="text-xs font-semibold text-neutral-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View More →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Centered "View More →" Button (Screen 09) */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => {
              setShowAllLooks(!showAllLooks);
              if (!showAllLooks && onNavigate) {
                // If clicked, also scrolls or switches
              }
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-heading font-bold text-sm tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View More Fits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-neutral-500 font-mono mt-3">
            Showing 6 of 48 Community Archive Entries
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* FIT DETAILS MODAL                                              */}
      {/* ============================================================== */}
      {activeModalLook && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalLook(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalLook(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="relative aspect-[3/4] sm:aspect-auto sm:h-full bg-neutral-900">
                <img
                  src={activeModalLook.image}
                  alt={activeModalLook.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                      Editorial Fit Profile
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-800">
                      {activeModalLook.city}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-black text-xl text-neutral-900">
                      {activeModalLook.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500">
                      {activeModalLook.creator}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Featured Piece:
                    </span>
                    <p className="font-heading font-bold text-sm text-neutral-900">
                      {activeModalLook.item}
                    </p>
                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      {activeModalLook.fitBreakdown}
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Fabric &amp; Build:
                    </span>
                    <p className="text-xs text-neutral-700 font-mono">
                      {activeModalLook.specs}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalLook(null);
                      if (onNavigate) onNavigate('Shop');
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all font-heading font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Shop This Look</span>
                  </button>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 text-center text-xs font-mono text-neutral-500 hover:text-black flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>View on Instagram</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
