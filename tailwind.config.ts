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
        ink: "#07142E",
        mist: "#F6F7FB",
        line: "#D6DBE8",
        navy: "#071A3D",
        gold: "#C9A227",
        royal: "#1C3F7A",
        pine: "#071A3D",
        steel: "#1C3F7A",
        amber: "#C9A227"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(7, 20, 46, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
