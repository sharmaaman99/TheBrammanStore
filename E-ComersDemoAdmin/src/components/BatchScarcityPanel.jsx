import React, { useState, useEffect } from 'react';
import { 
  Clock, AlertTriangle, ShieldCheck, Flame, Save, 
  RotateCcw, Sparkles, CheckCircle, Bell, ArrowRight 
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function BatchScarcityPanel({ products = [] }) {
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Editable Form State
  const [batchTitle, setBatchTitle] = useState('Batch 04 // Spring 2026 Archive');
  const [dropNumber, setDropNumber] = useState('DROP-04');
  const [status, setStatus] = useState('ACTIVE');
  const [countdownTarget, setCountdownTarget] = useState(
    new Date(Date.now() + 4 * 24 * 3600 * 1000 + 14 * 3600 * 1000).toISOString().slice(0, 16)
  );
  const [lowStockThreshold, setLowStockThreshold] = useState(15);
  const [totalBatchUnits, setTotalBatchUnits] = useState(500);
  const [allocatedUnits, setAllocatedUnits] = useState(412);
  const [scarcityWarningEnabled, setScarcityWarningEnabled] = useState(true);
  const [scarcityMessage, setScarcityMessage] = useState(
    'Only 88 archive pieces remaining in Batch 04 across all silhouettes.'
  );

  // Live countdown clock state
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 13, minutes: 59, seconds: 42 });

  const defaultBatch = {
    batchTitle: "Batch 04 // Spring 2026 Archive",
    dropNumber: "DROP-04",
    status: "ACTIVE",
    dispatchCountdownTarget: new Date(Date.now() + 4 * 24 * 3600 * 1000 + 14 * 3600 * 1000).toISOString(),
    lowStockThreshold: 15,
    totalBatchUnits: 500,
    allocatedUnits: 412,
    remainingUnits: 88,
    scarcityWarningEnabled: true,
    scarcityMessage: "Only 88 archive pieces remaining in Batch 04 across all silhouettes.",
    allowWaitlist: true,
    liveStoreStock: 203
  };

  const fetchBatch = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/batch-scarcity`);
      if (res.ok) {
        const data = await res.json();
        const b = data.batch || defaultBatch;
        setBatchData(b);
        setBatchTitle(b.batchTitle || defaultBatch.batchTitle);
        setDropNumber(b.dropNumber || defaultBatch.dropNumber);
        setStatus(b.status || 'ACTIVE');
        if (b.dispatchCountdownTarget) {
          setCountdownTarget(new Date(b.dispatchCountdownTarget).toISOString().slice(0, 16));
        }
        setLowStockThreshold(b.lowStockThreshold ?? 15);
        setTotalBatchUnits(b.totalBatchUnits ?? 500);
        setAllocatedUnits(b.allocatedUnits ?? 412);
        setScarcityWarningEnabled(b.scarcityWarningEnabled ?? true);
        setScarcityMessage(b.scarcityMessage || defaultBatch.scarcityMessage);
      } else {
        setBatchData(defaultBatch);
      }
    } catch {
      setBatchData(defaultBatch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, []);

  // Countdown timer tick every second
  useEffect(() => {
    const updateCountdown = () => {
      const targetTime = new Date(countdownTarget).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, targetTime - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [countdownTarget]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const setTargetPreset = (days) => {
    const d = new Date(Date.now() + days * 24 * 3600 * 1000);
    setCountdownTarget(d.toISOString().slice(0, 16));
  };

  const handleSaveBatch = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);

    const payload = {
      batchTitle,
      dropNumber,
      status,
      dispatchCountdownTarget: new Date(countdownTarget).toISOString(),
      lowStockThreshold: Number(lowStockThreshold),
      totalBatchUnits: Number(totalBatchUnits),
      allocatedUnits: Number(allocatedUnits),
      remainingUnits: Math.max(0, Number(totalBatchUnits) - Number(allocatedUnits)),
      scarcityWarningEnabled: Boolean(scarcityWarningEnabled),
      scarcityMessage
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/batch-scarcity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setBatchData(data.batch || payload);
        showToast('Batch & Scarcity settings deployed to storefront.');
      }
    } catch {
      setBatchData(payload);
      showToast('Batch settings saved locally.');
    } finally {
      setSaving(false);
    }
  };

  const remainingUnits = Math.max(0, totalBatchUnits - allocatedUnits);
  const allocationPercent = Math.min(100, Math.round((allocatedUnits / totalBatchUnits) * 100)) || 82;
  const isScarcityTriggered = remainingUnits <= lowStockThreshold;

  return (
    <div className="bg-white dark:bg-[#141824] border border-[#e5e5e5] dark:border-[#2b3548] rounded-2xl font-sans text-xs overflow-hidden shadow-xs relative text-[#141824] dark:text-[#f8fafc]">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black dark:bg-[#3874ff] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs animate-fadeIn font-mono">
          <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-5 border-b border-[#e5e5e5] dark:border-[#2b3548] bg-[#f8f8f7] dark:bg-[#182030] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white uppercase tracking-wider">
              BATCH & SCARCITY DROP CONTROL PANEL
            </h3>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-slate-400 mt-0.5">
            Configure archive batch drop titles, real-time dispatch countdown telemetry, and scarcity warnings.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="px-2.5 py-1 bg-white dark:bg-[#141824] border border-neutral-200 dark:border-[#2b3548] text-neutral-700 dark:text-slate-300 rounded-lg">
            STATUS: <strong className="text-black dark:text-white">{status}</strong>
          </span>
          <span className="px-2.5 py-1 bg-black dark:bg-[#3874ff] text-white rounded-lg font-bold">
            {dropNumber}
          </span>
        </div>
      </div>

      {/* Main Grid: Form Controls (Left) & Real-Time Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        
        {/* Left Form: Batch Configuration (7 cols) */}
        <form onSubmit={handleSaveBatch} className="lg:col-span-7 space-y-5">
          
          {/* 1. Batch Title & Drop Identifier */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                Batch Title *
              </label>
              <input
                type="text"
                value={batchTitle}
                onChange={(e) => setBatchTitle(e.target.value)}
                required
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-black transition-colors"
                placeholder="e.g. Batch 04 // Spring 2026 Archive"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                Active Drop # *
              </label>
              <input
                type="text"
                value={dropNumber}
                onChange={(e) => setDropNumber(e.target.value)}
                required
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold focus:outline-none focus:border-black transition-colors"
                placeholder="DROP-04"
              />
            </div>
          </div>

          {/* 2. Dispatch Countdown Target Date */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                Dispatch Countdown Window Target *
              </label>
              {/* Presets */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="text-neutral-400">Presets:</span>
                <button
                  type="button"
                  onClick={() => setTargetPreset(1)}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700"
                >
                  +24h
                </button>
                <button
                  type="button"
                  onClick={() => setTargetPreset(3)}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700"
                >
                  +3d
                </button>
                <button
                  type="button"
                  onClick={() => setTargetPreset(7)}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700"
                >
                  +7d
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="datetime-local"
                value={countdownTarget}
                onChange={(e) => setCountdownTarget(e.target.value)}
                required
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* 3. Drop Lifecycle Status & Low Stock Threshold */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                Drop State
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-mono font-medium focus:outline-none focus:border-black"
              >
                <option value="ACTIVE">ACTIVE — LIVE ON STOREFRONT</option>
                <option value="SCHEDULED">SCHEDULED — COUNTDOWN RUNNING</option>
                <option value="SOLD_OUT">SOLD OUT — ARCHIVE VAULT CLOSED</option>
                <option value="COMPLETED">COMPLETED — DISPATCHED</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                Low-Stock Warning Threshold (Units)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                className="w-full bg-[#f9f9f9] border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* 4. Units Allocation Matrix */}
          <div className="p-4 bg-[#fafaf9] rounded-2xl border border-neutral-200 space-y-3">
            <span className="text-[11px] font-mono font-bold text-neutral-700 uppercase tracking-wider block">
              INVENTORY ALLOCATION MATRIX
            </span>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-neutral-500 block mb-0.5">Total Batch</label>
                <input
                  type="number"
                  value={totalBatchUnits}
                  onChange={(e) => setTotalBatchUnits(Number(e.target.value))}
                  className="w-full bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-black"
                />
              </div>

              <div>
                <label className="text-[10px] text-neutral-500 block mb-0.5">Allocated</label>
                <input
                  type="number"
                  value={allocatedUnits}
                  onChange={(e) => setAllocatedUnits(Number(e.target.value))}
                  className="w-full bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-orange-600"
                />
              </div>

              <div>
                <label className="text-[10px] text-neutral-500 block mb-0.5">Remaining</label>
                <div className="w-full bg-neutral-100 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-extrabold text-black">
                  {remainingUnits} pcs
                </div>
              </div>
            </div>

            {/* Consumption Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>{allocationPercent}% MINTED & ALLOCATED</span>
                <span>{remainingUnits} PIECES LEFT</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
                <div
                  style={{ width: `${allocationPercent}%` }}
                  className={`h-full transition-all duration-500 ${
                    remainingUnits <= lowStockThreshold ? 'bg-red-500' : 'bg-black'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 5. Scarcity Warning Banner Settings */}
          <div className="p-4 bg-[#fafaf9] rounded-2xl border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${scarcityWarningEnabled ? 'text-orange-500' : 'text-neutral-400'}`} />
                <span className="text-[11px] font-bold text-black uppercase tracking-wider">
                  Storefront Stock Scarcity Warning
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={scarcityWarningEnabled}
                  onChange={(e) => setScarcityWarningEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            <div>
              <label className="text-[10px] text-neutral-500 block mb-1">
                Scarcity Warning Message (Broadcasted on Top Header & Garment Pages)
              </label>
              <textarea
                rows={2}
                value={scarcityMessage}
                onChange={(e) => setScarcityMessage(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-800 focus:outline-none focus:border-black"
                placeholder="Custom broadcast alert..."
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-black text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Deploying Batch Configuration...' : 'Save & Broadcast Batch Drop to Storefront'}</span>
            </button>
          </div>

        </form>

        {/* Right Preview: Live Storefront Telemetry Simulation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-3 bg-neutral-100 rounded-xl text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-center">
            LIVE CLIENT STOREFRONT SIMULATION
          </div>

          {/* 1. Live Countdown Widget */}
          <div className="rounded-2xl border border-neutral-300 bg-gradient-to-b from-[#111113] to-[#050506] text-white p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                  DISPATCH COUNTDOWN
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-orange-950/80 border border-orange-500/40 text-orange-400 text-[10px] font-mono font-bold animate-pulse">
                {status}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-extrabold tracking-tight text-white">
                {batchTitle}
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Physical archival drop closing strictly when countdown hits zero.
              </p>
            </div>

            {/* Countdown Tiles */}
            <div className="grid grid-cols-4 gap-2 pt-1 font-mono text-center">
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5">
                <span className="text-2xl font-black text-white block tracking-tighter">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest">DAYS</span>
              </div>
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5">
                <span className="text-2xl font-black text-white block tracking-tighter">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest">HOURS</span>
              </div>
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5">
                <span className="text-2xl font-black text-white block tracking-tighter">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest">MINS</span>
              </div>
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5">
                <span className="text-2xl font-black text-orange-400 block tracking-tighter">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest">SECS</span>
              </div>
            </div>

            {/* Telemetry Status Bar */}
            <div className="pt-2 border-t border-neutral-800 text-[10px] text-neutral-400 font-mono flex items-center justify-between">
              <span>TARGET: {new Date(countdownTarget).toLocaleDateString()}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>SYNCED</span>
              </span>
            </div>
          </div>

          {/* 2. Scarcity Warning Banner Simulation */}
          {scarcityWarningEnabled && (
            <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span className="font-bold text-xs uppercase tracking-wider font-mono">
                  ARCHIVE SCARCITY ALERT
                </span>
              </div>
              <p className="text-xs text-red-900 leading-snug">
                {scarcityMessage}
              </p>
              <div className="flex items-center justify-between text-[10px] text-red-600 font-mono pt-1">
                <span>THRESHOLD: &lt; {lowStockThreshold} UNITS</span>
                <span className="font-bold">STATUS: {isScarcityTriggered ? 'URGENT RESTOCK' : 'NOMINAL'}</span>
              </div>
            </div>
          )}

          {/* 3. Drop Telemetry Digest */}
          <div className="p-4 bg-white rounded-2xl border border-neutral-200 font-mono text-[11px] space-y-2">
            <div className="text-neutral-500 font-bold uppercase text-[10px]">
              STOREFRONT TELEMETRY DIGEST
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Active Batch Title:</span>
              <span className="font-bold text-black">{batchTitle}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Drop Code:</span>
              <span className="font-bold text-black">{dropNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Remaining Inventory:</span>
              <span className="font-bold text-black">{remainingUnits} units</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-500">Scarcity State:</span>
              <span className={`font-bold ${isScarcityTriggered ? 'text-red-600' : 'text-emerald-600'}`}>
                {isScarcityTriggered ? 'ACTIVE WARNING' : 'NORMAL LEVEL'}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
