module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {},
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
