/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07070b',
        'bg-soft': '#0d0d13',
        card: 'rgba(17, 17, 25, 0.72)',
        border: 'rgba(255, 255, 255, 0.09)',
        text: '#f6f5fa',
        muted: '#9694a4',
        purple: '#a855f7',
        violet: '#7c3aed',
        blue: '#38bdf8',
        green: '#4ade80',
        orange: '#fb923c',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
