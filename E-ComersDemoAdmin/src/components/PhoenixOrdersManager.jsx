import React, { useState, useMemo } from 'react';
import { 
  Search, Eye, Truck, CheckCircle2, Clock, AlertCircle, XCircle, 
  MapPin, Phone, Mail, Package, RefreshCw, X, ChevronRight, 
  CreditCard, ExternalLink, ArrowUpDown, Filter, Download
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const ORDER_TABS = [
  'All', 
  'Awaiting Processing', 
  'Processing', 
  'Shipped', 
  'Delivered', 
  'Cancelled'
];

export default function PhoenixOrdersManager({ orders = [], onRefresh }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    const s = (status || '').toUpperCase();
    if (s === 'DELIVERED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Delivered
        </span>
      );
    }
    if (s === 'SHIPPED' || s === 'DISPATCHED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Shipped
        </span>
      );
    }
    if (s === 'PROCESSING') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Processing
        </span>
      );
    }
    if (s === 'PENDING' || s === 'AWAITING PROCESSING') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          Awaiting Processing
        </span>
      );
    }
    if (s === 'CANCELLED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Cancelled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
        {status}
      </span>
    );
  };

  // Quick Status Updater via PATCH
  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        const data = await res.json();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
        if (onRefresh) onRefresh();
      } else {
        alert('Failed to update order status');
      }
    } catch (err) {
      console.error('Error updating order:', err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      // Tab filter
      if (activeTab !== 'All') {
        const status = (o.status || '').toUpperCase();
        if (activeTab === 'Awaiting Processing' && status !== 'PENDING' && status !== 'AWAITING PROCESSING') return false;
        if (activeTab === 'Processing' && status !== 'PROCESSING') return false;
        if (activeTab === 'Shipped' && status !== 'SHIPPED' && status !== 'DISPATCHED') return false;
        if (activeTab === 'Delivered' && status !== 'DELIVERED') return false;
        if (activeTab === 'Cancelled' && status !== 'CANCELLED') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = o.id && o.id.toLowerCase().includes(q);
        const matchesName = o.customer?.name && o.customer.name.toLowerCase().includes(q);
        const matchesEmail = o.customer?.email && o.customer.email.toLowerCase().includes(q);
        const matchesAwb = o.trackingNumber && o.trackingNumber.toLowerCase().includes(q);
        const matchesCity = o.customer?.city && o.customer.city.toLowerCase().includes(q);
        return matchesId || matchesName || matchesEmail || matchesAwb || matchesCity;
      }

      return true;
    });
  }, [orders, activeTab, searchQuery]);

  return (
    <div className="space-y-6 font-sans text-[#141824] dark:text-[#f8fafc]">
      
      {/* Top Banner & Header matching Phoenix orders.html */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e3e6ed] dark:border-[#2b3548]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#141824] dark:text-white tracking-tight">Orders</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
              {orders.length} Total Orders
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">
            Real-time fulfillment tracking, BlueDart Air Express logistics and status transitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { if (onRefresh) onRefresh(); }}
            className="p-2.5 bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] hover:border-neutral-400 dark:hover:border-slate-600 text-neutral-700 dark:text-slate-200 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            title="Sync Orders"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Container Card matching Phoenix style */}
      <div className="bg-white dark:bg-[#141824] border border-[#e3e6ed] dark:border-[#2b3548] rounded-2xl shadow-xs overflow-hidden">
        
        {/* Navigation Tabs (Phoenix Filter Tabs) */}
        <div className="border-b border-[#e3e6ed] dark:border-[#2b3548] px-6 pt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none pb-[-1px]">
            {ORDER_TABS.map(tab => {
              const isActive = activeTab === tab;
              
              // Count for this tab
              const count = tab === 'All'
                ? orders.length
                : orders.filter(o => {
                    const s = (o.status || '').toUpperCase();
                    if (tab === 'Awaiting Processing') return s === 'PENDING' || s === 'AWAITING PROCESSING';
                    if (tab === 'Processing') return s === 'PROCESSING';
                    if (tab === 'Shipped') return s === 'SHIPPED' || s === 'DISPATCHED';
                    if (tab === 'Delivered') return s === 'DELIVERED';
                    if (tab === 'Cancelled') return s === 'CANCELLED';
                    return false;
                  }).length;

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
            LOGISTICS PARTNER: <span className="text-blue-600 dark:text-blue-400 font-bold">BLUEDART AIR</span>
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
              placeholder="Search by Order ID (BRH-...), Customer, or AWB..."
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
            Showing <span className="font-bold text-neutral-800 dark:text-slate-200">{filteredOrders.length}</span> matching orders
          </div>
        </div>

        {/* Orders Table matching Phoenix layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e3e6ed] dark:border-[#2b3548] bg-[#f8fafc] dark:bg-[#141824] text-neutral-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Date</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Items Preview</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3f7] dark:divide-[#2b3548]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-12 text-center text-neutral-400 text-xs font-mono">
                    <Package className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
                    No orders found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const dateFormatted = new Date(o.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <tr 
                      key={o.id}
                      className="hover:bg-[#f8faff] dark:hover:bg-[#182030] transition-colors cursor-pointer group"
                      onClick={() => setSelectedOrder(o)}
                    >
                      {/* Order ID */}
                      <td className="p-4" onClick={(e) => { e.stopPropagation(); setSelectedOrder(o); }}>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-[#3874ff] hover:underline">
                            {o.id}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-400 dark:text-slate-500 font-mono block">
                          {o.trackingNumber || 'AWB-PENDING'}
                        </span>
                      </td>

                      {/* Customer Details */}
                      <td className="p-4">
                        <div className="text-xs font-bold text-[#141824] dark:text-white">
                          {o.customer?.name || 'Valued Collector'}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-neutral-400 dark:text-slate-500 flex-shrink-0" />
                          <span className="truncate max-w-[160px]">{o.customer?.city || 'Bharat'}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-xs text-neutral-600 dark:text-slate-400 font-medium">
                        {dateFormatted}
                      </td>

                      {/* Payment Method */}
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-neutral-100 dark:bg-slate-800 text-neutral-800 dark:text-slate-200 border border-neutral-200 dark:border-slate-700">
                          <CreditCard className="w-3 h-3 text-neutral-500 dark:text-slate-400" />
                          <span>{o.paymentMethod || 'UPI Express'}</span>
                        </span>
                      </td>

                      {/* Items Preview */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {o.items?.[0]?.image && (
                            <img
                              src={o.items[0].image}
                              alt="Item"
                              className="w-8 h-10 object-cover rounded bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 flex-shrink-0"
                            />
                          )}
                          <div className="text-xs text-neutral-700 dark:text-slate-300">
                            <span className="font-semibold block truncate max-w-[150px]">
                              {o.items?.[0]?.title?.split('—')[0] || 'Streetwear Piece'}
                            </span>
                            <span className="text-[10px] text-neutral-500 dark:text-slate-400 font-mono">
                              {o.items?.length || 1} item{(o.items?.length || 1) > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Total Amount */}
                      <td className="p-4 font-mono font-bold text-xs text-[#141824] dark:text-white">
                        ₹{o.totalAmount?.toLocaleString('en-IN')}.00
                      </td>

                      {/* Status Badge */}
                      <td className="p-4">
                        {getStatusBadge(o.status)}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Quick status change selector */}
                          <select
                            value={o.status}
                            disabled={updatingOrderId === o.id}
                            onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                            className="bg-white dark:bg-[#182030] border border-[#e3e6ed] dark:border-[#2b3548] hover:border-neutral-400 dark:hover:border-slate-600 rounded-lg px-2 py-1 text-[11px] font-semibold text-neutral-700 dark:text-slate-200 focus:outline-none focus:border-[#3874ff] cursor-pointer"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>

                          {/* Inspect order details button */}
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="p-1.5 text-neutral-500 dark:text-slate-400 hover:text-[#3874ff] hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                            title="View Full Order Breakdown"
                          >
                            <Eye className="w-4 h-4" />
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

        {/* Footer info */}
        <div className="p-4 border-t border-[#e3e6ed] dark:border-[#2b3548] bg-[#f8fafc] dark:bg-[#141824] flex flex-wrap items-center justify-between text-xs text-neutral-500 dark:text-slate-400 font-medium">
          <div>
            Showing <span className="font-bold text-neutral-800 dark:text-slate-200">{filteredOrders.length}</span> of{' '}
            <span className="font-bold text-neutral-800 dark:text-slate-200">{orders.length}</span> recorded orders
          </div>
        </div>

      </div>

      {/* =========================================================================
          ORDER DETAILS DRAWER / MODAL
      ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white dark:bg-[#141824] rounded-3xl max-w-2xl w-full border border-neutral-200 dark:border-[#2b3548] shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col font-sans">
            
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-[#e3e6ed] dark:border-[#2b3548] flex items-center justify-between bg-[#fcfdfe] dark:bg-[#182030]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-[#3874ff] rounded-2xl border border-blue-100 dark:border-blue-800">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#141824] dark:text-white font-mono">
                      Order #{selectedOrder.id}
                    </h3>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-slate-400 mt-0.5">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-neutral-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              
              {/* Quick Status Bar */}
              <div className="p-4 bg-neutral-50 dark:bg-[#182030] rounded-2xl border border-neutral-200 dark:border-[#2b3548] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-neutral-800 dark:text-slate-200 uppercase tracking-wider block">
                    Update Order Status
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-slate-400">
                    Instantly notifies fulfillment pipeline & updates client tracking
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                    className="bg-white dark:bg-[#121624] border border-neutral-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-neutral-800 dark:text-slate-100 focus:outline-none focus:border-[#3874ff] shadow-xs cursor-pointer"
                  >
                    <option value="PENDING">PENDING (Awaiting Processing)</option>
                    <option value="PROCESSING">PROCESSING (In Chamber)</option>
                    <option value="SHIPPED">SHIPPED (In Transit)</option>
                    <option value="DELIVERED">DELIVERED (Completed)</option>
                    <option value="CANCELLED">CANCELLED (Refunded)</option>
                  </select>
                </div>
              </div>

              {/* Customer & Shipping Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Shipping Address */}
                <div className="p-4 rounded-2xl border border-[#e3e6ed] dark:border-[#2b3548] bg-[#fcfdfe] dark:bg-[#182030]">
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#3874ff]" />
                    <span>Shipping Address</span>
                  </h4>
                  <div className="text-xs text-neutral-700 dark:text-slate-300 space-y-1">
                    <p className="font-bold text-neutral-900 dark:text-white">{selectedOrder.customer?.name}</p>
                    <p className="text-neutral-600 dark:text-slate-400">{selectedOrder.customer?.address || '42 Indiranagar 100ft Road'}</p>
                    <p className="text-neutral-600 dark:text-slate-400">
                      {selectedOrder.customer?.city || 'Bengaluru, Karnataka'}
                      {selectedOrder.customer?.pincode && ` — ${selectedOrder.customer.pincode}`}
                    </p>
                  </div>
                </div>

                {/* Contact & Payment */}
                <div className="p-4 rounded-2xl border border-[#e3e6ed] dark:border-[#2b3548] bg-[#fcfdfe] dark:bg-[#182030]">
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#3874ff]" />
                    <span>Payment & Contact</span>
                  </h4>
                  <div className="text-xs text-neutral-700 dark:text-slate-300 space-y-1.5">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-400 dark:text-slate-500" />
                      <span>{selectedOrder.customer?.email || 'collector@thebrahmmanstore.com'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400 dark:text-slate-500" />
                      <span>{selectedOrder.customer?.phone || '+91 99999 00000'}</span>
                    </p>
                    <p className="font-semibold text-neutral-800 dark:text-slate-200 pt-1 border-t border-neutral-200 dark:border-slate-700">
                      Method: <span className="text-[#3874ff]">{selectedOrder.paymentMethod || 'UPI Express'}</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* BlueDart Tracking Bar */}
              <div className="p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#3874ff]" />
                  <div>
                    <span className="text-xs font-bold text-[#141824] dark:text-white block">
                      BlueDart Air Express AWB: {selectedOrder.trackingNumber}
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-slate-400">
                      Status Text: {selectedOrder.statusText || 'In Dispatch Chamber'}
                    </span>
                  </div>
                </div>

                <a
                  href={`http://localhost:3000`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-white dark:bg-[#141824] border border-blue-200 dark:border-blue-800 hover:border-blue-400 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-xl flex items-center gap-1 shadow-xs"
                >
                  <span>Track on Storefront</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Order Items Breakdown */}
              <div>
                <h4 className="text-xs font-bold text-neutral-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                  Garments in this Order ({selectedOrder.items?.length || 0})
                </h4>

                <div className="border border-[#e3e6ed] dark:border-[#2b3548] rounded-2xl overflow-hidden divide-y divide-[#e3e6ed] dark:divide-[#2b3548]">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-white dark:bg-[#182030]">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-14 object-cover rounded-xl border border-neutral-200 dark:border-slate-700 bg-neutral-100 dark:bg-slate-800 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-14 bg-neutral-100 dark:bg-slate-800 rounded-xl border border-neutral-200 dark:border-slate-700 flex items-center justify-center text-neutral-400 dark:text-slate-500">
                            <Package className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-neutral-500 dark:text-slate-400 font-mono">
                            Size: <strong className="text-black dark:text-white">{item.size || 'L'}</strong> • Qty: {item.quantity || 1}
                            {item.color && ` • Color: ${item.color}`}
                          </span>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs">
                        <div className="font-bold text-neutral-900 dark:text-white">
                          ₹{((item.price || 1800) * (item.quantity || 1)).toLocaleString('en-IN')}.00
                        </div>
                        <div className="text-[10px] text-neutral-400 dark:text-slate-500">
                          ₹{item.price || 1800} each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="p-4 bg-neutral-50 dark:bg-[#182030] rounded-2xl border border-neutral-200 dark:border-[#2b3548] space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600 dark:text-slate-400 font-medium">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}.00</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-slate-400 font-medium">
                  <span>Air Express Shipping (Bharat):</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE (Complimentary)</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-[#2b3548] flex justify-between font-bold text-sm text-[#141824] dark:text-white">
                  <span>Total Paid:</span>
                  <span className="font-mono text-[#3874ff]">₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}.00</span>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-[#e3e6ed] dark:border-[#2b3548] bg-[#fcfdfe] dark:bg-[#182030] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-black dark:bg-[#3874ff] dark:hover:bg-[#2563eb] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
