import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0b",
        coal: "#141313",
        smoke: "#24211f",
        bone: "#f4efe7",
        copper: {
          DEFAULT: "#6F8196",
          dark: "#56687D",
          light: "#A9B7C5"
        },
        moss: "#9aa88a"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Menlo", "Monaco", "Consolas", "monospace"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(111, 129, 150, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
