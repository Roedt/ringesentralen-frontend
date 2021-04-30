function lagEnumvennligStreng (streng) {
  streng = streng.toLowerCase()
  streng = streng.replace(/\s/g, '')
  streng = streng.replace(/æ/g, 'ae')
  streng = streng.replace(/ø/g, 'oe')
  streng = streng.replace(/å/g, 'aa')
  return `${streng.charAt(0).toUpperCase()}${streng.slice(1)}`
}

export default lagEnumvennligStreng
