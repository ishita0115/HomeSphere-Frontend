import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#EEF2F7",
          100: "#D5DFE9",
          200: "#AAC0D3",
          300: "#7FA0BC",
          400: "#4E7FA3",
          500: "#2D5F8A",
          600: "#1A4570",
          700: "#0B2D55",
          800: "#071E3D",
          900: "#040F20",
        },
        gold: {
          50:  "#FDF8EE",
          100: "#F9EDCC",
          200: "#F4DC99",
          300: "#EEC766",
          400: "#E5B03A",
          500: "#D4941C",
          600: "#B87A14",
          700: "#8F5E0F",
          800: "#664308",
          900: "#3D2703",
        },
        primary: {
          DEFAULT: "#0B2D55",
          light:   "#1A4570",
          dark:    "#040F20",
        },
        accent: {
          DEFAULT: "#E5B03A",
          light:   "#EEC766",
          dark:    "#B87A14",
        },
        surface: {
          DEFAULT:   "#FFFFFF",
          secondary: "#F8FAFD",
          muted:     "#EEF2F7",
        },
      },
      fontFamily: {
        sans:    ["Inter",   "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem",  { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display":    ["3rem",    { lineHeight: "1.15",letterSpacing: "-0.015em"}],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      boxShadow: {
        "xs":         "0 1px 3px rgba(11,45,85,0.06)",
        "card":       "0 2px 16px rgba(11,45,85,0.08), 0 1px 4px rgba(11,45,85,0.04)",
        "card-hover": "0 12px 40px rgba(11,45,85,0.16), 0 4px 12px rgba(11,45,85,0.08)",
        "glass":      "0 8px 32px rgba(11,45,85,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
        "gold":       "0 4px 20px rgba(229,176,58,0.35)",
        "glow":       "0 0 40px rgba(229,176,58,0.25)",
        "navbar":     "0 2px 24px rgba(11,45,85,0.10)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "hero-gradient":  "linear-gradient(165deg, rgba(4,15,32,0.55) 0%, rgba(11,45,85,0.75) 50%, rgba(4,15,32,0.88) 100%)",
        "navy-gradient":  "linear-gradient(135deg, #0B2D55 0%, #1A4570 50%, #0B2D55 100%)",
        "gold-gradient":  "linear-gradient(135deg, #E5B03A 0%, #EEC766 50%, #D4941C 100%)",
        "card-gradient":  "linear-gradient(180deg, transparent 40%, rgba(4,15,32,0.85) 100%)",
        "mesh-gradient":  "radial-gradient(at 40% 20%, hsla(210,70%,15%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(225,60%,20%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(210,70%,12%,1) 0px, transparent 50%)",
        "subtle-grid":    "linear-gradient(rgba(11,45,85,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(11,45,85,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "24px 24px",
      },
      animation: {
        "fade-up":      "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":      "fadeIn 0.5s ease both",
        "fade-down":    "fadeDown 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "slide-left":   "slideLeft 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "slide-right":  "slideRight 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "scale-up":     "scaleUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "float":        "float 6s ease-in-out infinite",
        "shimmer":      "shimmer 2s linear infinite",
        "pulse-gold":   "pulseGold 2s ease-in-out infinite",
        "count-up":     "countUp 1s cubic-bezier(0.16,1,0.3,1) both",
      },
      keyframes: {
        fadeUp:    { from: { opacity:"0", transform:"translateY(30px)" }, to: { opacity:"1", transform:"translateY(0)" }},
        fadeDown:  { from: { opacity:"0", transform:"translateY(-20px)" }, to: { opacity:"1", transform:"translateY(0)" }},
        fadeIn:    { from: { opacity:"0" }, to: { opacity:"1" }},
        slideLeft: { from: { opacity:"0", transform:"translateX(40px)"  }, to: { opacity:"1", transform:"translateX(0)" }},
        slideRight:{ from: { opacity:"0", transform:"translateX(-40px)" }, to: { opacity:"1", transform:"translateX(0)" }},
        scaleUp:   { from: { opacity:"0", transform:"scale(0.92)" }, to: { opacity:"1", transform:"scale(1)" }},
        float:     { "0%,100%": { transform:"translateY(0px)" }, "50%": { transform:"translateY(-12px)" }},
        shimmer:   { from: { backgroundPosition:"200% center" }, to: { backgroundPosition:"-200% center" }},
        pulseGold: { "0%,100%": { boxShadow:"0 0 0 0 rgba(229,176,58,0.4)" }, "50%": { boxShadow:"0 0 0 12px rgba(229,176,58,0)" }},
        countUp:   { from: { opacity:"0", transform:"translateY(10px)" }, to: { opacity:"1", transform:"translateY(0)" }},
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
