import React, { useState } from 'react';
import { Star, Heart, Plus, ArrowRight, Check } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/productsData';

/**
 * Curated title mapping for Indian Philosophy products in the modern streetwear grid.
 */
const DISPLAY_TITLES = {
  'prod-01': 'Kundalini Oversized',
  'kundalini': 'Kundalini Oversized',
  'prod-02': 'Tat Tvam Asi Drop',
  'tat-tvam-asi': 'Tat Tvam Asi Drop',
  'prod-03': 'Indra Heavyweight',
  'indra': 'Indra Heavyweight',
  'prod-04': 'Parshuram Series',
  'parshuram': 'Parshuram Series',
  'prod-05': 'Kaal Chronos',
  'kaal': 'Kaal Chronos',
  'prod-06': 'Maya Matrix',
  'maya': 'Maya Matrix',
  'prod-07': 'Shunya Void Tee',
  'shunya': 'Shunya Void Tee',
  'prod-08': 'Bodhi Nirvana Drop',
  'bodhi': 'Bodhi Nirvana Drop',
};

/**
 * Curated ratings and review counts matching the TeeVibe reference (e.g. ★ 4.8 (2.4k))
 */
const PRODUCT_RATINGS = {
  'prod-01': { rating: '4.8', count: '2.4k' },
  'prod-02': { rating: '4.7', count: '1.8k' },
  'prod-03': { rating: '4.8', count: '3.1k' },
  'prod-04': { rating: '4.9', count: '2.8k' },
  'prod-05': { rating: '4.7', count: '1.1k' },
  'prod-06': { rating: '4.8', count: '1.5k' },
  'prod-07': { rating: '4.7', count: '1.2k' },
  'prod-08': { rating: '4.8', count: '1.3k' },
};

/**
 * Crisp flat-lay fallback photography directly from teevibe-reference.png
 * Ensures immediate offline rendering even in isolated sandbox environments.
 */
const PRODUCT_FLATLAY_MAP = {
  'prod-01': '/tees/feat_0.png',
  'kundalini': '/tees/feat_0.png',
  'prod-02': '/tees/feat_4.png',
  'tat-tvam-asi': '/tees/feat_4.png',
  'prod-03': '/tees/feat_2.png',
  'indra': '/tees/feat_2.png',
  'prod-04': '/tees/arr_2.png',
  'parshuram': '/tees/arr_2.png',
  'prod-05': '/tees/feat_5.png',
  'kaal': '/tees/feat_5.png',
  'prod-06': '/tees/arr_3.png',
  'maya': '/tees/arr_3.png',
  'prod-07': '/tees/feat_1.png',
  'shunya': '/tees/feat_1.png',
  'prod-08': '/tees/feat_3.png',
  'bodhi': '/tees/feat_3.png',
};

/**
 * Color palettes mapped to product image indices so clicking dots switches images smoothly.
 */
