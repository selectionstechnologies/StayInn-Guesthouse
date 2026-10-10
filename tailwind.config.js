/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C2703D',
          50: '#FBF3EC',
          100: '#F5E1D1',
          200: '#EBC3A3',
          400: '#D48A5A',
          500: '#C2703D',
          600: '#A65C30',
          700: '#864A27',
        },
        charcoal: '#1F2937',
        cream: '#FAF7F2',
        accent: { DEFAULT: '#4A7C59', light: '#E6F0E9' },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(31, 41, 55, 0.10)',
        lift: '0 12px 32px -8px rgba(31, 41, 55, 0.18)',
      },
    },
  },
  plugins: [],
};
