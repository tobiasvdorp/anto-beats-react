module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background_dark: "#000010", // Blackish
        background_dark_secondary: "#15053D", // CTA purple
        background_dark_4: "#1F69B2", // Blueish for gradient
        primary_dark: "#8256F0", // light purple
        secondary_dark: "#15053D", // Dark purple
        accent_dark: "#40D4B1", // Light green
        secondary: "#072640", // dark blue

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
