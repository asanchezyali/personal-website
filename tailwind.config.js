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
          50: "#f0f1f8",
          100: "#d9dced",
          200: "#b3b8db",
          300: "#8d94c9",
          400: "#5a63a8",
          500: "#1a1a2e",
          600: "#161628",
          700: "#121222",
          800: "#0e0e1c",
          900: "#0a0a16",
        },
        secondary: {
          400: "#ef5561",
          500: "#e63946",
        },
        gray: {
          50: "#FFFDF7",
          100: "#f7f5ef",
          200: "#ece9e0",
          300: "#ddd9ce",
          400: "#b0aba0",
          500: "#807b70",
          600: "#5c5850",
          700: "#3d3a34",
          800: "#252320",
          900: "#1a1917",
        },
      },
      backgroundColor: {
        light: "#FFFDF7",
        dark: "#141420",
      },
      textColor: {
        light: "#1a1a2e",
        dark: "#f0eee8",
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

