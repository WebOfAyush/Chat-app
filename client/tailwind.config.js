/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#2E333D",
        foreground:'#454F64',
        primary: "#6B8AFD",
        primaryHover:'#4B70FA',
        secondary: "#909090",
        tertiary:"#131313",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
