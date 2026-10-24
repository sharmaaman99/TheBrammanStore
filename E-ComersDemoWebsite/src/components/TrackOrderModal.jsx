import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, CheckCircle2, Truck } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function TrackOrderModal({ isOpen, onClose, formatPrice, initialOrderId }) {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState(initialOrderId || 'BRH-8821');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    id: "BRH-8821",
    customer: {
      name: "Arjun Verma",
      city: "Bengaluru, Karnataka",
      pincode: "560001"
    },
    items: [
      {
        id: "prod-01",
        title: "KUNDALINI / कुण्डलिनी — OVERSIZED T-SHIRT",
        size: "L",
        quantity: 1,
        price: 1800,
        image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886"
      }
    ],
    totalAmount: 1800,
    status: "DISPATCHED",
    statusText: "In Transit with BlueDart Air",
    trackingNumber: "BD-90418294IN",
    timeline: [
      { title: "Order Confirmed", time: "2026-10-21 10:14", done: true, desc: "Order payment verified via UPI." },
      { title: "Woven & Prepared in Bharat", time: "2026-10-21 16:30", done: true, desc: "260 GSM Terry Combed Cotton inspected and packed." },
      { title: "Dispatched via Bluedart Air", time: "2026-10-22 08:45", done: true, desc: "Airway Bill generated (BD-90418294IN)." },
      { title: "Out for Delivery", time: "Expected Tomorrow", done: false, desc: "Delivery hub processing package." },
      { title: "Delivered", time: "Estimated 23 Oct", done: false, desc: "Direct handoff at your doorstep." }
    ]
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${encodeURIComponent(searchId.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      } else {
        if (searchId.toUpperCase().includes('9104')) {
          setOrder({
            id: "BRH-9104",
            customer: { name: "Meera Nair", city: "Mumbai, Maharashtra", pincode: "400050" },
            items: [
              {
                id: "prod-02",
                title: "TAT TVAM ASI — OVERSIZED T-SHIRT",
                size: "M",
                quantity: 2,
                price: 1800,
                image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/45.png?v=1789397586"
              }
            ],
            totalAmount: 3600,
            status: "DELIVERED",
            statusText: "Delivered Successfully",
            trackingNumber: "BD-88421092IN",
            timeline: [
              { title: "Order Confirmed", time: "2026-10-19 14:02", done: true, desc: "Payment verified." },
              { title: "Woven & Prepared in Bharat", time: "2026-10-19 18:20", done: true, desc: "Quality inspected." },
              { title: "Dispatched via Bluedart Air", time: "2026-10-20 09:15", done: true, desc: "Departed hub." },
              { title: "Out for Delivery", time: "2026-10-21 11:30", done: true, desc: "Courier out for delivery." },
              { title: "Delivered", time: "2026-10-21 14:48", done: true, desc: "Signed by recipient." }
            ]
          });
        } else {
          setErrorMsg(`No active dispatch found for ID: ${searchId}. Try sample: BRH-8821 or BRH-9104.`);
        }
      }
    } catch (err) {
      console.warn("Server offline, using cached order data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Modal Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white border border-[#e5e5e5] shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar font-mono text-xs"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#e5e5e5] bg-[#f8f8f7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-black" />
              <div>
                <h3 className="font-heading font-bold text-base text-black uppercase tracking-wider">
                  REAL-TIME ORDER TRACKING
                </h3>
                <p className="text-[10px] text-neutral-500">
                  TIRUPUR MILLS ➔ WORLDWIDE LOGISTICS CONSOLE
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-neutral-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 bg-white">
            
            {/* Search Bar */}
            <form onSubmit={handleTrack} className="space-y-2">
              <label className="text-neutral-600 block text-[11px]">
                ENTER ORDER ID OR AIRWAY BILL (AWB):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="e.g. BRH-8821"
                  className="flex-1 bg-[#f8f8f7] border border-[#d4d4d4] px-3 py-2.5 text-black uppercase focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-black text-white font-bold uppercase hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{loading ? 'LOCATING...' : 'TRACK'}</span>
                </button>
              </div>

              {/* Quick sample chips */}
              <div className="flex items-center gap-2 text-[10px] text-neutral-500 pt-1">
                <span>QUICK DEMO:</span>
                <button
                  type="button"
                  onClick={() => setSearchId('BRH-8821')}
                  className="underline text-neutral-700 hover:text-black font-semibold"
                >
                  BRH-8821 (Dispatched)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setSearchId('BRH-9104')}
                  className="underline text-neutral-700 hover:text-black font-semibold"
                >
                  BRH-9104 (Delivered)
                </button>
              </div>
            </form>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Order Status Display */}
            {order && (
              <div className="space-y-6 pt-2">
                
                {/* Status card */}
                <div className="p-4 bg-[#f8f8f7] border border-[#e5e5e5] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">CURRENT STATUS</span>
                    <span className="text-sm font-bold text-black tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {order.status} — {order.statusText}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 block">CARRIER & AWB</span>
                    <span className="text-xs text-neutral-800 font-bold">{order.trackingNumber} (BlueDart Air)</span>
                  </div>
                </div>

                {/* Items in Parcel */}
                <div>
                  <h4 className="text-neutral-500 text-xs uppercase tracking-wider mb-2">
                    PARCEL CONTENTS:
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 bg-white border border-[#e5e5e5] shadow-xs">
                        <img src={item.image} alt={item.title} className="w-10 h-12 object-contain bg-[#f8f8f7]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-black font-bold truncate text-xs">{item.title}</p>
                          <p className="text-[10px] text-neutral-500">SIZE: {item.size} • QTY: {item.quantity}</p>
                        </div>
                        <span className="text-black font-bold">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Timeline Steps */}
                <div>
                  <h4 className="text-neutral-500 text-xs uppercase tracking-wider mb-4">
                    JOURNEY TIMELINE:
                  </h4>

                  <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#e5e5e5]">
                    {order.timeline.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-4 pl-2">
                        <div className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center z-10 ${
                          step.done ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-400'
                        }`}>
                          {step.done ? <CheckCircle2 className="w-4 h-4 text-emerald-600 bg-white rounded-full" /> : <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />}
                        </div>

                        <div className="flex-1 bg-[#f8f8f7] border border-[#e5e5e5] p-3">
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${step.done ? 'text-black' : 'text-neutral-400'}`}>
                              {step.title}
                            </span>
                            <span className="text-[10px] text-neutral-400">{step.time}</span>
                          </div>
                          <p className="text-[11px] text-neutral-600 mt-1">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
