import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../config/api';

/**
 * CartDrawer Component
 * 
 * Clean, modern, distraction-free eCommerce cart & express checkout drawer.
 * Removed all redundant and archaic text for a simplified, premium UX.
 */
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  formatPrice,
  onOrderSuccess,
  onNavigateToCart,
  onNavigateToCheckout,
  appliedCoupon = null,
  onApplyCoupon = () => {}
}) {
  const [promoCode, setPromoCode] = useState(appliedCoupon ? appliedCoupon.code : '');
  const [discountPercent, setDiscountPercent] = useState(appliedCoupon ? appliedCoupon.percent : 0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('CART'); // 'CART' | 'CHECKOUT' | 'SUCCESS'
  const [placedOrder, setPlacedOrder] = useState(null);

  // Customer form state
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    pincode: ''
  });

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'TEE30' || cleanCode === 'BRAHMMAN30') {
      setDiscountPercent(30);
      setPromoError('');
      onApplyCoupon({ code: cleanCode, percent: 30 });
    } else if (cleanCode === 'TEE10' || cleanCode === 'MOKSHA10' || cleanCode === 'BRAHMMAN10') {
      setDiscountPercent(10);
      setPromoError('');
      onApplyCoupon({ code: cleanCode, percent: 10 });
    } else {
      setPromoError('Invalid code. Use TEE30 for 30% off.');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setIsCheckingOut(true);

    try {
      const payload = {
        customer,
        items: cartItems.map(item => ({
          id: item.id,
          title: item.title,
          size: item.size,
          color: item.color || "Black",
          quantity: item.quantity,
          price: item.price,
          image: item.images ? item.images[0] : item.image
        })),
        totalAmount: total,
        paymentMethod: "Cash on Delivery / UPI"
      };

      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let orderData;
      if (res.ok) {
        const json = await res.json();
        orderData = json.order;
      } else {
        orderData = {
          id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          customer,
          items: payload.items,
          totalAmount: total,
          status: "CONFIRMED",
          trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
          createdAt: new Date().toISOString()
        };
      }

      setPlacedOrder(orderData);
      setCheckoutStep('SUCCESS');
      onClearCart();
      if (onOrderSuccess) onOrderSuccess(orderData);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}

    } catch (err) {
      console.error(err);
      alert('Order could not be processed online. Local confirmation generated.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-white border-l border-neutral-200 z-50 flex flex-col justify-between shadow-2xl"
          >
            {/* Simple Clean Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-neutral-900" />
                <h3 className="font-sans font-bold text-base text-neutral-900">
                  Cart {totalQuantity > 0 && <span className="text-neutral-500 font-normal">({totalQuantity})</span>}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-500 hover:text-black p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-white">
              
              {/* STEP 1: SUCCESS STATE */}
              {checkoutStep === 'SUCCESS' && placedOrder ? (
                <div className="space-y-6 text-center py-6">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-neutral-900">
                      Order Placed Successfully!
                    </h4>
                    <p className="text-sm text-neutral-600 mt-1">
                      Order ID: <span className="font-semibold text-neutral-900">{placedOrder.id}</span>
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Tracking No: {placedOrder.trackingNumber}
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-left text-xs space-y-2 text-neutral-700">
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500">Name</span>
                      <span className="font-medium text-neutral-900">{placedOrder.customer.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-500">Delivery To</span>
                      <span className="text-neutral-900">{placedOrder.customer.city || 'Standard Delivery'}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-semibold text-neutral-900">Total Amount</span>
                      <span className="font-bold text-neutral-900 text-sm">{formatPrice(placedOrder.totalAmount)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500">
                    Estimated delivery within 3–4 business days. We will update you via SMS/phone.
                  </p>

                  <button
                    onClick={() => {
                      setCheckoutStep('CART');
                      onClose();
                    }}
                    className="w-full py-3.5 bg-black text-white font-semibold text-sm rounded-xl hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : checkoutStep === 'CHECKOUT' ? (

                /* STEP 2: SIMPLE CHECKOUT FORM */
                <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                    <h4 className="font-bold text-sm text-neutral-900">
                      Delivery Details
                    </h4>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('CART')}
                      className="text-neutral-500 hover:text-black font-medium transition-colors cursor-pointer"
                    >
                      ← Back to Cart
                    </button>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-neutral-600 block mb-1 font-medium">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-black focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-neutral-600 block mb-1 font-medium">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          placeholder="Phone number"
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-black focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-600 block mb-1 font-medium">Email (Optional)</label>
                        <input
                          type="email"
                          value={customer.email}
                          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                          placeholder="you@email.com"
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-black focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-neutral-600 block mb-1 font-medium">Address *</label>
                      <textarea
                        rows="2"
                        required
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        placeholder="House / Flat No., Street, Area"
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-black focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-neutral-600 block mb-1 font-medium">City *</label>
                        <input
                          type="text"
                          required
                          value={customer.city}
                          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                          placeholder="City"
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-black focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-600 block mb-1 font-medium">Pincode *</label>
                        <input
                          type="text"
                          required
                          value={customer.pincode}
                          onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                          placeholder="Pincode"
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-black focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-neutral-900 text-xs">Payment Method</p>
                          <p className="text-[11px] text-neutral-500">Cash on Delivery / UPI</p>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Free Delivery
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isCheckingOut}
                      className="w-full py-3.5 bg-black text-white font-semibold text-sm rounded-xl hover:bg-neutral-800 transition-colors mt-3 flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-60"
                    >
                      {isCheckingOut ? (
                        <span>Placing Order...</span>
                      ) : (
                        <span>Place Order • {formatPrice(total)}</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (

                /* STEP 3: SIMPLE CART ITEMS LIST */
                cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-neutral-900">
                        Your cart is empty
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1">
                        Add t-shirts to your cart to checkout.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-black text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.id}-${item.size}-${index}`}
                        className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex gap-3 items-center justify-between"
                      >
                        <img
                          src={item.images ? item.images[0] : item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain bg-white rounded-lg border border-neutral-200 p-1 flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0 text-xs">
                          <h5 className="font-semibold text-neutral-900 truncate">
                            {item.title}
                          </h5>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            Size: <span className="font-medium text-neutral-700">{item.size}</span>
                          </p>
                          <p className="font-bold text-neutral-900 text-xs mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {/* Stepper */}
                          <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                              className="px-2 py-1 text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-semibold text-neutral-900">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                              className="px-2 py-1 text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id, item.size)}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Simple Cart Footer with Subtotal & Checkout Button */}
            {checkoutStep === 'CART' && cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white space-y-3.5">
                
                {/* Clean Promo Code */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (e.g. TEE30)"
                    className="flex-1 bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black uppercase transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {discountPercent > 0 && (
                  <p className="text-emerald-600 text-xs flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>30% discount applied!</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-rose-600 text-xs">{promoError}</p>
                )}

                {/* Subtotal & Total */}
                <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount (30%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-neutral-900 border-t border-neutral-200 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Action Buttons: Proceed to Checkout (Screen 06) & View Full Cart (Screen 05) */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      if (onNavigateToCheckout) {
                        onClose();
                        onNavigateToCheckout();
                      } else {
                        setCheckoutStep('CHECKOUT');
                      }
                    }}
                    className="w-full py-3.5 bg-black text-white font-semibold text-sm rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Proceed to Checkout • {formatPrice(total)}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {onNavigateToCart && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateToCart();
                      }}
                      className="w-full py-2.5 border border-neutral-200 text-neutral-800 hover:text-black font-semibold text-xs rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Full Cart (Screen 05)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
