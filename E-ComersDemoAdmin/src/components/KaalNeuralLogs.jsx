import React from 'react';
import { Bot } from 'lucide-react';

export default function KaalNeuralLogs() {
  const sampleLogs = [
    {
      time: "16:28:12",
      intent: "SIZING_ADVICE",
      query: "Height 5'11\", 76kg, will Size L fit oversized or should I size up?",
      response: "Recommended Size L for classic high-fashion boxy drape (drop shoulder). Size XL for extreme runway drape.",
      confidence: "99.4%"
    },
    {
      time: "16:21:40",
      intent: "ORDER_TRACKING",
      query: "Track dispatch BRH-8821",
      response: "Located BD-90418294IN. Status: In Transit via BlueDart Air.",
      confidence: "100%"
    },
    {
      time: "16:14:05",
      intent: "FABRIC_GSM",
      query: "Is 260 GSM heavy cotton good for summer in Delhi?",
      response: "260 GSM loopknit combed cotton is breathable while maintaining structured silhouette. Bio-washed for soft touch.",
      confidence: "98.7%"
    },
    {
      time: "15:58:33",
      intent: "PHILOSOPHY_QUERY",
      query: "What does Tat Tvam Asi mean on the oversized t-shirt?",
      response: "Chandogya Upanishad Mahavakya 'Thou Art That' — identity of individual consciousness with universal reality.",
      confidence: "99.8%"
    }
  ];

  return (
    <div className="bg-white border border-[#e5e5e5] font-mono text-xs overflow-hidden shadow-xs">
      
      {/* Header */}
      <div className="p-4 border-b border-[#e5e5e5] bg-[#f8f8f7] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-600" />
          <h3 className="font-heading font-bold text-base text-black uppercase tracking-wider">
            KAAL // AI NEURAL CONCIERGE LOGS
          </h3>
        </div>

        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 font-semibold">
          LIVE ASSISTANT STATUS: ONLINE
        </span>
      </div>

      {/* Logs stream */}
      <div className="p-4 space-y-3 bg-white">
        {sampleLogs.map((log, idx) => (
          <div key={idx} className="p-3 bg-[#fafaf9] border border-[#e5e5e5] space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">{log.time}</span>
                <span className="px-1.5 py-0.2 bg-neutral-200 text-neutral-800 font-bold">
                  {log.intent}
                </span>
              </div>
              <span className="text-emerald-700 font-semibold">ACCURACY: {log.confidence}</span>
            </div>

            <p className="text-black text-[11px] font-semibold">
              Q: "{log.query}"
            </p>

            <p className="text-neutral-600 text-[11px] bg-white p-2 border-l-2 border-black">
              A: {log.response}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
