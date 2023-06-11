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
    extend: {
      fontFamily: {
        display: ["Lobster", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}


