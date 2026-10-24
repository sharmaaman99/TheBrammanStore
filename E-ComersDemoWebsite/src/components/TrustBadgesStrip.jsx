import React from 'react';
import { Truck, RotateCcw, Award, ShieldCheck } from 'lucide-react';

/**
 * TrustBadgesStrip (Screen 01 Hero Trust Bar)
 * Matches 'The Brahmman Store UX Showcase.png' Screen 01
 * 4 minimalist trust badges in a clean horizontal strip with subtle top/bottom borders.
 */
export default function TrustBadgesStrip({ className = '' }) {
  const badges = [
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'Across India',
    },
    {
      icon: RotateCcw,
      title: '7 Days Return',
      subtitle: 'No Questions Asked',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'Built to Last',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      subtitle: '100% Safe',
    },
  ];

  return (
    <section
      aria-label="Store Guarantees"
      className={`w-full bg-white border-y border-neutral-200 py-6 sm:py-8 transition-colors ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
          {badges.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 group transition-transform duration-200 ${
                  index !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
                }`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-100/80 group-hover:bg-black group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300">
                  <Icon className="w-5 h-5 text-neutral-800 group-hover:text-white transition-colors" strokeWidth={1.75} />
                </div>
                <div className="leading-tight">
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-neutral-900 tracking-tight group-hover:text-black">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500 font-sans mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
