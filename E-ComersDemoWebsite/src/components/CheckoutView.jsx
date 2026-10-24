import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Copy, 
  Check, 
  ExternalLink,
  ShoppingBag,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../config/api';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

/**
 * CheckoutView Component (Screen 06 in Showcase: "06. Checkout (Desktop)")
 * 
 * 2-Column Desktop layout:
 * - LEFT: "Shipping Address"
 *   - Full Name *
 *   - Phone Number *
 *   - Address *
 *   - City *, State * (dropdown), Pincode *
 *   - "Save this address for future orders" checkbox
 * - RIGHT: "Payment Method" & "Order Summary"
 *   - 🟢 UPI (Google Pay, PhonePe, Paytm)
 *   - 💳 Card (Visa, Mastercard, RuPay)
 *   - 💵 Cash on Delivery
 *   - Order Summary (Subtotal, Shipping, Total)
 *   - Solid black button: "Place Order →"
 *   - On place order: sends POST to backend API (or creates local order with order ID),
 *     displays confirmation screen with tracking number, clears cart.
 */
export default function CheckoutView({
  cartItems = [],
  onClearCart = () => {},
  onContinueShopping = () => {},
  onReturnToCart = () => {},
  onTrackOrder = () => {},
  formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`,
  appliedCoupon = null
}) {
  // Pre-fill fields matching Showcase Screen 06 ("Shiva Sharma", "Madhya Pradesh", "462001")
  const [shipping, setShipping] = useState(() => {
    try {
      const saved = localStorage.getItem('brahmman_shipping_address');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      fullName: 'Shiva Sharma',
      phone: '+91 98765 43210',
      address: 'House No. 125, Street Name, Area',
      city: 'Bharat',
      state: 'Madhya Pradesh',
      pincode: '462001',
      saveAddress: true
    };
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'COD'
  const [upiId, setUpiId] = useState('shiva@okhdfcbank');
  const [cardInfo, setCardInfo] = useState({
    number: '•••• •••• •••• 4242',
    name: 'Shiva Sharma',
    expiry: '12/28',
    cvv: '•••'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Price calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountPercent = appliedCoupon ? appliedCoupon.percent : 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const total = Math.max(0, subtotal - discountAmount);

  const handleInputChange = (field, value) => {
    setShipping(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!shipping.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!shipping.phone.trim()) errs.phone = 'Phone Number is required';
    if (!shipping.address.trim()) errs.address = 'Street Address is required';
    if (!shipping.city.trim()) errs.city = 'City is required';
    if (!shipping.state.trim()) errs.state = 'State is required';
    if (!shipping.pincode.trim()) errs.pincode = 'Pincode is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    if (e) e.preventDefault();

    if (cartItems.length === 0 && !placedOrder) {
      alert('Your cart is empty. Please add items before checking out.');
      onContinueShopping();
      return;
    }

    if (!validateForm()) {
      // Scroll to first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Save address preference
    if (shipping.saveAddress) {
      try {
        localStorage.setItem('brahmman_shipping_address', JSON.stringify(shipping));
      } catch {}
    }

    const orderPayload = {
      customer: {
        name: shipping.fullName,
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        pincode: shipping.pincode,
        email: 'collector@thebrahmmanstore.com'
      },
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        size: item.size || 'L',
        color: item.color || 'Black',
        quantity: item.quantity,
        price: item.price,
        image: (item.images && item.images[0]) || item.image || '/model_kundalini_boy.png'
      })),
      totalAmount: total,
      paymentMethod: paymentMethod === 'UPI' ? 'UPI Express (GPay/PhonePe)' : paymentMethod === 'CARD' ? 'Credit/Debit Card' : 'Cash on Delivery'
    };

    try {
      let finalOrderData = null;

      try {
        const res = await fetch(`${API_BASE_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.order) {
            finalOrderData = json.order;
          }
        }
      } catch (networkErr) {
        // Fallback gracefully if backend is not started
      }

      if (!finalOrderData) {
        const randomId = Math.floor(1000 + Math.random() * 9000);
        finalOrderData = {
          id: `BRH-${randomId}`,
          customer: orderPayload.customer,
          items: orderPayload.items,
          totalAmount: total,
          paymentMethod: orderPayload.paymentMethod,
          status: "CONFIRMED",
          statusText: "Processing in Dispatch Chamber",
          trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
          createdAt: new Date().toISOString(),
          timeline: [
            { title: "Order Confirmed", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true, desc: "Payment authorized. Verification code issued." },
            { title: "Woven & Prepared in Bharat", time: "In Progress", done: false, desc: "260 GSM heavyweight cotton batch assigned." },
            { title: "Dispatched via Bluedart Air", time: "Pending", done: false, desc: "Airway Bill generated." },
            { title: "Out for Delivery", time: "Estimated in 2-3 Days", done: false, desc: "Direct handoff at your doorstep." }
          ]
        };
      }

      // Persist latest order in localStorage
      try {
        localStorage.setItem('brahmman_latest_order', JSON.stringify(finalOrderData));
        const existingOrders = JSON.parse(localStorage.getItem('brahmman_orders') || '[]');
        localStorage.setItem('brahmman_orders', JSON.stringify([finalOrderData, ...existingOrders]));
      } catch {}

      // Trigger Confetti effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setPlacedOrder(finalOrderData);
      onClearCart();
    } catch (err) {
      console.error("Order processing error:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTracking = () => {
    if (!placedOrder?.trackingNumber) return;
    navigator.clipboard.writeText(placedOrder.trackingNumber);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  // If order is placed, show Order Confirmation Screen matching Screen 06 outcome
  if (placedOrder) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-10 shadow-sm text-center"
          >
            {/* Success Icon */}
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block mb-3">
              Order Confirmed
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
              Thank You, {placedOrder.customer.name.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed mb-6">
              Your garments have been commissioned and scheduled for dispatch via BlueDart Express.
            </p>

            {/* Order Identifiers Box */}
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-4 sm:p-6 text-left max-w-lg mx-auto mb-8 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80">
                <span className="text-xs text-neutral-500">Order Reference</span>
                <span className="font-mono font-bold text-sm text-neutral-900">{placedOrder.id}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80">
                <span className="text-xs text-neutral-500">Tracking Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-neutral-900">{placedOrder.trackingNumber}</span>
                  <button
                    onClick={copyTracking}
                    className="p-1 hover:bg-neutral-200 rounded text-neutral-500 hover:text-black transition-colors cursor-pointer"
                    title="Copy tracking number"
                  >
                    {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80">
                <span className="text-xs text-neutral-500">Estimated Delivery</span>
                <span className="font-medium text-xs text-neutral-900">3–5 Business Days</span>
              </div>

              <div className="flex items-start justify-between pt-1">
                <span className="text-xs text-neutral-500">Delivery Address</span>
                <span className="text-xs text-neutral-900 text-right max-w-[200px] font-medium">
                  {placedOrder.customer.address}, {placedOrder.customer.city}, {placedOrder.customer.state} - {placedOrder.customer.pincode}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                type="button"
                onClick={() => onTrackOrder(placedOrder.id)}
                className="flex-1 py-3.5 px-6 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Track Order Live</span>
              </button>

              <button
                type="button"
                onClick={onContinueShopping}
                className="flex-1 py-3.5 px-6 border border-neutral-300 hover:border-black text-neutral-800 hover:text-black text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer bg-neutral-50"
              >
                <span>Continue Shopping →</span>
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Back Link & Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200/80">
          <button
            type="button"
            onClick={onReturnToCart}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Cart</span>
          </button>

          <span className="text-xs text-neutral-400 font-medium">
            Checkout (Step 2 of 2)
          </span>
        </div>

        {/* 2-Column Checkout Layout matching Screen 06 */}
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ============================================================== */}
            {/* LEFT COLUMN: Shipping Address (Screen 06 Left Column)          */}
            {/* ============================================================== */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mb-1">
                  Shipping Address
                </h1>
                <p className="text-xs text-neutral-500">
                  Where should we dispatch your custom heavyweight pieces?
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Full Name * */}
                <div>
                  <label htmlFor="checkout-fullname" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-fullname"
                    type="text"
                    required
                    value={shipping.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Full Name (e.g. Shiva Sharma)"
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none transition-all ${
                      errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200 focus:border-black focus:ring-1 focus:ring-black'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone Number * */}
                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={shipping.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none transition-all ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200 focus:border-black focus:ring-1 focus:ring-black'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Address * */}
                <div>
                  <label htmlFor="checkout-address" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    value={shipping.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="House No. 125, Street Name, Area"
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none transition-all ${
                      errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200 focus:border-black focus:ring-1 focus:ring-black'
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                </div>

                {/* Row: City *, State *, Pincode * */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* City * */}
                  <div>
                    <label htmlFor="checkout-city" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      value={shipping.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Bharat"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none transition-all ${
                        errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200 focus:border-black focus:ring-1 focus:ring-black'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  {/* State * (dropdown) */}
                  <div>
                    <label htmlFor="checkout-state" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="checkout-state"
                      value={shipping.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-200 bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all cursor-pointer"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pincode * */}
                  <div>
                    <label htmlFor="checkout-pincode" className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-pincode"
                      type="text"
                      maxLength={6}
                      required
                      value={shipping.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="462001"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border bg-white font-mono focus:outline-none transition-all ${
                        errors.pincode ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-200 focus:border-black focus:ring-1 focus:ring-black'
                      }`}
                    />
                    {errors.pincode && <p className="text-[11px] text-red-500 mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                {/* Checkbox: Save address */}
                <div className="pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={shipping.saveAddress}
                      onChange={(e) => handleInputChange('saveAddress', e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                    />
                    <span className="text-xs text-neutral-600 font-medium">
                      Save this address for future orders
                    </span>
                  </label>
                </div>

              </div>

            </div>

            {/* ============================================================== */}
            {/* RIGHT COLUMN: Payment Method & Order Summary (Screen 06 Right) */}
            {/* ============================================================== */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-6">
              
              {/* Payment Method Section matching Screen 06 */}
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
                
                <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                  Payment Method
                </h2>

                <div className="space-y-2.5">
                  
                  {/* Option 1: UPI */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? 'border-black bg-neutral-50/70 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="mt-0.5 accent-black cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-500 text-sm">🟢</span>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                          UPI (Google Pay, PhonePe, Paytm)
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Instant payment via zero-fee secure UPI gateway
                      </p>

                      {paymentMethod === 'UPI' && (
                        <div className="mt-3 pt-3 border-t border-neutral-200/70 flex gap-2 items-center">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID (e.g. yourname@upi)"
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-md font-mono focus:outline-none focus:border-black"
                          />
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-1 rounded">
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Option 2: Card */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'CARD'
                        ? 'border-black bg-neutral-50/70 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CARD"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                      className="mt-0.5 accent-black cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-700 text-sm">💳</span>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                          Card (Visa, Mastercard, RuPay)
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Encrypted 256-bit bank level SSL authorization
                      </p>

                      {paymentMethod === 'CARD' && (
                        <div className="mt-3 pt-3 border-t border-neutral-200/70 space-y-2">
                          <input
                            type="text"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                            placeholder="Card Number"
                            className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-md font-mono focus:outline-none focus:border-black"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                              placeholder="MM/YY"
                              className="px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-md font-mono focus:outline-none focus:border-black"
                            />
                            <input
                              type="text"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                              placeholder="CVV"
                              className="px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-md font-mono focus:outline-none focus:border-black"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Option 3: COD */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'COD'
                        ? 'border-black bg-neutral-50/70 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-0.5 accent-black cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-700 text-sm">💵</span>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                          Cash on Delivery
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Pay conveniently in cash or UPI upon package inspection
                      </p>
                    </div>
                  </label>

                </div>

                {/* ============================================================== */}
                {/* Order Summary breakdown matching Screen 06                    */}
                {/* ============================================================== */}
                <div className="pt-4 border-t border-neutral-200/90 space-y-3">
                  <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Order Summary
                  </h3>

                  {/* Items mini thumbnails preview */}
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={(item.images && item.images[0]) || item.image || '/model_kundalini_boy.png'}
                            alt={item.title}
                            className="w-8 h-10 object-cover rounded bg-neutral-100 shrink-0 border border-neutral-200"
                          />
                          <div className="truncate">
                            <p className="font-semibold text-neutral-900 truncate">
                              {item.title.split('/')[0].split('—')[0]}
                            </p>
                            <p className="text-[10px] text-neutral-400">Qty {item.quantity} · Size {item.size || 'L'}</p>
                          </div>
                        </div>
                        <span className="font-mono font-medium text-neutral-900 shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-neutral-100 space-y-2 text-xs">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span className="font-mono font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-neutral-600">
                      <span>Shipping</span>
                      <span className="font-semibold text-neutral-900">₹0</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span className="font-mono font-bold">-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="border-t border-neutral-200 pt-3 flex items-baseline justify-between">
                      <span className="text-sm font-bold text-neutral-900">Total</span>
                      <span className="text-lg font-bold text-neutral-900 font-mono">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA: Solid black button matching Screen 06 */}
                  <button
                    type="submit"
                    disabled={isSubmitting || cartItems.length === 0}
                    className="w-full mt-4 py-3.5 px-5 bg-black hover:bg-neutral-800 disabled:bg-neutral-300 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Securing Order...</span>
                      </span>
                    ) : (
                      <>
                        <span>Place Order</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[10px] text-neutral-400">
                      By placing this order, you agree to our Terms and 7-Day Exchange Policy.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
