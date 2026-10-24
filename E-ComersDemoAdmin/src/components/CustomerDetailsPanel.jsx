import React, { useState } from 'react';
import { UserCheck, Mail, MapPin, Phone, Package, Calendar, Award, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CustomerDetailsPanel({ onSelectTab }) {
  const [selectedCustomerId, setSelectedCustomerId] = useState('cust-01');

  const customers = [
    {
      id: 'cust-01',
      name: 'Arjun Verma',
      email: 'arjun.verma@example.com',
      phone: '+91 98450 12894',
      city: 'Bengaluru, Karnataka',
      tier: 'COLLECTOR CLUB VIP',
      totalSpent: '₹14,400',
      totalOrders: 8,
      sizingProfile: {
        dominantSize: 'L',
        chest: '44 in',
        height: '182 cm',
        preference: 'Signature Boxy Drape (260 GSM)'
      },
      recentOrders: [
        { id: 'BRH-8821', title: 'KUNDALINI / कुण्डलिनी — OVERSIZED T-SHIRT', size: 'L', tracking: 'BD-90418294IN', status: 'DISPATCHED', date: '24 Oct 2026' },
        { id: 'BRH-7712', title: 'TAT TVAM ASI — OVERSIZED T-SHIRT', size: 'L', tracking: 'BD-88421092IN', status: 'DELIVERED', date: '12 Sep 2026' }
      ]
    },
    {
      id: 'cust-02',
      name: 'Meera Nair',
      email: 'meera.nair@example.com',
      phone: '+91 98201 54932',
      city: 'Mumbai, Maharashtra',
      tier: 'FOUNDING PATRON',
      totalSpent: '₹18,000',
      totalOrders: 10,
      sizingProfile: {
        dominantSize: 'M',
        chest: '42 in',
        height: '174 cm',
        preference: 'Relaxed Drop Hem (260-320 GSM)'
      },
      recentOrders: [
        { id: 'BRH-9104', title: 'TAT TVAM ASI — OVERSIZED T-SHIRT', size: 'M', tracking: 'BD-91823901IN', status: 'PROCESSING', date: '24 Oct 2026' },
        { id: 'BRH-8002', title: 'INDRA / इंद्र — OVERSIZED T-SHIRT', size: 'M', tracking: 'BD-77192301IN', status: 'DELIVERED', date: '01 Oct 2026' }
      ]
    }
  ];

  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Customer Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {customers.map(c => (
          <div
            key={c.id}
            onClick={() => setSelectedCustomerId(c.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedCustomerId === c.id
                ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500 shadow-xs'
                : 'bg-white dark:bg-[#141824] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{c.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{c.city}</p>
                </div>
              </div>
              <span className="badge-phoenix badge-phoenix-primary text-[9px]">
                {c.tier}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#141824] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
              {currentCustomer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {currentCustomer.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-blue-500" />
              </div>
              <span className="badge-phoenix badge-phoenix-warning text-[9px] mt-1">
                {currentCustomer.tier}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-mono">{currentCustomer.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{currentCustomer.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{currentCustomer.city}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Spend</span>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                {currentCustomer.totalSpent}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Orders</span>
              <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                {currentCustomer.totalOrders} Dispatches
              </p>
            </div>
          </div>
        </div>

        {/* Sizing Profile & Tailoring Spec */}
        <div className="bg-white dark:bg-[#141824] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Tailoring & Measurement Spec
            </h4>
            <span className="badge-phoenix badge-phoenix-success text-[9px]">
              VERIFIED FIT
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dominant Silhouette</span>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                Size {currentCustomer.sizingProfile.dominantSize}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Recorded Chest</span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                {currentCustomer.sizingProfile.chest}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Height Reference</span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                {currentCustomer.sizingProfile.height}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Garment Drape Note</span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-1">
                {currentCustomer.sizingProfile.preference}
              </p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white dark:bg-[#141824] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Recent Dispatches
            </h4>
            {onSelectTab && (
              <button
                onClick={() => onSelectTab('orders')}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                All Orders <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="mt-4 space-y-3">
            {currentCustomer.recentOrders.map((ord, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">{ord.id}</span>
                  <span className={`badge-phoenix ${ord.status === 'DELIVERED' ? 'badge-phoenix-success' : 'badge-phoenix-primary'} text-[9px]`}>
                    {ord.status}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 truncate">
                  {ord.title} ({ord.size})
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Tracking: {ord.tracking}</span>
                  <span>{ord.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
