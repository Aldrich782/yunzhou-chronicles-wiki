import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        'serif': ['"Noto Serif SC"', '"ZCOOL XiaoWei"', 'serif'],
        'calligraphy': ['"Ma Shan Zheng"', '"ZCOOL XiaoWei"', 'cursive'],
        'sans': ['"Noto Serif SC"', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        cinnabar: "hsl(var(--cinnabar))",
        indigo: "hsl(var(--indigo))",
        bamboo: "hsl(var(--bamboo))",
        ink: "hsl(var(--ink))",
        jade: "hsl(var(--jade))",
        zixiao: {
          primary: "hsl(var(--zixiao-primary))",
          secondary: "hsl(var(--zixiao-secondary))",
          accent: "hsl(var(--zixiao-accent))",
          glow: "hsl(var(--zixiao-glow))",
        },
        shanhaixuan: {
          primary: "hsl(var(--shanhaixuan-primary))",
          secondary: "hsl(var(--shanhaixuan-secondary))",
          accent: "hsl(var(--shanhaixuan-accent))",
          glow: "hsl(var(--shanhaixuan-glow))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-dark': 'var(--gradient-dark)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-ink': 'var(--gradient-ink)',
        'gradient-cinnabar': 'var(--gradient-cinnabar)',
        'gradient-zixiao': 'var(--gradient-zixiao)',
        'gradient-shanhaixuan': 'var(--gradient-shanhaixuan)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'card': 'var(--shadow-card)',
        'gold': 'var(--shadow-gold)',
        'glow': 'var(--shadow-glow)',
        'inner': 'var(--shadow-inner)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
