import React, { useState } from 'react';
import PhoenixSidebar from './PhoenixSidebar';
import PhoenixTopNav from './PhoenixTopNav';
import { ChevronRight, Home } from 'lucide-react';

/**
 * PhoenixLayout (Minimalist & Clean Edition)
 * A clean, spacious, uncluttered shell for the admin portal.
 */
export default function PhoenixLayout({
  children,
  activeTab = 'dashboard',
  onSelectTab,
  customBreadcrumbs,
  isLiveConnected = true,
  lastSync
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Compute clean breadcrumbs
  const getBreadcrumbs = () => {
    if (customBreadcrumbs) return customBreadcrumbs;

    switch (activeTab) {
      case 'dashboard':
        return [{ label: 'Dashboard', active: true }];
      case 'analytics':
        return [
          { label: 'Dashboard', tab: 'dashboard' },
          { label: 'Analytics', active: true }
        ];
      case 'products':
        return [{ label: 'Products', active: true }];
      case 'add-product':
        return [
          { label: 'Products', tab: 'products' },
          { label: 'Add Product', active: true }
        ];
      case 'orders':
        return [{ label: 'Orders', active: true }];
      case 'customers':
        return [{ label: 'Customers', active: true }];
      case 'customer-details':
        return [
          { label: 'Customers', tab: 'customers' },
          { label: 'Details', active: true }
        ];
      case 'inventory':
        return [{ label: 'Inventory', active: true }];
      case 'lookbook':
        return [{ label: 'Lookbook', active: true }];
      case 'batch-scarcity':
        return [{ label: 'Batch Scarcity', active: true }];
      case 'settings':
        return [{ label: 'Settings', active: true }];
      default:
        return [{ label: 'Dashboard', active: true }];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. Sleek Vertical Sidebar */}
      <PhoenixSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        
        {/* Minimalist Top Navigation */}
        <PhoenixTopNav
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(prev => !prev)}
          onToggleMobileMenu={() => setMobileSidebarOpen(prev => !prev)}
          onSelectTab={onSelectTab}
          isLiveConnected={isLiveConnected}
          lastSync={lastSync}
          activeTab={activeTab}
        />

        {/* Minimalist Breadcrumb Bar */}
        <div className="px-4 sm:px-8 pt-5 pb-2">
          <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li className="flex items-center gap-1.5">
                <button
                  onClick={() => onSelectTab && onSelectTab('dashboard')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                >
                  <Home className="w-3.5 h-3.5" />
                </button>
              </li>
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0" />
                  {crumb.active ? (
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => crumb.tab && onSelectTab && onSelectTab(crumb.tab)}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {crumb.label}
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* 3. Main Content Container */}
        <main className="flex-1 px-4 sm:px-8 py-4 w-full">
          {children}
        </main>

        {/* 4. Minimalist Footer */}
        <footer className="mt-auto px-4 sm:px-8 py-5 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p>
              The Brahmman Admin Portal — Minimalist Edition
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
              <span className="text-emerald-500 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Storefront Sync
              </span>
            </div>
          </div>
        </footer>

      </div>

    </div>
  );
}
