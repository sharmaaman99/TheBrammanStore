# THE BRAHMMAN STORE — HIGH-FASHION EDITORIAL STREETWEAR PLATFORM
> **"PHILOSOPHY YOU CAN WEAR. ANCIENT THOUGHT / MODERN EXPRESSION."**
> Inspired by [The Brahmman Store](https://thebrahmmanstore.com/) — Indian Philosophy Streetwear Brand.

---

## 🏛️ Brand Identity & Aesthetic
- **Theme:** Brutalist, Minimalist, High-Fashion Archive Style ("Ancient Indian Philosophy Meets Modern Streetwear").
- **Color Palette:** Deep Monochrome (`#0a0a0a` Off-Black, `#ffffff` Crisp White, `#f4f4f0` Warm Stone/Beige, and subtle muted grey borders).
- **Typography:** Bold condensed sans-serif uppercase headings (`Syne`, `Space Grotesk`) paired with clean monospace index numbers (`JetBrains Mono`) and authentic bilingual English + Devanagari script titles (`कुण्डलिनी`, `तत्त्वमसि`, `इंद्र`, `परशुराम`, `काल`, `माया`, `शून्य`, `बोधि`).
- **Fabric Standards:** Heavyweight 260 GSM loopknit terry cotton for T-shirts and 400 GSM French terry for thermal crewnecks/hoodies, 100% bio-washed and pre-shrunk in Tirupur, Bharat.

---

## 📁 Repository Structure
```
E-ComersDemo/
├── E-ComersDemoWebsite/     # Modern Editorial Frontend Storefront (React, Tailwind, Framer Motion)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnnouncementBar.jsx   # Top marquee with dispatch telemetry & currency selector
│   │   │   ├── Navbar.jsx            # Sticky brutalist navbar with drawer triggers & search
│   │   │   ├── Hero.jsx              # Full-screen editorial banner with sharp CTAs
│   │   │   ├── BestsellersGrid.jsx   # 4-column minimal product grid with exposed borders
│   │   │   ├── MotionArchive.jsx     # Interactive horizontal draggable lookbook carousel (001—007)
│   │   │   ├── FourPillars.jsx       # The Four Pillars editorial identity cards (01—04)
│   │   │   ├── InfiniteMarquee.jsx   # Infinite buttery smooth scrolling ticker
│   │   │   ├── KaalChatWidget.jsx    # Floating AI Help Widget ("Kaal") with smart prompts
│   │   │   ├── CartDrawer.jsx        # Slide-out cart drawer with promo codes & checkout
│   │   │   ├── ProductDetailModal.jsx# Garment inspection modal with size guide & specs
│   │   │   ├── TrackOrderModal.jsx   # Live order tracking with visual timeline
│   │   │   ├── PolicyModal.jsx       # 7-day returns, shipping, and sizing protocols
│   │   │   ├── SearchModal.jsx       # Quick search modal across all silhouettes
│   │   │   └── Footer.jsx            # Minimalist footer with newsletter and Devanagari seal
│   │   ├── data/
│   │   │   └── productsData.js       # Authentic Brahmman collection and lookbook studies
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js               # Runs on port 3000
│
├── E-ComersDemoAdmin/       # 3D Interactive Admin Portal (React, Three.js, Tailwind, Framer Motion)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ThreeCanvas3D.jsx     # Interactive 3D Holographic Streetwear & Mandala WebGL Studio
│   │   │   ├── MetricsCards.jsx      # Gross Revenue, Orders, Live Traffic & Cotton Stock
│   │   │   ├── InventoryManager.jsx  # Real-time stock, price, and drop badge editor
│   │   │   ├── OrdersTable.jsx       # BlueDart logistics dispatcher & order status updates
│   │   │   └── KaalNeuralLogs.jsx    # Live AI query stream & sizing assistant logs
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js               # Runs on port 3001
│
├── E-ComersDemoServer/      # Core Express REST API & AI Backend
│   ├── index.js                     # Endpoints for Products, Orders, Tracking, Analytics & Kaal AI
│   └── package.json                 # Runs on port 5001
│
└── package.json             # Root monorepo orchestration scripts
```

---

## ⚡ Quick Start & Running the Project

### 1. Start the Backend Server (Port 5001)
```bash
cd E-ComersDemoServer
npm start
```
*API is accessible at `http://localhost:5001`.*

### 2. Start the Website Storefront (Port 3000)
```bash
cd E-ComersDemoWebsite
npm run dev
```
*Open `http://localhost:3000` in your browser.*

### 3. Start the 3D Admin Portal (Port 3001)
```bash
cd E-ComersDemoAdmin
npm run dev
```
*Open `http://localhost:3001` in your browser.*

---

## 🎯 Key Sections Implemented

1. **Top Announcement Bar & Sticky Navbar:**
   - Announcement: `"MADE IN BHARAT 🇮🇳 | WORLDWIDE SHIPPING 🌐"` with dispatch telemetry beacon.
   - Sticky Header: Logo `"THE BRAHMMAN STORE"` with Devanagari subtitle, navigation links (*Home*, *All Products*, *Track Order*, *Store Policy*, *The Four Pillars*), multi-currency selector (`INR ₹`, `USD $`, `EUR €`, `GBP £`), quick search modal, and slide-out Cart Drawer.

2. **Hero Section:**
   - Full-screen editorial visual banner with high-contrast monochrome mood.
   - Bold typography: `"PHILOSOPHY YOU CAN WEAR. ANCIENT THOUGHT / MODERN EXPRESSION."`
   - Sharp-edged brutalist CTAs: `"SHOP NOW ↗"` and `"EXPLORE ARCHIVE ↓"`.
   - Architectural telemetry stamps: `260—400 GSM`, `COORD: 28.6139° N, 77.2090° E`, `निर्मितं भारते`.

3. **Bestsellers Product Grid:**
   - 4-column minimal grid with exposed border coordinates.
   - Bilingual Product Titles:
     - `KUNDALINI / कुण्डलिनी — OVERSIZED T-SHIRT` (Rs. 1,800.00)
     - `TAT TVAM ASI — OVERSIZED T-SHIRT` (Rs. 1,800.00)
     - `INDRA / इंद्र — OVERSIZED T-SHIRT` (Rs. 1,800.00)
     - `PARSHURAM / परशुराम — OVERSIZED T-SHIRT` (Rs. 1,800.00)
     - Plus winter drops: `KAAL / काल — OVERSIZED HOODIE` (Rs. 2,800.00) and `MAYA / माया` (Rs. 2,600.00).
   - Smooth image zoom on hover with angle toggle and quick "Add to Cart" size picker overlay.

4. **Motion Archive (Interactive Drag/Swipe Carousel):**
   - Header: `"MOTION ARCHIVE / 001—007 — A STUDY IN FASHION × PHILOSOPHY"`.
   - Horizontal draggable lookbook gallery with touch swipe, navigation arrows, and index counters (`VISUAL STUDY 01 / 07`, `02 / 07`, etc.).

5. **The Four Pillars (Editorial Grid Section):**
   - Title: `"OUR IDENTITY / 01—04 — BEYOND THE GARMENT"`.
   - 4 Interactive cards:
     - `01 / THE IDEA`: "PHILOSOPHY YOU CAN WEAR" (Ancient Indian thought in modern streetwear).
     - `02 / THE EXPRESSION`: "RARE BY DESIGN" (Original artwork inspired by cultural identity).
     - `03 / THE BUILD`: "HEAVYWEIGHT BY DESIGN" (Substantial cotton, structured oversized fit).
     - `04 / THE ORIGIN`: "ROOTED IN BHARAT" (Created in India for the world).

6. **Infinite Marquee Ticker:**
   - Buttery smooth infinite ticker banner: `"FASHION × PHILOSOPHY ★ MADE IN BHARAT • WORN EVERYWHERE •"`.

7. **Floating AI Help Widget ("Kaal"):**
   - Minimal bottom-right floating widget labeled `"काल KAAL // AI"`.
   - Interactive quick-prompt chips:
     - `Track my order →`
     - `Shipping & delivery →`
     - `Find my size →`
   - Real-time AI consultation powered by backend NLP engine with instant size calculations and BlueDart tracking lookup.

8. **Minimalist Footer:**
   - 7-Day returns policy modal, shipping guide, terms of service, newsletter subscription with instant feedback, currency selector, and Devanagari seal: `"सत्यमेव जयते • निर्मितं भारते विश्वस्य कृते"`.

9. **3D Admin Portal (`E-ComersDemoAdmin`):**
   - **Interactive 3D WebGL Studio (Three.js):**
     - Real-time rotating 3D architectural oversized silhouette sculpt, cosmic Kundalini torus knot, and Vedic polytope.
     - Interactive drag to rotate in 3D space, toggle Wireframe / Fiber Point Cloud / Solid Drape shading, vertical holographic laser scanning beam, rotation speed controller.
   - **Metrics & Telemetry:** Gross revenue, active completed orders, AOV, live site visitors ticker.
   - **Inventory Manager:** Inline stock & price editor synced to backend API.
   - **Logistics Dispatch Pipeline:** Update order statuses (`CONFIRMED` -> `DISPATCHED` -> `DELIVERED`) with live BlueDart tracking numbers.
   - **Kaal Neural Logs:** Real-time log stream of customer queries with confidence scoring.

---
© 2026 THE BRAHMMAN STORE. Built with React, Tailwind CSS, Framer Motion, and Three.js.
