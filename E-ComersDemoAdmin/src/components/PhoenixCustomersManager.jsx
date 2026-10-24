import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Users, Mail, Phone, MapPin, Award, 
  ShoppingBag, Calendar, ArrowUpDown, ChevronRight, X, ExternalLink, RefreshCw
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const TIER_FILTERS = ['All', 'VIP Collector', 'Gold Tier', 'Silver Tier', 'New Collector'];

export default function PhoenixCustomersManager({ customers: initialCustomers = [], onRefresh }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [activeTier, setActiveTier] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch customers from server if not provided
  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/customers`);
      if (res.ok) {
        const data = await res.json();
        if (data.customers) setCustomers(data.customers);
      }
    } catch (err) {
      console.warn('Using local customers fallback', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialCustomers.length === 0) {
      fetchCustomers();
    } else {
      setCustomers(initialCustomers);
    }
  }, [initialCustomers]);

  // Tier badge styling
  const getTierBadge = (tier) => {
    const t = (tier || '').toLowerCase();
    if (t.includes('vip')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40">
          <Award className="w-3 h-3 text-purple-600 dark:text-purple-400" />
          VIP Collector
        </span>
      );
    }
    if (t.includes('gold')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
          <Award className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          Gold Tier
        </span>
      );
    }
    if (t.includes('silver')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
          <Award className="w-3 h-3 text-slate-500 dark:text-slate-400" />
          Silver Tier
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
        New Collector
      </span>
    );
  };

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      if (activeTier !== 'All' && c.tier !== activeTier) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = c.name && c.name.toLowerCase().includes(q);
        const matchesEmail = c.email && c.email.toLowerCase().includes(q);
        const matchesCity = c.city && c.city.toLowerCase().includes(q);
        const matchesPhone = c.phone && c.phone.includes(q);
        return matchesName || matchesEmail || matchesCity || matchesPhone;
      }
      return true;
    });
  }, [customers, activeTier, searchQuery]);

  // Aggregate metrics
  const totalSpentAll = useMemo(() => {
    return customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
  }, [customers]);

  return (
    <div className="space-y-6 font-sans text-[#141824] dark:text-[#f8fafc]">
      
      {/* Top Banner & Header matching Phoenix customers.html */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e3e6ed] dark:border-[#2b3548]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#141824] dark:text-white tracking-tight">Customers Directory</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
              {customers.length} Verified Collectors
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">
            Browse registered streetwear collectors, purchase history, loyalty tiers & geographic spread.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCustomers}
            className="p-2.5 bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] hover:border-neutral-400 dark:hover:border-slate-600 text-neutral-700 dark:text-slate-200 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            title="Refresh Directory"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>
        </div>
      </div>

      {/* Metric Highlight Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 dark:text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Total Collectors</span>
            <Users className="w-4 h-4 text-[#3874ff]" />
          </div>
          <div className="text-2xl font-bold text-[#141824] dark:text-white">{customers.length}</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">100% Verified Streetwear Accounts</p>
        </div>

        <div className="p-4 bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 dark:text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Cumulative Lifetime Value</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-[#141824] dark:text-white font-mono">
            ₹{totalSpentAll.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-slate-400 mt-1">Average ₹{Math.round(totalSpentAll / (customers.length || 1))} / Collector</p>
        </div>

        <div className="p-4 bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 dark:text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Top Tier Dominance</span>
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-[#141824] dark:text-white">
            {customers.filter(c => c.tier?.includes('VIP')).length} VIPs
          </div>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 font-medium">Early drop access privileges active</p>
        </div>
      </div>

      {/* Main Container Card matching Phoenix style */}
      <div className="bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] rounded-2xl shadow-xs overflow-hidden">
        
        {/* Tier Tabs */}
        <div className="border-b border-[#e3e6ed] dark:border-[#2b3548] px-6 pt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none pb-[-1px]">
            {TIER_FILTERS.map(tier => {
              const isActive = activeTier === tier;
              const count = tier === 'All'
                ? customers.length
                : customers.filter(c => c.tier === tier).length;

              return (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'border-[#3874ff] text-[#3874ff]'
                      : 'border-transparent text-neutral-500 dark:text-slate-400 hover:text-neutral-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span>{tier}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' : 'bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-neutral-400 dark:text-slate-500 font-mono hidden md:block pb-2">
            REGION: <span className="text-neutral-700 dark:text-slate-300 font-bold">ALL BHARAT METROS</span>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fcfdfe] dark:bg-[#101522] border-b border-[#e3e6ed] dark:border-[#2b3548]">
          
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, city, or phone..."
              className="w-full bg-white dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl pl-10 pr-4 py-2 text-xs text-neutral-800 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#3874ff] focus:ring-1 focus:ring-[#3874ff] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-neutral-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-neutral-800 dark:text-slate-200">{filteredCustomers.length}</span> collectors
          </div>
        </div>

        {/* Customer Table matching Phoenix customers.html */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e3e6ed] dark:border-[#2b3548] bg-[#f8fafc] dark:bg-[#141824] text-neutral-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">City / Region</th>
                <th className="p-4 text-center">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Tier Badge</th>
                <th className="p-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f7] dark:divide-[#2b3548]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-12 text-center text-neutral-400 text-xs font-mono">
                    <Users className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
                    No customer accounts found matching your query.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr 
                    key={c.id}
                    onClick={() => setSelectedCustomer(c)}
                    className="hover:bg-[#f8faff] dark:hover:bg-[#182030] transition-colors cursor-pointer group"
                  >
                    {/* Avatar & Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"}
                          alt={c.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#e3e6ed] shadow-xs flex-shrink-0"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#141824] group-hover:text-[#3874ff] transition-colors block">
                            {c.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            ID: {c.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-xs text-neutral-700">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="hover:text-black">{c.email}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="p-4 text-xs text-neutral-600 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-neutral-400" />
                        <span>{c.phone}</span>
                      </div>
                    </td>

                    {/* City */}
                    <td className="p-4 text-xs text-neutral-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                        <span>{c.city}</span>
                      </div>
                    </td>

                    {/* Orders count */}
                    <td className="p-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold font-mono">
                        {c.ordersCount}
                      </span>
                    </td>

                    {/* Total spent (₹) */}
                    <td className="p-4 font-mono font-bold text-xs text-[#141824]">
                      ₹{c.totalSpent?.toLocaleString('en-IN')}.00
                    </td>

                    {/* Tier badge */}
                    <td className="p-4">
                      {getTierBadge(c.tier)}
                    </td>

                    {/* Joined date */}
                    <td className="p-4 text-xs text-neutral-500 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{c.joinedDate}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e3e6ed] bg-[#f8fafc] flex flex-wrap items-center justify-between text-xs text-neutral-500 font-medium">
          <div>
            Total <span className="font-bold text-neutral-800">{filteredCustomers.length}</span> profiles listed
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            SECURE DIRECTORY • THE BRAHMMAN VAULT
          </div>
        </div>

      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-[#141824] rounded-3xl max-w-lg w-full border border-neutral-200 dark:border-[#2b3548] shadow-2xl overflow-hidden font-sans">
            <div className="p-6 border-b border-[#e3e6ed] dark:border-[#2b3548] flex items-center justify-between bg-[#fcfdfe] dark:bg-[#182030]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-12 h-12 rounded-full object-cover border border-neutral-200 dark:border-slate-700 shadow-xs"
                />
                <div>
                  <h3 className="text-base font-bold text-[#141824] dark:text-white">{selectedCustomer.name}</h3>
                  <p className="text-xs text-neutral-500 dark:text-slate-400">{selectedCustomer.city}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-neutral-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-[#182030] rounded-xl border border-neutral-200 dark:border-[#2b3548]">
                <span className="font-semibold text-neutral-600 dark:text-slate-400">Membership Tier:</span>
                <div>{getTierBadge(selectedCustomer.tier)}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-neutral-50 dark:bg-[#182030] rounded-xl border border-neutral-200 dark:border-[#2b3548]">
                  <span className="text-neutral-500 dark:text-slate-400 block mb-1">Total Orders</span>
                  <span className="text-base font-bold text-neutral-900 dark:text-white font-mono">{selectedCustomer.ordersCount}</span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-[#182030] rounded-xl border border-neutral-200 dark:border-[#2b3548]">
                  <span className="text-neutral-500 dark:text-slate-400 block mb-1">Total Lifetime Spend</span>
                  <span className="text-base font-bold text-[#3874ff] font-mono">₹{selectedCustomer.totalSpent?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-[#2b3548]">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-neutral-400 dark:text-slate-500" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-neutral-400 dark:text-slate-500" />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-neutral-400 dark:text-slate-500" />
                  <span>Member Since {selectedCustomer.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#e3e6ed] dark:border-[#2b3548] bg-[#fcfdfe] dark:bg-[#182030] text-right">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-neutral-900 hover:bg-black dark:bg-[#3874ff] dark:hover:bg-[#2563eb] text-white rounded-xl text-xs font-bold transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
