import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, X, ArrowRight, ShieldCheck, Truck, RotateCcw, Tag, ShoppingBag } from 'lucide-react';

/**
 * CartView Component (Screen 05 in Showcase: "05. Shopping Cart (Desktop)")
 * 
 * Features:
 * - Heading: "Your Cart ({totalCount})"
 * - Left column: List of cart items with thumbnail, title, variant (Black / L · ₹1,800), quantity controls (- 1 +), total item price, remove button ✕
 * - Right column: "Order Summary" card with Subtotal, Shipping (₹0 Free), Total, Solid black "Proceed to Checkout →" button
 * - "Have a coupon?" input + "Apply" button (Supports 'TEE30' for 30% off!)
 * - "Continue Shopping →" link back to shop
 */
export default function CartView({
  cartItems = [],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onProceedToCheckout = () => {},
  onContinueShopping = () => {},
  formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`,
  appliedCoupon = null,
  onApplyCoupon = () => {},
  onRemoveCoupon = () => {},
  onLoadShowcaseItems = () => {}
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const discountPercent = appliedCoupon ? appliedCoupon.percent : 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApply = (e) => {
    if (e) e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'TEE30' || cleanCode === 'BRAHMMAN30') {
      onApplyCoupon({ code: cleanCode, percent: 30 });
      setCouponMessage({ type: 'success', text: `Code '${cleanCode}' applied: 30% discount!` });
      setCouponInput('');
    } else if (cleanCode === 'TEE10' || cleanCode === 'MOKSHA10') {
      onApplyCoupon({ code: cleanCode, percent: 10 });
      setCouponMessage({ type: 'success', text: `Code '${cleanCode}' applied: 10% discount!` });
      setCouponInput('');
    } else {
      setCouponMessage({ type: 'error', text: "Invalid coupon. Use 'TEE30' for 30% off!" });
    }
  };

  const handleRemoveAppliedCoupon = () => {
    onRemoveCoupon();
    setCouponMessage(null);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb / Header Row matching Screen 05 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-neutral-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5 font-medium">
              <button 
                onClick={onContinueShopping}
                className="hover:text-black transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-neutral-900 font-semibold">Shopping Cart</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Your Cart {totalCount > 0 ? `(${totalCount})` : ''}
            </h1>
          </div>

          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
              <ShoppingBag className="w-10 h-10 stroke-1" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
            <p className="text-xs sm:text-sm text-neutral-500 mb-8 leading-relaxed">
              Explore our brutalist heavyweight drop and find your signature oversized fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onContinueShopping}
                className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Explore Collection →
              </button>
              <button
                onClick={onLoadShowcaseItems}
                className="px-6 py-3 border border-neutral-300 hover:border-black text-neutral-800 hover:text-black text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer bg-neutral-50"
              >
                Load Showcase Items (3)
              </button>
            </div>
          </div>
        ) : (
          /* 2-Column Desktop Grid matching Screen 05 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Items List (Col span 7 or 8) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              
              {/* Table / List Items */}
              <div className="divide-y divide-neutral-200/80">
                <AnimatePresence>
                  {cartItems.map((item) => {
                    const itemImage = (item.images && item.images[0]) || item.image || '/model_kundalini_boy.png';
                    const itemColor = item.color || (item.colors && item.colors[0]) || 'Black';
                    const itemSize = item.size || 'L';
                    const itemPrice = item.price || 1800;
                    const itemRowTotal = itemPrice * item.quantity;

                    // Clean simplified title matching showcase (e.g. "Shunya Void Tee", "Kundalini Oversized")
                    let displayTitle = item.title;
                    if (displayTitle.includes('/')) {
                      displayTitle = displayTitle.split('/')[0].trim();
                    }
                    if (displayTitle.includes('—')) {
                      displayTitle = displayTitle.split('—')[0].trim();
                    }

                    return (
                      <motion.div
                        key={`${item.id}-${itemSize}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.2 }}
                        className="py-6 first:pt-0 flex items-start gap-4 sm:gap-6 group"
                      >
                        {/* Thumbnail Image */}
                        <div className="w-20 h-24 sm:w-24 sm:h-30 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200/70 shrink-0 flex items-center justify-center">
                          <img
                            src={itemImage}
                            alt={displayTitle}
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = '/model_kundalini_boy.png';
                            }}
                          />
                        </div>

                        {/* Title & Variant Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight leading-snug truncate sm:whitespace-normal">
                            {displayTitle}
                          </h3>
                          
                          <p className="text-xs text-neutral-500 mt-1 font-medium">
                            {itemColor} / {itemSize} · {formatPrice(itemPrice)}
                          </p>

                          {/* Quantity Controls (- 1 +) */}
                          <div className="mt-4 flex items-center gap-3">
                            <div className="inline-flex items-center border border-neutral-200 rounded-lg bg-neutral-50/60 p-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, itemSize, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-white rounded-md transition-all cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              
                              <span className="w-8 text-center text-xs font-semibold text-neutral-900">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, itemSize, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-white rounded-md transition-all cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">
                              260 GSM Heavyweight
                            </span>
                          </div>
                        </div>

                        {/* Price & Remove Button */}
                        <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                          <div className="text-right">
                            <span className="text-sm sm:text-base font-bold text-neutral-900 font-mono">
                              {formatPrice(itemRowTotal)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id, itemSize)}
                            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                            aria-label={`Remove ${displayTitle}`}
                            title="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Free Shipping Assurance Bar */}
              <div className="pt-4 mt-2">
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-4 flex items-center gap-3 text-xs text-neutral-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900">Complimentary Express Shipping Unlocked!</span>
                    <p className="text-[11px] text-neutral-500">Every order comes packed with archival authentication cards.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary Card (Col span 5 or 4) */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
                
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900 font-mono">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between text-neutral-600">
                    <span className="flex items-center gap-1.5">
                      Shipping
                      <span className="text-[10px] bg-neutral-100 text-neutral-700 font-medium px-1.5 py-0.5 rounded">Express</span>
                    </span>
                    <span className="font-semibold text-neutral-900">
                      ₹0
                    </span>
                  </div>

                  {/* Applied Discount if present */}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-emerald-600 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/60">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span className="font-semibold text-xs">{appliedCoupon.code} ({appliedCoupon.percent}% OFF)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs font-mono">-{formatPrice(discountAmount)}</span>
                        <button
                          type="button"
                          onClick={handleRemoveAppliedCoupon}
                          className="text-emerald-700 hover:text-red-600 p-0.5 rounded cursor-pointer"
                          title="Remove coupon"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Total line with Divider */}
                  <div className="border-t border-neutral-200 pt-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-sm font-bold text-neutral-900">Total</span>
                      <p className="text-[10px] text-neutral-400">Inclusive of all taxes</p>
                    </div>
                    <span className="text-lg sm:text-xl font-bold text-neutral-900 font-mono">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Primary CTA: Solid black button matching Showcase */}
                <button
                  type="button"
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-5 bg-black hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm active:scale-[0.99] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Have a coupon? Section matching Showcase */}
                <div className="pt-4 border-t border-neutral-100">
                  <label htmlFor="coupon-input" className="block text-xs font-semibold text-neutral-700 mb-2">
                    Have a coupon?
                  </label>
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      id="coupon-input"
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 px-3.5 py-2.5 text-xs bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 rounded-lg border border-neutral-200 focus:border-black focus:outline-none transition-all uppercase tracking-wider font-mono font-medium"
                    />
                    <button
                      type="submit"
                      disabled={!couponInput.trim()}
                      className="px-4 py-2.5 bg-black hover:bg-neutral-800 disabled:bg-neutral-300 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Hint tag for 'TEE30' */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500">
                    <span>Try promo code:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCouponInput('TEE30');
                        onApplyCoupon({ code: 'TEE30', percent: 30 });
                        setCouponMessage({ type: 'success', text: "Code 'TEE30' applied: 30% discount!" });
                      }}
                      className="font-mono font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    >
                      TEE30 (30% off)
                    </button>
                  </div>

                  {couponMessage && (
                    <p className={`mt-2 text-[11px] font-medium ${couponMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>

                {/* Continue Shopping Link */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={onContinueShopping}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black font-semibold transition-colors cursor-pointer group"
                  >
                    <span>Continue Shopping</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <Truck className="w-4 h-4 text-neutral-600 mb-1" />
                    <span className="text-[10px] text-neutral-500 font-medium leading-tight">Free Express Delivery</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="w-4 h-4 text-neutral-600 mb-1" />
                    <span className="text-[10px] text-neutral-500 font-medium leading-tight">7-Day Free Returns</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-4 h-4 text-neutral-600 mb-1" />
                    <span className="text-[10px] text-neutral-500 font-medium leading-tight">100% Authentic Cotton</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
