/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    colors: {
      // Darkmode
      background_dark: "#00000F",
      primary_dark: "#207EC5",
      secondary_dark: "#072640",
      accent_dark: "#4D96E0",

      // Lightmode
      background: "#F6FAFE",
      primary: "#3A97DF",
      secondary: "#072640",
      accent: "#1F69B2",

      // Text
      black: "#00000F",
      white: "#F6FAFE",
    },
    extend: {},
  },
};
