const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

function toRGB(value) {
  return value
    .replace(/^#/, "")
    .match(/.{1,2}/g)
    .map((v) => parseInt(v, 16))
    .join(" ");
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/lucide-react/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#002D62",
        secondary: "#EDC645",
        success: "rgb(var(--color-success) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        pending: "rgb(var(--color-pending) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        prussianBlue: "#002D62",
        primaryGreen: "#4CAF50",
        primaryGray: "#0D141C",
        paleYellow: "#FFEEB7",
        lightPaleYellow: "#FFF7DC",
        royalBlue: "#104f98",
        alabaster: "#FAFAFA",
        papaya: "#FFF1DA",
        cornsilk: "#FFF6D6",
        lightYellowBase: "#EDC645",
        lightGray: "#656565",
        lightGray100: "#C6C6C6",
        lightBlue: "#CFDBE8",
        neutralGray: "#6e7368",
        neutralWhite: "#ffffff",
        neutralBlue: "#F2F8FF",
        darkPrimary: "#022723",
        darkSecondary: "#011311",
        darkmode: {
          50: "rgb(var(--color-darkmode-50) / <alpha-value>)",
          100: "rgb(var(--color-darkmode-100) / <alpha-value>)",
          200: "rgb(var(--color-darkmode-200) / <alpha-value>)",
          300: "rgb(var(--color-darkmode-300) / <alpha-value>)",
          400: "rgb(var(--color-darkmode-400) / <alpha-value>)",
          500: "rgb(var(--color-darkmode-500) / <alpha-value>)",
          600: "rgb(var(--color-darkmode-600) / <alpha-value>)",
          700: "rgb(var(--color-darkmode-700) / <alpha-value>)",
          800: "rgb(var(--color-darkmode-800) / <alpha-value>)",
          900: "rgb(var(--color-darkmode-900) / <alpha-value>)",
        },
      },
      fontFamily: {
        aeonikBold: ["Aeonik Bold", "sans-serif"],
        aeonikLight: ["Aeonik Light", "sans-serif"],
        roboto: ["Roboto"],
        wix: ["Wix Madefor Display", "sans-serif"],
        aeonik: ["Aeonik", "sans-serif"],
      },
      container: {
        center: true,
        padding: "6rem",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5,
      },
      backdropBlur: {
        21.3: "21.3px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addBase, matchUtilities }) {
      addBase({
        // Default dark-mode colors
        ".dark": {
          "--color-primary": toRGB(colors.blue["800"]),
          "--color-darkmode-50": "87 103 132",
          "--color-darkmode-100": "74 90 121",
          "--color-darkmode-200": "65 81 114",
          "--color-darkmode-300": "53 69 103",
          "--color-darkmode-400": "48 61 93",
          "--color-darkmode-500": "41 53 82",
          "--color-darkmode-600": "40 51 78",
          "--color-darkmode-700": "35 45 69",
          "--color-darkmode-800": "27 37 59",
          "--color-darkmode-900": "15 23 42",
        },
        // Theme 1 colors
        ".theme-1": {
          "--color-primary": toRGB(colors.emerald["900"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.emerald["600"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.yellow["400"]),
          "--color-pending": toRGB(colors.amber["500"]),
          "--color-danger": toRGB(colors.rose["600"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
          "&.dark": {
            "--color-primary": toRGB(colors.emerald["800"]),
          },
        },
        // Theme 2 colors
        ".theme-2": {
          "--color-primary": toRGB(colors.blue["800"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.lime["500"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.yellow["400"]),
          "--color-pending": toRGB(colors.orange["500"]),
          "--color-danger": toRGB(colors.red["600"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
          "&.dark": {
            "--color-primary": toRGB(colors.blue["800"]),
          },
        },
        // Theme 3 colors
        ".theme-3": {
          "--color-primary": toRGB(colors.cyan["900"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.teal["600"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.amber["500"]),
          "--color-pending": toRGB(colors.amber["600"]),
          "--color-danger": toRGB(colors.red["700"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
          "&.dark": {
            "--color-primary": toRGB(colors.cyan["800"]),
          },
        },
        // Theme 4 colors
        ".theme-4": {
          "--color-primary": toRGB(colors.indigo["900"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.emerald["600"]),
          "--color-info": toRGB(colors.cyan["500"]),
          "--color-warning": toRGB(colors.yellow["500"]),
          "--color-pending": toRGB(colors.orange["600"]),
          "--color-danger": toRGB(colors.red["700"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
          "&.dark": {
            "--color-primary": toRGB(colors.indigo["700"]),
          },
        },
      });

      // Animation delay utilities
      matchUtilities(
        {
          "animate-delay": (value) => ({
            "animation-delay": value,
          }),
        },
        {
          values: (() => {
            const values = {};
            for (let i = 1; i <= 50; i++) {
              values[i * 10] = `${i * 0.1}s`;
            }
            return values;
          })(),
        }
      );

      // Animation fill mode utilities
      matchUtilities(
        {
          "animate-fill-mode": (value) => ({
            "animation-fill-mode": value,
          }),
        },
        {
          values: {
            none: "none",
            forwards: "forwards",
            backwards: "backwards",
            both: "both",
          },
        }
      );
    }),
  ],
  variants: {
    extend: {
      boxShadow: ["dark"],
    },
  },
};
