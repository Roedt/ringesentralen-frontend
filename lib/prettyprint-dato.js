function prettyPrintDate (date) {
  return new Date(date).toLocaleDateString('nb-NO', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })
}

export default prettyPrintDate
