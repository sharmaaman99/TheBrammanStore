import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 8 Category definitions matching TeeVibe reference image:
 * 1. Men's T-Shirts (Black flat-lay tee)
 * 2. Oversized (Beige / sand flat-lay tee)
 * 3. Graphic Tees (Black graphic print tee)
 * 4. Plain Tees (White flat-lay tee)
 * 5. Polo T-Shirts (Dark green collar polo flat-lay)
 * 6. Half Sleeve (Heather grey flat-lay tee)
 * 7. Full Sleeve (Black long sleeve flat-lay tee)
 * 8. Summer Collection (Baby blue flat-lay tee)
 */
const CATEGORIES = [
  {
    id: 'mens-tshirts',
    name: "Men's T-Shirts",
    image: '/cat_1_mens.png',
    fallbackImage: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/shunya_pro_exp.png?v=1788419827',
    description: 'Black flat-lay tee',
  },
  {
    id: 'oversized',
    name: 'Oversized',
    image: '/cat_2_oversized.png',
    fallbackImage: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/45.png?v=1789397586',
    description: 'Beige / sand flat-lay tee',
  },
  {
    id: 'graphic-tees',
    name: 'Graphic Tees',
    image: '/cat_3_graphic.png',
    fallbackImage: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886',
    description: 'Black graphic print tee',
  },
  {
    id: 'plain-tees',
    name: 'Plain Tees',
    image: '/cat_4_plain.png',
    fallbackImage: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/rs1_pro_exp_1.png?v=1788414778',
    description: 'White flat-lay tee',
  },
  {
    id: 'polo-tshirts',
    name: 'Polo T-Shirts',
    image: '/cat_5_polo.png',
    fallbackImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80',
    description: 'Dark green collar polo flat-lay',
  },
  {
    id: 'half-sleeve',
    name: 'Half Sleeve',
    image: '/cat_6_halfsleeve.png',
    fallbackImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80',
    description: 'Heather grey flat-lay tee',
  },
  {
    id: 'full-sleeve',
    name: 'Full Sleeve',
    image: '/cat_7_fullsleeve.png',
    fallbackImage: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/kaal_pro_exp.png?v=1791633682',
    description: 'Black long sleeve flat-lay tee',
  },
  {
    id: 'summer-collection',
    name: 'Summer Collection',
    image: '/cat_8_summer.png',
    fallbackImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
    description: 'Baby blue flat-lay tee',
  },
];

export default function CategoryStoryBar({
  activeCategory = null,
  onSelectCategory = () => {},
}) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section aria-label="Product Categories" className="w-full bg-white py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Container with Carousel Hover Navigation */}
        <div className="relative group/carousel">
          
          {/* Desktop Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Scroll categories left"
            className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-8 z-20 w-8 h-8 rounded-full bg-white border border-neutral-300 shadow-md items-center justify-center text-neutral-700 hover:text-black hover:border-black opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Smooth Horizontal Category Scroll */}
          <div
            ref={scrollRef}
            className="flex items-start gap-4 sm:gap-6 md:gap-7 lg:gap-8 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1 justify-start md:justify-center"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {CATEGORIES.map((cat) => {
              const isActive =
                activeCategory &&
                (activeCategory.toString().toLowerCase() === cat.name.toLowerCase() ||
                  activeCategory.toString().toLowerCase() === cat.id.toLowerCase());

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCategory(cat.name);
                    }
                  }}
                  className="flex flex-col items-center flex-shrink-0 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-2xl p-1 transition-all"
                >
                  {/* Bubble Container: Butter-smooth scale & border on hover */}
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f4f5f7] border border-neutral-200/60 p-2 sm:p-2.5 flex items-center justify-center hover:scale-108 transition-transform duration-300 ease-out shadow-xs overflow-hidden will-change-transform ${
                      isActive
                        ? 'border-neutral-900 ring-2 ring-neutral-900/20 scale-105 shadow-sm'
                        : 'group-hover:border-neutral-400'
                    }`}
                  >
                    {/* Photographic flat-lay image */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      onError={(e) => {
                        if (cat.fallbackImage && e.currentTarget.src !== cat.fallbackImage) {
                          e.currentTarget.src = cat.fallbackImage;
                        }
                      }}
                      loading="eager"
                      className="w-full h-full object-cover rounded-full filter contrast-[1.02] drop-shadow-xs group-hover:scale-110 transition-transform duration-300 ease-out"
                    />

                    {/* Active dot badge */}
                    {isActive && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-black border-2 border-white ring-1 ring-black/20" />
                    )}
                  </div>

                  {/* Label below: font-medium text-xs sm:text-sm text-neutral-800 text-center mt-2 group-hover:text-black */}
                  <span
                    className={`font-medium text-xs sm:text-sm text-center mt-2 group-hover:text-black transition-colors duration-200 max-w-[90px] sm:max-w-[105px] leading-snug ${
                      isActive ? 'text-black font-semibold' : 'text-neutral-800'
                    }`}
                  >
                    {cat.name}
                  </span>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="w-4 h-0.5 bg-black rounded-full mt-1.5 animate-fadeIn" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Scroll categories right"
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-8 z-20 w-8 h-8 rounded-full bg-white border border-neutral-300 shadow-md items-center justify-center text-neutral-700 hover:text-black hover:border-black opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
