import React from 'react';
import { MapPin } from 'lucide-react';

export default function OrdersTable({ orders, onUpdateStatus }) {
  return (
    <div className="bg-white border border-[#e5e5e5] font-mono text-xs overflow-hidden shadow-xs">
      
      {/* Header */}
      <div className="p-4 border-b border-[#e5e5e5] bg-[#f8f8f7] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-heading font-bold text-base text-black uppercase tracking-wider">
            LIVE CLIENT ORDERS & DISPATCH PIPELINE
          </h3>
          <p className="text-[11px] text-neutral-500">
            Real-time fulfillment tracking via BlueDart Air Express
          </p>
        </div>

        <span className="text-[10px] bg-white border border-[#e5e5e5] px-2.5 py-1 text-neutral-700 shadow-xs">
          TOTAL ACTIVE: {orders.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafaf9] text-neutral-600 text-[10px] uppercase tracking-wider">
              <th className="p-3.5">ORDER ID</th>
              <th className="p-3.5">COLLECTOR & CITY</th>
              <th className="p-3.5">GARMENTS INCLUDED</th>
              <th className="p-3.5">TOTAL (INR)</th>
              <th className="p-3.5">LOGISTICS AWB</th>
              <th className="p-3.5">DISPATCH STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-[#fbfbfb] transition-colors">
                
                {/* Order ID */}
                <td className="p-3.5 font-bold text-black">
                  <div className="flex items-center gap-1.5">
                    <span className="text-black">{o.id}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 block">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </span>
                </td>

                {/* Customer */}
                <td className="p-3.5">
                  <span className="text-black font-bold block">{o.customer?.name}</span>
                  <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    <span>{o.customer?.city || 'Bharat'}</span>
                  </span>
                </td>

                {/* Items */}
                <td className="p-3.5">
                  <div className="space-y-1">
                    {o.items?.map((item, idx) => (
                      <div key={idx} className="text-neutral-700 text-[11px]">
                        • {item.title?.split('—')[0]} <span className="text-neutral-500 font-bold">[{item.size}]</span> × {item.quantity}
                      </div>
                    ))}
                  </div>
                </td>

                {/* Total */}
                <td className="p-3.5 font-bold text-black">
                  Rs. {o.totalAmount?.toLocaleString('en-IN')}.00
                </td>

                {/* AWB */}
                <td className="p-3.5 text-neutral-600 text-[11px]">
                  <span className="text-black font-bold">{o.trackingNumber}</span>
                  <span className="block text-[9px] text-neutral-400">BLUEDART AIR</span>
                </td>

                {/* Status Switcher */}
                <td className="p-3.5">
                  <select
                    value={o.status}
                    onChange={(e) => onUpdateStatus(o.id, e.target.value)}
                    className={`font-mono text-[10px] font-bold px-2 py-1 border focus:outline-none cursor-pointer ${
                      o.status === 'DELIVERED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : o.status === 'DISPATCHED'
                        ? 'bg-blue-50 text-blue-700 border-blue-300'
                        : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    <option value="CONFIRMED" className="bg-white text-amber-700">CONFIRMED</option>
                    <option value="DISPATCHED" className="bg-white text-blue-700">DISPATCHED</option>
                    <option value="DELIVERED" className="bg-white text-emerald-700">DELIVERED</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