const COLOR_PALETTES = {
  'prod-01': [
    { name: 'Obsidian Black', hex: '#141414', imgIndex: 0 },
    { name: 'Vintage Charcoal', hex: '#374151', imgIndex: 1 },
    { name: 'Stone Grey', hex: '#6b7280', imgIndex: 2 },
    { name: 'Raw White', hex: '#f4f4f0', imgIndex: 0 },
  ],
  'prod-02': [
    { name: 'Raw Cream', hex: '#f5f5f0', imgIndex: 0 },
    { name: 'Bone White', hex: '#e7e5e4', imgIndex: 1 },
    { name: 'Oatmeal', hex: '#d6d3d1', imgIndex: 2 },
    { name: 'Charcoal', hex: '#292524', imgIndex: 0 },
  ],
  'prod-03': [
    { name: 'Vajra Black', hex: '#0f172a', imgIndex: 0 },
    { name: 'Storm Blue', hex: '#334155', imgIndex: 1 },
    { name: 'Slate Gray', hex: '#1e293b', imgIndex: 2 },
    { name: 'Cloud Mist', hex: '#cbd5e1', imgIndex: 0 },
  ],
  'prod-04': [
    { name: 'Deep Black', hex: '#1c1917', imgIndex: 0 },
    { name: 'Forest Olive', hex: '#3f4838', imgIndex: 1 },
    { name: 'Charcoal', hex: '#44403c', imgIndex: 2 },
    { name: 'Sand Dune', hex: '#d6c7b2', imgIndex: 0 },
  ],
  'prod-05': [
    { name: 'Abyssal Black', hex: '#09090b', imgIndex: 0 },
    { name: 'Midnight Ash', hex: '#18181b', imgIndex: 1 },
    { name: 'Graphite', hex: '#27272a', imgIndex: 2 },
    { name: 'Bone White', hex: '#e4e4e7', imgIndex: 0 },
  ],
  'prod-06': [
    { name: 'Lotus Pink', hex: '#fbcfe8', imgIndex: 0 },
    { name: 'Blush Rose', hex: '#f43f5e', imgIndex: 1 },
    { name: 'Cream Chalk', hex: '#fdf2f8', imgIndex: 2 },
    { name: 'Obsidian', hex: '#18181b', imgIndex: 0 },
  ],
  'prod-07': [
    { name: 'Void Black', hex: '#18181b', imgIndex: 0 },
    { name: 'Ghost White', hex: '#fafaf9', imgIndex: 1 },
    { name: 'Ash Slate', hex: '#94a3b8', imgIndex: 2 },
  ],
  'prod-08': [
    { name: 'Sage Slate', hex: '#475569', imgIndex: 0 },
    { name: 'Olive Drab', hex: '#57534e', imgIndex: 1 },
    { name: 'Sand Dune', hex: '#a8a29e', imgIndex: 2 },
  ],
};

const DEFAULT_PALETTE = [
  { name: 'Black', hex: '#171717', imgIndex: 0 },
  { name: 'Cream', hex: '#f5f5f0', imgIndex: 1 },
  { name: 'Slate', hex: '#64748b', imgIndex: 2 },
];

/**
 * Single TeeVibe-styled Product Card (Memoized for zero re-render overhead)
 */
