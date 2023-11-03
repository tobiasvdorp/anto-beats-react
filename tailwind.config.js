// tailwind.config.js
module.exports = {
  darkMode: "class", // Dit zorgt ervoor dat dark mode geactiveerd wordt met een class
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Definieer je kleuren in de extend sectie
        background_dark: "#00000F",
        primary_dark: "#207EC5",
        secondary_dark: "#072640",
        accent_dark: "#4D96E0",

        background: "#F6FAFE",
        primary: "#3A97DF",
        secondary: "#072640",
        accent: "#1F69B2",

        black: "#00000F",
        white: "#F6FAFE",
      },

      fontFamily: {
        main: ["Montserrat", "sans-serif", "Arial", "Helvetica"], // Fallback fonts toegevoegd
        second: ["Open Sans", "sans-serif", "Arial", "Helvetica"], // Fallback fonts toegevoegd
        para: ["Hind Madurai", "sans-serif", "Georgia", "Times New Roman"], // Fallback fonts toegevoegd
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};
