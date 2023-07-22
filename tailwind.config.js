/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#101D40",
      light: "#E2E0DF",
      primary: "#065C56",
      accent: "#20C997",
    },
    extend: {},
  },
  
  plugins: [require("daisyui")],
 
};
