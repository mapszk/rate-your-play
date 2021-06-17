module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        'n': '-1'
      },
      colors: {
        primary: "#ED6D5C",
        secondary: "#452044",
        dark: "#180C14",
        mid: "#594373",
      }
    },
    minWidth: {
      '0': '0',
      '150' : '150px',
      '500' : '500px'
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
