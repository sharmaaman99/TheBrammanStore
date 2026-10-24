import React, { useState } from 'react';
import { Settings, Save, Check, Shield, Truck, Sparkles, Database } from 'lucide-react';

export default function StoreSettingsPanel() {
  const [settings, setSettings] = useState({
    storeName: 'The Brahmman Store',
    gstin: '29AAFCB1234F1Z8',
    bluedartClientCode: 'BD-AIR-BLR-0941',
    bluedartApiEndpoint: 'https://api.bluedart.com/v1/tracking',
    dispatchOrigin: 'Tirupur Knit Mills Cluster, Tamil Nadu 641602',
    scarcityThreshold: 15,
    autoRestockAlert: true
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-[#141824] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-4xl mx-auto shadow-xs animate-fadeIn">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Store & Fulfillment Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage BlueDart Air logistics, Tirupur mills dispatch, and fulfillment settings
            </p>
          </div>
        </div>
        {saved && (
          <div className="badge-phoenix badge-phoenix-success text-[10px] px-3 py-1 flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-3.5 h-3.5" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="mt-6 space-y-6">
        
        {/* Section 1: BlueDart Air Express Logistics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>BlueDart Air Express Integration</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                BlueDart Client Code / Dispatch Token
              </label>
              <input
                type="text"
                value={settings.bluedartClientCode}
                onChange={(e) => setSettings({ ...settings, bluedartClientCode: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Dispatch Origin Hub
              </label>
              <input
                type="text"
                value={settings.dispatchOrigin}
                onChange={(e) => setSettings({ ...settings, dispatchOrigin: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Store Identity & Tax */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Taxation & Brand Identity</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Storefront Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                GSTIN (Bharat Commercial Tax)
              </label>
              <input
                type="text"
                value={settings.gstin}
                onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Inventory Alerts */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Inventory Alert Threshold</span>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Scarcity Alert Minimum Units
            </label>
            <input
              type="number"
              value={settings.scarcityThreshold}
              onChange={(e) => setSettings({ ...settings, scarcityThreshold: Number(e.target.value) })}
              className="w-full sm:w-1/2 px-3.5 py-2 rounded-xl text-xs font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
