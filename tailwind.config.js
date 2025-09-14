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
          DEFAULT: 'purple',
          'dark': '#6a0dad',
        },
        secondary: {
          DEFAULT: '#FFBF34',
          'hover': '#ffb71a',
        },
      }
    },
  },
  plugins: [],
}
