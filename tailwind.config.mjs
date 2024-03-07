/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: ["proxima-nova", "sans-serif"],
      serif: ["ivypresto-headline", "serif"],
    },
    extend: {
      colors: {
        brand: colors.sky,
        secondary: colors.zinc,
      },
    },
  },
  plugins: [],
};
