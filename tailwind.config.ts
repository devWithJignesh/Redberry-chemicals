import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C41E3A",
          "red-dark": "#8E1329",
          "red-light": "#FBE8EA",
          navy: "#0F172A",
          "navy-light": "#1E293B",
          teal: "#0E7C7B",
          cream: "#FAF9F6",
          text: "#1F2430",
          muted: "#5B6472",
        },
      },
      fontFamily: {
        heading: ["Poppins", "ui-sans-serif", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        "ken-burns": "ken-burns 12s ease-in-out infinite alternate",
        marquee: "marquee 30s linear infinite",
      },
      boxShadow: {
        soft: "0 10px 34px rgba(15, 23, 42, 0.08)",
        card: "0 14px 40px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
