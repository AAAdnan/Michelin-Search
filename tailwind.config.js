module.exports = {
  theme: {
    extend: {
      fontFamily: {
        logo: ["Laton", "sans-serif"]
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms', './node_modules/pikaday/css/pikaday.css')  ]
};