export const TeeVibeProductCard = React.memo(function TeeVibeProductCard({
  product,
  badgeType = null, // 'bestseller' | 'new' | null
  badgeLabel = null,
  onSelectProduct,
  onQuickAdd,
  formatPrice,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const palette = COLOR_PALETTES[product.id] || COLOR_PALETTES[product.handle] || DEFAULT_PALETTE;
  const activeColor = palette[selectedColorIdx] || palette[0];

  // Pick image corresponding to active color, with local crisp flat-lay fallback
  const fallbackFlatlay = PRODUCT_FLATLAY_MAP[product.id] || PRODUCT_FLATLAY_MAP[product.handle] || '/tees/feat_0.png';
  const images = product.images && product.images.length > 0 ? product.images : [];
  const currentImage = images[activeColor.imgIndex % (images.length || 1)] || fallbackFlatlay;

  // Secondary on-model streetwear photo for hover flip (Represent / Zara DTC lookbook experience)
  const secondaryImage = (images.length > 1 && images[1] !== currentImage)
    ? images[1]
    : (images.length > 2 ? images[2] : null);

  // Title formatting
  const displayTitle = DISPLAY_TITLES[product.id] || DISPLAY_TITLES[product.handle] || product.title;

  // Rating and review count matching TeeVibe reference
  const ratingData = PRODUCT_RATINGS[product.id] || PRODUCT_RATINGS[product.handle] || {
    rating: product.rating ? `${product.rating}` : '4.8',
    count: product.reviewsCount ? `${product.reviewsCount}` : '2.4k',
  };

  // Safe price formatter
  const formattedPrice = typeof formatPrice === 'function'
    ? formatPrice(product.price)
    : `₹${Number(product.price).toLocaleString('en-IN')}`;

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleColorClick = (idx, e) => {
    e.stopPropagation();
    setSelectedColorIdx(idx);
  };

  const handleQuickAddClick = (e) => {
    e.stopPropagation();
    const size = (product.sizes && product.sizes[0]) || 'L';
    if (onQuickAdd) {
      onQuickAdd(product, size);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <article
      onClick={handleCardClick}
      className="bg-white rounded-2xl flex flex-col justify-between cursor-pointer group border border-neutral-100 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 overflow-hidden select-none p-0"
    >
      {/* Top Product Image Stage (Edge-to-edge, zero inner padding, 3:4 portrait luxury ratio) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f4f5f6] flex items-center justify-center p-0">
        
        {/* Badges */}
        {badgeType === 'bestseller' && (
          <span className="absolute top-3 left-3 z-20 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-xs">
            {badgeLabel || 'Best Seller'}
          </span>
        )}
        {badgeType === 'new' && (
          <span className="absolute top-3 left-3 z-20 bg-black text-white text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-xs">
            {badgeLabel || 'New'}
          </span>
        )}

        {/* Secondary On-Model Streetwear Photo (Hover Cross-Fade Flip - DTC Lookbook experience) */}
        {secondaryImage && (
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-center justify-center bg-[#eceef0]">
            <img
              src={secondaryImage}
              alt={`${displayTitle} - On Model`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              className="w-full h-full object-cover filter contrast-[1.03] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {/* Crisp Flat-Lay T-Shirt (Full edge-to-edge canvas with zero inner padding) */}
        <img
          src={currentImage}
          alt={displayTitle}
          onError={(e) => {
            if (e.currentTarget.src !== fallbackFlatlay) {
              e.currentTarget.src = fallbackFlatlay;
            }
          }}
          className={`relative z-1 w-full h-full object-contain p-0 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out ${
            secondaryImage
              ? 'group-hover:opacity-0 group-hover:scale-95'
              : 'group-hover:scale-105'
          }`}
          loading="lazy"
          decoding="async"
        />

        {/* Wishlist Heart Icon in Top-Right */}
        <button
          type="button"
          onClick={handleHeartClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center text-neutral-500 hover:text-black transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? 'fill-red-500 text-red-500'
                : 'text-neutral-500 hover:text-black'
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button
            type="button"
            onClick={handleQuickAddClick}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg bg-black text-white hover:bg-neutral-800 active:scale-98 transition-all"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Clean Minimalist Product Information (No fake ratings or clutter) */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-medium text-sm sm:text-base text-neutral-900 group-hover:text-black line-clamp-1 tracking-tight"
              title={displayTitle}
            >
              {displayTitle}
            </h3>
            <span className="font-bold text-sm sm:text-base text-neutral-900 shrink-0">
              {formattedPrice}
            </span>
          </div>

          <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-1">
            {product.category || 'Oversized Tee'}
          </p>
        </div>
      </div>
    </article>
  );
});

/**
 * TeeVibe Product Grid Component
 * Features TWO 6-column grid sections:
 *  1. Featured Collection (with "Best Seller" solid black pill badges)
 *  2. New Arrivals (with "New" lime green pill badges)
 */
export default function TeeVibeProductGrid({
  products = INITIAL_PRODUCTS,
  onSelectProduct,
  onQuickAdd,
  formatPrice,
  onToggleWishlist,
  wishlist = [],
  section = 'all', // 'all' | 'featured' | 'arrivals'
}) {
  const [internalWishlist, setInternalWishlist] = useState({});

  // Helper to check if item is wishlisted
  const isWishlisted = (productId) => {
    if (wishlist) {
      if (Array.isArray(wishlist)) return wishlist.includes(productId);
      if (typeof wishlist === 'object' && wishlist !== null) return Boolean(wishlist[productId]);
    }
    return Boolean(internalWishlist[productId]);
  };

  // Toggle wishlist state
  const handleToggleWishlist = (product) => {
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
    setInternalWishlist(prev => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
  };

  // Fallback safe product lists preserving Indian Philosophy products
  const availableProducts = products && products.length > 0 ? products : INITIAL_PRODUCTS;

  // 1. Featured Collection (6 items: Kundalini, Tat Tvam Asi, Indra, Parshuram, Kaal, Maya)
  const featuredProducts = [
    availableProducts.find(p => p.id === 'prod-01' || p.handle === 'kundalini'),
    availableProducts.find(p => p.id === 'prod-02' || p.handle === 'tat-tvam-asi'),
    availableProducts.find(p => p.id === 'prod-03' || p.handle === 'indra'),
    availableProducts.find(p => p.id === 'prod-04' || p.handle === 'parshuram'),
    availableProducts.find(p => p.id === 'prod-05' || p.handle === 'kaal'),
    availableProducts.find(p => p.id === 'prod-06' || p.handle === 'maya'),
  ].filter(Boolean);

  const finalFeatured = featuredProducts.length >= 6
    ? featuredProducts.slice(0, 6)
    : [...featuredProducts, ...availableProducts].slice(0, 6);

  // 2. New Arrivals (6 items: Maya, Shunya, Bodhi, Indra, Kundalini, Tat Tvam Asi)
  const newArrivalCandidates = [
    availableProducts.find(p => p.id === 'prod-06' || p.handle === 'maya'),
    availableProducts.find(p => p.id === 'prod-07' || p.handle === 'shunya'),
    availableProducts.find(p => p.id === 'prod-08' || p.handle === 'bodhi'),
    availableProducts.find(p => p.id === 'prod-03' || p.handle === 'indra'),
    availableProducts.find(p => p.id === 'prod-01' || p.handle === 'kundalini'),
    availableProducts.find(p => p.id === 'prod-02' || p.handle === 'tat-tvam-asi'),
  ].filter(Boolean);

  const finalNewArrivals = newArrivalCandidates.length >= 6
    ? newArrivalCandidates.slice(0, 6)
    : [...newArrivalCandidates, ...availableProducts].slice(0, 6);

  const renderFeatured = (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 pb-2 border-b border-neutral-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            Featured Collection
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('featured-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-black transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Big Minimalist Responsive Grid */}
      <div id="featured-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {finalFeatured.map((product, idx) => (
          <TeeVibeProductCard
            key={`featured-${product.id || idx}`}
            product={product}
            badgeType={idx === 0 ? 'bestseller' : null}
            badgeLabel="Best Seller"
            onSelectProduct={onSelectProduct}
            onQuickAdd={onQuickAdd}
            formatPrice={formatPrice}
            isWishlisted={isWishlisted(product.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </div>
    </section>
  );

  const renderNewArrivals = (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 pb-2 border-b border-neutral-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            New Arrivals
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('new-arrivals-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-black transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Big Minimalist Responsive Grid */}
      <div id="new-arrivals-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {finalNewArrivals.map((product, idx) => (
          <TeeVibeProductCard
            key={`new-${product.id || idx}`}
            product={product}
            badgeType={idx === 0 ? 'new' : null}
            badgeLabel="New"
            onSelectProduct={onSelectProduct}
            onQuickAdd={onQuickAdd}
            formatPrice={formatPrice}
            isWishlisted={isWishlisted(product.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </div>
    </section>
  );

  if (section === 'featured') {
    return <div className="w-full py-4 sm:py-6">{renderFeatured}</div>;
  }

  if (section === 'arrivals') {
    return <div className="w-full py-4 sm:py-6">{renderNewArrivals}</div>;
  }

  return (
    <div className="w-full bg-white py-10 sm:py-14 space-y-12 sm:space-y-16">
      {renderFeatured}
      {renderNewArrivals}
    </div>
  );
}
