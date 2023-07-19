/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#101D40",
      light: "#E2E0DF",
      primary: "#288994",
      accent: "#00879D",
    },
    extend: {},
  },
  
  plugins: [require("daisyui")],
 
};
