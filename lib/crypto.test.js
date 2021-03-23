import { encrypt, decrypt } from './crypto'
const ENCRYPTION_KEY = 'Ek6MKdSdEz1EiRs6cX3uUUAAnMYua17h'

describe('tester funksjonaliteten for crypto modulen', () => {
  test('tekst er lik når den blir krypert og dekryptert', () => {
    const tekst = 'dette er en veldig fin tekst'
    const kryptertTekst = encrypt(tekst, ENCRYPTION_KEY)
    console.log(kryptertTekst)
    const dekryptertTekst = decrypt(kryptertTekst, ENCRYPTION_KEY)
    expect(dekryptertTekst).toBe(tekst)
  })
})
