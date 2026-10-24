require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, isMongoConnected, Product, Order, Customer, Lookbook, BatchScarcity, User } = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory Database initialized with authentic The Brahmman Store archive
let products = [
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
    description: "The dormant primordial cosmic energy coiled at the base of the spine. Kundalini awakens through rigorous self-mastery. Heavyweight luxury streetwear canvas crafted for effortless drape.",
    concept: "Kundalini represents the dormant serpentine spiritual energy within. This piece captures the ascent of consciousness with stark minimalist typography and brutalist backprint iconography.",
    images: [
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/3_51354c50-beed-4ec7-8d59-a3cabd790b62.png?v=1791985875",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/4_a3b77de0-85ce-4e52-8ea2-08bae3df5649.png?v=1791985875"
    ],
    badge: "BESTSELLER",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Obsidian Black", "Chalk White"],
    stock: 42,
    salesCount: 384,
    rating: 4.9,
    reviewsCount: 68
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
    description: "'Thou Art That' — The Mahavakya from the Chandogya Upanishad. The fundamental truth that individual consciousness is identical with the supreme cosmic reality.",
    concept: "Advaita Vedanta philosophy rendered into high-fashion archive streetwear. High-density puff print detailing on heavyweight combed yarn.",
    images: [
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/45.png?v=1789397586",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/46.png?v=1789397586",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/47.png?v=1789397586"
    ],
    badge: "ICONIC ARCHIVE",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Raw Cream", "Deep Onyx"],
    stock: 28,
    salesCount: 412,
    rating: 5.0,
    reviewsCount: 94
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
    description: "The King of Gods and wielder of Vajra (lightning bolt). Lord of storms, sky, and boundless cosmic authority. Cut from 260 GSM custom loopknit cotton.",
    concept: "Raw storm motifs juxtaposed against clean brutalist grid coordinates. Features reflective tonal branding on the sleeve.",
    images: [
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Indraproexp1.png?v=1788422946",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Indra_pro_exp_2.png?v=1788422988",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Indra_pro_exp_3.png?v=1788422988"
    ],
    badge: "LIMITED DROP",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Storm Grey", "Vajra Black"],
    stock: 19,
    salesCount: 295,
    rating: 4.8,
    reviewsCount: 52
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
    description: "The warrior sage. Master of the Parashu (celestial battleaxe), embodying untamed discipline and destruction of adharma. Engineered with reinforced seams.",
    concept: "The axe as an instrument of cosmic order and ego dissolution. Dual-tone silkscreen print on deep obsidian cotton.",
    images: [
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/parshuproexp.png?v=1788421632",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Parshu_pro_exp_1.png?v=1788421881",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Parshu_pro_exp_2.png?v=1788421881"
    ],
    badge: "HEAVYWEIGHT",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Earthy Sand"],
    stock: 35,
    salesCount: 341,
    rating: 4.9,
    reviewsCount: 73
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
    description: "Time, Death, and the Ultimate Inevitability. Kaal consumes all cosmic manifestations. Premium heavyweight thermal drape for brutal weather.",
    concept: "The eternal cycle of dissolution (Mahapralaya). Embossed high-density typography along the hood spine and cuff.",
    images: [
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/kaal_pro_exp.png?v=1791633682",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/kaal_pro_exp_1.png?v=1791633726",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/kaal_pro_exp_2.png?v=1791633724"
    ],
    badge: "WINTER ARCHIVE",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Abyssal Black", "Ash"],
    stock: 14,
    salesCount: 189,
    rating: 5.0,
    reviewsCount: 45
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
    description: "The grand cosmic illusion. The veil that manifests plurality from singular oneness. Finished with intricate lotus embroidery and rib knitted hems.",
    concept: "The paradoxical dance of form and void. Custom garment-dyed pastel shades with brutalist typography.",
    images: [
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/55_14772461-f8e1-41f4-868d-2e8988329195.png?v=1791192979",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Baby_Pink_Maya_Lotus_Sweatshirt.png?v=1791193280",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Baby_Pink_Embroidered_Crewneck_Sweatshirt.png?v=1791193280"
    ],
    badge: "NEW ARRIVAL",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Lotus Pink", "Lavender"],
    stock: 22,
    salesCount: 167,
    rating: 4.8,
    reviewsCount: 39
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
    description: "The Void from which everything emerges and to which everything dissolves. Zero as infinity.",
    concept: "Minimalist negative space aesthetics with subtle monochrome silkscreen stamps.",
    images: [
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/shunya_pro_exp.png?v=1788419827",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/rs1_pro_exp_1.png?v=1788414778",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/rs1_pro_exp_2.png?v=1788414964"
    ],
    badge: "EDITORIAL",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pure Void Black"],
    stock: 18,
    salesCount: 198,
    rating: 4.9,
    reviewsCount: 42
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
    description: "Awakening, Enlightenment, Supreme Perception. The moment when illusion ceases and eternal reality shines forth.",
    concept: "Architectural typographic layout with Sanskrit shlokas rendered in muted silver thread.",
    images: [
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/bodhi_pro_exp.png?v=1788417381",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/brodhi_pro_exp_1.png?v=1788417810",
      "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/brodhi_pro_exp_2.png?v=1788417811"
    ],
    badge: "CORE ARCHIVE",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sage Slate", "Carbon"],
    stock: 25,
    salesCount: 220,
    rating: 5.0,
    reviewsCount: 57
  }
];

