module.exports = {
  purge: {
    content: ["./dist/**/*.html"],

    // Manually whitelist style classes for PurgeCSS to ignore
    options: {
      whitelist: [],
    },
  },
  theme: {
    colors: {
      transparent: "transparent",
      primary: "#212b32",
      blue: "#005eb8",
      navy: "#002f5c",
      green: "#007f3b",
      "dark-green": "#00401e",
      yellow: "#ffeb3b",
      "warm-yellow": "#ffb81C",
      red: "#d5281b",
      "dark-pink": "#7C2855",
      purple: "#330072",
      "grey-1": "#4c6272",
      "grey-2": "#768692",
      "grey-3": "#aeb7bd",
      "grey-4": "#d8dde0",
      "grey-5": "#f0f4f5",
      "grey-6": "#d1d5db",
      white: "#ffffff",
      "pale-yellow": "#fff9c4",
    },

    extend: {
      screens: {
        print: { raw: "print" },
      },
      padding: {
        9: "2.25rem",
        "1/4": "25%",
      },
      inset: {
        "1/6": "16.6%",
        "1/2": "50%",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "inherit",
          },
        },
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
