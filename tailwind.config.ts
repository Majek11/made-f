import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",

        /* Palette helpers */
        cream:        "hsl(var(--cream))",
        "cream-dark": "hsl(var(--cream-dark))",

        /* Gold scale — extracted from medallion ring */
        gold:        "hsl(var(--gold))",
        "gold-bright":"hsl(var(--gold-bright))",
        "gold-mid":  "hsl(var(--gold-mid))",
        "gold-deep": "hsl(var(--gold-deep))",
        "gold-light":"hsl(var(--gold-light))",

        /* Obsidian / charcoal scale — extracted from seal face */
        obsidian:    "hsl(var(--obsidian))",
        charcoal:    "hsl(var(--charcoal))",
        "charcoal-mid": "hsl(var(--charcoal-mid))",

        /* Backward-compat alias (now champagne) */
        "green-light": "hsl(var(--green-light))",

        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:              "hsl(var(--sidebar-background))",
          foreground:           "hsl(var(--sidebar-foreground))",
          primary:              "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent:               "hsl(var(--sidebar-accent))",
          "accent-foreground":  "hsl(var(--sidebar-accent-foreground))",
          border:               "hsl(var(--sidebar-border))",
          ring:                 "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-hero":    "var(--gradient-hero)",
        "gradient-section": "var(--gradient-section)",
        "gradient-gold":    "var(--gradient-gold)",
      },
      boxShadow: {
        card:  "var(--shadow-card)",
        hover: "var(--shadow-hover)",
        gold:  "var(--shadow-gold)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        /* Subtle gold shimmer sweep */
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fadeUp 0.7s ease-out forwards",
        "float":          "float 4s ease-in-out infinite",
        "slide-in":       "slideIn 0.5s ease-out forwards",
        "shimmer":        "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
