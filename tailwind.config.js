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
        },
        maxWidth: {
            'inherit': 'inherit',
            '960': '960px',
            '100': '100px'
        },
        minHeight: {
            'custom': 'calc(100vh - 150px)'
        },
        minWidth: {
            '0': '0',
            '150': '150px',
            '500': '500px',
            'min': 'min-content'
        }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
