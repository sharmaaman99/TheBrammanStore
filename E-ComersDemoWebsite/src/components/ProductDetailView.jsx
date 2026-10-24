import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  Check,
  Eye,
  RotateCcw,
  Ruler,
  Truck,
  Shield,
  Share2,
  Star,
  ArrowLeft
} from 'lucide-react';

// Dynamic lazy imports for AI Fit Calculator
const FindYourFitModal = React.lazy(() => import('./FindYourFitModal'));

/**
 * Standard sizes supported across all Brahmman streetwear silhouettes
 */
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

/**
 * Generates 5 curated viewpoints for any garment (Front, Back, On-Model, Detail, Folded Archive)
 */
export function getProductGallery(product) {
  if (!product) return [];

  const rawImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : []);

  const labels = [
    'Front Graphic',
    'Back Graphic',
    'On-Model Fit',
    'Fabric & Stitch',
    'Folded Archive'
  ];

  // Specific contextual images for each viewpoint
  const fallbackModel = (product.handle === 'tat-tvam-asi' && '/model_tattvamasi_boy.png')
    || (product.handle === 'indra' && '/model_indra_boy.png')
    || (product.handle === 'kundalini' && '/model_kundalini_boy.png')
    || '/model_kundalini_boy.png';

  return [
    {
      id: 0,
      src: rawImages[0] || product.image || '/cat_2_oversized.png',
      alt: `${product.title || 'Product'} - Front View`,
      label: labels[0]
    },
    {
      id: 1,
      src: rawImages[1] || rawImages[0] || '/cat_2_oversized.png',
      alt: `${product.title || 'Product'} - Back Graphic`,
      label: labels[1]
    },
    {
      id: 2,
      src: rawImages[2] || rawImages[1] || '/tees/feat_0.png',
      alt: `${product.title || 'Product'} - Print Detail`,
      label: labels[2]
    },
    {
      id: 3,
      src: rawImages[3] || product.modelImage || fallbackModel,
      alt: `${product.title || 'Product'} - On-Model Fit`,
      label: labels[3]
    },
    {
      id: 4,
      src: rawImages[4] || product.lifestyleImage || '/folded-luxury-tees.png',
      alt: `${product.title || 'Product'} - Folded Luxury Archive`,
      label: labels[4]
    }
  ];
}

/**
 * Cleans product titles to strictly match Screen 03 minimalist Title Case aesthetic
 */
export function getCleanProductTitle(product) {
  if (!product) return 'Shunya Void Tee';

  if (product.handle === 'shunya' || (product.title && product.title.toLowerCase().includes('shunya'))) {
    return 'Shunya Void Tee';
  }

  let t = product.title || '';
  t = t.replace(/\s*\/\s*[\u0900-\u097F]+\s*—\s*/g, ' ')
       .replace(/\s*—\s*/g, ' ')
       .replace(/OVERSIZED T-SHIRT/i, 'Oversized Tee')
       .replace(/OVERSIZED SHIRT/i, 'Oversized Tee')
       .replace(/OVERSIZED HOODIE/i, 'Oversized Hoodie')
       .replace(/OVERSIZED SWEATSHIRT/i, 'Oversized Sweatshirt')
       .replace(/OVERSIZED SWEATS/i, 'Oversized Sweats')
       .trim();

  // Convert all uppercase string to clean Title Case
  if (t === t.toUpperCase()) {
    t = t.split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }

  if (!t.toLowerCase().includes('tee') && !t.toLowerCase().includes('hoodie') && !t.toLowerCase().includes('sweat')) {
    t = `${t} Tee`;
  }

  return t;
}

/**
 * ProductDetailView Component
 *
 * Implements Screen 03 ('03. Product Details (Desktop)' and Mobile Responsive)
 * from 'The Brahmman Store UX Showcase.png'.
 *
 * Features:
 * - Left Visual Stage: 5-thumbnail vertical strip + main high-res photo gallery stage
 * - Right Column: Title, Price with strike-through & discount, 5-star rating, specs, size pills,
 *   dual CTA buttons ('Add to Cart' & 'Buy Now'), quick utility links, description, and smooth accordions.
 * - Zero layout shifts, instant reactivity, supports modal and full-page rendering.
 */
