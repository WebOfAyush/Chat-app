/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#202329",
        foreground:'#454F64',
        primary: "#597df9",
        // primary: "#4B70FA",
        primaryHover:'#4B70FA',
        secondary: "#909090",
        tertiary:"#131313",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none',    // Firefox
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',              // Chrome, Safari, Opera
        },
      });
    },
  ],
};
