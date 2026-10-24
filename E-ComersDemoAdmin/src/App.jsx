import React, { useState, useEffect } from 'react';
import PhoenixLayout from './components/PhoenixLayout';
import PhoenixEcommerceDashboard from './components/PhoenixEcommerceDashboard';
import PhoenixProductsManager from './components/PhoenixProductsManager';
import PhoenixOrdersManager from './components/PhoenixOrdersManager';
import PhoenixCustomersManager from './components/PhoenixCustomersManager';
import AddProductPanel from './components/AddProductPanel';
import CustomerDetailsPanel from './components/CustomerDetailsPanel';
import StoreSettingsPanel from './components/StoreSettingsPanel';
import InventoryManager from './components/InventoryManager';
import CommunityLookbookManager from './components/CommunityLookbookManager';
import BatchScarcityPanel from './components/BatchScarcityPanel';
import { API_BASE_URL } from './config/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [isLiveConnected, setIsLiveConnected] = useState(true);
  const [lastSync, setLastSync] = useState(Date.now());

  // Fallback initial data for resilient rendering
  const fallbackProducts = [
    {
      id: "prod-01",
      handle: "kundalini",
      title: "KUNDALINI / कुण्डलिनी — OVERSIZED T-SHIRT",
      nameDevanagari: "कुण्डलिनी",
      nameEnglish: "KUNDALINI",
      subTitle: "OVERSIZED T-SHIRT",
      category: "Oversized",
      price: 1800,
      originalPrice: 2200,
      currency: "INR",
      gsm: "260 GSM",
      fabric: "100% Terry Combed Cotton, Bio-Washed",
      fit: "Unisex Boxy Oversized Silhouette, Drop Shoulder",
      badge: "BESTSELLER",
      stock: 42,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Obsidian Black", "Chalk White"],
      images: ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886"]
    },
    {
      id: "prod-02",
      handle: "tat-tvam-asi",
      title: "TAT TVAM ASI — OVERSIZED T-SHIRT",
      nameDevanagari: "तत्त्वमसि",
      nameEnglish: "TAT TVAM ASI",
      subTitle: "OVERSIZED T-SHIRT",
      category: "Graphic Tees",
      price: 1800,
      originalPrice: 2200,
      currency: "INR",
      gsm: "260 GSM",
      fabric: "90/10 Cotton Polyester Terry-knit, 260 GSM",
      fit: "Relaxed Boxy Streetwear Cut with Extended Hem",
      badge: "ICONIC ARCHIVE",
      stock: 28,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Raw Cream", "Deep Onyx"],
      images: ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/45.png?v=1789397586"]
    },
    {
      id: "prod-03",
      handle: "indra",
      title: "INDRA / इंद्र — OVERSIZED T-SHIRT",
      nameDevanagari: "इंद्र",
      nameEnglish: "INDRA",
      subTitle: "OVERSIZED T-SHIRT",
      category: "Graphic Tees",
      price: 1800,
      originalPrice: 2200,
      currency: "INR",
      gsm: "260 GSM",
      fabric: "100% Combed Heavy Cotton, Pre-shrunk",
      fit: "Oversized Streetwear Silhouette with Structured Collar",
      badge: "LIMITED DROP",
      stock: 19,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Storm Grey", "Vajra Black"],
      images: ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Indraproexp1.png?v=1788422946"]
    },
    {
      id: "prod-04",
      handle: "parshuram",
      title: "PARSHURAM / परशुराम — OVERSIZED T-SHIRT",
      nameDevanagari: "परशुराम",
      nameEnglish: "PARSHURAM",
      subTitle: "OVERSIZED T-SHIRT",
      category: "Oversized",
      price: 1800,
      originalPrice: 2200,
      currency: "INR",
      gsm: "260 GSM",
      fabric: "90/10 Cotton Polyester, 260 GSM Terry-knit",
      fit: "Drop-Shoulder Oversized Silhouette",
      badge: "HEAVYWEIGHT",
      stock: 35,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Earthy Sand"],
      images: ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/parshuproexp.png?v=1788421632"]
    },
    {
      id: "prod-05",
      handle: "kaal",
      title: "KAAL / काल — OVERSIZED HOODIE",
      nameDevanagari: "काल",
      nameEnglish: "KAAL",
      subTitle: "OVERSIZED HOODIE",
      category: "Oversized",
      price: 2800,
      originalPrice: 3400,
      currency: "INR",
      gsm: "400 GSM",
      fabric: "400 GSM Heavyweight French Terry Cotton",
      fit: "Double-Layer Hood, Kangaroo Pocket, Oversized Cut",
      badge: "WINTER ARCHIVE",
      stock: 14,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Abyssal Black", "Ash"],
      images: ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/kaal_pro_exp.png?v=1791633682"]
    },
    {
      id: "prod-06",
      handle: "maya",
      title: "MAYA / माया — OVERSIZED SWEATSHIRT",
      nameDevanagari: "माया",
      nameEnglish: "MAYA",
      subTitle: "OVERSIZED SWEATSHIRT",
      category: "Plain Tees",
      price: 2600,
      originalPrice: 3100,
      currency: "INR",
      gsm: "400 GSM",
      fabric: "400 GSM Luxury Combed Cotton Fleece",
      fit: "Substantial Drop-Shoulder Crewneck",
      badge: "NEW ARRIVAL",
      stock: 22,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Lotus Pink", "Lavender"],
      images: ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/55_14772461-f8e1-41f4-868d-2e8988329195.png?v=1791192979"]
    },
    {
      id: "prod-07",
      handle: "shunya",
      title: "SHUNYA / शून्य — OVERSIZED SHIRT",
      nameDevanagari: "शून्य",
      nameEnglish: "SHUNYA",
      subTitle: "OVERSIZED SHIRT",
      category: "Plain Tees",
      price: 1800,
      originalPrice: 2200,
      currency: "INR",
      gsm: "260 GSM",
      fabric: "100% Cotton Premium Weave",
      fit: "Loose Architectural Structured Silhouette",
      badge: "EDITORIAL",
      stock: 18,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Pure Void Black"],
      images: ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/shunya_pro_exp.png?v=1788419827"]
    },
    {
      id: "prod-08",
      handle: "bodhi",
      title: "BODHI / बोधि — OVERSIZED SWEATSHIRT",
      nameDevanagari: "बोधि",
      nameEnglish: "BODHI",
      subTitle: "OVERSIZED SWEATSHIRT",
      category: "Polo T-Shirts",
      price: 2600,
      originalPrice: 3200,
      currency: "INR",
      gsm: "400 GSM",
      fabric: "400 GSM Heavyweight Combed Cotton",
      fit: "Slouchy Relaxed Fit with Heavyweight Ribbing",
      badge: "CORE ARCHIVE",
      stock: 25,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Sage Slate", "Carbon"],
      images: ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/bodhi_pro_exp.png?v=1788417381"]
    }
  ];

  const fallbackOrders = [
    {
      id: "BRH-8821",
      customer: {
        name: "Arjun Verma",
        email: "arjun@example.com",
        phone: "+91 98765 43210",
        city: "Bengaluru, Karnataka",
        address: "42 Indiranagar 100ft Road"
      },
      items: [
        {
          id: "prod-01",
          title: "KUNDALINI / कुण्डलिनी — OVERSIZED T-SHIRT",
          size: "L",
          color: "Obsidian Black",
          quantity: 1,
          price: 1800,
          image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886"
        }
      ],
      totalAmount: 1800,
      currency: "INR",
      paymentMethod: "UPI Express",
      status: "SHIPPED",
      statusText: "In Transit with BlueDart Air",
      trackingNumber: "BD-90418294IN",
      createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
    },
    {
      id: "BRH-9104",
      customer: {
        name: "Meera Nair",
        email: "meera@designlab.in",
        phone: "+91 98112 34567",
        city: "Mumbai, Maharashtra",
        address: "Bandra West, Sea Face"
      },
      items: [
        {
          id: "prod-02",
          title: "TAT TVAM ASI — OVERSIZED T-SHIRT",
          size: "M",
          color: "Raw Cream",
          quantity: 2,
          price: 1800,
          image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/45.png?v=1789397586"
        }
      ],
      totalAmount: 3600,
      currency: "INR",
      paymentMethod: "Credit Card",
      status: "DELIVERED",
      statusText: "Delivered Successfully",
      trackingNumber: "BD-88421092IN",
      createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString()
    },
    {
      id: "BRH-7432",
      customer: {
        name: "Kabir Rawat",
        email: "kabir.rawat@urbanstyle.com",
        phone: "+91 98234 11223",
        city: "New Delhi, Delhi",
        address: "18 Barakhamba Road, Connaught Place"
      },
      items: [
        {
          id: "prod-03",
          title: "INDRA / इंद्र — OVERSIZED T-SHIRT",
          size: "XL",
          quantity: 1,
          price: 1800,
          image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Indraproexp1.png?v=1788422946"
        }
      ],
      totalAmount: 1800,
      currency: "INR",
      paymentMethod: "UPI Express",
      status: "PROCESSING",
      statusText: "Processing in Tirupur Dispatch Chamber",
      trackingNumber: "BD-71029482IN",
      createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString()
    },
    {
      id: "BRH-6291",
      customer: {
        name: "Ananya Sen",
        email: "ananya.sen@fashionweekly.in",
        phone: "+91 98450 99887",
        city: "Kolkata, West Bengal"
      },
      items: [
        {
          id: "prod-05",
          title: "KAAL / काल — OVERSIZED HOODIE",
          size: "M",
          quantity: 1,
          price: 2800,
          image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/kaal_pro_exp.png?v=1791633682"
        }
      ],
      totalAmount: 2800,
      currency: "INR",
      paymentMethod: "Cash on Delivery",
      status: "PENDING",
      statusText: "Awaiting Verification & Payment Confirmation",
      trackingNumber: "BD-62049182IN",
      createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
    }
  ];

  const fallbackCustomers = [
    {
      id: "cust-01",
      name: "Arjun Verma",
      email: "arjun@example.com",
      phone: "+91 98765 43210",
      city: "Bengaluru, Karnataka",
      ordersCount: 6,
      totalSpent: 12600,
      tier: "VIP Collector",
      joinedDate: "14 Jan 2025",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: "cust-02",
      name: "Meera Nair",
      email: "meera@designlab.in",
      phone: "+91 98112 34567",
      city: "Mumbai, Maharashtra",
      ordersCount: 4,
      totalSpent: 9800,
      tier: "Gold Tier",
      joinedDate: "02 Feb 2025",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: "cust-03",
      name: "Kabir Rawat",
      email: "kabir.rawat@urbanstyle.com",
      phone: "+91 98234 11223",
      city: "New Delhi, Delhi",
      ordersCount: 9,
      totalSpent: 21400,
      tier: "VIP Collector",
      joinedDate: "18 Nov 2024",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces"
    },
    {
      id: "cust-04",
      name: "Ananya Sen",
      email: "ananya.sen@fashionweekly.in",
      phone: "+91 98450 99887",
      city: "Kolkata, West Bengal",
      ordersCount: 3,
      totalSpent: 5400,
      tier: "Silver Tier",
      joinedDate: "28 Mar 2025",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces"
    }
  ];

  // Fetch real-time products, orders, customers & metrics with bidirectional sync
  const fetchData = async () => {
    try {
      let anySuccess = false;

      // 1. Fetch Orders
      const resOrd = await fetch(`${API_BASE_URL}/api/admin/orders`);
      if (resOrd.ok) {
        const dataOrd = await resOrd.json();
        if (dataOrd.orders) {
          setOrders(dataOrd.orders);
          anySuccess = true;
        }
      } else {
        setOrders(prev => prev.length > 0 ? prev : fallbackOrders);
      }

      // 2. Fetch Products
      const resProd = await fetch(`${API_BASE_URL}/api/products`);
      if (resProd.ok) {
        const dataProd = await resProd.json();
        if (dataProd.products) {
          setProducts(dataProd.products);
          anySuccess = true;
        }
      } else {
        setProducts(prev => prev.length > 0 ? prev : fallbackProducts);
      }

      // 3. Fetch Customers
      const resCust = await fetch(`${API_BASE_URL}/api/admin/customers`);
      if (resCust.ok) {
        const dataCust = await resCust.json();
        if (dataCust.customers) {
          setCustomers(dataCust.customers);
          anySuccess = true;
        }
      } else {
        setCustomers(prev => prev.length > 0 ? prev : fallbackCustomers);
      }

      // 4. Fetch Analytics Metrics
      const resAna = await fetch(`${API_BASE_URL}/api/admin/analytics`);
      if (resAna.ok) {
        const dataAna = await resAna.json();
        setMetrics(dataAna.metrics);
        anySuccess = true;
      }

      if (anySuccess) {
        setIsLiveConnected(true);
        setLastSync(Date.now());
      }
    } catch (err) {
      // Graceful offline fallback
      setIsLiveConnected(false);
      setProducts(prev => prev.length > 0 ? prev : fallbackProducts);
      setOrders(prev => prev.length > 0 ? prev : fallbackOrders);
      setCustomers(prev => prev.length > 0 ? prev : fallbackCustomers);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3500); // 3.5s real-time live sync with Storefront & Server
    return () => clearInterval(interval);
  }, []);

  // Handler for product updates from inventory panel
  const handleUpdateProduct = async (id, payload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) fetchData();
    } catch {}
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <PhoenixLayout
      activeTab={activeTab}
      onSelectTab={handleTabChange}
      isLiveConnected={isLiveConnected}
      lastSync={lastSync}
    >
      {/* 1. Dashboard View */}
      {(activeTab === 'dashboard' || activeTab === 'analytics') && (
        <PhoenixEcommerceDashboard
          orders={orders.length > 0 ? orders : fallbackOrders}
          products={products.length > 0 ? products : fallbackProducts}
          customers={customers.length > 0 ? customers : fallbackCustomers}
          metrics={metrics}
          onRefresh={fetchData}
          isLiveConnected={isLiveConnected}
          onSelectTab={handleTabChange}
        />
      )}

      {/* 2. Products Manager View */}
      {activeTab === 'products' && (
        <PhoenixProductsManager
          products={products.length > 0 ? products : fallbackProducts}
          onRefresh={fetchData}
        />
      )}

      {/* 3. Add Product Panel View */}
      {activeTab === 'add-product' && (
        <AddProductPanel
          onProductAdded={() => {
            fetchData();
            setActiveTab('products');
          }}
          onCancel={() => setActiveTab('products')}
        />
      )}

      {/* 4. Orders Manager View */}
      {activeTab === 'orders' && (
        <PhoenixOrdersManager
          orders={orders.length > 0 ? orders : fallbackOrders}
          onRefresh={fetchData}
        />
      )}

      {/* 5. Customers Directory View */}
      {activeTab === 'customers' && (
        <PhoenixCustomersManager
          customers={customers.length > 0 ? customers : fallbackCustomers}
          onRefresh={fetchData}
        />
      )}

      {/* 6. Customer Details Panel View */}
      {activeTab === 'customer-details' && (
        <CustomerDetailsPanel
          onSelectTab={handleTabChange}
        />
      )}

      {/* 7. Inventory Matrix View */}
      {activeTab === 'inventory' && (
        <InventoryManager
          products={products.length > 0 ? products : fallbackProducts}
          onUpdateProduct={handleUpdateProduct}
        />
      )}

      {/* 8. Lookbook Manager View */}
      {activeTab === 'lookbook' && (
        <CommunityLookbookManager
          products={products.length > 0 ? products : fallbackProducts}
        />
      )}

      {/* 10. Batch & Scarcity View */}
      {activeTab === 'batch-scarcity' && (
        <BatchScarcityPanel
          products={products.length > 0 ? products : fallbackProducts}
        />
      )}

      {/* 11. Settings View */}
      {activeTab === 'settings' && (
        <StoreSettingsPanel />
      )}
    </PhoenixLayout>
  );
}
