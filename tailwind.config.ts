import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        mist: "#F5F7FA",
        line: "#D7DEE8",
        pine: "#0F766E",
        steel: "#2F5D7C",
        amber: "#B7791F"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 32, 42, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
