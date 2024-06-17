/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'gray-1':'#7e7f7e',
        'black-l':'#27251F'
      },
      width:{
        '480':'480px'
      },
      screens:{
        'sm':'500px'
      }
    },
  },
  plugins: [],
}