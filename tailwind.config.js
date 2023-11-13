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
        background_dark: "#000105",
        background_dark_secondary: "#530084",
        background_dark_third: "#030e44",
        background_dark_4: "#1F69B2",
        primary_dark: "#8256F0",
        secondary_dark: "#15053D",
        accent_dark: "#40D4B1",

        background: "#F6FAFE",
        primary: "#8256F0",
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
