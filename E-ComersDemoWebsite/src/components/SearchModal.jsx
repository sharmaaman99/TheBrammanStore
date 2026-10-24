import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  formatPrice
}) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.nameDevanagari.includes(query) ||
    p.gsm.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-2xl bg-white border border-[#e5e5e5] shadow-2xl z-10 font-mono text-xs overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-[#e5e5e5] flex items-center gap-3 bg-[#fafaf9]">
            <Search className="w-5 h-5 text-neutral-500" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH SILHOUETTE, SANSKRIT MOTIF, OR GSM (e.g. Kundalini, Indra, 400)..."
              className="flex-1 bg-transparent text-black placeholder-neutral-400 focus:outline-none uppercase text-xs"
            />
            <button onClick={onClose} className="p-1 text-neutral-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-2 no-scrollbar bg-white">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-neutral-400">
                No archived drops matching "{query}".
              </div>
            ) : (
              filtered.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3 bg-[#f8f8f7] border border-[#e5e5e5] hover:border-black flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt={product.title} className="w-12 h-14 object-contain bg-white p-1 border border-[#e5e5e5]" />
                    <div>
                      <h5 className="font-heading font-bold text-black uppercase text-xs group-hover:text-neutral-700">
                        {product.title}
                      </h5>
                      <span className="text-[10px] text-neutral-500 font-devanagari">
                        {product.nameDevanagari} • {product.gsm}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-black">{formatPrice(product.price)}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 bg-[#fafaf9] border-t border-[#e5e5e5] text-[10px] text-neutral-500 flex justify-between">
            <span>SHOWING {filtered.length} ARCHIVE ITEMS</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
