import React, { useState } from 'react';
import { 
  Search, LayoutDashboard, Cpu, Radio, BarChart3, 
  Workflow, Megaphone, ChevronDown, ArrowUpRight, TrendingUp,
  Ruler, Sparkles, Clock, Layers, Flame
} from 'lucide-react';
import FitAnalyticsCard from './FitAnalyticsCard';

export default function DashboardWindow({ onSelectView, activeSubView, metrics, orders, products }) {
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [growthTimeframe, setGrowthTimeframe] = useState('Today');

  const teamMembers = [
    {
      name: "Chris Fiendly",
      role: "Automation Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
    },
    {
      name: "Maggie Johnson",
      role: "Data Engineer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces"
    },
    {
      name: "Gael Harry",
      role: "Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
    },
    {
      name: "Jenna Sullivan",
      role: "ML Engineer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
    }
  ];

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu === 'Lookbook') {
      onSelectView('lookbook');
    } else if (menu === 'Batch & Scarcity') {
      onSelectView('batch-scarcity');
    } else if (menu === 'Analytics' || menu === 'Fit Analytics') {
      onSelectView('fit-analytics');
    } else if (menu === 'Workflows' || menu === 'Signals') {
      onSelectView('orders');
    } else if (menu === 'Automation') {
      onSelectView('inventory');
    } else {
      onSelectView('overview');
    }
  };

  return (
    <div className="relative w-full rounded-[36px] p-3 sm:p-6 md:p-8 bg-gradient-to-tr from-[#d4d8fc] via-[#ffd6cc] to-[#e4ceff] shadow-2xl overflow-hidden font-sans">
      
      {/* Floating White App Shell (Exact from admin.webp) */}
      <div className="bg-[#ffffff] rounded-2xl md:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/80 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-56 flex-shrink-0 space-y-6">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#f9f9f9] border border-neutral-200/80 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Menu Items (exact list from admin.webp + luxury extensions) */}
          <nav className="space-y-1 text-xs">
            {[
              { id: 'Overview', icon: LayoutDashboard },
              { id: 'Lookbook', icon: Sparkles },
              { id: 'Batch & Scarcity', icon: Clock },
              { id: 'Analytics', icon: BarChart3 },
              { id: 'Automation', icon: Cpu, hasDropdown: true },
              { id: 'Signals', icon: Radio },
              { id: 'Workflows', icon: Workflow },
              { id: 'Marketing', icon: Megaphone }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-100 text-black font-semibold'
                      : 'text-neutral-500 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Active bar indicator on left */}
                    {isActive && <span className="w-1 h-3.5 bg-black rounded-full" />}
                    <Icon className="w-4 h-4 text-neutral-600" />
                    <span>{item.id}</span>
                  </div>

                  {item.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Active Status indicator */}
          <div className="p-3 bg-[#f8f8f7] rounded-xl border border-neutral-100 text-[11px] text-neutral-500">
            <div className="flex items-center gap-2 text-black font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Telemetry Active</span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">Live Bharat logistics connection</p>
          </div>
        </aside>

        {/* Right Dashboard Canvas */}
        <div className="flex-1 space-y-6">
          
          {/* Top Row: 3 Metric Cards (Decisions Today, Accuracy Rate, Active Workflow) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 1. Decisions Today */}
            <div className="p-5 bg-[#fbfbfb] rounded-2xl border border-neutral-100 flex flex-col justify-between">
              <span className="text-xs text-neutral-500 font-medium">Decisions Today</span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-bold text-black tracking-tight">14,222</span>
                <span className="text-emerald-500 text-sm font-semibold flex items-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 mt-2">Increase compared to last week</span>
            </div>

            {/* 2. Accuracy Rate */}
            <div className="p-5 bg-[#fbfbfb] rounded-2xl border border-neutral-100 flex flex-col justify-between">
              <span className="text-xs text-neutral-500 font-medium">Accuracy Rate</span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-bold text-black tracking-tight">98.4%</span>
              </div>
              <span className="text-[11px] text-neutral-400 mt-2">+ 0.3% this week</span>
            </div>

            {/* 3. Active Workflow */}
            <div className="p-5 bg-[#fbfbfb] rounded-2xl border border-neutral-100 flex flex-col justify-between">
              <span className="text-xs text-neutral-500 font-medium">Active Workflow</span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-bold text-black tracking-tight">2.7x</span>
              </div>
              <span className="text-[11px] text-neutral-400 mt-2">throughput multiplier</span>
            </div>

          </div>

          {/* Middle Row: Growth Chart & Team Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left Card: Growth Graph */}
            <div className="p-5 bg-[#fbfbfb] rounded-2xl border border-neutral-100 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3">
                <span className="text-sm font-bold text-black">Growth</span>
                <button className="flex items-center gap-1 text-xs text-neutral-500 border border-neutral-200 rounded-lg px-2.5 py-1 bg-white">
                  <span>{growthTimeframe}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>

              {/* SVG Line Graph with Peach Gradient Fill (Exact match to admin.webp) */}
              <div className="h-44 w-full relative pt-2">
                <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="20" y1="20" x2="290" y2="20" stroke="#f0f0f0" strokeDasharray="3 3" />
                  <line x1="20" y1="45" x2="290" y2="45" stroke="#f0f0f0" strokeDasharray="3 3" />
                  <line x1="20" y1="70" x2="290" y2="70" stroke="#f0f0f0" strokeDasharray="3 3" />
                  <line x1="20" y1="95" x2="290" y2="95" stroke="#f0f0f0" strokeDasharray="3 3" />

                  {/* Y Axis labels */}
                  <text x="5" y="24" fontSize="8" fill="#999">4k</text>
                  <text x="5" y="49" fontSize="8" fill="#999">3k</text>
                  <text x="5" y="74" fontSize="8" fill="#999">2k</text>
                  <text x="5" y="99" fontSize="8" fill="#999">1k</text>

                  {/* Path Area */}
                  <path
                    d="M 25 80 L 45 75 L 65 85 L 85 45 L 105 70 L 125 55 L 145 90 L 165 72 L 185 82 L 205 40 L 225 50 L 245 75 L 265 55 L 285 40 L 285 105 L 25 105 Z"
                    fill="url(#growthGradient)"
                  />

                  {/* Path Stroke */}
                  <path
                    d="M 25 80 L 45 75 L 65 85 L 85 45 L 105 70 L 125 55 L 145 90 L 165 72 L 185 82 L 205 40 L 225 50 L 245 75 L 265 55 L 285 40"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* X Axis time marks */}
                <div className="flex justify-between text-[9px] text-neutral-400 px-6 pt-1">
                  <span>00</span><span>02</span><span>04</span><span>06</span><span>08</span><span>10</span><span>12</span><span>14</span>
                </div>
              </div>
            </div>

            {/* Right Card: Team Access (Exact match to admin.webp) */}
            <div className="p-5 bg-[#fbfbfb] rounded-2xl border border-neutral-100 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-sm font-bold text-black">Team Access</span>
                <button className="flex items-center gap-1 text-xs text-neutral-500 border border-neutral-200 rounded-lg px-2.5 py-1 bg-white">
                  <span>Sort by Top</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>

              {/* Members List */}
              <div className="space-y-3 py-2">
                {teamMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-neutral-100 transition-colors">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-black truncate">{member.name}</p>
                      <p className="text-[10px] text-neutral-400 truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sizing & Fit Analytics Breakdown Card */}
          <FitAnalyticsCard />

          {/* Bottom Row: Top Month & Top Year Cards (Exact match to admin.webp) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#fbfbfb] rounded-2xl border border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-neutral-800">Top month</span>
                <p className="text-[10px] text-neutral-400">Total volume recorded across drops</p>
              </div>
              <span className="text-sm font-bold text-black">Rs. 4,28,000</span>
            </div>

            <div className="p-4 bg-[#fbfbfb] rounded-2xl border border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-neutral-800">Top year</span>
                <p className="text-[10px] text-neutral-400">2026 Consecrated Physical Release</p>
              </div>
              <span className="text-sm font-bold text-black">186 Dispatches</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
