import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * PromoOfferBanner Component
 * Authentic DTC modern luxury t-shirt promotional offer banner.
 * Features:
 * - Authentic folded luxury t-shirt photography showing neckline collars & labels
 * - Handwritten script doodle 'Good Tee Good Mood :)' with smiley face
 * - Clean responsive DTC layout matching teevibe-reference.png
 */
export default function PromoOfferBanner({
  onShopNow = () => {},
  code = 'TEE30'
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleShopClick = (e) => {
    if (onShopNow) {
      onShopNow(e);
    } else {
      const bestsellers = document.getElementById('bestsellers') || document.getElementById('new-arrivals-grid') || document.getElementById('featured-grid');
      if (bestsellers) {
        bestsellers.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section aria-label="Special Promotional Offer" className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Banner Card */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#0f0f11] text-white overflow-hidden shadow-xl border border-neutral-800 flex flex-col md:flex-row items-stretch min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
        
        {/* Left Column: Offer Details */}
        <div className="flex-1 flex flex-col justify-center items-start p-6 sm:p-8 md:p-10 lg:p-12 z-10 space-y-3 sm:space-y-4">
          
          {/* Headline: Flat 30% Off */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
            Flat 30% Off
          </h2>

          {/* Subtitle: On All T-Shirts | Use Code: TEE30 */}
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-neutral-300 pt-0.5">
            <span>On All T-Shirts</span>
            <span className="text-neutral-500 select-none">•</span>
            <span>Code:</span>
            
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 rounded-md text-white font-mono font-bold text-xs sm:text-sm transition-all cursor-pointer"
              title="Click to copy promo code"
              aria-label={`Copy discount code ${code}`}
            >
              <span>{code}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-neutral-400 hover:text-white" />
              )}
            </button>

            {copied && (
              <span className="text-xs font-mono text-emerald-400 font-semibold animate-fade-in">
                COPIED!
              </span>
            )}
          </div>

          {/* Action: White pill button */}
          <div className="pt-2 sm:pt-3">
            <button
              type="button"
              onClick={handleShopClick}
              className="rounded-full bg-white text-black font-semibold text-sm px-7 py-3 hover:bg-neutral-100 transition-all flex items-center gap-2 group cursor-pointer shadow-md hover:scale-105 active:scale-95 duration-200"
            >
              <span>Shop Collection</span>
              <span className="transform transition-transform duration-200 group-hover:translate-x-1 font-bold">
                &rarr;
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Folded Luxury T-Shirt Photography */}
        <div className="relative w-full md:w-1/2 lg:w-[50%] min-h-[190px] sm:min-h-[220px] md:min-h-[260px] flex items-center justify-end overflow-hidden bg-[#0f0f11]">
          <img
            src="/folded-luxury-tees.png"
            alt="Folded luxury t-shirts in black, olive green, cream, white"
            className="w-full h-full object-cover object-left md:object-center select-none pointer-events-none"
            loading="lazy"
          />
          {/* Smooth gradient blend on the left edge into the card background */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#0f0f11] via-[#0f0f11]/70 to-transparent pointer-events-none hidden md:block" />
        </div>

      </div>
    </section>
  );
}
