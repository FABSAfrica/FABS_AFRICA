/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem", xl: "4rem" },
    },
    extend: {
      colors: {
        ink: "#151111",
        "ink-soft": "#4B4545",
        paper: "#FAF6F2",
        line: "#E9E3DD",
        brand: {
          DEFAULT: "#93302F",
          dark: "#7A2524",
          light: "#A83B39",
        },
        accent: {
          DEFAULT: "#E8963A",
          dark: "#B8661A", // darker orange for text on white backgrounds
        },
      },
      fontFamily: {
        // "museo-sans" is the Adobe Fonts family name; "Museo Sans" is the self-hosted name.
        display: ['"Museo Sans"', '"museo-sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        sans: ['"Museo Sans"', '"museo-sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "drawer-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "drawer-in": "drawer-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
}