// In-Memory Orders with authentic lifecycle states
let orders = [
  {
    id: "BRH-8821",
    customer: {
      name: "Arjun Verma",
      email: "arjun@example.com",
      phone: "+91 98765 43210",
      city: "Bengaluru, Karnataka",
      pincode: "560001",
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
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    timeline: [
      { title: "Order Confirmed", time: "2026-10-21 10:14", done: true, desc: "Order payment verified via UPI." },
      { title: "Woven & Prepared in Bharat", time: "2026-10-21 16:30", done: true, desc: "260 GSM Terry Combed Cotton inspected and packed." },
      { title: "Dispatched via Bluedart Air", time: "2026-10-22 08:45", done: true, desc: "Airway Bill generated (BD-90418294IN)." },
      { title: "Out for Delivery", time: "Expected Tomorrow", done: false, desc: "Delivery hub processing package." },
      { title: "Delivered", time: "Estimated 23 Oct", done: false, desc: "Direct handoff at your doorstep." }
    ]
  },
  {
    id: "BRH-9104",
    customer: {
      name: "Meera Nair",
      email: "meera@designlab.in",
      phone: "+91 98112 34567",
      city: "Mumbai, Maharashtra",
      pincode: "400050",
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
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    timeline: [
      { title: "Order Confirmed", time: "2026-10-19 14:02", done: true, desc: "Order payment verified." },
      { title: "Woven & Prepared in Bharat", time: "2026-10-19 18:20", done: true, desc: "Quality inspected." },
      { title: "Dispatched via Bluedart Air", time: "2026-10-20 09:15", done: true, desc: "Departed hub." },
      { title: "Out for Delivery", time: "2026-10-21 11:30", done: true, desc: "Courier out for delivery." },
      { title: "Delivered", time: "2026-10-21 14:48", done: true, desc: "Signed by recipient." }
    ]
  },
  {
    id: "BRH-7432",
    customer: {
      name: "Kabir Rawat",
      email: "kabir.rawat@urbanstyle.com",
      phone: "+91 98234 11223",
      city: "New Delhi, Delhi",
      pincode: "110001",
      address: "18 Barakhamba Road, Connaught Place"
    },
    items: [
      {
        id: "prod-03",
        title: "INDRA / इंद्र — OVERSIZED T-SHIRT",
        size: "XL",
        color: "Storm Grey",
        quantity: 1,
        price: 1800,
        image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Indraproexp1.png?v=1788422946"
      },
      {
        id: "prod-04",
        title: "PARSHURAM / परशुराम — OVERSIZED T-SHIRT",
        size: "L",
        color: "Black",
        quantity: 1,
        price: 1800,
        image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/parshuproexp.png?v=1788421632"
      }
    ],
    totalAmount: 3600,
    currency: "INR",
    paymentMethod: "UPI Express",
    status: "PROCESSING",
    statusText: "Processing in Tirupur Dispatch Chamber",
    trackingNumber: "BD-71029482IN",
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    timeline: [
      { title: "Order Confirmed", time: "Today 08:30", done: true, desc: "Payment received via PhonePe UPI." },
      { title: "Woven & Prepared in Bharat", time: "In Progress", done: true, desc: "Custom loopknit batch tagged." },
      { title: "Dispatched via Bluedart Air", time: "Awaiting pickup", done: false, desc: "Scheduled for evening hub dispatch." },
      { title: "Out for Delivery", time: "Pending", done: false, desc: "Local courier handoff." },
      { title: "Delivered", time: "Estimated 2 Days", done: false, desc: "Doorstep delivery." }
    ]
  },
  {
    id: "BRH-6291",
    customer: {
      name: "Ananya Sen",
      email: "ananya.sen@fashionweekly.in",
      phone: "+91 98450 99887",
      city: "Kolkata, West Bengal",
      pincode: "700019",
      address: "7 Ballygunge Circular Road"
    },
    items: [
      {
        id: "prod-05",
        title: "KAAL / काल — OVERSIZED HOODIE",
        size: "M",
        color: "Abyssal Black",
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
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    timeline: [
      { title: "Order Confirmed", time: "Today 14:15", done: true, desc: "Order submitted via Storefront." },
      { title: "Woven & Prepared in Bharat", time: "Queue", done: false, desc: "Awaiting inventory release." },
      { title: "Dispatched via Bluedart Air", time: "Pending", done: false, desc: "AWB pending generation." },
      { title: "Out for Delivery", time: "Pending", done: false, desc: "Local courier handoff." },
      { title: "Delivered", time: "Estimated 4 Days", done: false, desc: "Cash on delivery collection." }
    ]
  },
  {
    id: "BRH-5109",
    customer: {
      name: "Vikram Malhotra",
      email: "vikram.m@royaltech.in",
      phone: "+91 97123 44556",
      city: "Jaipur, Rajasthan",
      pincode: "302001",
      address: "15 C-Scheme, Ashok Nagar"
    },
    items: [
      {
        id: "prod-06",
        title: "MAYA / माया — OVERSIZED SWEATSHIRT",
        size: "XL",
        color: "Lotus Pink",
        quantity: 1,
        price: 2600,
        image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/55_14772461-f8e1-41f4-868d-2e8988329195.png?v=1791192979"
      }
    ],
    totalAmount: 2600,
    currency: "INR",
    paymentMethod: "Debit Card",
    status: "SHIPPED",
    statusText: "In Transit with BlueDart Air Express",
    trackingNumber: "BD-51092837IN",
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    timeline: [
      { title: "Order Confirmed", time: "Yesterday 11:20", done: true, desc: "Card authorization completed." },
      { title: "Woven & Prepared in Bharat", time: "Yesterday 16:00", done: true, desc: "Seals verified & packaged." },
      { title: "Dispatched via Bluedart Air", time: "Yesterday 20:30", done: true, desc: "Departed hub in transit." },
      { title: "Out for Delivery", time: "Expected Today", done: false, desc: "Package reached Jaipur facility." },
      { title: "Delivered", time: "Estimated Tomorrow", done: false, desc: "Doorstep delivery." }
    ]
  },
  {
    id: "BRH-4418",
    customer: {
      name: "Priya Kapoor",
      email: "priya.kapoor@studioarc.com",
      phone: "+91 99887 77665",
      city: "Hyderabad, Telangana",
      pincode: "500034",
      address: "Banjara Hills, Road No. 12"
    },
    items: [
      {
        id: "prod-07",
        title: "SHUNYA / शून्य — OVERSIZED SHIRT",
        size: "M",
        color: "Pure Void Black",
        quantity: 1,
        price: 1800,
        image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/shunya_pro_exp.png?v=1788419827"
      },
      {
        id: "prod-08",
        title: "BODHI / बोधि — OVERSIZED SWEATSHIRT",
        size: "L",
        color: "Sage Slate",
        quantity: 1,
        price: 2600,
        image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/bodhi_pro_exp.png?v=1788417381"
      }
    ],
    totalAmount: 4400,
    currency: "INR",
    paymentMethod: "UPI Express",
    status: "DELIVERED",
    statusText: "Delivered Successfully to Collector",
    trackingNumber: "BD-44182930IN",
    createdAt: new Date(Date.now() - 96 * 3600 * 1000).toISOString(),
    timeline: [
      { title: "Order Confirmed", time: "4 Days Ago", done: true, desc: "Verified." },
      { title: "Woven & Prepared in Bharat", time: "3 Days Ago", done: true, desc: "Fabric prepared." },
      { title: "Dispatched via Bluedart Air", time: "2 Days Ago", done: true, desc: "Transit." },
      { title: "Out for Delivery", time: "Yesterday", done: true, desc: "Courier out." },
      { title: "Delivered", time: "Yesterday 16:30", done: true, desc: "Delivered to Priya." }
    ]
  },
  {
    id: "BRH-3382",
    customer: {
      name: "Rohan Varma",
      email: "rohan.v@velocity.io",
      phone: "+91 98334 55667",
      city: "Pune, Maharashtra",
      pincode: "411006",
      address: "Koregaon Park, Lane 7"
    },
    items: [
      {
        id: "prod-01",
        title: "KUNDALINI / कुण्डलिनी — OVERSIZED T-SHIRT",
        size: "M",
        color: "Obsidian Black",
        quantity: 1,
        price: 1800,
        image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886"
      }
    ],
    totalAmount: 1800,
    currency: "INR",
    paymentMethod: "Net Banking",
    status: "CANCELLED",
    statusText: "Cancelled by Customer — Refund Issued",
    trackingNumber: "BD-33829104IN",
    createdAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    timeline: [
      { title: "Order Confirmed", time: "2 Days Ago", done: true, desc: "Payment processed." },
      { title: "Order Cancelled", time: "Yesterday", done: true, desc: "Customer requested cancellation." }
    ]
  },
  {
    id: "BRH-2195",
    customer: {
      name: "Dev Sharma",
      email: "dev.sharma@matrixcorp.in",
      phone: "+91 98980 12345",
      city: "Ahmedabad, Gujarat",
      pincode: "380015",
      address: "Bodakdev, SG Highway"
    },
    items: [
      {
        id: "prod-02",
        title: "TAT TVAM ASI — OVERSIZED T-SHIRT",
        size: "XL",
        color: "Raw Cream",
        quantity: 1,
        price: 1800,
        image: "https://cdn.shopify.com/s/files/1/0665/6638/9834/files/45.png?v=1789397586"
      }
    ],
    totalAmount: 1800,
    currency: "INR",
    paymentMethod: "UPI Express",
    status: "PROCESSING",
    statusText: "In Quality Inspection Chamber",
    trackingNumber: "BD-21958291IN",
    createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    timeline: [
      { title: "Order Confirmed", time: "Today 10:05", done: true, desc: "Payment received." },
      { title: "Woven & Prepared in Bharat", time: "In Progress", done: true, desc: "Inspecting seams." },
      { title: "Dispatched via Bluedart Air", time: "Pending", done: false, desc: "Awaiting airway label." },
      { title: "Out for Delivery", time: "Pending", done: false, desc: "Scheduled." },
      { title: "Delivered", time: "Estimated 2 Days", done: false, desc: "Direct handoff." }
    ]
  }
];

// In-Memory Customers Directory matching Phoenix Customer Manager
let customers = [
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
  },
  {
    id: "cust-05",
    name: "Vikram Malhotra",
    email: "vikram.m@royaltech.in",
    phone: "+91 97123 44556",
    city: "Jaipur, Rajasthan",
    ordersCount: 5,
    totalSpent: 11200,
    tier: "Gold Tier",
    joinedDate: "09 Dec 2024",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces"
  },
  {
    id: "cust-06",
    name: "Priya Kapoor",
    email: "priya.kapoor@studioarc.com",
    phone: "+91 99887 77665",
    city: "Hyderabad, Telangana",
    ordersCount: 7,
    totalSpent: 16800,
    tier: "VIP Collector",
    joinedDate: "15 Oct 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces"
  },
  {
    id: "cust-07",
    name: "Rohan Varma",
    email: "rohan.v@velocity.io",
    phone: "+91 98334 55667",
    city: "Pune, Maharashtra",
    ordersCount: 2,
    totalSpent: 3600,
    tier: "New Collector",
    joinedDate: "12 Apr 2025",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces"
  },
  {
    id: "cust-08",
    name: "Dev Sharma",
    email: "dev.sharma@matrixcorp.in",
    phone: "+91 98980 12345",
    city: "Ahmedabad, Gujarat",
    ordersCount: 4,
    totalSpent: 8900,
    tier: "Silver Tier",
    joinedDate: "05 Jan 2025",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces"
  }
];

// In-Memory Curated Community Streetwear Lookbook (6 Curated Looks + User Submissions)
let lookbookPosts = [
  {
    id: "look-01",
    creatorHandle: "@kabir.raw",
    creatorName: "Kabir Rawat",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    city: "Mumbai, MH",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
    taggedProducts: ["kundalini", "parshuram"],
    taggedProductHandles: ["kundalini", "parshuram"],
    likes: 3420,
    caption: "Layered the Kundalini 260 GSM boxy cut with distressed tech cargo. Heavy drape holds posture all evening.",
    curated: true,
    curationStatus: "approved",
    createdAt: "2026-10-21T14:20:00.000Z"
  },
  {
    id: "look-02",
    creatorHandle: "@ananya_delhi",
    creatorName: "Ananya Sen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
    city: "New Delhi, DL",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80",
    taggedProducts: ["tat-tvam-asi"],
    taggedProductHandles: ["tat-tvam-asi"],
    likes: 2890,
    caption: "Thou Art That in Raw Cream. Minimal shloka puff print in brutalist Connaught Place shadows.",
    curated: true,
    curationStatus: "approved",
    createdAt: "2026-10-21T18:45:00.000Z"
  },
  {
    id: "look-03",
    creatorHandle: "@zayd_streetwear",
    creatorName: "Zayd Merchant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    city: "Bengaluru, KA",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=80",
    taggedProducts: ["indra"],
    taggedProductHandles: ["indra"],
    likes: 1950,
    caption: "Indra drop shoulder tee on concrete terraces. High density loopknit that doesn't collapse.",
    curated: true,
    curationStatus: "approved",
    createdAt: "2026-10-22T09:12:00.000Z"
  },
  {
    id: "look-04",
    creatorHandle: "@priya_k_vault",
    creatorName: "Priya Kapoor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    city: "Kolkata, WB",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=80",
    taggedProducts: ["kaal", "bodhi"],
    taggedProductHandles: ["kaal", "bodhi"],
    likes: 4120,
    caption: "400 GSM French Terry Kaal hoodie. Thermal silhouette feels like wearable architecture.",
    curated: true,
    curationStatus: "approved",
    createdAt: "2026-10-22T13:30:00.000Z"
  },
  {
    id: "look-05",
    creatorHandle: "@arjun_archival",
    creatorName: "Arjun Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    city: "Chandigarh, PB",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80",
    taggedProducts: ["parshuram"],
    taggedProductHandles: ["parshuram"],
    likes: 2540,
    caption: "Warrior asceticism. Parshuram backprint silkscreen detailing up close.",
    curated: true,
    curationStatus: "approved",
    createdAt: "2026-10-22T16:05:00.000Z"
  },
  {
    id: "look-06",
    creatorHandle: "@dev_sharma_",
    creatorName: "Dev Sharma",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces",
    city: "Hyderabad, TS",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=80",
    taggedProducts: ["maya", "shunya"],
    taggedProductHandles: ["maya", "shunya"],
    likes: 3105,
    caption: "Maya pastel sweatshirt with Shunya minimal styling. High luxury Bharat street code.",
    curated: true,
    curationStatus: "approved",
    createdAt: "2026-10-22T19:50:00.000Z"
  },
  {
    id: "look-07",
    creatorHandle: "@rohan.street",
    creatorName: "Rohan V.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    city: "Pune, MH",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=900&auto=format&fit=crop&q=80",
    taggedProducts: ["kundalini"],
    taggedProductHandles: ["kundalini"],
    likes: 540,
    caption: "Clean oversized fit with chunky runners in KP Pune.",
    curated: false,
    curationStatus: "pending",
    createdAt: "2026-10-23T06:10:00.000Z"
  },
  {
    id: "look-08",
    creatorHandle: "@meera.stylelab",
    creatorName: "Meera Menon",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    city: "Kochi, KL",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&auto=format&fit=crop&q=80",
    taggedProducts: ["bodhi"],
    taggedProductHandles: ["bodhi"],
    likes: 720,
    caption: "Bodhi slate sweatshirt paired with linen wide-leg pants.",
    curated: false,
    curationStatus: "pending",
    createdAt: "2026-10-23T08:30:00.000Z"
  }
];

// In-Memory Batch & Scarcity Inventory Drop State
let batchScarcity = {
  batchTitle: "Batch 04 // Spring 2026 Archive",
  dropNumber: "DROP-04",
  status: "ACTIVE", // ACTIVE | SCHEDULED | SOLD_OUT | COMPLETED
  dispatchCountdownTarget: new Date(Date.now() + 4 * 24 * 3600 * 1000 + 14 * 3600 * 1000).toISOString(),
  lowStockThreshold: 15,
  totalBatchUnits: 500,
  allocatedUnits: 412,
  remainingUnits: 88,
  scarcityWarningEnabled: true,
  scarcityMessage: "Only 88 archive pieces remaining in Batch 04 across all silhouettes.",
  allowWaitlist: true,
  vaultStatus: "CONSECRATED_RELEASE",
  lastUpdated: new Date().toISOString()
};

// In-Memory Customer Size Fit Analytics
let fitAnalytics = {
  trends: {
    S: 10,
    M: 25,
    L: 45,
    XL: 15,
    XXL: 5
  },
  counts: {
    S: 184,
    M: 460,
    L: 829,
    XL: 276,
    XXL: 93
  },
  totalSubmissions: 1842,
  dominantSize: "L",
  fitPreferences: {
    "Boxy Oversized (Signature)": 58,
    "Standard Relaxed": 27,
    "Tailored Street Drape": 15
  },
  sizeDistribution: [
    { size: "S", percentage: 10, count: 184, label: "Small (Drop Hem)", chestRange: "38-40 in", avgHeight: "165-172 cm" },
    { size: "M", percentage: 25, count: 460, label: "Medium (Relaxed)", chestRange: "41-43 in", avgHeight: "172-178 cm" },
    { size: "L", percentage: 45, count: 829, label: "Large (Signature Boxy)", chestRange: "44-46 in", avgHeight: "178-185 cm" },
    { size: "XL", percentage: 15, count: 276, label: "X-Large (Architectural)", chestRange: "47-49 in", avgHeight: "185-190 cm" },
    { size: "XXL", percentage: 5, count: 93, label: "2X-Large (Maximalist)", chestRange: "50-52 in", avgHeight: "190+ cm" }
  ],
  recentLogs: [
    { id: "fit-101", size: "L", height: "182 cm", weight: "81 kg", preferredFit: "Signature Boxy Drape", productHandle: "kundalini", timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
    { id: "fit-102", size: "M", height: "175 cm", weight: "69 kg", preferredFit: "Standard Relaxed", productHandle: "tat-tvam-asi", timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString() },
    { id: "fit-103", size: "L", height: "180 cm", weight: "79 kg", preferredFit: "Signature Boxy Drape", productHandle: "kaal", timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString() },
    { id: "fit-104", size: "XL", height: "187 cm", weight: "94 kg", preferredFit: "Architectural Drape", productHandle: "indra", timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString() },
    { id: "fit-105", size: "S", height: "167 cm", weight: "59 kg", preferredFit: "Tailored Street Drape", productHandle: "maya", timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString() }
  ]
};

// Kaal AI Knowledge Base & Assistant Engine
function getKaalResponse(query, context = {}) {
  const lower = query.toLowerCase().trim();

  // 1. Order tracking
  const orderMatch = lower.match(/(?:brh-?\d{4,6}|\d{4,6})/i);
  if (lower.includes("track") || lower.includes("status") || lower.includes("where is my order") || orderMatch) {
    if (orderMatch) {
      const cleaned = orderMatch[0].toUpperCase().startsWith("BRH-") ? orderMatch[0].toUpperCase() : `BRH-${orderMatch[0].toUpperCase()}`;
      const found = orders.find(o => o.id.toUpperCase() === cleaned || o.trackingNumber.toUpperCase().includes(orderMatch[0].toUpperCase()));
      if (found) {
        return {
          reply: `Order #${found.id} located. Status: ${found.status} (${found.statusText}). Tracking: ${found.trackingNumber}. Estimated arrival: 24-48 hrs via BlueDart Express.`,
          orderData: found,
          action: "VIEW_ORDER"
        };
      } else {
        return {
          reply: `I searched the archives for ${orderMatch[0]}, but no active dispatch matches that ID yet. Try checking order ID format (e.g. BRH-8821 or BRH-9104) or ask our dispatch concierge.`,
          action: "ORDER_NOT_FOUND"
        };
      }
    }
    return {
      reply: "Please provide your Order ID (e.g., BRH-8821) or phone number, and I will pull real-time dispatch coordinates directly from our logistics terminal.",
      action: "PROMPT_ORDER_ID"
    };
  }

  // 2. Sizing advice & Sizing logic
  if (lower.includes("size") || lower.includes("fit") || lower.includes("height") || lower.includes("weight") || lower.includes("sizing") || lower.includes("chart")) {
    const heightMatch = lower.match(/(\d{2,3})\s*(?:cm|cms|ft|inch|inches)?/);
    const weightMatch = lower.match(/(\d{2,3})\s*(?:kg|kgs|lbs)?/);

    return {
      reply: `All our garments are cut in an authentic brutalist boxy oversized silhouette with drop shoulders.

• Height < 5'7" (170cm) / Weight < 65kg ➔ Choose Size S (still relaxed & roomy)
• Height 5'7" - 5'10" (170-178cm) / Weight 65-78kg ➔ Choose Size M
• Height 5'10" - 6'1" (178-185cm) / Weight 78-90kg ➔ Choose Size L (classic high-fashion streetwear drape)
• Height > 6'1" (185cm+) / Weight > 90kg ➔ Choose Size XL / XXL

If you want an extra exaggerated aesthetic drape, size up one size. If you prefer a tailored fit, size down one size.`,
      action: "SIZE_RECOMMENDATION"
    };
  }

  // 3. Fabric & Quality
  if (lower.includes("fabric") || lower.includes("gsm") || lower.includes("material") || lower.includes("cotton") || lower.includes("quality")) {
    return {
      reply: "We exclusively craft in 260 GSM loopknit terry cotton for T-shirts and 400 GSM heavyweight French terry for our Sweatshirts and Hoodies. 100% combed cotton, bio-washed and pre-shrunk in Tirupur, Bharat. Designed to hold architectural shape wash after wash.",
      action: "FABRIC_DETAILS"
    };
  }

  // 4. Shipping & Delivery
  if (lower.includes("shipping") || lower.includes("delivery") || lower.includes("time") || lower.includes("days") || lower.includes("cod")) {
    return {
      reply: "We provide Free Express Delivery across India (3–5 business days). International shipping is dispatched via DHL Express worldwide (5–8 business days). Cash on Delivery (COD) and all major UPI/Cards/EMI are supported at checkout.",
      action: "SHIPPING_INFO"
    };
  }

  // 5. Philosophy inquiries
  if (lower.includes("brahmman") || lower.includes("philosophy") || lower.includes("kundalini") || lower.includes("tat tvam asi") || lower.includes("meaning") || lower.includes("idea")) {
    return {
      reply: "THE BRAHMMAN STORE was born from a singular conviction: Ancient Indian Philosophy is not meant to stay trapped in manuscripts; it is meant to be lived and worn. From Advaita (non-duality) in Tat Tvam Asi to cosmic energy in Kundalini and warrior asceticism in Parshuram, every drop is an archive visual study.",
      action: "BRAND_PHILOSOPHY"
    };
  }

  // 6. Return / Exchange policy
  if (lower.includes("return") || lower.includes("exchange") || lower.includes("refund")) {
    return {
      reply: "We offer a 7-Day Hassle-Free Exchange policy for unworn items with original tags intact. If your size isn't the exact fit you envisioned, we will arrange a reverse pickup from your doorstep.",
      action: "RETURN_POLICY"
    };
  }

  // Default intelligent Kaal response
  return {
    reply: `Greetings from Kaal (काल) — your guide to The Brahmman Store archive. How may I assist you today? You can ask about our 260/400 GSM fabric builds, find your perfect oversized fit, track an active order, or explore the philosophical concepts behind our drops.`,
    action: "GENERAL"
  };
}

// ---------------- MONGODB INITIALIZATION ----------------
connectDB({ products, orders, customers });

// ---------------- REST API ROUTES ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'The Brahmman Store Core API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: isMongoConnected() ? 'MONGODB_CONNECTED' : 'IN_MEMORY_FALLBACK',
    mongodb: isMongoConnected()
  });
});

