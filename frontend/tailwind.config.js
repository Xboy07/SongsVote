/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lofi: {
          cream: '#F0EAE3',
          beige: '#D4C8BE',
          brown: '#8C7B6B',
          dark: '#554B40',
          accent: '#AA8F7D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};