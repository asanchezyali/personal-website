// @ts-check
const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    "./node_modules/pliny/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        ubuntu: ["var(--font-ubuntu)", ...fontFamily.sans],
        lato: ["var(--font-lato)", ...fontFamily.sans],
        roboto: ["var(--font-roboto)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#f5f4ec",
          100: "#e9e7d3",
          200: "#d3cfa6",
          300: "#b5b079",
          400: "#8d8a4f",
          500: "#6b7339",
          600: "#556B2F",
          700: "#3D4F1F",
          800: "#2c3a17",
          900: "#1c2410",
        },
        secondary: {
          400: "#c75d3c",
          500: "#A0341E",
        },
        gray: {
          50: "#faf8f1",
          100: "#f1ede2",
          200: "#e5dfcd",
          300: "#cfc6ad",
          400: "#a39c83",
          500: "#75705f",
          600: "#534f41",
          700: "#3a3729",
          800: "#26241c",
          900: "#16140f",
        },
      },
      backgroundColor: {
        light: "#FAF8F1",
        dark: "#16140f",
      },
      textColor: {
        light: "#111827",
        dark: "#f3f4f6",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.600")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            "h1,h2": {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h3: {
              fontWeight: "600",
            },
            code: {
              color: theme("colors.indigo.500"),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.400")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            "h1,h2,h3,h4,h5,h6": {
              color: theme("colors.gray.100"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}