// ---------------- AUTHENTICATION ROUTES (MongoDB Powered) ----------------

// 1. User Registration (POST /api/auth/register)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isMongoConnected()) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists. Please log in.'
        });
      }

      const newUser = new User({
        name: name.trim(),
        email: cleanEmail,
        phone: phone || '+91 98765 43210',
        tier: 'Vedic Collector Archive',
        role: 'customer'
      });
      newUser.setPassword(password);
      await newUser.save();

      // Also ensure customer appears in Admin CRM
      try {
        await Customer.findOneAndUpdate(
          { email: cleanEmail },
          {
            id: `cust-${Date.now().toString().slice(-4)}`,
            name: newUser.name,
            email: cleanEmail,
            phone: newUser.phone,
            tier: newUser.tier,
            ordersCount: 0,
            totalSpent: 0
          },
          { upsert: true, new: true }
        );
      } catch (e) {}

      const token = `brh_token_${newUser._id}_${Date.now()}`;
      return res.status(201).json({
        success: true,
        message: 'Account created successfully in The Brahmman Store archive.',
        user: newUser.toSafeObject(),
        token
      });
    } else {
      // In-Memory Fallback if MongoDB is temporarily unavailable
      const fallbackUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: name.trim(),
        email: cleanEmail,
        phone: phone || '+91 98765 43210',
        tier: 'Vedic Collector Archive',
        memberSince: 'October 2026'
      };
      return res.status(201).json({
        success: true,
        message: 'Account registered (local mode).',
        user: fallbackUser,
        token: `brh_token_local_${Date.now()}`
      });
    }
  } catch (error) {
    console.error('[AUTH ERROR] Register failed:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.'
    });
  }
});