export default function ProductDetailView({
  product,
  onAddToCart,
  onBuyNow,
  onClose,
  formatPrice,
  onOpenPolicy,
  isModal = false,
  className = ''
}) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    (product.sizes && product.sizes.includes('L')) ? 'L' : ((product.sizes && product.sizes[0]) || 'L')
  );
  const [showFitModal, setShowFitModal] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [accordions, setAccordions] = useState({
    sizeGuide: false,
    shipping: false
  });

  const gallery = getProductGallery(product);
  const activeImage = gallery[selectedImage] || gallery[0];
  const cleanTitle = getCleanProductTitle(product);

  // Pricing calculations
  const priceVal = product.price || 1800;
  const originalPriceVal = product.originalPrice || (priceVal === 1800 ? 2400 : Math.round(priceVal * 1.25));
  const discountPercent = Math.round(((originalPriceVal - priceVal) / originalPriceVal) * 100);

  const displayPrice = typeof formatPrice === 'function' && !formatPrice(priceVal).includes('Rs.')
    ? formatPrice(priceVal)
    : `₹${Number(priceVal).toLocaleString('en-IN')}`;

  const displayOriginalPrice = typeof formatPrice === 'function' && !formatPrice(originalPriceVal).includes('Rs.')
    ? formatPrice(originalPriceVal)
    : `₹${Number(originalPriceVal).toLocaleString('en-IN')}`;

  // Minimal description strictly matching Screen 03
  const defaultNarrative = "The Shunya Void Tee blends minimal design with deep philosophy, inspired by the concept of emptiness, it represents the balance between chaos and calm.";
  const displayDescription = (product.handle === 'shunya' || !product.description)
    ? defaultNarrative
    : product.description;

  // Handlers
  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedSize, 1, false);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleBuyNowClick = () => {
    if (onBuyNow) {
      onBuyNow(product, selectedSize);
    } else if (onAddToCart) {
      onAddToCart(product, selectedSize, 1, true);
      if (onClose) onClose();
    }
  };

  const handleShareClick = async () => {
    try {
      if (navigator.clipboard && window.location) {
        await navigator.clipboard.writeText(window.location.href);
      }
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handleDeliveryReturnsClick = () => {
    setAccordions(prev => ({ ...prev, shipping: true }));
    if (onOpenPolicy) {
      onOpenPolicy('shipping');
    }
  };

  const toggleAccordion = (key) => {
    setAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const innerContent = (
    <div className={`w-full flex flex-col md:flex-row bg-white overflow-hidden ${isModal ? 'max-h-[90vh]' : 'rounded-3xl border border-neutral-200 shadow-xl'}`}>
      
      {/* ============================================================ */}
      {/* LEFT COLUMN: Visual Stage (Thumbnails + Main Image Gallery)  */}
      {/* ============================================================ */}
      <div className="w-full md:w-1/2 lg:w-7/12 bg-[#F8F8F8] border-b md:border-b-0 md:border-r border-neutral-200 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
        
        {/* Top Header: Brand Accent & Devanagari script */}
        <div className="flex items-center justify-between mb-4 w-full">
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 font-medium">
            {product.category || 'Luxury Streetwear'}
          </span>

          {product.nameDevanagari && (
            <span className="font-devanagari font-bold text-neutral-400 text-sm tracking-wide">
              {product.nameDevanagari}
            </span>
          )}
        </div>

        {/* Desktop Stage: Vertical Thumbnail Strip on Left + Large Main Stage on Right */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch my-auto">
          
          {/* Vertical Thumbnail Strip (Desktop) */}
          <div className="hidden sm:flex flex-col gap-2.5 w-16 md:w-20 shrink-0 justify-center">
            {gallery.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedImage(idx)}
                title={item.label}
                className={`aspect-[3/4] w-full rounded-xl border p-1 bg-white transition-all overflow-hidden cursor-pointer ${
                  selectedImage === idx
                    ? 'border-black ring-2 ring-black shadow-xs'
                    : 'border-neutral-200 opacity-65 hover:opacity-100 hover:border-neutral-400'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  onError={(e) => { e.currentTarget.src = '/cat_2_oversized.png'; }}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* Large Main Product Photo Stage */}
          <div className="flex-1 relative aspect-[3/4] min-h-[360px] sm:min-h-[440px] md:min-h-[480px] rounded-2xl bg-white border border-neutral-200/80 p-3 sm:p-5 flex items-center justify-center overflow-hidden shadow-xs">
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  onError={(e) => { e.currentTarget.src = '/cat_2_oversized.png'; }}
                  initial={{ opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-contain filter contrast-[1.03] select-none transition-transform duration-300 hover:scale-105"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Thumbnail Strip (Shown on Mobile screens) */}
        <div className="flex sm:hidden gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar justify-start">
          {gallery.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedImage(idx);
                setViewMode('2d');
              }}
              className={`w-14 h-18 rounded-lg border p-1 bg-white shrink-0 transition-all overflow-hidden cursor-pointer ${
                viewMode === '2d' && selectedImage === idx
                  ? 'border-black ring-1.5 ring-black'
                  : 'border-neutral-200 opacity-60'
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                onError={(e) => { e.currentTarget.src = '/cat_2_oversized.png'; }}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>

        {/* Bottom Fabric Weight Spec */}
        <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-medium mt-2">
          <span>Fabric Weight</span>
          <span className="text-neutral-900 font-semibold">{product.gsm || '260 GSM'}</span>
        </div>

      </div>

      {/* ============================================================ */}
      {/* RIGHT COLUMN: Product Information, Size, CTA & Details       */}
      {/* ============================================================ */}
      <div className="w-full md:w-1/2 lg:w-5/12 bg-white p-5 sm:p-7 md:p-8 flex flex-col justify-start space-y-5 overflow-y-auto no-scrollbar">
        
        {/* 1. Title, Price, Rating, and Specs */}
        <div className="space-y-2 border-b border-neutral-100 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
            {cleanTitle}
          </h1>

          {/* Price with strike-through and discount badge */}
          <div className="flex items-baseline gap-2.5 pt-0.5">
            <span className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {displayPrice}
            </span>
            {displayOriginalPrice && (
              <span className="text-base sm:text-lg text-neutral-400 line-through">
                {displayOriginalPrice}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ({discountPercent}% OFF)
            </span>
          </div>

          {/* Minimalist Specs */}
          <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider pt-2">
            {product.fabric || '260 GSM Heavyweight Cotton • Unisex Boxy Cut'}
          </p>
        </div>

        {/* 2. Size Selection Pills */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-900 uppercase tracking-wider">
              Size
            </span>
            <span className="text-neutral-500">
              Selected: <strong className="text-black font-semibold">{selectedSize}</strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {SIZES.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] sm:min-w-[52px] py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-xs scale-[1.02]'
                      : 'bg-white text-neutral-800 border-neutral-300 hover:border-black hover:bg-neutral-50'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Dual CTA Buttons Side-by-Side: 'Add to Cart' & 'Buy Now' */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          {/* Solid Black Button: Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCartClick}
            className="flex-1 py-3.5 sm:py-4 px-6 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {addedNotice ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* White Outlined Button: Buy Now */}
          <button
            type="button"
            onClick={handleBuyNowClick}
            className="flex-1 py-3.5 sm:py-4 px-6 rounded-full bg-white text-black border border-black font-semibold text-sm hover:bg-neutral-100 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Buy Now</span>
          </button>
        </div>

        {/* 4. Quick Action Links: 'Size Guide', 'Delivery & Returns', 'Share' */}
        <div className="flex items-center justify-between sm:justify-start sm:gap-6 pt-2 pb-1 border-b border-neutral-100 text-xs sm:text-sm font-medium text-neutral-600">
          <button
            type="button"
            onClick={() => setShowFitModal(true)}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer group py-1"
          >
            <Ruler className="w-4 h-4 text-neutral-500 group-hover:text-black transition-colors" />
            <span>Size Guide</span>
          </button>

          <button
            type="button"
            onClick={handleDeliveryReturnsClick}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer group py-1"
          >
            <Truck className="w-4 h-4 text-neutral-500 group-hover:text-black transition-colors" />
            <span>Delivery & Returns</span>
          </button>

          <button
            type="button"
            onClick={handleShareClick}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer group py-1"
          >
            {shareCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                <span className="text-emerald-700 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-neutral-500 group-hover:text-black transition-colors" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* 5. Product Description Section */}
        <div className="space-y-1.5 pt-1">
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Product Description
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            {displayDescription}
          </p>
        </div>

        {/* 6. Collapsible Accordions: Size Guide & Shipping */}
        <div className="border-t border-neutral-200 divide-y divide-neutral-200 text-xs sm:text-sm pt-1">
          
          {/* Accordion 1: Size Guide */}
          <div className="py-2.5">
            <button
              type="button"
              onClick={() => toggleAccordion('sizeGuide')}
              className="w-full flex items-center justify-between font-semibold text-neutral-900 hover:text-black cursor-pointer py-1"
              aria-expanded={accordions.sizeGuide}
            >
              <span>Size Guide</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                  accordions.sizeGuide ? 'rotate-180 text-black' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {accordions.sizeGuide && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-1 space-y-2">
                    <div className="overflow-x-auto rounded-lg border border-neutral-200">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-200">
                          <tr>
                            <th className="py-2 px-3">Size</th>
                            <th className="py-2 px-3">Chest (in)</th>
                            <th className="py-2 px-3">Length (in)</th>
                            <th className="py-2 px-3">Shoulder (in)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-neutral-700">
                          {[
                            { size: 'XS', chest: '42"', length: '28"', shoulder: '20"' },
                            { size: 'S',  chest: '44"', length: '29"', shoulder: '21"' },
                            { size: 'M',  chest: '46"', length: '30"', shoulder: '22"' },
                            { size: 'L',  chest: '48"', length: '31"', shoulder: '23"' },
                            { size: 'XL', chest: '50"', length: '32"', shoulder: '24"' },
                            { size: 'XXL',chest: '52"', length: '33"', shoulder: '25"' },
                          ].map((row) => (
                            <tr
                              key={row.size}
                              className={selectedSize === row.size ? 'bg-neutral-100 font-bold text-black' : ''}
                            >
                              <td className="py-2 px-3">{row.size}</td>
                              <td className="py-2 px-3">{row.chest}</td>
                              <td className="py-2 px-3">{row.length}</td>
                              <td className="py-2 px-3">{row.shoulder}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                      <span>Intentional oversized fit. True to size.</span>
                      <button
                        type="button"
                        onClick={() => setShowFitModal(true)}
                        className="text-black font-semibold underline flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>AI Fit Calculator</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 2: Shipping & Returns */}
          <div className="py-2.5">
            <button
              type="button"
              onClick={() => toggleAccordion('shipping')}
              className="w-full flex items-center justify-between font-semibold text-neutral-900 hover:text-black cursor-pointer py-1"
              aria-expanded={accordions.shipping}
            >
              <span>Shipping & Returns</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                  accordions.shipping ? 'rotate-180 text-black' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {accordions.shipping && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-1 text-xs text-neutral-600 space-y-2 leading-relaxed">
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-black">•</span>
                      <span><strong>Free delivery across India</strong> in 3–5 business days.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-black">•</span>
                      <span><strong>Easy 7-day returns & exchanges</strong> from delivery date.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-black">•</span>
                      <span>Cash on delivery (COD) & instant UPI payments available. Discrete archive luxury packaging.</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );

  return (
    <>
      {isModal ? (
        innerContent
      ) : (
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${className}`}>
          {/* Breadcrumb / Navigation Bar for Full View */}
          <div className="flex items-center justify-between mb-6 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-1 text-neutral-700 hover:text-black font-semibold mr-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}
              <span>Home</span>
              <span>/</span>
              <span>Shop</span>
              <span>/</span>
              <span className="text-neutral-900 font-medium">{cleanTitle}</span>
            </div>
          </div>

          {innerContent}
        </div>
      )}

      {/* Sizing Fit Calculator Modal (Lazy Loaded) */}
      {showFitModal && (
        <React.Suspense fallback={null}>
          <FindYourFitModal
            isOpen={showFitModal}
            onClose={() => setShowFitModal(false)}
            onApplySize={(size) => setSelectedSize(size)}
            initialHeight={178}
            initialWeight={75}
          />
        </React.Suspense>
      )}
    </>
  );
}
