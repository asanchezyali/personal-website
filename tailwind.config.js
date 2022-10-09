module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "/providers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        rotateAnimation: {
          from: {transform: 'rotateY(0deg)'},
	        to: {transform: 'rotateY(360deg)'},
        }
      },
      animation: {
        rotateAnimation: 'rotateAnimation 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
