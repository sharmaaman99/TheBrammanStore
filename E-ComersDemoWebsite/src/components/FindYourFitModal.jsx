import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Sparkles, Check, ChevronRight, Info } from 'lucide-react';

// Sizing specifications for Brahmman luxury heavyweight streetwear tees
const SIZE_SPECS = {
  S: {
    chestIn: 44,
    chestCm: 112,
    chestEase: '+4" Clean Street Fit',
    lengthIn: 29,
    lengthCm: 74,
    lengthDrop: 'Hits at high-hip / waistband',
    shoulderIn: 21,
    shoulderCm: 53,
    shoulderDrape: '1.5" gentle drop shoulder',
    fitDrapeLabel: 'Structured Street Fit',
    bodyWeightRange: '45 - 60 kg',
    bodyChestRange: '34" - 37"',
    matchScore: 97
  },
  M: {
    chestIn: 46,
    chestCm: 117,
    chestEase: '+5" Relaxed Street Drape',
    lengthIn: 30,
    lengthCm: 76,
    lengthDrop: 'Hits slightly below waistband',
    shoulderIn: 22,
    shoulderCm: 56,
    shoulderDrape: '2.0" signature drop seam',
    fitDrapeLabel: 'Classic Streetwear Cut',
    bodyWeightRange: '58 - 72 kg',
    bodyChestRange: '37" - 40"',
    matchScore: 98
  },
  L: {
    chestIn: 48,
    chestCm: 122,
    chestEase: '+6" Signature Boxy Room',
    lengthIn: 31,
    lengthCm: 79,
    lengthDrop: 'Hits mid-hip with clean stack',
    shoulderIn: 23,
    shoulderCm: 58,
    shoulderDrape: '2.5" relaxed dropped seam',
    fitDrapeLabel: 'Boxy Streetwear Drape',
    bodyWeightRange: '70 - 85 kg',
    bodyChestRange: '40" - 43"',
    matchScore: 99
  },
  XL: {
    chestIn: 50,
    chestCm: 127,
    chestEase: '+7" Bold Heavyweight Volume',
    lengthIn: 32,
    lengthCm: 81,
    lengthDrop: 'Extended streetwear drop drape',
    shoulderIn: 24,
    shoulderCm: 61,
    shoulderDrape: '3.0" heavy drop shoulder',
    fitDrapeLabel: 'Heavy Oversized Stance',
    bodyWeightRange: '82 - 98 kg',
    bodyChestRange: '43" - 46"',
    matchScore: 98
  },
  XXL: {
    chestIn: 52,
    chestCm: 132,
    chestEase: '+8" Maximum Archive Presence',
    lengthIn: 33,
    lengthCm: 84,
    lengthDrop: 'Statement runway architectural fall',
    shoulderIn: 25,
    shoulderCm: 64,
    shoulderDrape: '3.5" dramatic shoulder slope',
    fitDrapeLabel: 'Voluminous Archive Drape',
    bodyWeightRange: '95 - 120 kg',
    bodyChestRange: '46" - 50"',
    matchScore: 96
  }
};

const SIZES_ORDER = ['S', 'M', 'L', 'XL', 'XXL'];

// Convert centimeters to feet and inches format: e.g. 178cm -> 5'10"
const cmToFeetInches = (cm) => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
};

// Convert kilograms to pounds
const kgToLbs = (kg) => Math.round(kg * 2.20462);

