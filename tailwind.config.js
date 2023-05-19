/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: ["var(--font-montserrat)"],
      },
      colors: {
        grey: {
          100: "#42464E",
          200: "#303136",
          300: "#212226",
          400: "#18191D",
        },
        primary: {
          100: "#80C1F9",
          200: "#40A3F7",
          300: "#0084F4",
        },
        text: {
          primary: "#999999",
          secondary: "#D9D9D9",
        },
      },
      backgroundColor: {
        search: "#212226",
        nav: "#212226",
        body: "#18191D",
        card: "#1E1F24",
        profile: "#41464F",
      },
    },
  },
  plugins: [],
};
