import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Box, Eye, Check, X, 
  Filter, AlertTriangle, ArrowUpDown, ChevronRight, Sparkles, RefreshCw
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const CATEGORIES = ['All', 'Oversized', 'Graphic Tees', 'Plain Tees', 'Polo T-Shirts'];
const SIZES_LIST = ['S', 'M', 'L', 'XL', 'XXL'];
const POPULAR_COLORS = [
  { name: 'Obsidian Black', hex: '#111827' },
  { name: 'Raw Cream', hex: '#f5f5f0' },
  { name: 'Storm Grey', hex: '#4b5563' },
  { name: 'Abyssal Black', hex: '#09090b' },
  { name: 'Lotus Pink', hex: '#fbcfe8' },
  { name: 'Sage Slate', hex: '#64748b' },
  { name: 'Earthy Sand', hex: '#d6c7b2' }
];

export default function PhoenixProductsManager({ 
  products = [], 
  onRefresh 
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const initialForm = {
    title: '',
    handle: '',
    category: 'Oversized',
    price: 1800,
    originalPrice: 2200,
    stock: 35,
    gsm: '260 GSM',
    fabric: '100% Terry Combed Cotton, Bio-Washed',
    fit: 'Unisex Boxy Oversized Silhouette, Drop Shoulder',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Obsidian Black'],
    images: ['https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886'],
    badge: 'NEW DROP',
    description: 'Heavyweight luxury streetwear canvas crafted for effortless drape.'
  };

  const [formData, setFormData] = useState(initialForm);

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      title: p.title || '',
      handle: p.handle || '',
      category: p.category || 'Oversized',
      price: p.price || 1800,
      originalPrice: p.originalPrice || 2200,
      stock: p.stock !== undefined ? p.stock : 25,
      gsm: p.gsm || '260 GSM',
      fabric: p.fabric || '100% Terry Combed Cotton, Bio-Washed',
      fit: p.fit || 'Unisex Boxy Oversized Silhouette, Drop Shoulder',
      sizes: p.sizes && p.sizes.length > 0 ? p.sizes : ['S', 'M', 'L', 'XL'],
      colors: p.colors && p.colors.length > 0 ? p.colors : ['Obsidian Black'],
      images: p.images && p.images.length > 0 ? p.images : ['https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886'],
      badge: p.badge || 'CORE ARCHIVE',
      description: p.description || ''
    });
    setIsModalOpen(true);
  };

  // Handle Form Submission (POST / PUT to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingProduct
        ? `${API_BASE_URL}/api/admin/products/${editingProduct.id}`
        : `${API_BASE_URL}/api/admin/products`;

      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        if (onRefresh) onRefresh();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to save product');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      alert(`Unable to reach server. Please ensure backend is running at ${API_BASE_URL}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" from the store catalog?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        if (onRefresh) onRefresh();
        setSelectedIds(prev => prev.filter(item => item !== id));
      } else {
        alert('Failed to delete product.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} selected products?`)) return;

    for (const id of selectedIds) {
      try {
        await fetch(`${API_BASE_URL}/api/admin/products/${id}`, { method: 'DELETE' });
      } catch {}
    }
    setSelectedIds([]);
    if (onRefresh) onRefresh();
  };

  // Toggle selection
  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  // Filter & Search logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (activeTab !== 'All') {
        const cat = (p.category || '').toLowerCase();
        const tab = activeTab.toLowerCase();
        if (tab === 'oversized' && !cat.includes('oversized') && !p.title.toLowerCase().includes('oversized')) return false;
        if (tab === 'graphic tees' && !cat.includes('graphic') && !p.title.toLowerCase().includes('graphic')) return false;
        if (tab === 'plain tees' && !cat.includes('plain') && !p.title.toLowerCase().includes('plain')) return false;
        if (tab === 'polo t-shirts' && !cat.includes('polo') && !p.title.toLowerCase().includes('polo')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title && p.title.toLowerCase().includes(q);
        const matchesHandle = p.handle && p.handle.toLowerCase().includes(q);
        const matchesDesc = p.description && p.description.toLowerCase().includes(q);
        const matchesGsm = p.gsm && p.gsm.toLowerCase().includes(q);
        return matchesTitle || matchesHandle || matchesDesc || matchesGsm;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortBy === 'stock') {
        return sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock;
      }
      return sortOrder === 'asc' 
        ? (a.title || '').localeCompare(b.title || '')
        : (b.title || '').localeCompare(a.title || '');
    });
  }, [products, activeTab, searchQuery, sortBy, sortOrder]);

  return (
    <div className="space-y-6 font-sans text-[#141824] dark:text-[#f8fafc]">
      
      {/* Top Banner & Header matching Phoenix products.html */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e3e6ed] dark:border-[#2b3548]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#141824] dark:text-white tracking-tight">Products</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
              {products.length} Garments
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">
            Manage your store catalog, 260/400 GSM silhouettes, live pricing & stock availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { if (onRefresh) onRefresh(); }}
            className="p-2.5 bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] hover:border-neutral-400 dark:hover:border-slate-600 text-neutral-700 dark:text-slate-200 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            title="Refresh Catalog"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#3874ff] hover:bg-[#2563eb] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Main Container Card matching Phoenix style */}
      <div className="bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] rounded-2xl shadow-xs overflow-hidden">
        
        {/* Navigation Tabs (Phoenix Filter Tabs) */}
        <div className="border-b border-[#e3e6ed] dark:border-[#2b3548] px-6 pt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none pb-[-1px]">
            {CATEGORIES.map(tab => {
              const isActive = activeTab === tab;
              const count = tab === 'All' 
                ? products.length 
                : products.filter(p => (p.category || '').toLowerCase().includes(tab.toLowerCase().split(' ')[0])).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'border-[#3874ff] text-[#3874ff]'
                      : 'border-transparent text-neutral-500 dark:text-slate-400 hover:text-neutral-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span>{tab}</span>
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
            STOREFRONT SYNC: <span className="text-emerald-600 dark:text-emerald-400 font-bold">ONLINE (PORT 3000)</span>
          </div>
        </div>

        {/* Action and Search Toolbar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fcfdfe] dark:bg-[#101522] border-b border-[#e3e6ed] dark:border-[#2b3548]">
          
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, handle, GSM..."
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

          {/* Right Toolbar / Bulk Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {selectedIds.length > 0 ? (
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-xl text-xs text-blue-800 dark:text-blue-300">
                <span className="font-bold">{selectedIds.length}</span> selected
                <button
                  onClick={handleBulkDelete}
                  className="ml-2 text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-slate-400">
                <span className="font-medium text-neutral-700 dark:text-slate-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 dark:text-slate-200 focus:outline-none focus:border-[#3874ff]"
                >
                  <option value="title">Title (A-Z)</option>
                  <option value="price">Price</option>
                  <option value="stock">Stock</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-1.5 border border-[#e3e6ed] dark:border-[#2b3548] rounded-lg bg-white dark:bg-[#182030] hover:bg-neutral-50 dark:hover:bg-[#1f293d] text-neutral-600 dark:text-slate-300"
                  title="Toggle Asc/Desc"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Table matching Phoenix table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e3e6ed] dark:border-[#2b3548] bg-[#f8fafc] dark:bg-[#141824] text-neutral-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredProducts.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-neutral-300 dark:border-slate-700 text-[#3874ff] focus:ring-[#3874ff] cursor-pointer"
                  />
                </th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f7] dark:divide-[#2b3548]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-neutral-400 text-xs font-mono">
                    <Box className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
                    No products found matching your current filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isChecked = selectedIds.includes(p.id);
                  const isOutOfStock = p.stock <= 0;
                  const isLowStock = p.stock > 0 && p.stock <= 20;

                  return (
                    <tr 
                      key={p.id}
                      className={`hover:bg-[#f8faff] dark:hover:bg-[#182030] transition-colors ${
                        isChecked ? 'bg-blue-50/40 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelect(p.id)}
                          className="w-4 h-4 rounded border-neutral-300 dark:border-slate-700 text-[#3874ff] focus:ring-[#3874ff] cursor-pointer"
                        />
                      </td>

                      {/* Product Image & Title */}
                      <td className="p-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-[#e3e6ed] dark:border-[#2b3548] overflow-hidden flex-shrink-0 relative group">
                            <img
                              src={p.images?.[0] || 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886'}
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {p.badge && (
                              <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] font-bold text-white text-center py-0.5 truncate uppercase">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#141824] dark:text-white hover:text-[#3874ff] dark:hover:text-[#3874ff] cursor-pointer transition-colors block">
                              {p.title}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-neutral-500 dark:text-slate-400 font-mono">
                              <span>handle: /{p.handle}</span>
                              <span>•</span>
                              <span className="text-neutral-600 dark:text-slate-300 font-semibold">{p.gsm || '260 GSM'}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 text-xs font-semibold text-neutral-700 dark:text-slate-300">
                        <span className="px-2.5 py-1 bg-neutral-100 dark:bg-slate-800 rounded-lg text-neutral-800 dark:text-slate-200 text-[11px] font-medium border border-neutral-200 dark:border-slate-700">
                          {p.category || 'Oversized'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4">
                        <div className="text-xs font-bold text-[#141824] dark:text-white font-mono">
                          ₹{p.price?.toLocaleString('en-IN')}
                        </div>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <div className="text-[10px] text-neutral-400 dark:text-slate-500 line-through font-mono">
                            ₹{p.originalPrice?.toLocaleString('en-IN')}
                          </div>
                        )}
                      </td>

                      {/* Stock count */}
                      <td className="p-4 text-xs font-mono font-bold text-neutral-800 dark:text-slate-200">
                        {p.stock} units
                      </td>

                      {/* Status Pill (In Stock / Low Stock / Out of Stock) */}
                      <td className="p-4">
                        {isOutOfStock ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Low Stock ({p.stock})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            In Stock
                          </span>
                        )}
                      </td>

                      {/* Actions (Edit, Delete) */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Action */}
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-neutral-500 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete Action */}
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with pagination stats */}
        <div className="p-4 border-t border-[#e3e6ed] dark:border-[#2b3548] bg-[#f8fafc] dark:bg-[#141824] flex flex-wrap items-center justify-between text-xs text-neutral-500 dark:text-slate-400 font-medium">
          <div>
            Showing <span className="font-bold text-neutral-800 dark:text-slate-200">{filteredProducts.length}</span> of{' '}
            <span className="font-bold text-neutral-800 dark:text-slate-200">{products.length}</span> products
          </div>
        </div>

      </div>

      {/* =========================================================================
          ADD / EDIT PRODUCT MODAL
      ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white dark:bg-[#141824] rounded-3xl max-w-2xl w-full border border-neutral-200 dark:border-[#2b3548] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#e3e6ed] dark:border-[#2b3548] flex items-center justify-between bg-[#fcfdfe] dark:bg-[#182030]">
              <div>
                <h3 className="text-lg font-bold text-[#141824] dark:text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Streetwear Silhouette'}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-slate-400 mt-0.5">
                  Changes sync immediately to both Admin and Storefront (http://localhost:3000)
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1 font-sans">
              
              {/* Title & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const t = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        title: t,
                        handle: prev.handle || t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      }));
                    }}
                    placeholder="e.g. MOKSHA — OVERSIZED T-SHIRT"
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#3874ff] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    URL Handle
                  </label>
                  <input
                    type="text"
                    value={formData.handle}
                    onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value }))}
                    placeholder="e.g. moksha"
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#3874ff] transition-colors"
                  />
                </div>
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    Category Dropdown *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 focus:outline-none focus:border-[#3874ff] transition-colors"
                  >
                    <option value="Oversized">Oversized</option>
                    <option value="Graphic Tees">Graphic Tees</option>
                    <option value="Plain Tees">Plain Tees</option>
                    <option value="Polo T-Shirts">Polo T-Shirts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    Drop Badge
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                    placeholder="e.g. BESTSELLER, LIMITED DROP"
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#3874ff] transition-colors"
                  />
                </div>
              </div>

              {/* Price, Original Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 font-mono focus:outline-none focus:border-[#3874ff] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 font-mono focus:outline-none focus:border-[#3874ff] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    Factory Stock (Units) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 font-mono focus:outline-none focus:border-[#3874ff] transition-colors"
                  />
                </div>
              </div>

              {/* GSM Spec & Fabric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    GSM Spec
                  </label>
                  <select
                    value={formData.gsm}
                    onChange={(e) => setFormData(prev => ({ ...prev, gsm: e.target.value }))}
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 focus:outline-none focus:border-[#3874ff] transition-colors"
                  >
                    <option value="260 GSM">260 GSM (Signature Loopknit)</option>
                    <option value="400 GSM">400 GSM (Heavyweight Thermal French Terry)</option>
                    <option value="220 GSM">220 GSM (Lightweight Summer Combed)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                    Fabric Composition
                  </label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData(prev => ({ ...prev, fabric: e.target.value }))}
                    placeholder="100% Terry Combed Cotton, Bio-Washed"
                    className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#3874ff] transition-colors"
                  />
                </div>
              </div>

              {/* Sizes Selector Pills */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                  Available Sizes
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {SIZES_LIST.map(size => {
                    const isSelected = formData.sizes.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            sizes: isSelected 
                              ? prev.sizes.filter(s => s !== size)
                              : [...prev.sizes, size]
                          }));
                        }}
                        className={`w-10 h-10 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#3874ff] text-white border-[#3874ff]'
                            : 'bg-white dark:bg-[#182030] text-neutral-600 dark:text-slate-300 border-neutral-200 dark:border-[#2b3548] hover:border-[#3874ff]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                  Colorway Swatches
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {POPULAR_COLORS.map(col => {
                    const isSelected = formData.colors.includes(col.name);
                    return (
                      <button
                        type="button"
                        key={col.name}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            colors: isSelected
                              ? prev.colors.filter(c => c !== col.name)
                              : [...prev.colors, col.name]
                          }));
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-[#3874ff] bg-blue-50 dark:bg-blue-900/30 font-bold text-[#3874ff]'
                            : 'border-neutral-200 dark:border-[#2b3548] bg-white dark:bg-[#182030] text-neutral-600 dark:text-slate-300 hover:border-neutral-400'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-[#3874ff]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image URL & Live Preview */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                  Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    value={formData.images[0] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
                    placeholder="https://..."
                    className="flex-1 bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 dark:text-slate-100 focus:outline-none focus:border-[#3874ff] transition-colors"
                  />
                  {formData.images[0] && (
                    <div className="w-10 h-10 rounded-xl border border-neutral-300 dark:border-slate-700 overflow-hidden bg-neutral-100 dark:bg-slate-800 flex-shrink-0">
                      <img src={formData.images[0]} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-slate-300 mb-1.5 uppercase">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Streetwear concept and silhouette description..."
                  className="w-full bg-[#fcfdfe] dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] rounded-xl p-3 text-xs text-neutral-800 dark:text-slate-100 focus:outline-none focus:border-[#3874ff] transition-colors"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#e3e6ed] dark:border-[#2b3548] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] text-neutral-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-neutral-50 dark:hover:bg-[#1f293d] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#3874ff] hover:bg-[#2563eb] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProduct ? 'Save Changes' : 'Create Product'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