// 2. User Login (POST /api/auth/login)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isMongoConnected()) {
      let user = await User.findOne({ email: cleanEmail });

      // If test user does not exist yet, auto-create on demand
      if (!user && cleanEmail === 'collector@thebrahmmanstore.com') {
        user = new User({
          name: 'Shiva Sharma',
          email: 'collector@thebrahmmanstore.com',
          phone: '+91 98765 43210',
          tier: 'Vedic Collector Archive',
          role: 'customer'
        });
        user.setPassword('password123');
        await user.save();
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'No account found with this email address.'
        });
      }

      const isValid = user.validatePassword(password);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect password. Please verify and try again.'
        });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = `brh_token_${user._id}_${Date.now()}`;
      return res.json({
        success: true,
        message: 'Welcome back to The Brahmman Store archive.',
        user: user.toSafeObject(),
        token
      });
    } else {
      // In-Memory Fallback if MongoDB is offline
      if (password === 'password123' || password.length >= 6) {
        const fallbackUser = {
          id: 'usr-mock',
          name: 'Shiva Sharma',
          email: cleanEmail,
          phone: '+91 98765 43210',
          tier: 'Vedic Collector Archive',
          memberSince: 'October 2026'
        };
        return res.json({
          success: true,
          message: 'Logged in successfully (offline fallback).',
          user: fallbackUser,
          token: `brh_token_mock_${Date.now()}`
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }
  } catch (error) {
    console.error('[AUTH ERROR] Login failed:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.'
    });
  }
});

