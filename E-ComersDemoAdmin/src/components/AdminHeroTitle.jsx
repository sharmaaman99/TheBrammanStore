import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function AdminHeroTitle({ onActionClick }) {
  return (
    <div className="w-full pt-10 pb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 font-sans">
      
      {/* Left Huge Headline (Exact match to admin.webp) */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-black leading-[1.05] max-w-xl">
        Build Systems That<br />
        Think and Act
      </h1>

      {/* Right Subtitle & Action Button (Exact match to admin.webp) */}
      <div className="space-y-4 max-w-xs md:text-left">
        <p className="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
          Automate decisions with systems that learn from your data in real time.
        </p>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-xs"
        >
          <span>Start Building</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
