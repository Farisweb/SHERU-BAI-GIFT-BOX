/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FFF9F0', // Official Main Background
          200: '#F7EFE4',
          300: '#EFE3D3',
          400: '#E4D3BE',
        },
        gold: {
          50: '#FBF8F1',
          100: '#F5ECDA',
          200: '#EBD7B0',
          300: '#DFC286',
          400: '#D3B16F',
          500: '#C6A15B', // Official Royal Gold
          600: '#B08B46',
          700: '#8E6F33',
          800: '#6C5427',
        },
        burgundy: {
          50: '#FAF0F2',
          100: '#F2D7DE',
          200: '#E4AFC0',
          300: '#CF7D99',
          400: '#A43759',
          500: '#681C32', // Official Deep Burgundy
          600: '#531427',
          700: '#400D1C',
          800: '#2F0813',
        },
        darkbrown: {
          100: '#E9E4E1',
          200: '#CFC5C0',
          400: '#8F7F77',
          600: '#5B4A40',
          800: '#40322A',
          900: '#30251F', // Official Dark Brown Text
          950: '#1F1713',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(48, 37, 31, 0.08), 0 4px 12px -2px rgba(198, 161, 91, 0.12)',
        'luxury-hover': '0 20px 40px -10px rgba(48, 37, 31, 0.16), 0 8px 24px -4px rgba(198, 161, 91, 0.25)',
        'gold-glow': '0 0 25px rgba(198, 161, 91, 0.35)',
        'burgundy-glow': '0 8px 25px rgba(104, 28, 50, 0.35)',
      }
    },
  },
  plugins: [],
}
