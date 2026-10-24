import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, RefreshCw, Truck, FileText, Ruler } from 'lucide-react';

export default function PolicyModal({ isOpen, onClose, initialTab = 'returns' }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState(initialTab || 'returns');

  const policies = {
    returns: {
      title: "RETURNS & EXCHANGES PROTOCOL",
      icon: RefreshCw,
      content: [
        {
          heading: "7-Day Hassle-Free Exchange",
          body: "If your piece doesn't align with your desired streetwear drape, we facilitate doorstep size exchanges within 7 days of delivery. Items must be unworn, unwashed, and retained with authentic archival tags intact."
        },
        {
          heading: "Reverse Pickup Across Bharat",
          body: "Our logistics courier will collect the parcel from your residence. Upon transit scan, the replacement size is dispatched instantly via BlueDart Air."
        },
        {
          heading: "Refund Policy",
          body: "In the rare event of a manufacturing flaw or out-of-stock replacement, 100% full refund is credited back to your original payment method or UPI handle within 48 hours."
        }
      ]
    },
    shipping: {
      title: "SHIPPING & WORLDWIDE DISPATCH",
      icon: Truck,
      content: [
        {
          heading: "Domestic Dispatch (Bharat)",
          body: "Complimentary Free Express Shipping on all orders across India. Orders are prepared within 24 hours at our Tirupur facility and delivered within 3–5 business days."
        },
        {
          heading: "Worldwide Dispatch",
          body: "We ship internationally to North America, Europe, UAE, Australia, and Asia via DHL Express Air. International orders arrive within 5–8 business days with full end-to-end telemetry tracking."
        },
        {
          heading: "Packaging Philosophy",
          body: "All garments are secured in heavy-gauge 100% biodegradable matte archive mailers with sealed philosophical inserts and stickers."
        }
      ]
    },
    sizing: {
      title: "OVERSIZED SILHOUETTE & FIT GUIDE",
      icon: Ruler,
      content: [
        {
          heading: "Architectural Drop-Shoulder Fit",
          body: "Every piece in The Brahmman Store is purposefully cut in a boxy, drop-shoulder silhouette with structured 260–400 GSM drape. They do not cling to the body; they hold clean architectural form."
        },
        {
          heading: "Recommended Sizing Matrix",
          body: "• Size S: Height up to 5'7\" (Roomy street drape)\n• Size M: Height 5'7\" to 5'10\" (Standard oversized look)\n• Size L: Height 5'10\" to 6'1\" (Signature relaxed collector silhouette)\n• Size XL / XXL: Height 6'1\"+ or exaggerated runway silhouette."
        },
        {
          heading: "Fabric Shrinkage Prevention",
          body: "All cotton yarns are pre-shrunk and bio-washed. Cold machine wash inside-out will maintain 100% of the original drape."
        }
      ]
    },
    terms: {
      title: "TERMS OF SERVICE",
      icon: FileText,
      content: [
        {
          heading: "Archival Intellectual Property",
          body: "All Devanagari calligraphy, philosophical interpretations, artwork motifs, and designs are proprietary creations of The Brahmman Store (Satyam Tiwari). Unauthorized reproduction is strictly forbidden."
        },
        {
          heading: "Limited Physical Drops",
          body: "Select archive drops are released in numbered editions. Once an archive release sells out, it enters vault status and may never be re-issued."
        }
      ]
    }
  };

  const current = policies[activeTab] || policies.returns;

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white border border-[#e5e5e5] shadow-2xl z-10 max-h-[88vh] overflow-y-auto no-scrollbar font-mono text-xs"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#e5e5e5] bg-[#f8f8f7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-black" />
              <div>
                <h3 className="font-heading font-bold text-base text-black uppercase tracking-wider">
                  THE BRAHMMAN STORE — POLICIES & TERMS
                </h3>
                <p className="text-[10px] text-neutral-500">
                  TRANSPARENCY IN FABRICATION & ARCHIVAL COMMERCE
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-neutral-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#e5e5e5] bg-[#fafaf9] text-[11px]">
            {[
              { id: 'returns', label: 'Returns & Exchange' },
              { id: 'shipping', label: 'Shipping & Delivery' },
              { id: 'sizing', label: 'Size & Silhouette' },
              { id: 'terms', label: 'Terms of Service' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 border-r border-b sm:border-b-0 border-[#e5e5e5] text-center transition-colors uppercase font-bold ${
                  activeTab === tab.id ? 'bg-black text-white' : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            <h4 className="font-heading text-xl text-black uppercase tracking-tight font-bold">
              {current.title}
            </h4>

            <div className="space-y-4">
              {current.content.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#f8f8f7] border border-[#e5e5e5] space-y-2">
                  <h5 className="text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-[#b38600]">✦</span>
                    {item.heading}
                  </h5>
                  <p className="text-neutral-700 text-xs leading-relaxed whitespace-pre-line">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-between text-neutral-500 text-[10px]">
              <span>VERIFIED POLICY PROTOCOL 2026</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors uppercase font-bold shadow-xs"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
