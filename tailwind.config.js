/** @type {import('tailwindcss').Config} */
export default {
  darkMode : 'class',
  content: [
    "./*.{html}}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,html}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};