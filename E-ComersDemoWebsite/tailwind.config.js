/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-dark': '#111111',
        'brand-surface': '#fcfcfc',
        'brand-stone': '#f4f4f0',
        'brand-muted': '#666666',
        'brand-border': '#e5e5e5',
        'brand-gold': '#b38600',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Plus Jakarta Sans"', 'Georgia', 'serif'],
        editorial: ['"Plus Jakarta Sans"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widestx: '0.25em',
        tightest: '-0.05em',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
