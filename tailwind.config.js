module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {},
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
