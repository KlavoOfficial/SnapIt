/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B21B6', // violet-700
          dark: '#4C1D95',  // violet-800
        },
        secondary: {
          DEFAULT: '#FFBF34',
          hover: '#F59E0B',
        },
        'deep-purple': '#240046',
      }
    },
  },
  plugins: [],
}
