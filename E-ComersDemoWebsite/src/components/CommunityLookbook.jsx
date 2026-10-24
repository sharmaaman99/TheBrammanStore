import React, { useState } from 'react';
import { ArrowRight, Instagram, Heart, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/productsData';

/**
 * Community Lookbook creator profiles & high-fashion styling archive
 */
const LOOKBOOK_ITEMS = [
  {
    id: 'look-aarav',
    productId: 'prod-01',
    handle: 'kundalini',
    creator: '@aarav.fits',
    name: 'Aarav Mehta',
    city: 'Mumbai, MH',
    likes: '1.4k',
    sanskrit: 'कुण्डलिनी',
    productName: 'Kundalini Oversized',
    gsm: '260 GSM',
    fitDescription: 'Kundalini 260 GSM Tee (Size L) paired with wide-leg distressed raw denim and chunky technical sneakers.',
    image: '/lookbook/creator_aarav.jpg',
    productFallbackImg: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886',
  },
  {
    id: 'look-kabir',
    productId: 'prod-02',
    handle: 'tat-tvam-asi',
    creator: '@kabir.streetwear',
    name: 'Kabir Varma',
    city: 'New Delhi, DL',
    likes: '2.1k',
    sanskrit: 'तत्त्वमसि',
    productName: 'Tat Tvam Asi Drop',
    gsm: '260 GSM',
    fitDescription: 'Tat Tvam Asi Raw Cream Tee (Size XL) styled with pleated slate trousers and vintage silver accents.',
    image: '/lookbook/creator_kabir.jpg',
    productFallbackImg: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/45.png?v=1789397586',
  },
  {
    id: 'look-ananya',
    productId: 'prod-03',
    handle: 'indra',
    creator: '@ananya.drips',
    name: 'Ananya Rao',
    city: 'Bengaluru, KA',
    likes: '3.4k',
    sanskrit: 'इंद्र',
    productName: 'Indra Heavyweight',
    gsm: '260 GSM',
    fitDescription: 'Indra Vajra Tee (Size M) tucked into high-rise technical cargos with platform boots.',
    image: '/lookbook/creator_ananya.jpg',
    productFallbackImg: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Indraproexp1.png?v=1788422946',
  },
  {
    id: 'look-ishaan',
    productId: 'prod-04',
    handle: 'parshuram',
    creator: '@ishaan.archive',
    name: 'Ishaan Kapoor',
    city: 'Chandigarh, PB',
    likes: '1.9k',
    sanskrit: 'परशुराम',
    productName: 'Parshuram Series',
    gsm: '260 GSM',
    fitDescription: 'Parshuram Heavy Terry Tee (Size L) with brutalist carpenter pants and cross-body utility pack.',
    image: '/lookbook/creator_ishaan.jpg',
    productFallbackImg: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/parshuproexp.png?v=1788421632',
  },
  {
    id: 'look-rohan',
    productId: 'prod-05',
    handle: 'kaal',
    creator: '@rohan.style',
    name: 'Rohan Sen',
    city: 'London, UK',
    likes: '4.2k',
    sanskrit: 'काल',
    productName: 'Kaal Chronos Hoodie',
    gsm: '400 GSM',
    fitDescription: 'Kaal 400 GSM French Terry Thermal Hoodie (Size XL) over tactical parachute pants in brutalist architecture.',
    image: '/lookbook/creator_rohan.jpg',
    productFallbackImg: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/kaal_pro_exp.png?v=1791633682',
  },
  {
    id: 'look-tanya',
    productId: 'prod-06',
    handle: 'maya',
    creator: '@tanya.raw',
    name: 'Tanya Malhotra',
    city: 'Berlin, DE',
    likes: '2.8k',
    sanskrit: 'माया',
    productName: 'Maya Lotus Sweatshirt',
    gsm: '400 GSM',
    fitDescription: 'Maya Pastel Pink Crewneck (Size M) paired with tailored dark wool trousers and leather loafers.',
    image: '/lookbook/creator_tanya.jpg',
    productFallbackImg: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/55_14772461-f8e1-41f4-868d-2e8988329195.png?v=1791192979',
  },
];

export default function CommunityLookbook({
  products = INITIAL_PRODUCTS,
  onSelectProduct = () => {},
  formatPrice,
}) {
  const [likedLooks, setLikedLooks] = useState({});

  const toggleLike = (lookId, e) => {
    e.stopPropagation();
    setLikedLooks(prev => ({
      ...prev,
      [lookId]: !prev[lookId],
    }));
  };

  /**
   * Resolve corresponding product object from products array
   */
  const findProduct = (item) => {
    const list = products && products.length > 0 ? products : INITIAL_PRODUCTS;
    return (
      list.find(p => p.id === item.productId || p.handle === item.handle) ||
      INITIAL_PRODUCTS.find(p => p.id === item.productId || p.handle === item.handle) ||
      list[0]
    );
  };

  const handleCardClick = (item) => {
    const prod = findProduct(item);
    if (prod && onSelectProduct) {
      onSelectProduct(prod);
    }
  };

  return (
    <section className="w-full bg-[#ffffff] py-12 sm:py-16 border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-neutral-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              Community Lookbook
            </h2>
          </div>

          {/* Social Tag Action Pill */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fafafa] border border-[#e5e5e5] hover:border-black text-xs font-semibold text-neutral-800 hover:text-black transition-all shadow-2xs group"
            >
              <Instagram className="w-3.5 h-3.5 text-neutral-700 group-hover:text-black transition-colors" />
              <span>Tag <strong className="text-black">#TheBrahmmanStore</strong></span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Spacious High-Fashion Lookbook Grid (Large Luxury Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LOOKBOOK_ITEMS.map((item) => {
            const product = findProduct(item);
            const isLiked = Boolean(likedLooks[item.id]);
            const priceDisplay = formatPrice
              ? formatPrice(product?.price || 1800)
              : `₹${(product?.price || 1800).toLocaleString('en-IN')}`;

            return (
              <article
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 hover:border-black transition-all duration-300 shadow-sm hover:shadow-2xl cursor-pointer flex flex-col justify-end aspect-[3/4] select-none p-0"
              >
                {/* Real High-Fashion Streetwear Styling Photography */}
                <img
                  src={item.image}
                  alt={`${item.creator} wearing ${item.productName}`}
                  onError={(e) => {
                    if (e.currentTarget.src !== item.productFallbackImg) {
                      e.currentTarget.src = item.productFallbackImg;
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Subtle vignette gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/90 group-hover:via-black/35 transition-colors duration-300" />

                {/* Top Card Bar: Creator Handle Tag & Like Button */}
                <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between">
                  {/* Creator Handle Pill Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono tracking-tight shadow-sm">
                    <span className="font-semibold">{item.creator}</span>
                    <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400/20" />
                  </div>

                  {/* Heart / Likes */}
                  <button
                    type="button"
                    onClick={(e) => toggleLike(item.id, e)}
                    aria-label={`Like look by ${item.creator}`}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all hover:scale-110 active:scale-95 shadow-sm"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Center Devanagari Floating Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity duration-300">
                  <span className="font-devanagari text-5xl sm:text-6xl font-extrabold text-white">
                    {item.sanskrit}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-5 sm:p-6 text-white flex flex-col justify-end">
                  
                  {/* Location */}
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-white/75 tracking-wider mb-1">
                    <span className="truncate">{item.city}</span>
                  </div>

                  {/* Tagged Product Title */}
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white tracking-tight line-clamp-1">
                      {item.productName}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-neutral-300 font-semibold shrink-0">
                      {priceDisplay}
                    </span>
                  </div>

                  {/* Hover Action: Sleek "Shop The Look →" Pill Button */}
                  <div className="mt-3 pt-2 border-t border-white/15 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(item);
                      }}
                      className="w-full py-2.5 px-4 rounded-full bg-white text-black text-xs font-bold font-mono tracking-wider uppercase hover:bg-neutral-100 flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                      <span>Shop The Look →</span>
                    </button>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Footer Sub-Banner */}
        <div className="mt-8 pt-5 border-t border-[#f0f0f0] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Over 1,200+ street stylists tagged across Bharat & global capitals</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-neutral-400">#KUNDALINI</span>
            <span className="text-neutral-400">#TATTVAMASI</span>
            <span className="text-neutral-400">#INDRA</span>
            <span className="text-neutral-400">#PARSHURAM</span>
            <span className="text-neutral-400">#KAAL</span>
            <span className="text-neutral-400">#MAYA</span>
          </div>
        </div>

      </div>
    </section>
  );
}
