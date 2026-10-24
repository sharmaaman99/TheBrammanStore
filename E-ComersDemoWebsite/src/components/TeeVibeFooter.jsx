import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Check, Instagram, Facebook, Youtube } from 'lucide-react';

export default function TeeVibeFooter({
  onOpenPolicy,
  onOpenTrack,
  currentCurrency,
  setCurrentCurrency,
  onNavigate
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4500);
    }
  };

  const handleScrollTo = (id) => {
    if (id === 'hero' || id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0c1017] text-neutral-300 border-t border-white/10 font-sans selection:bg-white selection:text-black">
      {/* Main 5-Column Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-5 lg:pr-2">
            {/* Logo */}
            <div
              onClick={() => handleScrollTo('top')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-black shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
                <img
                  src="/parshuram_logo.png"
                  alt="The Brahmman Store"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="leading-tight">
                <span className="font-heading font-black text-base sm:text-lg text-white tracking-wider uppercase block group-hover:text-neutral-200 transition-colors">
                  The Brahmman Store
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  Heritage Streetwear
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              More than just a t-shirt. Ancient philosophy in modern streetwear.
            </p>

            {/* Social Media Icons in Circles */}
            <div className="pt-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black flex items-center justify-center text-neutral-300 hover:border-white transition-all duration-200 group"
                >
                  <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black flex items-center justify-center text-neutral-300 hover:border-white transition-all duration-200 group"
                >
                  <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black flex items-center justify-center text-neutral-300 hover:border-white transition-all duration-200 group"
                >
                  <Youtube className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black flex items-center justify-center text-neutral-300 hover:border-white transition-all duration-200 group"
                >
                  <svg className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black flex items-center justify-center text-neutral-300 hover:border-white transition-all duration-200 group"
                >
                  <svg className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-sm sm:text-base tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('Home') : handleScrollTo('hero')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('Shop') : handleScrollTo('bestsellers')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left cursor-pointer"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('Collections') : handleScrollTo('categories')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('Lookbook') : handleScrollTo('lookbook')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left cursor-pointer"
                >
                  Lookbook
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('About') : handleScrollTo('four-pillars')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('Contact') : handleScrollTo('contact')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-sm sm:text-base tracking-wide">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onOpenPolicy?.('returns')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('shipping')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left"
                >
                  Shipping &amp; Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('returns')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left"
                >
                  Return &amp; Refund
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('sizing')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-block text-left"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrack}
                  className="hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2 text-left group"
                >
                  <span>Track Order</span>
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-sm group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    Live
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-sm sm:text-base tracking-wide">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-300 mt-0.5">
                  <Mail className="w-4 h-4 text-neutral-300" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-mono">Email Us</span>
                  <a
                    href="mailto:support@thebrahmmanstore.com"
                    className="hover:text-white transition-colors break-all"
                  >
                    support@thebrahmmanstore.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-300 mt-0.5">
                  <Phone className="w-4 h-4 text-neutral-300" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-mono">Call Us</span>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-white transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-300 mt-0.5">
                  <MapPin className="w-4 h-4 text-neutral-300" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-mono">Location</span>
                  <span className="text-neutral-300">
                    Bharat / India
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 5: Join Our Newsletter */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="text-white font-heading font-semibold text-sm sm:text-base tracking-wide">
              Join Our Newsletter
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Get exclusive offers, new arrivals and more.
            </p>

            {/* Newsletter Input Capsule with Black Circle Arrow Button */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center bg-white rounded-full p-1 pl-4 shadow-sm border border-neutral-200 focus-within:ring-2 focus-within:ring-white/50 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address ..."
                  required
                  className="w-full bg-transparent text-neutral-900 placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none pr-3"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Subscribed successfully! Welcome to the archive.</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 py-6 bg-[#080b10]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="text-center sm:text-left">
            &copy; 2026 The Brahmman Store. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenPolicy?.('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-neutral-600">|</span>
            <button
              onClick={() => onOpenPolicy?.('terms')}
              className="hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