// 3. User Logout (POST /api/auth/logout)
app.post('/api/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Signed out successfully from The Brahmman Store session.'
  });
});

// 4. Get Current User / Profile (GET /api/auth/me)
app.get('/api/auth/me', async (req, res) => {
  try {
    const email = req.query.email;
    if (email && isMongoConnected()) {
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (user) {
        return res.json({ success: true, user: user.toSafeObject() });
      }
    }
    res.json({ success: false, message: 'Not authenticated or user not found.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Get All Users (Admin overview - GET /api/auth/users)
app.get('/api/auth/users', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const users = await User.find().select('-passwordHash -passwordSalt').sort({ createdAt: -1 });
      return res.json({ success: true, count: users.length, users });
    }
    res.json({ success: true, count: 0, users: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Products: List all
app.get('/api/products', async (req, res) => {
  const { collection, gsm, search, category } = req.query;
  let results = [];

  if (isMongoConnected()) {
    try {
      const filter = {};
      if (category && category !== 'All') {
        filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      results = await Product.find(filter).lean();
    } catch (e) {
      results = [];
    }
  }

  if (!results || results.length === 0) {
    results = [...products];
    if (category && category !== 'All') {
      results = results.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const s = search.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(s) ||
        (p.nameDevanagari && p.nameDevanagari.includes(s)) ||
        (p.description && p.description.toLowerCase().includes(s))
      );
    }

    if (gsm) {
      results = results.filter(p => p.gsm && p.gsm.includes(gsm));
    }
  }

  res.json({
    success: true,
    count: results.length,
    products: results,
    dataSource: isMongoConnected() ? 'MongoDB' : 'InMemory'
  });
});

// Products: Single by ID or handle
app.get('/api/products/:identifier', (req, res) => {
  const { identifier } = req.params;
  const product = products.find(p => p.id === identifier || p.handle === identifier);
  if (!product) {
    return res.status(404).json({ success: false, message: "Garment not found in archive." });
  }
  res.json({ success: true, product });
});

// Orders: Create new order
app.post('/api/orders', (req, res) => {
  const { customer, items, totalAmount, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Order must contain at least one item." });
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newOrderId = `BRH-${randomNum}`;
  const now = new Date();

  const newOrder = {
    id: newOrderId,
    customer: customer || {
      name: "Valued Collector",
      email: "collector@thebrahmmanstore.com",
      phone: "+91 99999 00000",
      city: "New Delhi",
      pincode: "110001",
      address: "Connaught Place, Central Delhi"
    },
    items,
    totalAmount: totalAmount || items.reduce((acc, i) => acc + (i.price * i.quantity), 0),
    currency: "INR",
    paymentMethod: paymentMethod || "UPI Express",
    status: "CONFIRMED",
    statusText: "Processing in Dispatch Chamber",
    trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
    createdAt: now.toISOString(),
    timeline: [
      {
        title: "Order Confirmed",
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        done: true,
        desc: "Payment authorized. Verification code issued."
      },
      {
        title: "Woven & Prepared in Bharat",
        time: "In Progress",
        done: false,
        desc: "260 GSM heavyweight cotton batch assigned."
      },
      {
        title: "Dispatched via Bluedart Air",
        time: "Pending",
        done: false,
        desc: "Airway tracking bill awaiting pickup."
      },
      {
        title: "Out for Delivery",
        time: "Pending",
        done: false,
        desc: "Local courier handoff."
      },
      {
        title: "Delivered",
        time: "Estimated 3-4 Days",
        done: false,
        desc: "Hand delivery to recipient."
      }
    ]
  };

  orders.unshift(newOrder);

  // Sync to MongoDB if connected
  if (isMongoConnected()) {
    try {
      Order.create(newOrder).catch(err => console.warn('[MONGODB] Order sync:', err.message));
    } catch (e) {}
  }

  // Deduct inventory
  items.forEach(item => {
    const prod = products.find(p => p.id === item.id || p.handle === item.handle);
    if (prod && prod.stock > 0) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
      prod.salesCount = (prod.salesCount || 0) + item.quantity;
    }
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully in The Brahmman Store archive.",
    order: newOrder
  });
});

// Orders: Track single order
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const searchKey = orderId.toUpperCase().trim();
  const order = orders.find(o =>
    o.id.toUpperCase() === searchKey ||
    o.id.toUpperCase() === `BRH-${searchKey}` ||
    (o.customer.phone && o.customer.phone.includes(searchKey)) ||
    (o.trackingNumber && o.trackingNumber.toUpperCase().includes(searchKey))
  );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `No active order found with identifier "${orderId}". Verify your tracking ID.`
    });
  }

  res.json({
    success: true,
    order
  });
});

// AI Help Widget: "Kaal"
app.post('/api/chat/kaal', (req, res) => {
  const { message, context } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const response = getKaalResponse(message, context);
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    ...response
  });
});

