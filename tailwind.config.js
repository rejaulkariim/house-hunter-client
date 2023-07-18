/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#101D40",
      light: "#E2E0DF",
      accent: "#24CBC8",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
