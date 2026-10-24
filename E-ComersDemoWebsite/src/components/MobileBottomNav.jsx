import React from 'react';
import { Home, LayoutGrid, ShoppingBag, Heart, User } from 'lucide-react';

/**
 * MobileBottomNav - Sleek Minimalist Mobile Bottom Navigation Bar
 * Matching 'The Brahmman Store UX Showcase.png' (Screen 07: Mobile View)
 *
 * Features:
 * - Fixed at bottom on mobile screens (hidden on lg+ screens)
 * - 5 equal tabs: Home, Shop, Cart, Wishlist, Profile
 * - Real-time badges for Cart and Wishlist counters
 * - Crisp architectural typography and active underline/dot indicator
 * - iPhone Home Bar safe area padding support
 */
export default function MobileBottomNav({
  activeNav = 'Home',
  cartCount = 0,
  wishlistCount = 0,
  onNavigate = () => {},
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  onOpenAccount = () => {},
}) {
  const navItems = [
    {
      id: 'Home',
      label: 'Home',
      icon: Home,
      onClick: () => onNavigate('Home'),
    },
    {
      id: 'Shop',
      label: 'Shop',
      icon: LayoutGrid,
      onClick: () => onNavigate('Shop'),
    },
    {
      id: 'Cart',
      label: 'Cart',
      icon: ShoppingBag,
      badge: cartCount,
      onClick: () => {
        onNavigate('Cart');
      },
    },
    {
      id: 'Wishlist',
      label: 'Wishlist',
      icon: Heart,
      badge: wishlistCount,
      onClick: () => {
        onNavigate('Wishlist');
        if (onOpenWishlist) onOpenWishlist();
      },
    },
    {
      id: 'Profile',
      label: 'Profile',
      icon: User,
      onClick: () => {
        onNavigate('Profile');
        if (onOpenAccount) onOpenAccount();
      },
    },
  ];

  const normalizeNav = (val = '') => {
    const lower = String(val).toLowerCase();
    if (lower === 'home') return 'Home';
    if (lower === 'shop') return 'Shop';
    if (lower === 'cart') return 'Cart';
    if (lower === 'wishlist') return 'Wishlist';
    if (lower === 'profile' || lower === 'account' || lower === 'orders') return 'Profile';
    return val;
  };

  const currentActive = normalizeNav(activeNav);

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:hidden select-none"
      style={{
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="max-w-lg mx-auto grid grid-cols-5 items-center px-1 pt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActive === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-150 relative cursor-pointer active:scale-95 group focus:outline-none ${
                isActive ? 'text-black' : 'text-neutral-500 hover:text-neutral-800'
              }`}
              aria-label={`${item.label} navigation tab`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon Container with optional counter badge */}
              <div className="relative flex items-center justify-center w-7 h-7">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'stroke-[2.2] scale-105' : 'stroke-[1.8] group-hover:scale-105'
                  }`}
                />

                {/* Counter Badge */}
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center border border-white shadow-xs leading-none">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] tracking-wider uppercase leading-tight mt-0.5 transition-all ${
                  isActive ? 'font-bold text-black' : 'font-medium text-neutral-500'
                }`}
              >
                {item.label}
              </span>

              {/* Subtle Active Pill Indicator Dot */}
              {isActive && (
                <span className="w-1 h-1 bg-black rounded-full mt-0.5 animate-in fade-in zoom-in duration-150" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
