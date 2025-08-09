/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/shadcn-vue/**/*.{js,ts,vue}", // for shadcn-vue components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
