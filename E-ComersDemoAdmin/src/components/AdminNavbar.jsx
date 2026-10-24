import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function AdminNavbar({ onTabChange, activeTab }) {
  return (
    <header className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-6 flex items-center justify-between font-sans">
      
      {/* Left Monogram Star */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('overview')}>
        <div className="w-7 h-7 flex items-center justify-center text-black">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
        <span className="font-bold text-base tracking-tight text-black hidden sm:inline">The Brahmman Admin</span>
      </div>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm text-neutral-600 font-medium">
        <button
          onClick={() => onTabChange('overview')}
          className={`hover:text-black transition-colors ${activeTab === 'overview' ? 'text-black font-bold' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => onTabChange('lookbook')}
          className={`hover:text-black transition-colors ${activeTab === 'lookbook' ? 'text-black font-bold' : ''}`}
        >
          Lookbook
        </button>
        <button
          onClick={() => onTabChange('batch-scarcity')}
          className={`hover:text-black transition-colors ${activeTab === 'batch-scarcity' ? 'text-black font-bold' : ''}`}
        >
          Batch & Scarcity
        </button>
        <button
          onClick={() => onTabChange('inventory')}
          className={`hover:text-black transition-colors ${activeTab === 'inventory' ? 'text-black font-bold' : ''}`}
        >
          Inventory
        </button>
        <button
          onClick={() => onTabChange('orders')}
          className={`hover:text-black transition-colors ${activeTab === 'orders' ? 'text-black font-bold' : ''}`}
        >
          Orders
        </button>
      </nav>

      {/* Right Action: Pill button */}
      <div className="flex items-center gap-3">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <span>Start Building</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </header>
  );
}
