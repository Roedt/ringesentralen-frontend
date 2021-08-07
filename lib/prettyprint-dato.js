const maanedsnavn = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember'
]

const nullfyll = input => input.toString().length === 1 ? `0${input}` : `${input}`

function prettyPrintDate (date) {
  const dato = new Date(date)
  const iDag = new Date()
  const dag = `${nullfyll(dato.getDate())}`
  const maaned = maanedsnavn[dato.getMonth()]
  const klokkeslett = `${nullfyll(dato.getHours())}:${nullfyll(dato.getMinutes())}`
  const aar = dato.getFullYear() !== iDag.getFullYear() ? ` ${dato.getFullYear()}` : ''

  return `${dag}. ${maaned} ${klokkeslett}${aar}`
}

export default prettyPrintDate
