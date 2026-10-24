import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

/**
 * AddToCartModal Component
 * 
 * Clean, minimalist luxury center-screen modal confirming an item
 * was added to the cart, themed for The Brahmman Store.
 * 
 * Features:
 * - Perfectly centered on both desktop & mobile with backdrop blur
 * - Iconic Lord Parshuram logo & The Brahmman Store typography
 * - Clean garment thumbnail, title, size, quantity, and price
 * - Cart subtotal readout and Free Shipping assurance
 * - Dual action buttons: "View Cart & Checkout →" and "Continue Shopping"
 * - Keyboard (ESC) and backdrop click dismissal
 */
export default function AddToCartModal({
  toast,
  onClose = () => {},
  onViewCart = () => {},
  onContinueShopping = () => {},
  formatPrice,
  cartItems = [],
  totalCartCount = 0
}) {
  // Close on Escape key press
  useEffect(() => {
    if (!toast) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast, onClose]);

  if (!toast) return null;

  const { product, size = 'L', quantity = 1 } = toast;
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.image || '/tees/feat_0.png';

  const unitPrice = product.price || 1800;
  const displayPrice = formatPrice
    ? formatPrice(unitPrice * quantity)
    : `₹${(unitPrice * quantity).toLocaleString('en-IN')}`;

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 1800) * (item.quantity || 1),
    0
  );

  const displayCartSubtotal = formatPrice
    ? formatPrice(cartSubtotal)
    : `₹${cartSubtotal.toLocaleString('en-IN')}`;

  const countDisplay = totalCartCount > 0 ? totalCartCount : quantity;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-to-cart-title"
      >
        {/* Semi-transparent dark blur backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
        />

        {/* Centered Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 340 }}
          className="relative w-full max-w-md bg-white text-neutral-900 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-neutral-200/90 overflow-hidden z-10 p-5 sm:p-7 select-none"
        >
          {/* ============================================================ */}
          {/* TOP BAR: Parshuram Emblem Logo + Brand Title + Close Button  */}
          {/* ============================================================ */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-black bg-black shrink-0">
                <img
                  src="/parshuram_logo.png"
                  alt="Lord Parshuram"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = '/model_kundalini_boy.png';
                  }}
                />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-900 font-sans block leading-none">
                  THE BRAHMMAN STORE
                </span>
                <span className="text-[9px] text-neutral-400 font-mono tracking-wider">
                  LUXURY STREETWEAR
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ============================================================ */}
          {/* SUCCESS CONFIRMATION BANNER                                  */}
          {/* ============================================================ */}
          <div className="pt-4 pb-3 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <h3
                id="add-to-cart-title"
                className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight leading-snug"
              >
                Added to Bag Successfully
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                Your selection is reserved in your shopping bag.
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* GARMENT DETAILS CARD                                         */}
          {/* ============================================================ */}
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3 sm:p-3.5 flex gap-3.5 items-center my-3">
            {/* Product Image Thumbnail */}
            <div className="relative w-18 h-22 sm:w-20 sm:h-24 bg-white border border-neutral-200 rounded-xl shrink-0 overflow-hidden flex items-center justify-center p-1 shadow-2xs">
              <img
                src={imageSrc}
                alt={product.title}
                className="w-full h-full object-contain filter contrast-105"
                onError={(e) => {
                  e.currentTarget.src = '/tees/feat_0.png';
                }}
              />
            </div>

            {/* Product Metadata */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider truncate">
                {product.category || 'OVERSIZED TEE'} • {product.gsm || '260 GSM'}
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-tight truncate">
                {product.title}
              </h4>

              <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                <span className="text-[10px] font-bold bg-white border border-neutral-200 px-2 py-0.5 rounded-md text-neutral-800 shadow-2xs">
                  Size: <span className="font-extrabold text-black">{size}</span>
                </span>

                {quantity > 1 && (
                  <span className="text-[10px] text-neutral-500 font-mono">
                    Qty: {quantity}
                  </span>
                )}

                <span className="text-xs sm:text-sm font-bold text-neutral-900 ml-auto">
                  {displayPrice}
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CART SUMMARY STRIP                                           */}
          {/* ============================================================ */}
          <div className="bg-neutral-100/70 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs my-3">
            <span className="text-neutral-600 font-medium flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-neutral-500" />
              <span>Cart Subtotal ({countDisplay} items):</span>
            </span>
            <span className="font-bold text-neutral-900 font-mono text-sm">
              {displayCartSubtotal}
            </span>
          </div>

          {/* Trust badge note */}
          <div className="flex items-center justify-between text-[10px] text-neutral-500 px-1 pb-4">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <Truck className="w-3 h-3 text-emerald-600" />
              <span>Free Express Delivery Across Bharat</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-neutral-400" />
              <span>7 Days Return</span>
            </span>
          </div>

          {/* ============================================================ */}
          {/* ACTION BUTTONS: View Cart / Checkout + Continue Shopping     */}
          {/* ============================================================ */}
          <div className="space-y-2 pt-1">
            {/* Primary Solid Black CTA */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewCart();
              }}
              className="w-full py-3 sm:py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-[0.99] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>View Cart & Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Continue Shopping Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onContinueShopping();
              }}
              className="w-full py-2.5 bg-white hover:bg-neutral-100 text-neutral-600 hover:text-black border border-neutral-200 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
