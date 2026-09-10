/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./privacy.html",
    "./assets/js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nc: {
          50: '#f0f8fd',
          100: '#e0f1fb',
          200: '#b9e2f6',
          300: '#7dccf0',
          400: '#38b0e6',
          500: '#0082c9',
          600: '#006fa8',
          700: '#005988',
          800: '#034a71',
          900: '#083e5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
