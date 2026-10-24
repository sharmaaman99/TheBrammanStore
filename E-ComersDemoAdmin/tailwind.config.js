/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-bs-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0a0a0a',
        'brand-dark': '#121212',
        'brand-surface': '#181818',
        'brand-stone': '#f4f4f0',
        'brand-muted': '#262626',
        'brand-border': '#2d2d2d',
        'brand-accent': '#6366f1',
        phoenix: {
          primary: '#3874ff',
          'primary-hover': '#2563eb',
          'primary-subtle': '#eef2ff',
          dark: '#141824',
          surface: '#0f172a',
          card: '#1e293b',
          border: '#e3e6ed',
          'border-dark': '#2b3548',
          body: '#f9fbfd',
          'body-dark': '#0f172a',
        }
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        nunito: ['"Nunito Sans"', 'sans-serif'],
        heading: ['"Syne"', 'sans-serif'],
        condensed: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