// Admin: Analytics & metrics
app.get('/api/admin/analytics', (req, res) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 428000;
  const totalOrdersCount = orders.length + 184;
  const aov = Math.round(totalRevenue / totalOrdersCount);
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  const topSellers = [...products]
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      title: p.title,
      salesCount: p.salesCount,
      stock: p.stock,
      price: p.price,
      image: p.images[0]
    }));

  res.json({
    success: true,
    metrics: {
      totalRevenue,
      totalOrders: totalOrdersCount,
      averageOrderValue: aov,
      conversionRate: "3.84%",
      activeVisitors: Math.floor(48 + Math.random() * 25),
      totalStockRemaining: totalStock,
      recentOrders: orders.slice(0, 5),
      topSellers
    }
  });
});

// ---------------- ADMIN ENDPOINTS (Phoenix Admin & Storefront Sync) ----------------

// 1. GET /api/admin/orders - all orders with filtering by status & search
app.get('/api/admin/orders', (req, res) => {
  const { status, search } = req.query;
  let results = [...orders];

  if (status && status.toLowerCase() !== 'all') {
    const s = status.toUpperCase().trim();
    results = results.filter(o => {
      const orderStatus = (o.status || '').toUpperCase().trim();
      if (s === 'AWAITING PROCESSING' || s === 'PENDING') {
        return orderStatus === 'PENDING' || orderStatus === 'AWAITING PROCESSING';
      }
      if (s === 'PROCESSING') {
        return orderStatus === 'PROCESSING' || orderStatus === 'CONFIRMED' || orderStatus === 'IN_PROGRESS';
      }
      if (s === 'SHIPPED') {
        return orderStatus === 'SHIPPED' || orderStatus === 'DISPATCHED';
      }
      if (s === 'DELIVERED') {
        return orderStatus === 'DELIVERED';
      }
      if (s === 'CANCELLED') {
        return orderStatus === 'CANCELLED';
      }
      return orderStatus === s;
    });
  }

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(o =>
      (o.id && o.id.toLowerCase().includes(q)) ||
      (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q)) ||
      (o.paymentMethod && o.paymentMethod.toLowerCase().includes(q)) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(q)) ||
      (o.customer?.email && o.customer.email.toLowerCase().includes(q)) ||
      (o.customer?.phone && o.customer.phone.includes(q)) ||
      (o.customer?.city && o.customer.city.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    count: results.length,
    orders: results
  });
});

// 2. POST /api/admin/products - creates a new product in memory database
app.post('/api/admin/products', (req, res) => {
  const {
    title,
    handle,
    category,
    price,
    originalPrice,
    stock,
    gsm,
    fabric,
    fit,
    sizes,
    colors,
    images,
    image,
    description,
    badge,
    nameDevanagari,
    nameEnglish,
    subTitle
  } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "Product title is required." });
  }

  const generatedHandle = handle || title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const idNum = Math.floor(10 + Math.random() * 90);
  const newProduct = {
    id: `prod-${idNum}`,
    handle: generatedHandle,
    title,
    nameDevanagari: nameDevanagari || title.split('/')[1]?.split('—')[0]?.trim() || "ब्रह्मन्",
    nameEnglish: nameEnglish || title.split('/')[0]?.split('—')[0]?.trim() || title,
    subTitle: subTitle || (category ? `${category.toUpperCase()} SILHOUETTE` : "OVERSIZED T-SHIRT"),
    category: category || "Oversized",
    price: Number(price) || 1800,
    originalPrice: originalPrice ? Number(originalPrice) : (Number(price) ? Number(price) + 400 : 2200),
    currency: "INR",
    gsm: gsm || "260 GSM",
    fabric: fabric || "100% Terry Combed Cotton, Bio-Washed",
    fit: fit || "Unisex Boxy Oversized Silhouette, Drop Shoulder",
    description: description || "Heavyweight luxury streetwear canvas crafted for effortless drape.",
    concept: "Ancient thought rendered into modern expression.",
    images: Array.isArray(images) && images.length > 0 
      ? images 
      : (image ? [image] : ["https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886"]),
    badge: badge || "NEW ARRIVAL",
    sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes : ["S", "M", "L", "XL", "XXL"],
    colors: Array.isArray(colors) && colors.length > 0 ? colors : ["Obsidian Black"],
    stock: stock !== undefined ? Number(stock) : 30,
    salesCount: 0,
    rating: 5.0,
    reviewsCount: 1
  };

  products.unshift(newProduct);

  if (isMongoConnected()) {
    try {
      Product.create(newProduct).catch(err => console.warn('[MONGODB] Product insert:', err.message));
    } catch (e) {}
  }

  res.status(201).json({
    success: true,
    message: "Product created successfully in Brahmman database.",
    product: newProduct
  });
});

// 3. PUT /api/admin/products/:id - updates product details
app.put('/api/admin/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id || p.handle === id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const {
    title,
    handle,
    category,
    price,
    originalPrice,
    stock,
    gsm,
    fabric,
    fit,
    sizes,
    colors,
    images,
    image,
    description,
    badge,
    nameDevanagari,
    nameEnglish,
    subTitle
  } = req.body;

  if (title !== undefined) product.title = title;
  if (handle !== undefined) product.handle = handle;
  if (category !== undefined) product.category = category;
  if (price !== undefined) product.price = Number(price);
  if (originalPrice !== undefined) product.originalPrice = Number(originalPrice);
  if (stock !== undefined) product.stock = Number(stock);
  if (gsm !== undefined) product.gsm = gsm;
  if (fabric !== undefined) product.fabric = fabric;
  if (fit !== undefined) product.fit = fit;
  if (sizes !== undefined) product.sizes = sizes;
  if (colors !== undefined) product.colors = colors;
  if (images !== undefined) product.images = images;
  if (image !== undefined && (!images || images.length === 0)) product.images = [image];
  if (description !== undefined) product.description = description;
  if (badge !== undefined) product.badge = badge;
  if (nameDevanagari !== undefined) product.nameDevanagari = nameDevanagari;
  if (nameEnglish !== undefined) product.nameEnglish = nameEnglish;
  if (subTitle !== undefined) product.subTitle = subTitle;

  if (isMongoConnected()) {
    try {
      Product.findOneAndUpdate({ $or: [{ id }, { handle: id }] }, product, { new: true }).catch(err => console.warn('[MONGODB] Update error:', err.message));
    } catch (e) {}
  }

  res.json({
    success: true,
    message: `Product "${product.title}" updated successfully.`,
    product
  });
});

