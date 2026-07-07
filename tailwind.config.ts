import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontFamily: {
      sans: ["Manrope", "Inter", "Arial", "sans-serif"]
    },
    extend: {
      colors: {
        ink: "#050505",
        coal: "#171A1D",
        smoke: "#171A1D",
        bone: "#F5F3EF",
        copper: {
          DEFAULT: "#5F7485",
          dark: "#5F7485",
          light: "#5F7485"
        },
        moss: "#A9B0B6"
      },
      boxShadow: {
        glow: "none"
      }
    }
  },
  plugins: []
};

export default config;
