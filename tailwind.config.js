/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};
