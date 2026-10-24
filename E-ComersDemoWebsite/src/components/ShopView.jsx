import React, { useState, useMemo, useEffect } from 'react';
import {
  Star,
  Heart,
  Plus,
  ArrowRight,
  Check,
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

/**
 * 8 Standard Categories matching The Brahmman Store design system
 */
export const SHOP_CATEGORIES = [
  'All',
  'Oversized',
  'Graphic Tees',
  'Plain Tees',
  'Polo T-Shirts',
  'Half Sleeve',
  'Full Sleeve',
  'Summer Collection'
];

/**
 * Available Sizing standard
 */
export const SHOP_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

/**
 * Curated 32 Streetwear Essentials Catalog matching Screen 02 in UX Showcase
 */
export const DEFAULT_SHOP_CATALOG = [
  {
    id: 'prod-06',
    handle: 'maya',
    title: 'Maya Matrix',
    subtitle: 'Graphic Streetwear Sweatshirt',
    category: 'Graphic Tees',
    price: 2600,
    originalPrice: 3100,
    rating: 4.8,
    reviewsCount: '1.5k',
    ratingScore: 4.8,
    salesCount: 390,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'BESTSELLER',
    isNew: false,
    image: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Baby_Pink_Maya_Lotus_Sweatshirt.png?v=1791193280',
    fallbackImage: '/tees/arr_3.png',
    description: 'The illusion of plurality. Heavyweight combed loopknit with lotus backprint.'
  },
  {
    id: 'prod-07',
    handle: 'shunya',
    title: 'Shunya Void Tee',
    subtitle: 'Minimal Plain Architectural Tee',
    category: 'Plain Tees',
    price: 1800,
    originalPrice: 2200,
    rating: 4.8,
    reviewsCount: '1.2k',
    ratingScore: 4.8,
    salesCount: 310,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'EDITORIAL',
    isNew: true,
    image: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/shunya_pro_exp.png?v=1788419827',
    fallbackImage: '/tees/feat_1.png',
    description: 'The primordial void. 260 GSM structured combed cotton with tonal chest coordinate.'
  },
  {
    id: 'prod-01',
    handle: 'kundalini',
    title: 'Kundalini Oversized',
    subtitle: 'Heavyweight Graphic Tee',
    category: 'Oversized',
    price: 1800,
    originalPrice: 2200,
    rating: 4.9,
    reviewsCount: '2.4k',
    ratingScore: 4.9,
    salesCount: 520,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'BESTSELLER',
    isNew: false,
    image: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Kundalini_ubg2.png?v=1791201886',
    fallbackImage: '/tees/feat_0.png',
    description: 'The dormant serpent energy coiled at the base. Boxy drop-shoulder silhouette.'
  },
  {
    id: 'prod-02',
    handle: 'tat-tvam-asi',
    title: 'Tat Tvam Asi Drop',
    subtitle: 'Advaita Philosophy Oversized Tee',
    category: 'Oversized',
    price: 1800,
    originalPrice: 2200,
    rating: 5.0,
    reviewsCount: '1.8k',
    ratingScore: 5.0,
    salesCount: 460,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'ICONIC ARCHIVE',
    isNew: false,
    image: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/45.png?v=1789397586',
    fallbackImage: '/tees/feat_4.png',
    description: 'Thou Art That. Heavyweight 260 GSM raw cream Terry knit with high-density puff stamp.'
  },
  {
    id: 'prod-03',
    handle: 'indra',
    title: 'Indra Heavyweight',
    subtitle: 'Storm God Boxy Tee',
    category: 'Oversized',
    price: 1800,
    originalPrice: 2200,
    rating: 4.8,
    reviewsCount: '3.1k',
    ratingScore: 4.8,
    salesCount: 480,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'LIMITED DROP',
    isNew: false,
    image: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/Indraproexp1.png?v=1788422946',
    fallbackImage: '/tees/feat_2.png',
    description: 'Wielder of the Vajra lightning bolt. Deep obsidian boxy cut with reflective sleeve insignia.'
  },
  {
    id: 'prod-04',
    handle: 'parshuram',
    title: 'Parshuram Series',
    subtitle: 'Warrior Sage Graphic Tee',
    category: 'Graphic Tees',
    price: 1800,
    originalPrice: 2200,
    rating: 4.9,
    reviewsCount: '2.8k',
    ratingScore: 4.9,
    salesCount: 440,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'HEAVYWEIGHT',
    isNew: false,
    image: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/parshuproexp.png?v=1788421632',
    fallbackImage: '/tees/arr_2.png',
    description: 'The warrior sage battleaxe iconography in dual-tone silkscreen print on deep combed cotton.'
  },
  {
    id: 'prod-05',
    handle: 'kaal',
    title: 'Kaal Chronos',
    subtitle: '400 GSM Heavyweight Full Sleeve',
    category: 'Full Sleeve',
    price: 2800,
    originalPrice: 3400,
    rating: 5.0,
    reviewsCount: '1.1k',
    ratingScore: 5.0,
    salesCount: 290,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'WINTER ARCHIVE',
    isNew: false,
    image: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/kaal_pro_exp.png?v=1791633682',
    fallbackImage: '/tees/feat_5.png',
    description: 'Time and the ultimate inevitability. Thermal heavyweight loopknit with brutalist spine typography.'
  },
  {
    id: 'prod-08',
    handle: 'bodhi',
    title: 'Bodhi Nirvana Drop',
    subtitle: 'Classic Knit Polo T-Shirt',
    category: 'Polo T-Shirts',
    price: 2200,
    originalPrice: 2800,
    rating: 4.8,
    reviewsCount: '1.3k',
    ratingScore: 4.8,
    salesCount: 270,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'CORE ARCHIVE',
    isNew: true,
    image: 'https://cdn.shopify.com/s/files/1/0665/6638/9834/files/bodhi_pro_exp.png?v=1788417381',
    fallbackImage: '/tees/feat_3.png',
    description: 'Supreme perception rendered in textured pique weave with ribbed collar and tonal embroidery.'
  },
  {
    id: 'prod-09',
    handle: 'moksha-oversized',
    title: 'Moksha Minimal Oversized',
    subtitle: 'Zen Boxy Essential',
    category: 'Oversized',
    price: 1750,
    originalPrice: 2100,
    rating: 4.8,
    reviewsCount: '1.6k',
    ratingScore: 4.8,
    salesCount: 350,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'RESTOCKED',
    isNew: false,
    image: '/tees/arr_0.png',
    fallbackImage: '/cat_2_oversized.png',
    description: 'Liberation from cyclical form. Clean drape with subtle back neck Sanskrit relief.'
  },
  {
    id: 'prod-10',
    handle: 'rudra-heavyweight',
    title: 'Rudra Heavyweight Drop',
    subtitle: 'Brutalist Oversized Silhouette',
    category: 'Oversized',
    price: 1950,
    originalPrice: 2400,
    rating: 4.9,
    reviewsCount: '2.1k',
    ratingScore: 4.9,
    salesCount: 410,
    sizes: ['M', 'L', 'XL', 'XXL'],
    badge: 'LIMITED',
    isNew: true,
    image: '/tees/arr_2.png',
    fallbackImage: '/tees/feat_2.png',
    description: 'Cosmic roar in 280 GSM custom milled terry cotton with reinforced drop shoulder.'
  },
  {
    id: 'prod-11',
    handle: 'nirvana-slouch',
    title: 'Nirvana Slouchy Drop',
    subtitle: 'Sand Dune Oversized Tee',
    category: 'Oversized',
    price: 1850,
    originalPrice: 2200,
    rating: 4.7,
    reviewsCount: '940',
    ratingScore: 4.7,
    salesCount: 230,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: null,
    isNew: false,
    image: '/tees/feat_4.png',
    fallbackImage: '/cat_2_oversized.png',
    description: 'Earthy washed tone finished with subtle cracked distress silkscreen ink.'
  },
  {
    id: 'prod-12',
    handle: 'sahasrara-drop',
    title: 'Sahasrara Drop Shoulder',
    subtitle: 'Crown Chakra Oversized Cut',
    category: 'Oversized',
    price: 2100,
    originalPrice: 2500,
    rating: 4.8,
    reviewsCount: '890',
    ratingScore: 4.8,
    salesCount: 190,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'NEW',
    isNew: true,
    image: '/tees/arr_4.png',
    fallbackImage: '/tees/feat_0.png',
    description: 'Thousand-petaled lotus geometry plotted through subtle monochrome geometric typography.'
  },
  {
    id: 'prod-13',
    handle: 'agni-fire-graphic',
    title: 'Agni Fire Graphic Drop',
    subtitle: 'Sacred Flame Backprint',
    category: 'Graphic Tees',
    price: 1850,
    originalPrice: 2300,
    rating: 4.8,
    reviewsCount: '1.7k',
    ratingScore: 4.8,
    salesCount: 380,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'HOT',
    isNew: true,
    image: '/tees/feat_5.png',
    fallbackImage: '/cat_3_graphic.png',
    description: 'The purifying fire of ritual transformation. High-contrast vintage discharge print.'
  },
  {
    id: 'prod-14',
    handle: 'mahakal-sacred',
    title: 'Mahakal Sacred Backprint',
    subtitle: 'Eternal Time Streetwear Tee',
    category: 'Graphic Tees',
    price: 1999,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: '2.4k',
    ratingScore: 4.9,
    salesCount: 495,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'BESTSELLER',
    isNew: false,
    image: '/tees/arr_3.png',
    fallbackImage: '/cat_3_graphic.png',
    description: 'Lord of the Great Time continuum. Intricate hand-drawn Indian gothic illustration.'
  },
  {
    id: 'prod-15',
    handle: 'surya-sunyata',
    title: 'Surya Sunyata Graphic',
    subtitle: 'Solar Ray Graphic Tee',
    category: 'Graphic Tees',
    price: 1800,
    originalPrice: 2200,
    rating: 4.8,
    reviewsCount: '1.4k',
    ratingScore: 4.8,
    salesCount: 320,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: null,
    isNew: false,
    image: '/tees/arr_1.png',
    fallbackImage: '/cat_3_graphic.png',
    description: 'Radiant warmth rendered on breathable 240 GSM organic ring-spun cotton.'
  },
  {
    id: 'prod-16',
    handle: 'trikaal-chrono',
    title: 'Trikaal Chrono Graphic',
    subtitle: 'Three Timelines Aesthetic',
    category: 'Graphic Tees',
    price: 1899,
    originalPrice: 2300,
    rating: 4.7,
    reviewsCount: '960',
    ratingScore: 4.7,
    salesCount: 210,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: null,
    isNew: false,
    image: '/tees/feat_2.png',
    fallbackImage: '/cat_3_graphic.png',
    description: 'Past, present, and infinite future converging in brutalist typographic gridwork.'
  },
  {
    id: 'prod-17',
    handle: 'zero-obsidian-plain',
    title: 'Zero Obsidian Boxy Plain',
    subtitle: 'Deep Black Minimal Tee',
    category: 'Plain Tees',
    price: 1200,
    originalPrice: 1500,
    rating: 4.7,
    reviewsCount: '1.1k',
    ratingScore: 4.7,
    salesCount: 420,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'ESSENTIAL',
    isNew: false,
    image: '/tees/tee_black_plain.png',
    fallbackImage: '/cat_4_plain.png',
    description: 'No logos. No slogans. Pure 240 GSM pitch black luxury combed cotton.'
  },
  {
    id: 'prod-18',
    handle: 'raw-chalk-supima',
    title: 'Raw Chalk Supima Tee',
    subtitle: 'Crisp Off-White Plain Tee',
    category: 'Plain Tees',
    price: 1400,
    originalPrice: 1750,
    rating: 4.8,
    reviewsCount: '1.8k',
    ratingScore: 4.8,
    salesCount: 390,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'RESTOCKED',
    isNew: false,
    image: '/cat_4_plain.png',
    fallbackImage: '/tees/arr_4.png',
    description: 'Extra-long staple Supima cotton with silky hand-feel and non-translucent heavy drape.'
  },
  {
    id: 'prod-19',
    handle: 'slate-monochrome-plain',
    title: 'Slate Monochrome Tee',
    subtitle: 'Heather Grey Essential Plain',
    category: 'Plain Tees',
    price: 1350,
    originalPrice: 1650,
    rating: 4.6,
    reviewsCount: '840',
    ratingScore: 4.6,
    salesCount: 260,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: null,
    isNew: false,
    image: '/cat_6_halfsleeve.png',
    fallbackImage: '/tees/arr_0.png',
    description: 'Garment-dyed vintage heather grey. Pre-shrunk for consistent boxy silhouette.'
  },
  {
    id: 'prod-20',
    handle: 'bone-white-essential',
    title: 'Bone White Combed Tee',
    subtitle: 'Natural Unbleached Plain Tee',
    category: 'Plain Tees',
    price: 1250,
    originalPrice: 1600,
    rating: 4.8,
    reviewsCount: '1.3k',
    ratingScore: 4.8,
    salesCount: 340,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'CORE',
    isNew: false,
    image: '/cat_1_mens.png',
    fallbackImage: '/cat_4_plain.png',
    description: 'Unbleached natural ecru cotton showing subtle plant seed specks in the weave.'
  },
  {
    id: 'prod-21',
    handle: 'dharma-ribbed-polo',
    title: 'Dharma Ribbed Collar Polo',
    subtitle: 'Heavy Pique Knit Streetwear Polo',
    category: 'Polo T-Shirts',
    price: 2400,
    originalPrice: 2900,
    rating: 4.9,
    reviewsCount: '980',
    ratingScore: 4.9,
    salesCount: 280,
    sizes: ['M', 'L', 'XL'],
    badge: 'LUXURY',
    isNew: true,
    image: '/tees/arr_5.png',
    fallbackImage: '/cat_5_polo.png',
    description: 'Substantial 280 GSM waffle knit with seamless placket and engraved horn buttons.'
  },
  {
    id: 'prod-22',
    handle: 'ashoka-pine-polo',
    title: 'Ashoka Dark Pine Polo',
    subtitle: 'Forest Green Knitted Polo',
    category: 'Polo T-Shirts',
    price: 2100,
    originalPrice: 2600,
    rating: 4.7,
    reviewsCount: '650',
    ratingScore: 4.7,
    salesCount: 190,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: null,
    isNew: false,
    image: '/cat_5_polo.png',
    fallbackImage: '/tees/arr_1.png',
    description: 'Deep forest pine green with structured rib cuffs that hold their shape indefinitely.'
  },
  {
    id: 'prod-23',
    handle: 'zen-oxford-polo',
    title: 'Zen Oxford Knit Polo',
    subtitle: 'Refined Street Formal Hybrid',
    category: 'Polo T-Shirts',
    price: 2350,
    originalPrice: 2800,
    rating: 4.8,
    reviewsCount: '820',
    ratingScore: 4.8,
    salesCount: 220,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'NEW',
    isNew: true,
    image: '/cat_5_polo.png',
    fallbackImage: '/tees/feat_3.png',
    description: 'Interlocking knit structure with minimalist neckline and split side vents.'
  },
  {
    id: 'prod-24',
    handle: 'prana-half-sleeve',
    title: 'Prana Breathable Half Sleeve',
    subtitle: 'Relaxed Arm Opening Cut',
    category: 'Half Sleeve',
    price: 1450,
    originalPrice: 1800,
    rating: 4.8,
    reviewsCount: '1.2k',
    ratingScore: 4.8,
    salesCount: 310,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'COMFORT FIT',
    isNew: false,
    image: '/cat_6_halfsleeve.png',
    fallbackImage: '/tees/arr_0.png',
    description: 'Engineered sleeve taper providing freedom of movement and modern arm contour.'
  },
  {
    id: 'prod-25',
    handle: 'ananda-slub-half',
    title: 'Ananda Slub Half Sleeve',
    subtitle: 'Textured Slub Yarn Tee',
    category: 'Half Sleeve',
    price: 1550,
    originalPrice: 1900,
    rating: 4.7,
    reviewsCount: '890',
    ratingScore: 4.7,
    salesCount: 240,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: null,
    isNew: false,
    image: '/tees/arr_0.png',
    fallbackImage: '/cat_6_halfsleeve.png',
    description: 'Uneven artisanal slub yarn texture creates micro air channels for cooling airflow.'
  },
  {
    id: 'prod-26',
    handle: 'hampi-heritage-half',
    title: 'Hampi Heritage Boxy Tee',
    subtitle: 'Monolithic Ruin Washed Silhouette',
    category: 'Half Sleeve',
    price: 1650,
    originalPrice: 2000,
    rating: 4.9,
    reviewsCount: '1.6k',
    ratingScore: 4.9,
    salesCount: 380,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'CRAFT DROP',
    isNew: true,
    image: '/tees/arr_4.png',
    fallbackImage: '/cat_6_halfsleeve.png',
    description: 'Mineral-washed granite tone reminiscent of ancient Hampi stone architecture.'
  },
  {
    id: 'prod-27',
    handle: 'varanasi-ghats-half',
    title: 'Varanasi Ghats Heavy Half Sleeve',
    subtitle: 'Dense 260 GSM Boxy Cut',
    category: 'Half Sleeve',
    price: 1600,
    originalPrice: 1950,
    rating: 4.8,
    reviewsCount: '1.1k',
    ratingScore: 4.8,
    salesCount: 290,
    sizes: ['M', 'L', 'XL'],
    badge: null,
    isNew: false,
    image: '/tees/feat_0.png',
    fallbackImage: '/cat_6_halfsleeve.png',
    description: 'Durable streetwear staple tailored for high-humidity urban heat.'
  },
  {
    id: 'prod-28',
    handle: 'vayu-long-sleeve',
    title: 'Vayu Heavyweight Long Sleeve',
    subtitle: 'Wind Element Ribbed Cuff Sleeve',
    category: 'Full Sleeve',
    price: 2200,
    originalPrice: 2700,
    rating: 4.8,
    reviewsCount: '1.3k',
    ratingScore: 4.8,
    salesCount: 320,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'POPULAR',
    isNew: false,
    image: '/cat_7_fullsleeve.png',
    fallbackImage: '/tees/feat_5.png',
    description: 'Double-needle flatlock seams with heavy ribbed wrist cuffs that stay in place.'
  },
  {
    id: 'prod-29',
    handle: 'samadhi-thermal-sleeve',
    title: 'Samadhi Ribbed Full Sleeve',
    subtitle: 'Thermal Waffle Luxury Layer',
    category: 'Full Sleeve',
    price: 2450,
    originalPrice: 3000,
    rating: 4.9,
    reviewsCount: '780',
    ratingScore: 4.9,
    salesCount: 210,
    sizes: ['M', 'L', 'XL', 'XXL'],
    badge: 'WARMTH',
    isNew: true,
    image: '/tees/arr_5.png',
    fallbackImage: '/cat_7_fullsleeve.png',
    description: '350 GSM thermal honeycomb weave designed for effortless seasonal layering.'
  },
  {
    id: 'prod-30',
    handle: 'kali-armored-sleeve',
    title: 'Kali Obsidian Armored Sleeve',
    subtitle: 'Brutalist Paneled Long Sleeve',
    category: 'Full Sleeve',
    price: 2600,
    originalPrice: 3200,
    rating: 4.8,
    reviewsCount: '920',
    ratingScore: 4.8,
    salesCount: 240,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'LIMITED ARCHIVE',
    isNew: false,
    image: '/tees/arr_2.png',
    fallbackImage: '/cat_7_fullsleeve.png',
    description: 'Architectural shoulder articulation and discreet thumb loops for technical styling.'
  },
  {
    id: 'prod-31',
    handle: 'soma-baby-blue',
    title: 'Soma Breeze Pastel Drop',
    subtitle: 'Summer Nectar Baby Blue Tee',
    category: 'Summer Collection',
    price: 1650,
    originalPrice: 2000,
    rating: 4.8,
    reviewsCount: '1.4k',
    ratingScore: 4.8,
    salesCount: 360,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'SUMMER DROP',
    isNew: true,
    image: '/cat_8_summer.png',
    fallbackImage: '/tees/arr_1.png',
    description: 'Refreshing pastel cyan tone. Ultra-breathable single jersey with enzyme wash.'
  },
  {
    id: 'prod-32',
    handle: 'rishikesh-linen-summer',
    title: 'Rishikesh Linen-Cotton Tee',
    subtitle: 'Natural Plant Fiber Airy Fit',
    category: 'Summer Collection',
    price: 1750,
    originalPrice: 2150,
    rating: 4.7,
    reviewsCount: '880',
    ratingScore: 4.7,
    salesCount: 250,
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'ECO WEAVE',
    isNew: false,
    image: '/cat_8_summer.png',
    fallbackImage: '/cat_4_plain.png',
    description: '70% organic cotton blended with 30% European flax linen for instant breeze.'
  }
];

/**
 * Normalizes input initialCategory to one of the SHOP_CATEGORIES
 */
function normalizeCategory(cat) {
  if (!cat) return 'All';
  const lower = String(cat).toLowerCase().trim();
  if (lower.includes('over')) return 'Oversized';
  if (lower.includes('graph')) return 'Graphic Tees';
  if (lower.includes('plain')) return 'Plain Tees';
  if (lower.includes('polo')) return 'Polo T-Shirts';
  if (lower.includes('half')) return 'Half Sleeve';
  if (lower.includes('full')) return 'Full Sleeve';
  if (lower.includes('sum')) return 'Summer Collection';
  return 'All';
}

/**
 * ShopView Component
 * Matches Screen 02 ('02. Shop / Product Listing (Desktop)') in 'The Brahmman Store UX Showcase.png'
 */
export default function ShopView({
  products = [],
  onSelectProduct = () => {},
  onAddToCart = () => {},
  formatPrice,
  wishlist = [],
  onToggleWishlist = () => {},
  initialCategory = 'All',
}) {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState(() =>
    normalizeCategory(initialCategory)
  );

  // Sync when initialCategory prop changes externally
  useEffect(() => {
    setSelectedCategory(normalizeCategory(initialCategory));
  }, [initialCategory]);

  // Selected sizes state (empty array = all sizes match)
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Price slider state (₹500 to ₹3000)
  const [maxPrice, setMaxPrice] = useState(3000);

  // Sort dropdown state
  const [sortBy, setSortBy] = useState('Sort by: Newest');

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Added-to-cart toast/animation state per product ID
  const [addedItemMap, setAddedItemMap] = useState({});

  /**
   * Harmonize and enrich the product dataset:
   * Merges parent products (e.g. INITIAL_PRODUCTS) into the 32 catalog so references,
   * live inventory, and IDs remain 100% integrated while ensuring 32 products display.
   */
  const catalog = useMemo(() => {
    if (!products || products.length === 0) {
      return DEFAULT_SHOP_CATALOG;
    }

    // Map parent products by ID/handle for easy lookup
    const parentMap = new Map();
    products.forEach((p) => {
      if (p.id) parentMap.set(p.id, p);
      if (p.handle) parentMap.set(p.handle, p);
    });

    // Merge each default item with any matching live product
    const merged = DEFAULT_SHOP_CATALOG.map((defItem) => {
      const match = parentMap.get(defItem.id) || parentMap.get(defItem.handle);
      if (match) {
        return {
          ...defItem,
          ...match,
          // ensure category exists
          category: match.category || defItem.category,
          title: defItem.title, // keep clean UX showcase title
          price: match.price || defItem.price,
          sizes: match.sizes && match.sizes.length > 0 ? match.sizes : defItem.sizes,
          image: (match.images && match.images[0]) || defItem.image,
          fallbackImage: defItem.fallbackImage,
          ratingScore: match.rating || defItem.ratingScore,
          reviewsCount: match.reviewsCount ? `${match.reviewsCount}` : defItem.reviewsCount,
          rawProduct: match,
        };
      }
      return defItem;
    });

    return merged;
  }, [products]);

  /**
   * Fast, zero-lag reactive filtering and sorting
   */
  const filteredProducts = useMemo(() => {
    let result = catalog.filter((product) => {
      // 1. Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // 2. Size filter (if sizes are selected, product must support at least one)
      if (selectedSizes.length > 0) {
        const prodSizes = product.sizes || ['S', 'M', 'L', 'XL'];
        const matchesAnySize = selectedSizes.some((s) => prodSizes.includes(s));
        if (!matchesAnySize) return false;
      }

      // 3. Price filter (₹500 to maxPrice)
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    });

    // Sort order
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Best Seller':
          return (b.salesCount || 0) - (a.salesCount || 0);
        case 'Rating':
          return (b.ratingScore || b.rating || 0) - (a.ratingScore || a.rating || 0);
        case 'Sort by: Newest':
        default:
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
      }
    });

    return result;
  }, [catalog, selectedCategory, selectedSizes, maxPrice, sortBy]);

  /**
   * Helper to format prices safely
   */
  const renderPrice = (amt) => {
    if (typeof formatPrice === 'function') {
      try {
        return formatPrice(amt);
      } catch {
        // fallback
      }
    }
    return `₹${Number(amt).toLocaleString('en-IN')}`;
  };

  /**
   * Check if a product is in the wishlist
   */
  const isProductWishlisted = (prodId) => {
    if (!wishlist || !Array.isArray(wishlist)) return false;
    return wishlist.includes(prodId) || wishlist.some((item) => (typeof item === 'object' ? item.id === prodId : item === prodId));
  };

  /**
   * Size pill toggle
   */
  const handleToggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  /**
   * Clear all active filters
   */
  const handleClearAll = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setMaxPrice(3000);
    setSortBy('Sort by: Newest');
  };

  /**
   * Quick add to cart handler
   */
  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    const actualProduct = item.rawProduct || item;
    const sizeToUse = (item.sizes && item.sizes.includes('L')) ? 'L' : (item.sizes?.[0] || 'L');

    onAddToCart(actualProduct, sizeToUse, 1);

    // Show temporary "Added" feedback
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  /**
   * Scroll smoothly to the product grid
   */
  const handleScrollToGrid = () => {
    const el = document.getElementById('shop-product-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Count active filters for badge
  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedSizes.length +
    (maxPrice < 3000 ? 1 : 0);

  return (
    <div className="w-full bg-[#fafaf9] min-h-screen text-[#111111] antialiased">
      {/* ============================================================== */}
      {/* 1. TOP BANNER (Screen 02 Showcase)                             */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 text-white border border-neutral-800 shadow-2xl min-h-[220px] sm:min-h-[260px] flex items-center">
          {/* Subtle geometric luxury background texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-950 to-neutral-900 opacity-95 z-0" />
          
          {/* Ambient warm streetwear glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-neutral-700/20 rounded-full blur-3xl pointer-events-none z-0" />

          {/* Banner Streetwear Graphic on Right */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 lg:w-5/12 overflow-hidden pointer-events-none z-0 opacity-45 sm:opacity-75">
            <img
              src="/tees/tee_black_plain.png"
              alt="The Brahmman Store Streetwear Essentials"
              className="w-full h-full object-cover object-center filter contrast-125 brightness-90 mix-blend-screen transform scale-105 sm:scale-100"
              onError={(e) => {
                e.currentTarget.src = '/cat_1_mens.png';
              }}
            />
            {/* Soft gradient edge fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
          </div>

          {/* Banner Text Content */}
          <div className="relative z-10 px-6 sm:px-12 py-8 sm:py-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-neutral-300 text-[11px] font-mono tracking-widest uppercase mb-3 border border-white/10">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Architectural Streetwear</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-none font-sans">
              All Collections
            </h1>

            <p className="mt-3 text-neutral-300 text-sm sm:text-base font-normal max-w-md leading-relaxed">
              Explore the full range of streetwear essentials.
            </p>

            <button
              type="button"
              onClick={handleScrollToGrid}
              className="mt-6 inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-white text-black font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:bg-neutral-100 hover:shadow-xl hover:gap-3 transition-all duration-200 cursor-pointer group"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. MAIN 2-COLUMN LAYOUT: SIDEBAR + PRODUCT GRID                */}
      {/* ============================================================== */}
      <div id="shop-product-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Mobile Filter Toggle Bar (Screen sizes < lg) */}
        <div className="lg:hidden flex items-center justify-between mb-4 p-3 bg-white rounded-xl border border-neutral-200 shadow-sm">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 bg-neutral-100 px-3.5 py-2 rounded-lg cursor-pointer hover:bg-neutral-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <span className="text-xs font-bold text-neutral-500">
            {filteredProducts.length} Products
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* ========================================================== */}
          {/* LEFT SIDEBAR FILTERS (Sticky on desktop, clean & zero-lag) */}
          {/* ========================================================== */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-7">
            
            {/* Header: "Filter" + "Clear All" */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h2 className="text-base font-bold text-neutral-950 tracking-tight flex items-center gap-2">
                <span>Filter</span>
                {activeFiltersCount > 0 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </h2>

              <button
                type="button"
                onClick={handleClearAll}
                className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 hover:text-black transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* 1. Category Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3.5 flex items-center justify-between">
                <span>Category</span>
                <span className="text-[10px] font-mono text-neutral-400 font-normal">
                  {selectedCategory === 'All' ? 'All Selected' : selectedCategory}
                </span>
              </h3>

              <div className="space-y-1.5">
                {SHOP_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  // Count items in category
                  const count = cat === 'All'
                    ? catalog.length
                    : catalog.filter((p) => p.category === cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all duration-150 cursor-pointer group ${
                        isSelected
                          ? 'bg-neutral-900 text-white font-semibold shadow-sm'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-black'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Radio indicator */}
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-white bg-white'
                              : 'border-neutral-300 group-hover:border-neutral-500 bg-transparent'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                        <span>{cat}</span>
                      </div>

                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? 'text-neutral-300' : 'text-neutral-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Size Section */}
            <div className="pt-2 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Size
                </h3>
                {selectedSizes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedSizes([])}
                    className="text-[10px] text-neutral-400 hover:text-black uppercase tracking-wider cursor-pointer font-mono"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Pill buttons grid */}
              <div className="grid grid-cols-3 gap-2">
                {SHOP_SIZES.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleToggleSize(size)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all duration-150 cursor-pointer text-center select-none ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-black hover:text-black'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Price Section */}
            <div className="pt-2 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Price
                </h3>
                <span className="text-xs font-bold font-mono text-neutral-900">
                  ₹500 - ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Range slider */}
              <div className="py-2">
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-1">
                <span>₹500</span>
                <span>₹3,000</span>
              </div>

              {/* Quick price presets */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <button
                  type="button"
                  onClick={() => setMaxPrice(1500)}
                  className={`text-[10px] font-mono px-2 py-1 rounded-md border transition-colors cursor-pointer ${
                    maxPrice === 1500
                      ? 'bg-black text-white border-black'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  Under ₹1.5k
                </button>
                <button
                  type="button"
                  onClick={() => setMaxPrice(2200)}
                  className={`text-[10px] font-mono px-2 py-1 rounded-md border transition-colors cursor-pointer ${
                    maxPrice === 2200
                      ? 'bg-black text-white border-black'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  Under ₹2.2k
                </button>
                <button
                  type="button"
                  onClick={() => setMaxPrice(3000)}
                  className={`text-[10px] font-mono px-2 py-1 rounded-md border transition-colors cursor-pointer ${
                    maxPrice === 3000
                      ? 'bg-black text-white border-black'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  All Prices
                </button>
              </div>
            </div>

            {/* Clear All Footer Button if active */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="w-full py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:text-black hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}

          </aside>

          {/* ========================================================== */}
          {/* RIGHT PRODUCT GRID SECTION                                 */}
          {/* ========================================================== */}
          <main className="flex-1 min-w-0 w-full">
            
            {/* Header bar: Product Count + Clean Sort Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 mb-6 border-b border-neutral-200/80 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                  {filteredProducts.length} Products
                </span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-800 text-xs font-medium">
                    {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('All')}
                      className="ml-0.5 hover:text-black"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <label htmlFor="shop-sort-dropdown" className="text-xs font-semibold text-neutral-500 uppercase tracking-wider shrink-0">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="shop-sort-dropdown"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-semibold text-neutral-900 cursor-pointer focus:outline-none focus:ring-1 focus:ring-black transition-colors shadow-sm"
                  >
                    <option value="Sort by: Newest">Newest</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Rating">Rating</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <SlidersHorizontal className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                  No products found
                </h3>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
                  We couldn't find any streetwear pieces matching your current filters. Try resetting to explore all styles.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-6 py-2.5 rounded-full bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer inline-flex items-center gap-2 shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((item) => {
                  const wishlisted = isProductWishlisted(item.id);
                  const isAdded = addedItemMap[item.id];
                  const actualProduct = item.rawProduct || item;

                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectProduct(actualProduct)}
                      className="group relative bg-white rounded-2xl border border-neutral-100 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer select-none p-0"
                    >
                      {/* Image Container (Aspect 3:4 portrait luxury ratio, zero padding) */}
                      <div className="relative aspect-[3/4] w-full bg-[#f4f5f6] overflow-hidden flex items-center justify-center p-0">
                        
                        {/* Top-left category tag or badge */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                          {item.badge && (
                            <span className="px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-xs text-white text-[9px] font-mono font-bold tracking-widest uppercase shadow-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Top-right Wishlist Heart Toggle */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(actualProduct);
                          }}
                          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-neutral-200/80 flex items-center justify-center text-neutral-600 hover:text-black hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-sm"
                          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              wishlisted
                                ? 'fill-rose-500 text-rose-500'
                                : 'text-neutral-700'
                            }`}
                          />
                        </button>

                        {/* Product Photography with Fallback (Full edge-to-edge canvas with zero inner padding) */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-0 filter contrast-[1.02] group-hover:scale-105 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            e.currentTarget.src = item.fallbackImage || '/tees/feat_0.png';
                          }}
                        />

                        {/* Quick Add Overlay on Hover (Desktop) */}
                        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(e, item)}
                            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-black text-white hover:bg-neutral-800'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>Added to Bag</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Quick Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Card Bottom Details (Clean Minimalist, No fake ratings) */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
                        <div>
                          {/* Product Title & Price */}
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm sm:text-base font-medium text-neutral-900 group-hover:text-black transition-colors line-clamp-1 tracking-tight">
                              {item.title}
                            </h4>
                            <span className="text-sm sm:text-base font-bold text-neutral-950 font-sans shrink-0">
                              {renderPrice(item.price)}
                            </span>
                          </div>

                          <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-1">
                            {item.category || 'Oversized Tee'}
                          </p>
                        </div>

                        {/* Mobile Quick Add Button */}
                        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between sm:hidden">
                          <span className="text-xs text-neutral-500 font-medium">Quick Purchase</span>
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(e, item)}
                            className={`p-2 rounded-lg transition-all cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-neutral-100 hover:bg-black hover:text-white text-neutral-900'
                            }`}
                            aria-label="Quick Add"
                          >
                            {isAdded ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MOBILE FILTER SLIDE-OVER DRAWER                             */}
      {/* ============================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-neutral-900" />
                  <h3 className="font-bold text-base text-neutral-950">Filters</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  Category
                </h4>
                <div className="space-y-1">
                  {SHOP_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-black text-white font-bold'
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Sizes */}
              <div className="mb-6 pt-4 border-t border-neutral-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  Size
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {SHOP_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleToggleSize(size)}
                      className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                        selectedSizes.includes(size)
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="mb-6 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold font-mono">
                    ₹{maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-100 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-black text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-neutral-800 cursor-pointer"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="w-full py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:text-black cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
