/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    screens: {
      'xs': '440px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        display: ["Lobster", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}


