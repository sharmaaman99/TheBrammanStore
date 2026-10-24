import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

export default function InventoryManager({ products, onUpdateProduct }) {
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editBadge, setEditBadge] = useState('');
  const [saving, setSaving] = useState(false);

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditPrice(p.price);
    setEditStock(p.stock);
    setEditBadge(p.badge || '');
  };

  const handleSave = async (id) => {
    setSaving(true);
    await onUpdateProduct(id, {
      price: editPrice,
      stock: editStock,
      badge: editBadge
    });
    setSaving(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white dark:bg-[#141824] border border-[#e5e5e5] dark:border-[#2b3548] rounded-2xl font-mono text-xs overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 border-b border-[#e5e5e5] dark:border-[#2b3548] bg-[#f8f8f7] dark:bg-[#182030] flex items-center justify-between gap-3">
        <div>
          <h3 className="font-heading font-bold text-base text-black dark:text-white uppercase tracking-wider">
            PRODUCT ARCHIVE & INVENTORY MATRIX
          </h3>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e5e5] dark:border-[#2b3548] bg-[#fafaf9] dark:bg-[#101420] text-neutral-600 dark:text-slate-400 text-[10px] uppercase tracking-wider">
              <th className="p-3.5">GARMENT / DEVANAGARI</th>
              <th className="p-3.5">GSM SPEC</th>
              <th className="p-3.5">RETAIL PRICE</th>
              <th className="p-3.5">FACTORY STOCK</th>
              <th className="p-3.5">DROP BADGE</th>
              <th className="p-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0] dark:divide-[#2b3548]">
            {products.map((p) => {
              const isEditing = editingId === p.id;

              return (
                <tr key={p.id} className="hover:bg-[#fbfbfb] dark:hover:bg-[#182030] transition-colors">
                  
                  {/* Title & Image */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-10 h-12 object-contain bg-[#f8f8f7] dark:bg-[#182030] p-1 border border-[#e5e5e5] dark:border-[#2b3548] rounded-lg"
                      />
                      <div>
                        <span className="text-black dark:text-white font-bold block text-xs">{p.title}</span>
                        <span className="text-[10px] text-neutral-500 dark:text-slate-400 font-devanagari">
                          {p.nameDevanagari} • {p.colors ? p.colors.join(', ') : 'Black'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* GSM */}
                  <td className="p-3.5 text-neutral-800 dark:text-slate-200 font-bold">
                    <span className="px-2 py-0.5 bg-[#f4f4f2] dark:bg-slate-800 border border-[#e5e5e5] dark:border-slate-700 text-[11px] rounded">
                      {p.gsm}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-3.5 text-black dark:text-white">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-24 bg-white dark:bg-[#182030] border border-black dark:border-slate-600 px-2 py-1 text-black dark:text-white text-xs font-mono rounded"
                      />
                    ) : (
                      <span className="font-bold">Rs. {p.price.toLocaleString('en-IN')}.00</span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="p-3.5">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editStock}
                        onChange={(e) => setEditStock(e.target.value)}
                        className="w-20 bg-white dark:bg-[#182030] border border-black dark:border-slate-600 px-2 py-1 text-black dark:text-white text-xs font-mono rounded"
                      />
                    ) : (
                      <span className={`px-2 py-0.5 text-[10px] font-bold border rounded ${
                        p.stock < 15
                          ? 'border-amber-400 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40'
                          : 'border-[#e5e5e5] dark:border-slate-700 text-neutral-700 dark:text-slate-300 bg-[#f8f8f7] dark:bg-slate-800'
                      }`}>
                        {p.stock} UNITS
                      </span>
                    )}
                  </td>

                  {/* Badge */}
                  <td className="p-3.5">
                    {isEditing ? (
                      <select
                        value={editBadge}
                        onChange={(e) => setEditBadge(e.target.value)}
                        className="bg-white dark:bg-[#182030] border border-black dark:border-slate-600 px-2 py-1 text-black dark:text-white text-[10px] rounded"
                      >
                        <option value="">None</option>
                        <option value="BESTSELLER">BESTSELLER</option>
                        <option value="LIMITED DROP">LIMITED DROP</option>
                        <option value="CORE ARCHIVE">CORE ARCHIVE</option>
                        <option value="WINTER ARCHIVE">WINTER ARCHIVE</option>
                        <option value="HEAVYWEIGHT">HEAVYWEIGHT</option>
                      </select>
                    ) : (
                      p.badge ? (
                        <span className="text-[10px] bg-black dark:bg-[#3874ff] text-white font-bold px-1.5 py-0.5 rounded shadow-xs">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-neutral-400 dark:text-slate-600 text-[10px]">—</span>
                      )
                    )}
                  </td>

                  {/* Action */}
                  <td className="p-3.5 text-right">
                    {isEditing ? (
                      <button
                        onClick={() => handleSave(p.id)}
                        disabled={saving}
                        className="px-3 py-1 bg-black dark:bg-[#3874ff] text-white font-bold uppercase text-[10px] hover:bg-neutral-800 dark:hover:bg-[#2563eb] rounded shadow-xs"
                      >
                        {saving ? 'SAVING...' : 'SAVE ✓'}
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(p)}
                        className="p-1.5 border border-[#d4d4d4] dark:border-slate-700 hover:border-black dark:hover:border-white text-neutral-600 dark:text-slate-400 hover:text-black dark:hover:text-white rounded transition-colors"
                        title="Edit garment"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
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
  );
}