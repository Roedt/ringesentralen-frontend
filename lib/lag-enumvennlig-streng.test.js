import lageEnumvennligStreng from './lag-enumvennlig-streng'

describe('tester funksjonen lageEnumvennligStreng', () => {
  test('funksjonen fjerner whitespace', () => {
    const ord = lageEnumvennligStreng('Vil bli')
    expect(ord).toBe('Vilbli')
  })

  test('funksjonen bytter ut æøå', () => {
    const ord = lageEnumvennligStreng('Dørbænkingå')
    expect(ord).toBe('Doerbaenkingaa')
  })

  test('funksjonen bytter ut .,', () => {
    const ord = lageEnumvennligStreng('a.b.c,d')
    expect(ord).toBe('a_b_c_d')
  })

  test('funksjonen bytter ut -', () => {
    const ord = lageEnumvennligStreng('a-b-c-d')
    expect(ord).toBe('abcd')
  })

  test('funksjonen bytter ut ()', () => {
    const ord = lageEnumvennligStreng('a(b)c')
    expect(ord).toBe('a_bc')
  })

  test('funksjonen endrer ikke ok strenger', () => {
    const ord = lageEnumvennligStreng('Bil')
    expect(ord).toBe('Bil')
  })

  test('funksjonen endrer ikke case', () => {
    const ord = lageEnumvennligStreng('SMS')
    expect(ord).toBe('SMS')
  })
})
