import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Heart, ShoppingBag, ChevronDown, Menu, X, ArrowRight, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import MobileBottomNav from './MobileBottomNav';

export { MobileBottomNav };

/**
 * Modern Luxury Header for The Brahmman Store
 * Matching 'The Brahmman Store UX Showcase.png' (Screens 01 & 07)
 *
 * Requirements:
 * 1. Header Navbar (Desktop & Mobile):
 *    - Left: Circular Lord Parshuram logo ('/parshuram_logo.png') + 'THE BRAHMMAN STORE' bold typography
 *    - Center Navigation Links: 'Home', 'Shop', 'Collections', 'Lookbook', 'About', 'Contact'
 *      (Active link highlighted with clean black underline and font-bold)
 *    - Right Icons: Search button, User/Account icon, Heart/Wishlist with live counter badge, ShoppingBag/Cart with live counter badge
 * 2. Mobile Bottom Navigation Bar (Screen 07):
 *    - Fixed at bottom on mobile screens (hidden on lg+)
 *    - 'Home', 'Shop', 'Cart' (badge), 'Wishlist' (badge), 'Profile'
 * 3. Callbacks: `activeNav`, `onNavigate(tabName)`, `onOpenCart`, `onOpenWishlist`, `onOpenSearch`, `onOpenAccount`
 * 4. High performance, zero lag, minimalist and neat
 */
