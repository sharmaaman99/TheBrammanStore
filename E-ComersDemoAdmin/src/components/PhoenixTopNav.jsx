import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Search,
  Sun,
  Moon,
  ExternalLink,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

/**
 * PhoenixTopNav (Minimalist & Clean Edition)
 * A clean, elegant sticky header with generous whitespace.
 */
export default function PhoenixTopNav({
  onToggleSidebar,
  onToggleMobileMenu,
  sidebarCollapsed = false,
  onSelectTab,
  onOpenThemeControl,
  navbarAppearance = 'default',
  isLiveConnected = true,
  lastSync,
  activeTab = 'dashboard'
}) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('phoenixTheme_v2') || localStorage.getItem('phoenixTheme') || 'dark';
    }
    return 'dark';
  });

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('phoenixTheme_v2', next);
    localStorage.setItem('phoenixTheme', next);
    document.documentElement.setAttribute('data-bs-theme', next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('phoenix-theme-updated', { detail: { theme: next } }));
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'analytics': return 'Analytics & Reports';
      case 'products': return 'Products Catalog';
      case 'add-product': return 'Add New Product';
      case 'orders': return 'Orders & Shipments';
      case 'customers': return 'Customers Directory';
      case 'inventory': return 'Inventory & Stock Matrix';
      case 'settings': return 'Store Settings';
      default: return 'Admin Console';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Clean Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
              {getTabTitle()}
            </h1>
          </div>
        </div>

        {/* Center: Minimal Search Input */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="w-full pl-10 pr-12 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync</span>
          </div>

          {/* Storefront Link */}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <span>Store</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          {/* Clean Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* User Profile Pill */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(prev => !prev)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                S
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-800 dark:text-slate-200">
                Shiva
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 py-1.5 bg-white dark:bg-[#141824] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80">
                  <p className="font-semibold text-slate-900 dark:text-white">Shiva Sharma</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">admin@thebrahmman.com</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      if (onSelectTab) onSelectTab('settings');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Store Settings
                  </button>
                  <a
                    href="http://localhost:3000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    Open Storefront
                  </a>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-1">
                  <button
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
