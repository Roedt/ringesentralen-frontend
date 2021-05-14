function lagEnumvennligStreng (streng) {
  streng = streng.replace(/\s/g, '')
  streng = streng.replace(/-/g, '')
  streng = streng.replace(/æ/g, 'ae')
  streng = streng.replace(/Æ/g, 'Ae')
  streng = streng.replace(/ø/g, 'oe')
  streng = streng.replace(/Ø/g, 'Oe')
  streng = streng.replace(/å/g, 'aa')
  streng = streng.replace(/Å/g, 'Aa')
  streng = streng.replace(/,/g, '_')
  streng = streng.replace(/\./g, '_')
  streng = streng.replace(/\(/g, '_')
  streng = streng.replace(/\)/g, '')
  return streng
}

export default lagEnumvennligStreng
