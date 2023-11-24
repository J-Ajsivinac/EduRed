/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'bg-dark': '#151515',
        'panel-dark': '#272727',
        'sub-dark':'#353535'
      }
    },
  },
  plugins: [],
}

