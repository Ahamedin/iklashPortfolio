import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── YELLOW BRAND ── */
        yellow: {
          brand: "#FFE034",
          dim:   "#F5D400",
          soft:  "rgba(255,224,52,0.12)",
        },
        ink: {
          DEFAULT: "#0D0D0D",
          soft:    "#181818",
          card:    "#222222",
        },
        /* shadcn tokens */
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        display: ["'Syne'", ...defaultTheme.fontFamily.sans],
        mono:    ["'JetBrains Mono'", ...defaultTheme.fontFamily.mono],
        sans:    ["'Syne'", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-5px)" },
        },
        "gradient-xy": {
          "0%, 100%": { "background-size": "400% 400%", "background-position": "left center" },
          "50%":       { "background-size": "200% 200%", "background-position": "right center" },
        },
        "scanline": {
          "0%":   { top: "-2px" },
          "100%": { top: "100%" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "25%":       { transform: "translate(-30px,30px) scale(1.05)" },
          "50%":       { transform: "translate(20px,-20px) scale(0.95)" },
          "75%":       { transform: "translate(-20px,-20px) scale(1.05)" },
        },
      },
      animation: {
        bounce:        "bounce 0.6s infinite",
        "spin-slow":   "spin 4s linear infinite",
        "gradient-xy": "gradient-xy 3s ease infinite",
        scanline:      "scanline 3s linear infinite",
        blob:          "blob 15s infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

export default config;