// 4. DELETE /api/admin/products/:id - removes product
app.delete('/api/admin/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id || p.handle === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const deleted = products.splice(index, 1)[0];

  if (isMongoConnected()) {
    try {
      Product.findOneAndDelete({ $or: [{ id }, { handle: id }] }).catch(err => console.warn('[MONGODB] Delete error:', err.message));
    } catch (e) {}
  }

  res.json({
    success: true,
    message: `Product "${deleted.title}" deleted from database.`,
    product: deleted
  });
});

// Backward compatibility: POST /api/admin/products/:id
app.post('/api/admin/products/:id', (req, res) => {
  const { id } = req.params;
  const { price, stock, badge } = req.body;
  const product = products.find(p => p.id === id || p.handle === id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (badge !== undefined) product.badge = badge;

  res.json({
    success: true,
    message: "Product updated successfully in Brahmman archive.",
    product
  });
});

// 5. PATCH /api/admin/orders/:orderId - updates order status: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
app.patch('/api/admin/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { status, statusText } = req.body;
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  if (status) {
    const s = status.toUpperCase().trim();
    order.status = s;

    // Synchronize friendly statusText and timeline
    if (s === 'PENDING') {
      order.statusText = statusText || "Awaiting Verification & Payment Confirmation";
    } else if (s === 'PROCESSING') {
      order.statusText = statusText || "Processing in Tirupur Dispatch Chamber";
      const step = order.timeline?.find(t => t.title.includes('Prepared') || t.title.includes('Woven'));
      if (step) step.done = true;
    } else if (s === 'SHIPPED' || s === 'DISPATCHED') {
      order.status = 'SHIPPED';
      order.statusText = statusText || "In Transit with BlueDart Air Express";
      const step = order.timeline?.find(t => t.title.includes('Dispatched'));
      if (step) step.done = true;
    } else if (s === 'DELIVERED') {
      order.statusText = statusText || "Delivered Successfully to Collector";
      order.timeline?.forEach(t => t.done = true);
    } else if (s === 'CANCELLED') {
      order.statusText = statusText || "Order Cancelled — Inventory Restocked";
    }
  }

  if (statusText) order.statusText = statusText;

  if (isMongoConnected()) {
    try {
      Order.findOneAndUpdate({ id: orderId }, order, { new: true }).catch(err => console.warn('[MONGODB] Order update error:', err.message));
    } catch (e) {}
  }

  res.json({
    success: true,
    message: `Order #${orderId} updated to ${order.status}.`,
    order
  });
});

// 6. GET /api/admin/customers - customer list with spend, orders count, email, city
app.get('/api/admin/customers', (req, res) => {
  const { search } = req.query;
  let results = [...customers];

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      (c.phone && c.phone.includes(q))
    );
  }

  res.json({
    success: true,
    count: results.length,
    customers: results
  });
});

// ---------------- COMMUNITY LOOKBOOK ENDPOINTS ----------------

// GET /api/lookbook: return curated community streetwear styling posts
app.get('/api/lookbook', (req, res) => {
  const { all, handle } = req.query;
  let results = [...lookbookPosts];

  if (handle) {
    results = results.filter(p =>
      (p.taggedProducts || []).includes(handle) ||
      (p.taggedProductHandles || []).includes(handle)
    );
  }

  // If all is true, return all; otherwise return curated (exactly 6 authentic curated looks)
  if (all !== 'true') {
    results = results.filter(p => p.curated === true);
  }

  // Enrich with tagged product data for luxury display
  const enriched = results.map(post => {
    const handles = post.taggedProducts || post.taggedProductHandles || [];
    const productsList = handles.map(h => {
      const prod = products.find(p => p.handle === h || p.id === h);
      return prod ? {
        id: prod.id,
        handle: prod.handle,
        title: prod.title,
        price: prod.price,
        image: prod.images[0],
        gsm: prod.gsm
      } : { handle: h, title: h.toUpperCase() };
    });

    return {
      ...post,
      taggedProductDetails: productsList
    };
  });

  res.json({
    success: true,
    count: enriched.length,
    posts: enriched
  });
});

// POST /api/lookbook: submit/create community styling look
app.post('/api/lookbook', (req, res) => {
  const {
    creatorHandle,
    creatorName,
    avatar,
    city,
    image,
    taggedProducts,
    taggedProductHandles,
    caption,
    likes,
    curated
  } = req.body;

  if (!creatorHandle || !image) {
    return res.status(400).json({ success: false, message: "creatorHandle and image are required." });
  }

  const tags = taggedProducts || taggedProductHandles || [];
  const isCurated = curated !== undefined ? Boolean(curated) : false;

  const newLook = {
    id: `look-0${lookbookPosts.length + 1}`,
    creatorHandle: creatorHandle.startsWith('@') ? creatorHandle : `@${creatorHandle}`,
    creatorName: creatorName || creatorHandle.replace('@', ''),
    avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    city: city || "Bharat",
    image,
    taggedProducts: tags,
    taggedProductHandles: tags,
    likes: typeof likes === 'number' ? likes : 0,
    caption: caption || "Streetwear archive styling look.",
    curated: isCurated,
    curationStatus: isCurated ? "approved" : "pending",
    createdAt: new Date().toISOString()
  };

  lookbookPosts.unshift(newLook);

  res.status(201).json({
    success: true,
    message: "Community lookbook post registered.",
    post: newLook
  });
});

// PATCH /api/lookbook/:id: curate, link products, or update likes
app.patch('/api/lookbook/:id', (req, res) => {
  const { id } = req.params;
  const post = lookbookPosts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ success: false, message: "Lookbook post not found." });
  }

  const {
    curated,
    curationStatus,
    taggedProducts,
    taggedProductHandles,
    likes,
    caption,
    creatorHandle
  } = req.body;

  if (curated !== undefined) {
    post.curated = Boolean(curated);
    post.curationStatus = post.curated ? "approved" : "pending";
  }
  if (curationStatus !== undefined) {
    post.curationStatus = curationStatus;
    post.curated = curationStatus === 'approved';
  }
  if (taggedProducts !== undefined) {
    post.taggedProducts = taggedProducts;
    post.taggedProductHandles = taggedProducts;
  }
  if (taggedProductHandles !== undefined) {
    post.taggedProducts = taggedProductHandles;
    post.taggedProductHandles = taggedProductHandles;
  }
  if (likes !== undefined) post.likes = Number(likes);
  if (caption !== undefined) post.caption = caption;
  if (creatorHandle !== undefined) post.creatorHandle = creatorHandle;

  res.json({
    success: true,
    message: `Lookbook post #${id} successfully updated.`,
    post
  });
});

