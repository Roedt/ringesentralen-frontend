import prettyprintDato from './prettyprint-dato'

describe('tester funksjonen prettyprint dato', () => {
  test('returnerer 01. mars 13:00 for inneværende år', () => {
    const iDag = new Date()
    const aar = iDag.getFullYear()
    const dato = new Date(`${aar}-03-01 13:00`)
    expect(prettyprintDato(dato)).toBe('01. mars 13:00')
  })

  test('returnerer 01. mars 13:00 2020 for 2020', () => {
    const dato = new Date('2020-03-01 13:00')
    expect(prettyprintDato(dato)).toBe('01. mars 13:00 2020')
  })

  test('returnerer 13. september 08:00 2020 for 2020', () => {
    const dato = new Date('2020-09-13 8:00')
    expect(prettyprintDato(dato)).toBe('13. september 08:00 2020')
  })

  test('returnerer 13. september 20:00 2020 for 2020', () => {
    const dato = new Date('2020-09-13 8:00 PM')
    expect(prettyprintDato(dato)).toBe('13. september 20:00 2020')
  })
})
