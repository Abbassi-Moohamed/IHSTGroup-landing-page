import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 30px 120px rgba(86, 105, 255, 0.14)",
        soft: "0 28px 80px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(139, 39, 32, 0.18), transparent 24%), radial-gradient(circle at bottom right, rgba(21, 42, 68, 0.16), transparent 28%), linear-gradient(180deg, #081427 0%, #101f36 100%)",
      },
      colors: {
        midnight: "#081427",
        navy: "#152A44",
        burgundy: "#8B2720",
        rosewood: "#B4473F",
        pearl: "#F8F9FA",
        slate: "#CAD4E0",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.8s ease forwards",
        pulseSlow: "pulse 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.78" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
