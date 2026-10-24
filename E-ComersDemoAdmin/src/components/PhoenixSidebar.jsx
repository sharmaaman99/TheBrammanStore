import React from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Layers,
  Boxes,
  Settings,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

/**
 * PhoenixSidebar (Minimalist & Clean Edition)
 * A sleek, clutter-free vertical navigation sidebar.
 */
export default function PhoenixSidebar({
  collapsed = false,
  onToggleCollapse,
  activeTab = 'dashboard',
  onSelectTab,
  mobileOpen = false,
  onCloseMobile
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelect = (id) => {
    if (onSelectTab) onSelectTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 ease-in-out select-none ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className={`h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800/80 ${
          collapsed ? 'justify-center' : 'justify-between'
        }`}>
          <div
            onClick={() => handleSelect('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-xs shadow-blue-500/20 group-hover:scale-105 transition-transform">
              B
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-sm text-slate-900 dark:text-white leading-none">
                  THE BRAHMMAN
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1 font-medium">
                  Admin Portal
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 overflow-y-auto no-scrollbar space-y-1">
          {!collapsed && (
            <p className="px-3 pb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Navigation
            </p>
          )}

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'dashboard' && activeTab === 'analytics');

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}

          <div className="pt-3 pb-1">
            <div className="border-t border-slate-200 dark:border-slate-800/80 my-2" />
          </div>

          {/* Quick link to Storefront */}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? 'View Storefront' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left font-medium">View Store</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </>
            )}
          </a>
        </div>

        {/* Sidebar Footer with Profile & Collapse Button */}
        <div className={`p-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center ${
          collapsed ? 'justify-center flex-col gap-2' : 'justify-between'
        }`}>
          {/* User Profile */}
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300">
              SS
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Shiva Sharma
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  Administrator
                </span>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
