/**
 * Application & API Configuration
 * Reads from Vite environment variables (VITE_*) with safe production fallbacks.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
export const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3001';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'THE BRAHMMAN STORE';
export const APP_TAGLINE = import.meta.env.VITE_APP_TAGLINE || 'Ancient Philosophy in Modern Streetwear';
export const DEFAULT_CURRENCY = import.meta.env.VITE_CURRENCY || 'INR';
export const PROMO_CODE = import.meta.env.VITE_PROMO_CODE || 'TEE30';
