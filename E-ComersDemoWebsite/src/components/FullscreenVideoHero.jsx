import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Editorial Fashion Campaign Scenes featuring the Boy Model wearing collection t-shirts:
 * 1. Kundalini Oversized Black Tee (260 GSM loopknit)
 * 2. Tat Tvam Asi Raw Cream Tee (260 GSM loopknit)
 * 3. Indra Vajra Black Tee (260 GSM loopknit)
 * 
 * Performance:
 * - 100% GPU Hardware-Accelerated CSS layers
 * - Zero CPU canvas rendering loop (Eliminates scroll lag completely)
 * - Ultra-clean, distraction-free minimalist luxury aesthetic
 */
const CAMPAIGN_SCENES = [
  {
    id: 'kundalini',
    title: 'Kundalini Oversized',
    image: '/model_kundalini_boy_8k.png',
    fallbackImg: '/model_kundalini_boy.png',
  },
  {
    id: 'tattvamasi',
    title: 'Tat Tvam Asi Drop',
    image: '/model_tattvamasi_boy_8k.png',
    fallbackImg: '/model_tattvamasi_boy.png',
  },
  {
    id: 'indra',
    title: 'Indra Heavyweight',
    image: '/model_indra_boy_8k.png',
    fallbackImg: '/model_indra_boy.png',
  },
];

export default function FullscreenVideoHero({
  onShopNow = () => {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Seamless crossfade timer: transitions every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAMPAIGN_SCENES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Streetwear Collection Showcase"
      className="relative w-full h-[85vh] sm:h-[88vh] lg:h-[92vh] min-h-[540px] overflow-hidden bg-[#0a0a0c] select-none"
    >
      {/* ============================================================== */}
      {/* HARDWARE-ACCELERATED HERO SCENES (Zero Scroll Lag, 120 FPS)    */}
      {/* ============================================================== */}
      {CAMPAIGN_SCENES.map((scene, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none will-change-transform ${
              isActive ? 'opacity-100 z-1' : 'opacity-0 z-0'
            }`}
            style={{ transform: 'translateZ(0)' }}
          >
            <img
              src={scene.image}
              alt={scene.title}
              onError={(e) => {
                if (e.currentTarget.src !== scene.fallbackImg) {
                  e.currentTarget.src = scene.fallbackImg;
                }
              }}
              className={`w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-[6000ms] ease-out will-change-transform ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        );
      })}

      {/* ============================================================== */}
      {/* SOFT LUXURY GRADIENTS (Subtle top & bottom blend)              */}
      {/* ============================================================== */}
      {/* Top subtle fade for navbar seamless blend */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 via-black/10 to-transparent pointer-events-none z-10" />

      {/* Bottom soft gradient for button contrast */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none z-10" />

      {/* ============================================================== */}
      {/* MINIMALIST ACTION BUTTON & SCROLL CUE                          */}
      {/* ============================================================== */}
      <div className="absolute bottom-8 sm:bottom-10 inset-x-0 z-20 flex flex-col items-center justify-center gap-3.5 pointer-events-auto">
        <button
          type="button"
          onClick={onShopNow}
          className="rounded-full bg-white text-black font-semibold text-xs sm:text-sm px-8 py-3.5 hover:bg-neutral-100 transition-all flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 duration-200 cursor-pointer"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={onShopNow}
          className="flex flex-col items-center gap-0.5 text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
          aria-label="Scroll to collection"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

      {/* Slide indicators (Minimal dot indicators) */}
      <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2 pointer-events-auto">
        {CAMPAIGN_SCENES.map((scene, idx) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Show ${scene.title}`}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? 'w-6 bg-white'
                : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
