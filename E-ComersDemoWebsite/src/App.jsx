import React, { useState, useEffect, Suspense, lazy } from 'react';
import TeeVibeNavbar from './components/TeeVibeNavbar';
import MobileBottomNav from './components/MobileBottomNav';
import FullscreenVideoHero from './components/FullscreenVideoHero';
import TrustBadgesStrip from './components/TrustBadgesStrip';
import CategoryStoryBar from './components/CategoryStoryBar';
import TeeVibeProductGrid from './components/TeeVibeProductGrid';
import PromoOfferBanner from './components/PromoOfferBanner';
import TeeVibeFooter from './components/TeeVibeFooter';
import AddToCartModal from './components/AddToCartModal';
import { INITIAL_PRODUCTS } from './data/productsData';
import { API_BASE_URL } from './config/api';

// Dynamic Code-Splitting: Lazy load screens and modals for ultra-fast performance
const ShopView = lazy(() => import('./components/ShopView'));
const CollectionsView = lazy(() => import('./components/CollectionsView'));
const LookbookView = lazy(() => import('./components/LookbookView'));
const AboutUsView = lazy(() => import('./components/AboutUsView'));
const ContactView = lazy(() => import('./components/ContactView'));
const CartView = lazy(() => import('./components/CartView'));
const CheckoutView = lazy(() => import('./components/CheckoutView'));
const CommunityLookbook = lazy(() => import('./components/CommunityLookbook'));
const KaalChatWidget = lazy(() => import('./components/KaalChatWidget'));
const CartDrawer = lazy(() => import('./components/CartDrawer'));
const ProductDetailModal = lazy(() => import('./components/ProductDetailModal'));
const TrackOrderModal = lazy(() => import('./components/TrackOrderModal'));
const PolicyModal = lazy(() => import('./components/PolicyModal'));
const SearchModal = lazy(() => import('./components/SearchModal'));
const AccountModal = lazy(() => import('./components/AccountModal'));

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [currentCurrency, setCurrentCurrency] = useState('INR');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Home');

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState({ code: 'TEE30', percent: 30 });

  // Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('brahmman_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod-07',
          handle: 'shunya',
          title: 'Shunya Void Tee',
          price: 1800,
          size: 'L',
          quantity: 1,
          color: 'Black',
          image: '/tees/feat_1.png'
        },
        {
          id: 'prod-01',
          handle: 'kundalini',
          title: 'Kundalini Oversized',
          price: 1800,
          size: 'XL',
          quantity: 1,
          color: 'Beige',
          image: '/tees/feat_0.png'
        },
        {
          id: 'prod-03',
          handle: 'indra',
          title: 'Indra Heavyweight',
          price: 1800,
          size: 'L',
          quantity: 1,
          color: 'Blue',
          image: '/tees/feat_2.png'
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('brahmman_wishlist');
      return saved ? JSON.parse(saved) : ['prod-01', 'prod-07'];
    } catch {
      return [];
    }
  });

  // Modal visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [policyState, setPolicyState] = useState({ isOpen: false, tab: 'returns' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastData, setToastData] = useState(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('brahmman_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("Cart storage sync failed", e);
    }
  }, [cart]);

  // Sync wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('brahmman_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Wishlist storage sync failed", e);
    }
  }, [wishlist]);

  // Fetch live products from backend with real-time sync
  useEffect(() => {
    const fetchLiveProducts = () => {
      fetch(`${API_BASE_URL}/api/products`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.products && data.products.length > 0) {
            setProducts(data.products);
          }
        })
        .catch(() => {
          // graceful offline fallback to INITIAL_PRODUCTS
        });
    };

    fetchLiveProducts();
    const interval = setInterval(fetchLiveProducts, 4000); // 4-second live sync with Admin
    return () => clearInterval(interval);
  }, []);

  // Multi-currency price conversion
  const formatPrice = (amountINR) => {
    const rates = {
      INR: { symbol: '₹', rate: 1 },
      USD: { symbol: '$', rate: 0.012 },
      EUR: { symbol: '€', rate: 0.011 },
      GBP: { symbol: '£', rate: 0.0095 },
    };

    const target = rates[currentCurrency] || rates.INR;
    const converted = Math.round(amountINR * target.rate);

    if (currentCurrency === 'INR') {
      return `₹${amountINR.toLocaleString('en-IN')}`;
    }
    return `${target.symbol}${converted.toLocaleString()}`;
  };

  // Cart operations
  const handleAddToCart = (product, size = 'L', quantity = 1, openDrawerImmediately = false) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.size === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, size, quantity }];
    });

    // Trigger Luxury slide-in toast notification
    setToastData({
      id: Date.now(),
      product,
      size,
      quantity
    });

    if (openDrawerImmediately) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (productId, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId && item.size === size ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle operation
  const handleToggleWishlist = (product) => {
    setWishlist(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Global navigation router
  const handleNavigate = (nav) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (nav === 'Home' || nav === 'Film') {
      setActiveNav('Home');
    } else if (nav === 'Shop') {
      setActiveNav('Shop');
    } else if (nav === 'Collections' || nav.startsWith('Category:')) {
      setActiveNav('Collections');
    } else if (nav === 'Categories') {
      setActiveNav('Home');
      setTimeout(() => {
        document.getElementById('categories-story')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (nav === 'Lookbook' || nav === 'Community') {
      setActiveNav('Lookbook');
    } else if (nav === 'About') {
      setActiveNav('About');
    } else if (nav === 'Contact') {
      setActiveNav('Contact');
    } else if (nav === 'Cart') {
      setActiveNav('Cart');
    } else if (nav === 'Checkout') {
      setActiveNav('Checkout');
    } else if (nav === 'Profile' || nav === 'Account') {
      setIsAccountOpen(true);
    } else if (nav === 'Wishlist') {
      setActiveNav('Shop');
    } else {
      setActiveNav(nav);
    }
  };

  return (
    <div className="bg-[#ffffff] text-[#111111] min-h-screen selection:bg-black selection:text-white font-sans antialiased">
      
      {/* 1. TeeVibe Modern Header & Navbar (Screens 01 & 07) */}
      <TeeVibeNavbar
        activeNav={activeNav}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setActiveNav('Shop');
        }}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main View Router */}
      <main className="pb-20 lg:pb-16 min-h-[70vh]">
        
        {/* ============================================================== */}
        {/* SCREEN 02: SHOP / PRODUCT LISTING (Desktop & Mobile)           */}
        {/* ============================================================== */}
        {activeNav === 'Shop' ? (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-mono text-neutral-400">Loading catalog...</div>}>
            <ShopView
              products={products}
              initialCategory={activeCategory}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              formatPrice={formatPrice}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          </Suspense>
        ) : activeNav === 'Collections' ? (
          /* ============================================================== */
          /* SCREEN 04: COLLECTIONS (Desktop & Mobile)                       */
          /* ============================================================== */
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-mono text-neutral-400">Loading collections...</div>}>
            <CollectionsView
              onSelectCategory={(catId) => {
                setActiveCategory(catId);
                setActiveNav('Shop');
              }}
              onNavigate={handleNavigate}
            />
            <TrustBadgesStrip />
          </Suspense>
        ) : activeNav === 'Cart' ? (
          /* ============================================================== */
          /* SCREEN 05: SHOPPING CART (Desktop & Mobile)                     */
          /* ============================================================== */
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-mono text-neutral-400">Loading cart...</div>}>
            <CartView
              cartItems={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onProceedToCheckout={() => setActiveNav('Checkout')}
              onContinueShopping={() => setActiveNav('Shop')}
              formatPrice={formatPrice}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={setAppliedCoupon}
              onRemoveCoupon={() => setAppliedCoupon(null)}
            />
          </Suspense>
        ) : activeNav === 'Checkout' ? (
          /* ============================================================== */
          /* SCREEN 06: CHECKOUT (Desktop & Mobile)                          */
          /* ============================================================== */
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-mono text-neutral-400">Loading checkout...</div>}>
            <CheckoutView
              cartItems={cart}
              onClearCart={handleClearCart}
              onContinueShopping={() => setActiveNav('Shop')}
              onReturnToCart={() => setActiveNav('Cart')}
              onTrackOrder={() => setIsTrackOpen(true)}
              formatPrice={formatPrice}
              appliedCoupon={appliedCoupon}
            />
          </Suspense>
        ) : activeNav === 'Lookbook' ? (
          /* ============================================================== */
          /* SCREEN 09: LOOKBOOK (Desktop & Mobile)                          */
          /* ============================================================== */
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-mono text-neutral-400">Loading lookbook...</div>}>
            <LookbookView
              onSelectProduct={(p) => setSelectedProduct(p)}
              onNavigate={handleNavigate}
              formatPrice={formatPrice}
            />
          </Suspense>
        ) : activeNav === 'About' ? (
          /* ============================================================== */
          /* SCREEN 10: ABOUT US (Desktop & Mobile)                          */
          /* ============================================================== */
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-mono text-neutral-400">Loading about us...</div>}>
            <AboutUsView
              onNavigate={handleNavigate}
            />
            <TrustBadgesStrip />
          </Suspense>
        ) : activeNav === 'Contact' ? (
          /* ============================================================== */
          /* SCREEN 11: CONTACT (Desktop & Mobile)                           */
          /* ============================================================== */
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-mono text-neutral-400">Loading contact...</div>}>
            <ContactView
              onNavigate={handleNavigate}
            />
          </Suspense>
        ) : (
          /* ============================================================== */
          /* SCREEN 01: HOME PAGE FLOW (Desktop & Mobile)                    */
          /* ============================================================== */
          <div className="space-y-10 sm:space-y-14">
            
            {/* 2. Fullscreen Clothes Video Hero */}
            <FullscreenVideoHero
              onShopNow={() => setActiveNav('Shop')}
            />

            {/* 2.5 Minimalist 4-Column Trust Badges Strip (Screen 01) */}
            <TrustBadgesStrip />

            {/* 3. 8 Circular Category Story Bubbles */}
            <div id="categories-story">
              <CategoryStoryBar
                activeCategory={activeCategory}
                onSelectCategory={(catName) => {
                  setActiveCategory(catName);
                  setActiveNav('Shop');
                }}
              />
            </div>

            {/* 4. Featured Collection (New Arrivals) */}
            <div id="featured-grid">
              <TeeVibeProductGrid
                section="featured"
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onQuickAdd={handleAddToCart}
                formatPrice={formatPrice}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            </div>

            {/* 5. Middle Promo Banner: "Flat 30% Off", Folded T-Shirts Stacks */}
            <PromoOfferBanner
              onShopNow={() => setActiveNav('Shop')}
              code="TEE30"
            />

            {/* 6. New Arrivals Grid */}
            <div id="new-arrivals-grid">
              <TeeVibeProductGrid
                section="arrivals"
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onQuickAdd={handleAddToCart}
                formatPrice={formatPrice}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            </div>

            {/* 7. WORN BY THE COMMUNITY Lookbook Grid */}
            <div id="community-lookbook">
              <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-neutral-400">Loading lookbook...</div>}>
                <CommunityLookbook
                  products={products}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  formatPrice={formatPrice}
                />
              </Suspense>
            </div>

          </div>
        )}

      </main>

      {/* Deep Navy / Noir 5-Column Modern Footer (Screen 12) */}
      <div id="footer">
        <TeeVibeFooter
          onOpenPolicy={(tab) => setPolicyState({ isOpen: true, tab })}
          onOpenTrack={() => setIsTrackOpen(true)}
          currentCurrency={currentCurrency}
          setCurrentCurrency={setCurrentCurrency}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Screen 07: Mobile Bottom Navigation Bar (Fixed on mobile screens) */}
      <MobileBottomNav
        activeNav={activeNav}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setActiveNav('Shop')}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Floating AI Help Widget ("Kaal") */}
      <Suspense fallback={null}>
        <KaalChatWidget
          onOpenTrackModal={() => setIsTrackOpen(true)}
        />
      </Suspense>

      {/* ============================================================== */}
      {/* INTERACTIVE MODALS & DRAWERS (Screens 03, 05, 08)               */}
      {/* ============================================================== */}
      <Suspense fallback={null}>
        {/* Cart Drawer */}
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            formatPrice={formatPrice}
            onProceedToCheckout={() => {
              setIsCartOpen(false);
              setActiveNav('Checkout');
            }}
          />
        )}

        {/* SCREEN 03: Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onBuyNow={(prod, size) => {
              handleAddToCart(prod, size, 1, false);
              setSelectedProduct(null);
              setActiveNav('Checkout');
            }}
            formatPrice={formatPrice}
            onOpenPolicy={(tab) => setPolicyState({ isOpen: true, tab })}
          />
        )}

        {/* SCREEN 08: Account / Login Modal */}
        {isAccountOpen && (
          <AccountModal
            isOpen={isAccountOpen}
            onClose={() => setIsAccountOpen(false)}
            onOpenTrackOrders={() => {
              setIsAccountOpen(false);
              setIsTrackOpen(true);
            }}
            onNavigateShop={() => {
              setIsAccountOpen(false);
              setActiveNav('Shop');
            }}
          />
        )}

        {/* Order Tracking Modal */}
        {isTrackOpen && (
          <TrackOrderModal
            isOpen={isTrackOpen}
            onClose={() => setIsTrackOpen(false)}
            formatPrice={formatPrice}
          />
        )}

        {/* Policies Modal */}
        {policyState.isOpen && (
          <PolicyModal
            isOpen={policyState.isOpen}
            initialTab={policyState.tab}
            onClose={() => setPolicyState({ isOpen: false, tab: 'returns' })}
          />
        )}

        {/* Search Modal */}
        {searchOpen && (
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            formatPrice={formatPrice}
          />
        )}
      </Suspense>

      {/* Center Screen Theme-Based Add To Cart Modal */}
      <AddToCartModal
        toast={toastData}
        onClose={() => setToastData(null)}
        onViewCart={() => {
          setToastData(null);
          setSelectedProduct(null);
          handleNavigate('Cart');
        }}
        onContinueShopping={() => setToastData(null)}
        formatPrice={formatPrice}
        cartItems={cart}
        totalCartCount={totalCartCount}
      />

    </div>
  );
}
