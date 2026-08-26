/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 COLORS (Super-Premium Institutional & Sacred Palette)
      colors: {
        primary: "#080C15",
        "primary-light": "#0E1422",
        secondary: "#525F7F",
        "secondary-dark": "#323D54",
        surface: "#FAF9F6",
        "surface-pure": "#FFFFFF",
        "surface-dark": "#0B101D",
        muted: "#E5E7EB",
        "muted-dark": "#1E293B",
        accent: {
          DEFAULT: "#C59B27",
          light: "#E5C368",
          dark: "#9E7A16",
          subtle: "rgba(197, 155, 39, 0.08)",
          glow: "rgba(197, 155, 39, 0.25)",
        },
        champagne: "#F7EEDB",
        obsidian: "#060911",
      },

      // 🔤 TYPOGRAPHY
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "Cambria", "serif"],
        chivo: ["Chivo", "sans-serif"],
      },

      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.08em",
        widest: "0.2em",
      },

      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "0.95rem" }],
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.875rem", { lineHeight: "1.35rem" }],
        base: ["1rem", { lineHeight: "1.65rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.8rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.3rem" }],
        "4xl": ["2.35rem", { lineHeight: "2.8rem" }],
        "5xl": ["3.15rem", { lineHeight: "1.15" }],
        "6xl": ["4rem", { lineHeight: "1.08" }],
      },

      // 🔲 BORDER RADIUS
      borderRadius: {
        none: "0px",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        full: "9999px",
      },

      // 🌫️ SHADOWS (Enterprise Multi-Layer Ambient)
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        soft: "0 4px 12px -2px rgba(8, 12, 21, 0.04), 0 2px 4px -2px rgba(8, 12, 21, 0.02)",
        medium: "0 12px 32px -4px rgba(8, 12, 21, 0.08), 0 4px 8px -2px rgba(8, 12, 21, 0.03)",
        strong: "0 24px 48px -8px rgba(8, 12, 21, 0.14), 0 8px 16px -4px rgba(8, 12, 21, 0.05)",
        luxury: "0 20px 40px -15px rgba(8, 12, 21, 0.07), 0 0 0 1px rgba(8, 12, 21, 0.04)",
        "luxury-hover": "0 30px 60px -12px rgba(8, 12, 21, 0.12), 0 0 0 1px rgba(197, 155, 39, 0.3)",
        glow: "0 0 30px rgba(197, 155, 39, 0.2)",
        "glow-lg": "0 0 60px rgba(197, 155, 39, 0.35)",
        "dark-card": "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)",
      },

      // ⚡ TRANSITIONS
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
      },
    },
  },
  plugins: [],
}