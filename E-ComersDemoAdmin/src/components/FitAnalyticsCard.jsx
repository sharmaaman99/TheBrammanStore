import React, { useState, useEffect } from 'react';
import { Ruler, Sparkles, TrendingUp, CheckCircle, RefreshCw, Plus, Users, Award } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function FitAnalyticsCard({ onSelectProduct }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingSize, setLoggingSize] = useState(false);
  const [selectedSizeToLog, setSelectedSizeToLog] = useState('L');
  const [inputHeight, setInputHeight] = useState('180 cm');
  const [inputWeight, setInputWeight] = useState('80 kg');
  const [inputPreference, setInputPreference] = useState('Signature Boxy Drape');
  const [toastMessage, setToastMessage] = useState('');

  // Default fallback trends matching specification: S: 10%, M: 25%, L: 45%, XL: 15%, XXL: 5%
  const defaultAnalytics = {
    trends: { S: 10, M: 25, L: 45, XL: 15, XXL: 5 },
    counts: { S: 184, M: 460, L: 829, XL: 276, XXL: 93 },
    totalSubmissions: 1842,
    dominantSize: 'L',
    sizeDistribution: [
      { size: 'S', percentage: 10, count: 184, label: 'Small (Drop Hem)', chestRange: '38-40 in', avgHeight: '165-172 cm' },
      { size: 'M', percentage: 25, count: 460, label: 'Medium (Relaxed)', chestRange: '41-43 in', avgHeight: '172-178 cm' },
      { size: 'L', percentage: 45, count: 829, label: 'Large (Signature Boxy)', chestRange: '44-46 in', avgHeight: '178-185 cm' },
      { size: 'XL', percentage: 15, count: 276, label: 'X-Large (Architectural)', chestRange: '47-49 in', avgHeight: '185-190 cm' },
      { size: 'XXL', percentage: 5, count: 93, label: '2X-Large (Maximalist)', chestRange: '50-52 in', avgHeight: '190+ cm' }
    ]
  };

  const fetchFitData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/fit-analytics`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      } else {
        setAnalytics(defaultAnalytics);
      }
    } catch {
      setAnalytics(defaultAnalytics);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFitData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleLogSize = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/fit-analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          size: selectedSizeToLog,
          height: inputHeight,
          weight: inputWeight,
          preferredFit: inputPreference,
          productHandle: 'kundalini'
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data.analytics || data);
        showToast(`Size ${selectedSizeToLog} telemetry recorded successfully.`);
        setLoggingSize(false);
      }
    } catch {
      showToast(`Size ${selectedSizeToLog} simulated.`);
      setLoggingSize(false);
    }
  };

  const currentData = analytics || defaultAnalytics;
  const trends = currentData.trends || defaultAnalytics.trends;
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="p-5 bg-[#fbfbfb] rounded-2xl border border-neutral-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-3 right-3 z-30 bg-black text-white text-[11px] px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-fadeIn">
          <CheckCircle className="w-3 h-3 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center">
            <Ruler className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-black flex items-center gap-1.5">
              <span>Customer Sizing & Fit Analytics</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold border border-emerald-200">
                LIVE TELEMETRY
              </span>
            </h4>
            <p className="text-[10px] text-neutral-400 font-mono">
              Aggregate fit selection across {currentData.totalSubmissions?.toLocaleString() || '1,842'} collector orders
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLoggingSize(!loggingSize)}
            className="px-2.5 py-1 text-[11px] bg-white border border-neutral-200 hover:border-black rounded-lg text-neutral-700 font-medium transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Log Fit</span>
          </button>
          <button
            onClick={fetchFitData}
            title="Refresh Fit Telemetry"
            className="p-1 text-neutral-400 hover:text-black transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-black' : ''}`} />
          </button>
        </div>
      </div>

      {/* Sizing Distribution Breakdown Bar */}
      <div className="my-4">
        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-2 font-mono">
          <span>SIZING TRENDS RATIO</span>
          <span className="text-black font-semibold">
            DOMINANT: SIZE {currentData.dominantSize || 'L'} ({trends[currentData.dominantSize || 'L'] || 45}%)
          </span>
        </div>

        {/* Multi-segment stacked progress bar */}
        <div className="w-full h-3 rounded-full bg-neutral-100 overflow-hidden flex border border-neutral-200 shadow-inner">
          <div
            style={{ width: `${trends.S}%` }}
            className="bg-neutral-300 hover:opacity-80 transition-all cursor-pointer relative group"
            title={`Size S: ${trends.S}%`}
          />
          <div
            style={{ width: `${trends.M}%` }}
            className="bg-neutral-400 hover:opacity-80 transition-all cursor-pointer relative group"
            title={`Size M: ${trends.M}%`}
          />
          <div
            style={{ width: `${trends.L}%` }}
            className="bg-black hover:opacity-90 transition-all cursor-pointer relative group"
            title={`Size L (Dominant): ${trends.L}%`}
          />
          <div
            style={{ width: `${trends.XL}%` }}
            className="bg-orange-500 hover:opacity-80 transition-all cursor-pointer relative group"
            title={`Size XL: ${trends.XL}%`}
          />
          <div
            style={{ width: `${trends.XXL}%` }}
            className="bg-neutral-600 hover:opacity-80 transition-all cursor-pointer relative group"
            title={`Size XXL: ${trends.XXL}%`}
          />
        </div>

        {/* Legend Pills with Exact Percentages */}
        <div className="grid grid-cols-5 gap-2 mt-3 pt-1">
          {sizes.map((s) => {
            const isDominant = s === (currentData.dominantSize || 'L');
            const pct = trends[s] ?? 0;
            const count = currentData.counts?.[s] || Math.round((pct / 100) * 1842);

            return (
              <div
                key={s}
                className={`p-2 rounded-xl border text-center transition-all ${
                  isDominant
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-white text-neutral-800 border-neutral-200/80 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs font-bold tracking-tight font-mono">{s}</span>
                  {isDominant && <Award className="w-2.5 h-2.5 text-amber-400" />}
                </div>
                <div className={`text-base font-extrabold tracking-tight mt-0.5 ${isDominant ? 'text-amber-400' : 'text-black'}`}>
                  {pct}%
                </div>
                <div className={`text-[9px] font-mono ${isDominant ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  {count} units
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sizing Detail Metrics & Silhouette Guidance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] font-mono border-t border-neutral-100">
        <div className="p-2.5 rounded-xl bg-white border border-neutral-100 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-[10px]">
            <span>STREETWEAR SILHOUETTE PREFERENCE</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>
          <div className="text-neutral-800 font-semibold text-xs">
            Signature Boxy Drape (58%)
          </div>
          <p className="text-[10px] text-neutral-500 font-sans leading-tight">
            Drop shoulder with extended chest room preferred by 45% choosing Size L.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-white border border-neutral-100 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-[10px]">
            <span>INVENTORY RECOMMENDATION</span>
            <TrendingUp className="w-3 h-3 text-emerald-500" />
          </div>
          <div className="text-neutral-800 font-semibold text-xs">
            Fabric Weight: Allocate 45% To Size L
          </div>
          <p className="text-[10px] text-neutral-500 font-sans leading-tight">
            Tirupur 260 GSM loopknit rolls should follow S:10 / M:25 / L:45 / XL:15 / XXL:5.
          </p>
        </div>
      </div>

      {/* Quick Log Modal Overlay */}
      {loggingSize && (
        <form
          onSubmit={handleLogSize}
          className="mt-3 p-3 bg-white rounded-xl border border-neutral-300 shadow-sm animate-fadeIn space-y-2 text-xs"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-black uppercase text-[11px]">Log Customer Size Sample</span>
            <button
              type="button"
              onClick={() => setLoggingSize(false)}
              className="text-neutral-400 hover:text-black text-xs"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="text-[10px] text-neutral-500 block">Chosen Size</label>
              <select
                value={selectedSizeToLog}
                onChange={(e) => setSelectedSizeToLog(e.target.value)}
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded p-1 text-xs font-mono font-bold"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-neutral-500 block">Height</label>
              <input
                type="text"
                value={inputHeight}
                onChange={(e) => setInputHeight(e.target.value)}
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded p-1 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] text-neutral-500 block">Weight</label>
              <input
                type="text"
                value={inputWeight}
                onChange={(e) => setInputWeight(e.target.value)}
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded p-1 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] text-neutral-500 block">Fit Style</label>
              <select
                value={inputPreference}
                onChange={(e) => setInputPreference(e.target.value)}
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded p-1 text-[11px]"
              >
                <option value="Signature Boxy Drape">Signature Boxy</option>
                <option value="Standard Relaxed">Standard Relaxed</option>
                <option value="Tailored Fitted">Tailored Fitted</option>
                <option value="Maximalist Ultra">Maximalist Ultra</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setLoggingSize(false)}
              className="px-2.5 py-1 text-xs text-neutral-500 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-black text-white rounded text-xs font-semibold hover:bg-neutral-800"
            >
              Commit Size Telemetry
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
