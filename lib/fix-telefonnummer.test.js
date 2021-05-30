import fixTelefonNummer from './fix-telefonnummer'

describe('tester funksjonaliteten for fixTelefonNummer', () => {
  test('fjerner whitespace', () => {
    const nummer = '1 2 3 4 5 6 7 8'
    expect(fixTelefonNummer(nummer)).toBe('+4712345678')
  })
  test('fjerner bokstaver', () => {
    const nummer = 'mobil 12345678'
    expect(fixTelefonNummer(nummer)).toBe('+4712345678')
  })
  test('legger + først i nummeret', () => {
    const nummer = '4712345678'
    expect(fixTelefonNummer(nummer)).toBe('+4712345678')
  })
  test('erstatter 0047 med +47', () => {
    const nummer = '004712345678'
    expect(fixTelefonNummer(nummer)).toBe('+4712345678')
  })
  test('erstatter ikke 0047 inne i nummeret hvis 0047 først', () => {
    const nummer = '004712340047'
    expect(fixTelefonNummer(nummer)).toBe('+4712340047')
  })
  test('erstatter ikke 0047 inne i nummeret hvis ikke 0047 først', () => {
    const nummer = '+4712340047'
    expect(fixTelefonNummer(nummer)).toBe('+4712340047')
  })
})
