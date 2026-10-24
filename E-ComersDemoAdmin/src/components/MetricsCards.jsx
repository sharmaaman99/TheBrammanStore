import React from 'react';
import { TrendingUp, ShoppingBag, Users, Layers } from 'lucide-react';

export default function MetricsCards({ metrics }) {
  const cards = [
    {
      title: "GROSS REVENUE",
      value: `Rs. ${(metrics?.totalRevenue || 428000).toLocaleString('en-IN')}.00`,
      change: "+24.8% vs last drop",
      positive: true,
      sub: "All Drops Combined (Bharat)",
      icon: TrendingUp
    },
    {
      title: "DISPATCHED ORDERS",
      value: metrics?.totalOrders || 186,
      change: "+18 today",
      positive: true,
      sub: "Average Order Value: Rs. 2,340",
      icon: ShoppingBag
    },
    {
      title: "LIVE ARCHIVE TRAFFIC",
      value: `${metrics?.activeVisitors || 64} Collectors`,
      change: "Active browsing right now",
      positive: true,
      sub: "Delhi, Mumbai, Bengaluru, Global",
      icon: Users
    },
    {
      title: "FABRIC RESERVE (TIRUPUR)",
      value: `${metrics?.totalStockRemaining || 198} Units`,
      change: "260-400 GSM Combed Cotton",
      positive: false,
      sub: "Drop 04 Restock Scheduled",
      icon: Layers
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div
            key={idx}
            className="p-5 bg-white border border-[#e5e5e5] hover:border-black transition-all duration-300 relative group overflow-hidden shadow-xs"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-neutral-500 text-xs mb-3">
              <span className="tracking-widest uppercase text-[11px] font-bold text-neutral-600">{c.title}</span>
              <div className="p-1.5 bg-[#f8f8f7] border border-[#e5e5e5] text-black shadow-xs">
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Value */}
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-black tracking-tight uppercase">
              {c.value}
            </div>

            {/* Sub & Trend */}
            <div className="mt-3 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-semibold">{c.change}</span>
              <span className="text-neutral-500 text-[10px]">{c.sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
