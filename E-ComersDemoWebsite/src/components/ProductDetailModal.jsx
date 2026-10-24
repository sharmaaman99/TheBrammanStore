import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ProductDetailView from './ProductDetailView';

export { ProductDetailView };

/**
 * ProductDetailModal Component
 *
 * Implements Screen 03 ('03. Product Details (Desktop)') modal experience
 * matching 'The Brahmman Store UX Showcase.png'.
 *
 * - Left: Vertical thumbnail gallery + Large main high-res photo gallery
 * - Right:
 *   - Product Title & Price ('₹1,800') with original strike-through ('₹2,400 (20% OFF)')
 *   - Rating badge ('★ ★ ★ ★ ★ 4.8 (1.5k reviews)')
 *   - Specs ('Oversized fit • 100% cotton • Unisex')
 *   - Size pills ('XS', 'S', 'M', 'L', 'XL', 'XXL')
 *   - Dual action buttons: Solid black 'Add to Cart' & White outlined 'Buy Now'
 *   - Quick action links: 'Size Guide', 'Delivery & Returns', 'Share'
 *   - Product description & collapsible accordions ('Size Guide ▾', 'Shipping & Returns ▾')
 * - Flawless modal transitions, smooth reactivity, and zero layout jumps.
 */
export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  formatPrice,
  onOpenPolicy
}) {
  if (!product) return null;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Product Details"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-white border border-neutral-200 shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-black transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Close product modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Core Content Container */}
          <div className="overflow-y-auto no-scrollbar flex-1">
            <ProductDetailView
              product={product}
              isModal={true}
              onClose={onClose}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              formatPrice={formatPrice}
              onOpenPolicy={onOpenPolicy}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
