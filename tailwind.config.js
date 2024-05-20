/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    screens: {
      sm: "680px",
      md: "821px",
      lg: "1080px",
      xl: "1380px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      'main-red': '#9F0819',
      'main-blue': '#003383',
      'main-pallet-1': '#4B527E',
    },
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
        "19/6": "19 / 6",
      },
      // fontFamily: {
      //   customfontname: ['sans-serif', /*...*/ defaultTheme.fontFamily.customfontname],
      // },
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
};