// DELETE /api/lookbook/:id
app.delete('/api/lookbook/:id', (req, res) => {
  const { id } = req.params;
  const index = lookbookPosts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Lookbook post not found." });
  }
  const deleted = lookbookPosts.splice(index, 1);
  res.json({
    success: true,
    message: "Lookbook post deleted.",
    post: deleted[0]
  });
});


// ---------------- BATCH & SCARCITY ENDPOINTS ----------------

// GET /api/batch-scarcity: real-time batch countdown & stock scarcity
app.get('/api/batch-scarcity', (req, res) => {
  const now = new Date().getTime();
  const target = new Date(batchScarcity.dispatchCountdownTarget).getTime();
  const diffMs = Math.max(0, target - now);

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  // Compute live stock from product catalog
  const liveStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);

  res.json({
    success: true,
    batch: {
      ...batchScarcity,
      liveStoreStock: liveStock,
      isLowStock: liveStock <= batchScarcity.lowStockThreshold || batchScarcity.remainingUnits <= batchScarcity.lowStockThreshold,
      countdown: {
        totalMsRemaining: diffMs,
        formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        days,
        hours,
        minutes,
        seconds,
        isExpired: diffMs <= 0
      }
    }
  });
});

// POST /api/batch-scarcity: update batch title, drop number, countdown, low stock threshold
app.post('/api/batch-scarcity', (req, res) => {
  const {
    batchTitle,
    dropNumber,
    status,
    dispatchCountdownTarget,
    lowStockThreshold,
    totalBatchUnits,
    allocatedUnits,
    remainingUnits,
    scarcityWarningEnabled,
    scarcityMessage,
    allowWaitlist
  } = req.body;

  if (batchTitle !== undefined) batchScarcity.batchTitle = batchTitle;
  if (dropNumber !== undefined) batchScarcity.dropNumber = dropNumber;
  if (status !== undefined) batchScarcity.status = status;
  if (dispatchCountdownTarget !== undefined) batchScarcity.dispatchCountdownTarget = dispatchCountdownTarget;
  if (lowStockThreshold !== undefined) batchScarcity.lowStockThreshold = Number(lowStockThreshold);
  if (totalBatchUnits !== undefined) batchScarcity.totalBatchUnits = Number(totalBatchUnits);
  if (allocatedUnits !== undefined) batchScarcity.allocatedUnits = Number(allocatedUnits);
  if (remainingUnits !== undefined) {
    batchScarcity.remainingUnits = Number(remainingUnits);
  } else if (totalBatchUnits !== undefined && allocatedUnits !== undefined) {
    batchScarcity.remainingUnits = Math.max(0, batchScarcity.totalBatchUnits - batchScarcity.allocatedUnits);
  }
  if (scarcityWarningEnabled !== undefined) batchScarcity.scarcityWarningEnabled = Boolean(scarcityWarningEnabled);
  if (scarcityMessage !== undefined) batchScarcity.scarcityMessage = scarcityMessage;
  if (allowWaitlist !== undefined) batchScarcity.allowWaitlist = Boolean(allowWaitlist);

  batchScarcity.lastUpdated = new Date().toISOString();

  res.json({
    success: true,
    message: "Batch & Scarcity settings successfully updated.",
    batch: batchScarcity
  });
});


// ---------------- FIT SIZE ANALYTICS ENDPOINTS ----------------

// GET /api/fit-analytics: log and retrieve customer sizing trends (S: 10%, M: 25%, L: 45%, XL: 15%, XXL: 5%)
app.get('/api/fit-analytics', (req, res) => {
  res.json({
    success: true,
    trends: fitAnalytics.trends,
    counts: fitAnalytics.counts,
    totalSubmissions: fitAnalytics.totalSubmissions,
    dominantSize: fitAnalytics.dominantSize,
    fitPreferences: fitAnalytics.fitPreferences,
    sizeDistribution: fitAnalytics.sizeDistribution,
    recentLogs: fitAnalytics.recentLogs,
    analytics: fitAnalytics
  });
});

// POST /api/fit-analytics: log customer sizing trend or calibrate breakdown
app.post('/api/fit-analytics', (req, res) => {
  const { size, height, weight, preferredFit, productHandle, trends } = req.body;

  // Direct manual calibration by admin
  if (trends && typeof trends === 'object') {
    fitAnalytics.trends = {
      S: Number(trends.S ?? fitAnalytics.trends.S),
      M: Number(trends.M ?? fitAnalytics.trends.M),
      L: Number(trends.L ?? fitAnalytics.trends.L),
      XL: Number(trends.XL ?? fitAnalytics.trends.XL),
      XXL: Number(trends.XXL ?? fitAnalytics.trends.XXL)
    };
    fitAnalytics.sizeDistribution = fitAnalytics.sizeDistribution.map(item => ({
      ...item,
      percentage: fitAnalytics.trends[item.size] ?? item.percentage
    }));

    return res.json({
      success: true,
      message: "Fit analytics trends calibrated successfully.",
      analytics: fitAnalytics,
      trends: fitAnalytics.trends
    });
  }

  // Customer size measurement log submission
  const validSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const normalizedSize = (size || '').toUpperCase().trim();

  if (!validSizes.includes(normalizedSize)) {
    return res.status(400).json({
      success: false,
      message: `Invalid size '${size}'. Must be one of: S, M, L, XL, XXL.`
    });
  }

  // Increment size count
  fitAnalytics.counts[normalizedSize] = (fitAnalytics.counts[normalizedSize] || 0) + 1;
  fitAnalytics.totalSubmissions += 1;

  // Recalculate percentages
  const total = fitAnalytics.totalSubmissions;
  let maxCount = 0;
  let topSize = 'L';

  validSizes.forEach(s => {
    const count = fitAnalytics.counts[s] || 0;
    const pct = Math.round((count / total) * 100);
    fitAnalytics.trends[s] = pct;
    if (count > maxCount) {
      maxCount = count;
      topSize = s;
    }
  });

  fitAnalytics.dominantSize = topSize;

  fitAnalytics.sizeDistribution = fitAnalytics.sizeDistribution.map(item => ({
    ...item,
    count: fitAnalytics.counts[item.size] || 0,
    percentage: fitAnalytics.trends[item.size] || 0
  }));

  const newLog = {
    id: `fit-${Date.now().toString().slice(-4)}`,
    size: normalizedSize,
    height: height ? `${height}` : "178 cm",
    weight: weight ? `${weight}` : "76 kg",
    preferredFit: preferredFit || "Signature Boxy Drape",
    productHandle: productHandle || "kundalini",
    timestamp: new Date().toISOString()
  };

  fitAnalytics.recentLogs.unshift(newLog);
  if (fitAnalytics.recentLogs.length > 20) {
    fitAnalytics.recentLogs.pop();
  }

  res.status(201).json({
    success: true,
    message: `Telemetry recorded for size ${normalizedSize}.`,
    analytics: fitAnalytics,
    trends: fitAnalytics.trends
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[THE BRAHMMAN SERVER] Running on http://localhost:${PORT}`);
    console.log(`[STATUS] Archive REST Endpoints and Kaal AI Ready.`);
  });
}

module.exports = app;

