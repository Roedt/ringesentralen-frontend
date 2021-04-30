function lagEnumvennligStreng (streng) {
  streng = streng.replace(/\s/g, '')
  streng = streng.replace(/æ/g, 'ae')
  streng = streng.replace(/Æ/g, 'Ae')
  streng = streng.replace(/ø/g, 'oe')
  streng = streng.replace(/Ø/g, 'Oe')
  streng = streng.replace(/å/g, 'aa')
  streng = streng.replace(/Å/g, 'Aa')
  return streng
}

export default lagEnumvennligStreng
