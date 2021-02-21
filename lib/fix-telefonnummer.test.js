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
})
