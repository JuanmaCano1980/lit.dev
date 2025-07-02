/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marvel-red': '#ED1D24',
        'marvel-dark': '#202020',
        'marvel-gray': '#F5F5F5',
      },
      fontFamily: {
        'marvel': ['Roboto', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 