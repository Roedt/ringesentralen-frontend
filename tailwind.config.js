module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {},
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
