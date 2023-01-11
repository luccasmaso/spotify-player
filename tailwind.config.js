/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./lib/Presentation/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
  darkMode: 'class',
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      neutral: colors.neutral
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans]
    }
  }
}
