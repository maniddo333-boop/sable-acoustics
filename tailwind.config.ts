import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#08070a",
          900: "#0c0a0d",
          800: "#131015",
          700: "#1c1820",
          600: "#282230",
        },
        ivory: "#f2ece0",
        muted: "#8f897f",
        amber: {
          DEFAULT: "#d99a4e",
          soft: "#e8b878",
          dim: "#8a5c2c",
        },
        copper: "#b87a4b",
        walnut: {
          DEFAULT: "#2e2016",
          light: "#4a3423",
        },
        hairline: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      transitionTimingFunction: {
        weighted: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      spacing: {
        "18": "4.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
