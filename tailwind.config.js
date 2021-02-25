module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      colors: {
        red: '#e52437'
      }
    }
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