export default function TeeVibeNavbar({
  brandName = 'THE BRAHMMAN STORE',
  activeNav: propActiveNav,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  onOpenSearch = () => {},
  onOpenAccount = () => {},
  onNavigate = () => {},
  showMobileBottomNav = true,
}) {
  const [internalActiveNav, setInternalActiveNav] = useState('Home');
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const collectionsRef = useRef(null);

  // Sync controlled activeNav if provided
  const activeTab = propActiveNav !== undefined ? propActiveNav : internalActiveNav;

  // Listen to window scroll to apply subtle border/shadow
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 12;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close collections dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collectionsRef.current && !collectionsRef.current.contains(event.target)) {
        setIsCollectionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tabName) => {
    setInternalActiveNav(tabName);
    setMobileMenuOpen(false);
    setIsCollectionsOpen(false);

    if (onNavigate) {
      onNavigate(tabName);
    }

    if (tabName === 'Cart' && onOpenCart) {
      onOpenCart();
    } else if (tabName === 'Wishlist' && onOpenWishlist) {
      onOpenWishlist();
    } else if ((tabName === 'Profile' || tabName === 'Account') && onOpenAccount) {
      onOpenAccount();
    }
  };

  const navLinks = [
    { name: 'Home', id: 'Home' },
    { name: 'Shop', id: 'Shop' },
    { name: 'Collections', id: 'Collections', hasDropdown: true },
    { name: 'Lookbook', id: 'Lookbook' },
    { name: 'About', id: 'About' },
    { name: 'Contact', id: 'Contact' },
  ];

  const curatedCollections = [
    { name: 'Oversized Tees (260 GSM)', tag: 'Best Seller', categoryId: 'oversized-tees' },
    { name: 'Graphic Streetwear Drops', tag: 'Limited Drop', categoryId: 'graphic-tees' },
    { name: 'Heavyweight Silhouettes (400 GSM)', tag: 'Winter Spec', categoryId: 'hoodies-heavyweight' },
    { name: 'Plain Luxury Basics', tag: 'Everyday Luxury', categoryId: 'plain-tees' },
    { name: 'Polo & Structured Knits', tag: 'Classic', categoryId: 'polo-tshirts' },
    { name: 'Half & Full Sleeves', tag: 'Signature', categoryId: 'halfsleeve-tees' },
    { name: 'Vedic Philosophy Archive', tag: 'Core Motif', categoryId: 'summer-collection' },
  ];

  const isLinkActive = (item) => {
    if (item.id === 'Home') return activeTab === 'Home' || activeTab === 'Film';
    if (item.id === 'Shop') return activeTab === 'Shop';
    if (item.id === 'Collections') {
      return (
        activeTab === 'Collections' ||
        activeTab === 'Categories' ||
        String(activeTab).startsWith('Category:')
      );
    }
    if (item.id === 'Lookbook') return activeTab === 'Lookbook' || activeTab === 'Community';
    if (item.id === 'About') return activeTab === 'About';
    if (item.id === 'Contact') return activeTab === 'Contact';
    return activeTab === item.id;
  };

  return (
    <>
      {/* ==================================================================== */}
      {/* TOP SLEEK MINIMALIST ANNOUNCEMENT TICKER                             */}
      {/* ==================================================================== */}
      <div className="w-full bg-[#0a0a0c] text-neutral-300 py-2 px-4 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-center border-b border-white/10 flex items-center justify-center gap-2.5 sm:gap-4 select-none">
        <span>COMPLIMENTARY SHIPPING ACROSS INDIA</span>
        <span className="text-neutral-600 select-none">•</span>
        <span>LIMITED VEDIC ARCHIVE 2026</span>
      </div>

      {/* ==================================================================== */}
      {/* TOP DESKTOP & MOBILE HEADER                                          */}
      {/* ==================================================================== */}
      <header
        className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-200 select-none ${
          isScrolled
            ? 'border-b border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            : 'border-b border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
            
            {/* ============================================================ */}
            {/* LEFT: Circular Lord Parshuram Logo + THE BRAHMMAN STORE     */}
            {/* ============================================================ */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 -ml-2 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Brand Logo & Bold Architectural Typography */}
              <button
                type="button"
                onClick={() => handleNavClick('Home')}
                className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
                aria-label="The Brahmman Store Home"
              >
                {/* Circular Lord Parshuram warrior sage emblem */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-black bg-black shadow-xs ring-1 ring-neutral-200 group-hover:ring-black group-hover:scale-105 transition-all duration-200 shrink-0">
                  <img
                    src="/parshuram_logo.png"
                    alt="Lord Parshuram Avatar"
                    className="w-full h-full object-cover object-top filter contrast-110"
                    loading="eager"
                  />
                </div>

                {/* Architectural Typography */}
                <div className="flex flex-col justify-center">
                  <span className="font-sans font-black tracking-[0.14em] text-sm sm:text-base md:text-lg text-neutral-950 uppercase leading-none group-hover:text-black transition-colors">
                    {brandName}
                  </span>
                </div>
              </button>
            </div>

            {/* ============================================================ */}
            {/* CENTER: Navigation Links (Desktop)                           */}
            {/* ============================================================ */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-xs sm:text-[13px] tracking-wider uppercase text-neutral-700">
              {navLinks.map((item) => {
                const active = isLinkActive(item);

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      ref={collectionsRef}
                      onMouseEnter={() => setIsCollectionsOpen(true)}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick('Collections')}
                        className={`relative flex items-center gap-1.5 py-2.5 transition-colors duration-150 cursor-pointer focus:outline-none ${
                          active || isCollectionsOpen
                            ? 'text-black font-bold'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                        aria-expanded={isCollectionsOpen}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isCollectionsOpen ? 'rotate-180 text-black' : 'text-neutral-400'
                          }`}
                        />
                        {active && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />
                        )}
                      </button>

                      {/* Dropdown Menu on Hover/Click */}
                      {isCollectionsOpen && (
                        <div
                          onMouseLeave={() => setIsCollectionsOpen(false)}
                          className="absolute top-full -left-6 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                        >
                          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 overflow-hidden">
                            <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-neutral-400 border-b border-neutral-100 mb-1.5 flex items-center justify-between">
                              <span>Curated Silhouettes</span>
                              <span>2026 Archive</span>
                            </div>

                            {curatedCollections.map((cat) => (
                              <button
                                key={cat.name}
                                type="button"
                                onClick={() => {
                                  handleNavClick(`Category: ${cat.name}`);
                                  setIsCollectionsOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-3 py-2 text-left text-xs rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-50 transition-colors group cursor-pointer"
                              >
                                <span className="font-semibold group-hover:translate-x-1 transition-transform">
                                  {cat.name}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  {cat.tag}
                                </span>
                              </button>
                            ))}

                            <div className="pt-2 mt-1 border-t border-neutral-100">
                              <button
                                type="button"
                                onClick={() => {
                                  handleNavClick('Collections');
                                  setIsCollectionsOpen(false);
                                }}
                                className="w-full flex items-center justify-center gap-1.5 text-[11px] font-bold text-black hover:underline py-1.5 uppercase tracking-wider"
                              >
                                <span>View All Silhouettes</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`relative py-2.5 transition-colors duration-150 cursor-pointer focus:outline-none ${
                      active
                        ? 'text-black font-bold'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ============================================================ */}
            {/* RIGHT: Search, Account/User, Wishlist, Shopping Bag/Cart     */}
            {/* ============================================================ */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* 1. Search Button (Opens Search Modal) */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 sm:p-2.5 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer relative group focus:outline-none"
                aria-label="Search drops and collections"
                title="Search"
              >
                <Search className="w-5 h-5 transition-transform group-hover:scale-105" strokeWidth={1.8} />
              </button>

              {/* 2. User/Account Button (Opens Account / Login Modal / Track Order) */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenAccount) onOpenAccount();
                  handleNavClick('Profile');
                }}
                className={`p-2 sm:p-2.5 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer relative group focus:outline-none ${
                  activeTab === 'Profile' || activeTab === 'Account' ? 'text-black bg-neutral-100' : ''
                }`}
                aria-label="Account and orders"
                title="Account / Profile"
              >
                <User className="w-5 h-5 transition-transform group-hover:scale-105" strokeWidth={1.8} />
              </button>

              {/* 3. Heart/Wishlist Button with live counter badge */}
              <button
                type="button"
                onClick={onOpenWishlist}
                className={`p-2 sm:p-2.5 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer relative group focus:outline-none ${
                  activeTab === 'Wishlist' ? 'text-black bg-neutral-100' : ''
                }`}
                aria-label={`Wishlist (${wishlistCount})`}
                title="Wishlist"
              >
                <Heart className="w-5 h-5 transition-transform group-hover:scale-105" strokeWidth={1.8} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center leading-none border-2 border-white shadow-xs">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </button>

              {/* 4. ShoppingBag/Cart Button with live counter badge */}
              <button
                type="button"
                onClick={onOpenCart}
                className={`p-2 sm:p-2.5 text-neutral-900 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer relative group focus:outline-none ${
                  activeTab === 'Cart' ? 'text-black bg-neutral-100' : ''
                }`}
                aria-label={`Shopping bag (${cartCount})`}
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center leading-none border-2 border-white shadow-xs">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE MENU DRAWER (Drop-down when Hamburger is toggled)        */}
        {/* ============================================================== */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-5 py-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-black bg-black shrink-0">
                  <img
                    src="/parshuram_logo.png"
                    alt="Lord Parshuram"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="font-bold text-sm tracking-wider uppercase text-black block leading-none">
                    {brandName}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-neutral-400 hover:text-black rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links List */}
            <div className="flex flex-col space-y-1 text-sm font-semibold text-neutral-800">
              {['Home', 'Shop', 'Collections', 'Lookbook', 'About', 'Contact'].map((tab) => {
                const active =
                  activeTab === tab ||
                  (tab === 'Collections' && (activeTab === 'Categories' || String(activeTab).startsWith('Category:')));
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleNavClick(tab)}
                    className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                      active
                        ? 'bg-neutral-100 text-black font-bold'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <span>{tab}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </button>
                );
              })}

              <div className="pt-2 border-t border-neutral-100 flex flex-col space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-neutral-700 hover:bg-neutral-50 hover:text-black"
                >
                  <span className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-neutral-500" />
                    <span>Search Archive</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('Profile')}
                  className="flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-neutral-700 hover:bg-neutral-50 hover:text-black"
                >
                  <span className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-neutral-500" />
                    <span>Account & Order Tracking</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('Cart')}
                  className="flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-neutral-700 hover:bg-neutral-50 hover:text-black"
                >
                  <span className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-neutral-500" />
                    <span>Cart</span>
                  </span>
                  {cartCount > 0 && (
                    <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {cartCount} items
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ==================================================================== */}
      {/* MOBILE BOTTOM NAVIGATION BAR (Screen 07: Mobile View)                */}
      {/* ==================================================================== */}
      {showMobileBottomNav && (
        <MobileBottomNav
          activeNav={activeTab}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          onNavigate={handleNavClick}
          onOpenCart={onOpenCart}
          onOpenWishlist={onOpenWishlist}
          onOpenAccount={onOpenAccount}
        />
      )}
    </>
  );
}
