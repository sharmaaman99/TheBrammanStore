/**
 * Phoenix Admin API Configuration
 * Reads from Vite environment variables (VITE_*) with safe defaults.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
export const STOREFRONT_URL = import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:3000';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Phoenix Admin Portal';
export const DEFAULT_CURRENCY = import.meta.env.VITE_CURRENCY || 'INR';
