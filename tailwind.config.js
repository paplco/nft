/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/**/*.{mdx,md}',
    // "./node_modules/@ekonavi/ekotema/**/*.{js,ts,jsx,tsx,css}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        "2xl": "1400px"
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        "background-menu": "var(--background-menu)",
        "background-menu-hover": "var(--background-menu-hover)",
        "foreground-menu": "var(--foreground-menu)",
        "foreground-menu-hover": "var(--foreground-menu-hover)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderWidth: {
        '1': '1px'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],     // 12px, line-height: 16px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px, line-height: 20px
        'base': ['1rem', { lineHeight: '1.5rem' }],    // 16px, line-height: 24px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px, line-height: 28px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],  // 20px, line-height: 28px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px, line-height: 32px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],// 30px, line-height: 36px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px, line-height: 40px
        '5xl': ['3rem', { lineHeight: '1' }],          // 48px, line-height: 1
        '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px, line-height: 1
        '7xl': ['4.5rem', { lineHeight: '1' }],        // 72px, line-height: 1
        '8xl': ['6rem', { lineHeight: '1' }],          // 96px, line-height: 1
        '9xl': ['8rem', { lineHeight: '1' }],          // 128px, line-height: 1
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}