export default function FindYourFitModal({
  isOpen,
  onClose,
  currentSize = 'L',
  onSelectSize,
  productTitle = 'Garment'
}) {
  const heightSliderId = useId();
  const weightSliderId = useId();

  // State
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(74);
  const [fitPreference, setFitPreference] = useState('boxy'); // 'slim' | 'boxy' | 'oversized'
  const [unitMode, setUnitMode] = useState('metric'); // 'metric' (cm/kg) | 'imperial' (ft/lbs)

  if (!isOpen) return null;

  // Intelligent Size Engine Calculation
  const calculateRecommendation = () => {
    let baseIndex = 2; // Default L

    if (heightCm < 165) {
      if (weightKg < 55) baseIndex = 0;
      else if (weightKg < 70) baseIndex = 1;
      else if (weightKg < 85) baseIndex = 2;
      else baseIndex = 3;
    } else if (heightCm < 175) {
      if (weightKg < 60) baseIndex = 0;
      else if (weightKg < 74) baseIndex = 1;
      else if (weightKg < 88) baseIndex = 2;
      else if (weightKg < 100) baseIndex = 3;
      else baseIndex = 4;
    } else if (heightCm < 185) {
      if (weightKg < 65) baseIndex = 1;
      else if (weightKg < 82) baseIndex = 2;
      else if (weightKg < 96) baseIndex = 3;
      else baseIndex = 4;
    } else {
      // >= 185 cm
      if (weightKg < 72) baseIndex = 1;
      else if (weightKg < 88) baseIndex = 2;
      else if (weightKg < 105) baseIndex = 3;
      else baseIndex = 4;
    }

    // Apply fit preference
    let recommendedIndex = baseIndex;
    if (fitPreference === 'slim') {
      recommendedIndex = Math.max(0, baseIndex - 1);
    } else if (fitPreference === 'oversized') {
      recommendedIndex = Math.min(4, baseIndex + 1);
    }

    return SIZES_ORDER[recommendedIndex];
  };

  const recommendedSize = calculateRecommendation();
  const currentSpec = SIZE_SPECS[recommendedSize] || SIZE_SPECS.L;

  const handleApply = () => {
    if (onSelectSize) {
      onSelectSize(recommendedSize);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white border border-[#222222]/15 shadow-2xl z-10 max-h-[92vh] overflow-y-auto rounded-none text-neutral-900"
        >
          {/* Top Bar Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-white border-b border-[#e5e5e5]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-black text-white flex items-center justify-center text-xs font-mono font-bold">
                <Ruler className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest font-black text-black">
                  FIND YOUR FIT // SMART FIT ENGINE
                </h3>
                <p className="font-mono text-[10px] text-neutral-500">
                  Custom AI drape engine calibrated for 260 GSM Boxy Streetwear
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Unit Toggle */}
              <button
                type="button"
                onClick={() => setUnitMode(unitMode === 'metric' ? 'imperial' : 'metric')}
                className="font-mono text-[10px] font-bold px-2 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 transition-colors uppercase"
              >
                {unitMode === 'metric' ? 'CM / KG' : 'FT / LBS'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                aria-label="Close fit assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6 font-mono">
            {/* 1. Height & Weight Sliders */}
            <div className="space-y-5 bg-[#fafaf9] p-4 sm:p-5 border border-[#e5e5e5]">
              {/* Height Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor={heightSliderId} className="font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>1. YOUR HEIGHT</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="bg-black text-white px-2 py-0.5 text-xs font-bold font-mono">
                      {heightCm} cm
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      ({cmToFeetInches(heightCm)})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setHeightCm((prev) => Math.max(150, prev - 1))}
                    className="w-7 h-7 flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold"
                  >
                    -
                  </button>
                  <input
                    id={heightSliderId}
                    type="range"
                    min="150"
                    max="200"
                    step="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-300 rounded-none appearance-none cursor-pointer accent-black"
                  />
                  <button
                    type="button"
                    onClick={() => setHeightCm((prev) => Math.min(200, prev + 1))}
                    className="w-7 h-7 flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>150 cm (4'11")</span>
                  <span>175 cm (5'9")</span>
                  <span>200 cm (6'7")</span>
                </div>
              </div>

              {/* Weight Slider */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor={weightSliderId} className="font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>2. YOUR BODY WEIGHT</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="bg-black text-white px-2 py-0.5 text-xs font-bold font-mono">
                      {weightKg} kg
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      ({kgToLbs(weightKg)} lbs)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setWeightKg((prev) => Math.max(45, prev - 1))}
                    className="w-7 h-7 flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold"
                  >
                    -
                  </button>
                  <input
                    id={weightSliderId}
                    type="range"
                    min="45"
                    max="120"
                    step="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-300 rounded-none appearance-none cursor-pointer accent-black"
                  />
                  <button
                    type="button"
                    onClick={() => setWeightKg((prev) => Math.min(120, prev + 1))}
                    className="w-7 h-7 flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>45 kg (99 lbs)</span>
                  <span>80 kg (176 lbs)</span>
                  <span>120 kg (265 lbs)</span>
                </div>
              </div>
            </div>

            {/* 2. Fit Preference Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-800">
                <span>3. SILHOUETTE DRAPE PREFERENCE</span>
                <span className="text-[10px] font-normal text-neutral-500">How you like the cut to sit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Slim Fit */}
                <button
                  type="button"
                  onClick={() => setFitPreference('slim')}
                  className={`p-3 text-left border transition-all relative ${
                    fitPreference === 'slim'
                      ? 'border-black bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold">Slim Fit</div>
                  <div className={`text-[10px] mt-1 leading-snug ${fitPreference === 'slim' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Tailored torso, less excess fabric.
                  </div>
                  {fitPreference === 'slim' && (
                    <div className="absolute top-2 right-2 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>

                {/* Boxy Streetwear */}
                <button
                  type="button"
                  onClick={() => setFitPreference('boxy')}
                  className={`p-3 text-left border transition-all relative ${
                    fitPreference === 'boxy'
                      ? 'border-black bg-neutral-900 text-white shadow-md ring-1 ring-black'
                      : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold">Boxy Streetwear</span>
                  </div>
                  <span className="inline-block mt-0.5 text-[9px] bg-amber-400 text-black px-1.5 py-0.2 font-bold tracking-wider uppercase">
                    RECOMMENDED
                  </span>
                  <div className={`text-[10px] mt-1 leading-snug ${fitPreference === 'boxy' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Signature drop shoulder & boxy drape.
                  </div>
                  {fitPreference === 'boxy' && (
                    <div className="absolute top-2 right-2 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>

                {/* Heavy Oversized */}
                <button
                  type="button"
                  onClick={() => setFitPreference('oversized')}
                  className={`p-3 text-left border transition-all relative ${
                    fitPreference === 'oversized'
                      ? 'border-black bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold">Heavy Oversized</div>
                  <div className={`text-[10px] mt-1 leading-snug ${fitPreference === 'oversized' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Exaggerated runway drape & sleeve length.
                  </div>
                  {fitPreference === 'oversized' && (
                    <div className="absolute top-2 right-2 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* 3. Intelligent Size Recommendation Output Box */}
            <div className="border-2 border-black bg-black text-white p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                      RECOMMENDED SILHOUETTE
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black tracking-tight mt-0.5 text-white">
                    SIZE {recommendedSize} // {currentSpec.fitDrapeLabel}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 font-bold">
                    ✓ {currentSpec.matchScore}% FIT MATCH
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Calculated for {heightCm}cm / {weightKg}kg
                  </span>
                </div>
              </div>

              {/* Garment Measurements vs Drape Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Chest */}
                <div className="bg-neutral-900/90 p-3 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">CHEST CIRCUMFERENCE</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {currentSpec.chestIn}" <span className="text-xs text-neutral-400">({currentSpec.chestCm} cm)</span>
                  </div>
                  <div className="text-[10px] text-amber-300 mt-1">
                    {currentSpec.chestEase}
                  </div>
                </div>

                {/* Garment Length */}
                <div className="bg-neutral-900/90 p-3 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">GARMENT LENGTH</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {currentSpec.lengthIn}" <span className="text-xs text-neutral-400">({currentSpec.lengthCm} cm)</span>
                  </div>
                  <div className="text-[10px] text-neutral-300 mt-1">
                    {currentSpec.lengthDrop}
                  </div>
                </div>

                {/* Shoulder Drop */}
                <div className="bg-neutral-900/90 p-3 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">SHOULDER DROP</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {currentSpec.shoulderIn}" <span className="text-xs text-neutral-400">({currentSpec.shoulderCm} cm)</span>
                  </div>
                  <div className="text-[10px] text-neutral-300 mt-1">
                    {currentSpec.shoulderDrape}
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="flex items-start gap-2 text-[10px] text-neutral-400 pt-1">
                <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>
                  Our 260 GSM combed cotton has zero shrink guarantee post-enzyme wash. Select your recommended size for the intentional luxury street lookbook silhouette.
                </span>
              </div>
            </div>

            {/* 4. Complete Size Comparison Matrix */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                FULL SIZING ARCHIVE MATRIX
              </div>
              <div className="border border-neutral-200 overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr className="bg-neutral-100 border-b border-neutral-200 text-neutral-600 text-[10px]">
                      <th className="py-2 px-2 text-left">SIZE</th>
                      <th className="py-2 px-2">CHEST</th>
                      <th className="py-2 px-2">LENGTH</th>
                      <th className="py-2 px-2">SHOULDER</th>
                      <th className="py-2 px-2">EST. WEIGHT</th>
                      <th className="py-2 px-2 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZES_ORDER.map((s) => {
                      const isRec = s === recommendedSize;
                      const spec = SIZE_SPECS[s];
                      return (
                        <tr
                          key={s}
                          className={`border-b border-neutral-100 transition-colors ${
                            isRec ? 'bg-amber-50/70 font-bold text-black' : 'text-neutral-700'
                          }`}
                        >
                          <td className="py-2.5 px-2 text-left font-mono">
                            <span className="flex items-center gap-1.5">
                              {s}
                              {isRec && (
                                <span className="bg-black text-white text-[9px] px-1.5 py-0.2 tracking-wider">
                                  BEST FIT
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="py-2.5 px-2">{spec.chestIn}"</td>
                          <td className="py-2.5 px-2">{spec.lengthIn}"</td>
                          <td className="py-2.5 px-2">{spec.shoulderIn}"</td>
                          <td className="py-2.5 px-2 text-neutral-500 text-[11px]">{spec.bodyWeightRange}</td>
                          <td className="py-2.5 px-2 text-right">
                            {isRec ? (
                              <span className="text-emerald-700 text-[11px] font-bold">Recommended</span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  if (onSelectSize) onSelectSize(s);
                                  if (onClose) onClose();
                                }}
                                className="text-neutral-400 hover:text-black hover:underline text-[10px]"
                              >
                                Select {s}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. Select Size & Apply CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-4 bg-black text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99]"
              >
                <span>SELECT SIZE {recommendedSize} & APPLY TO PRODUCT</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="sm:w-32 py-4 bg-white border border-neutral-300 text-neutral-700 font-mono font-semibold text-xs uppercase tracking-wider hover:bg-neutral-50 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
