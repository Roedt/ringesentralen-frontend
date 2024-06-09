import { decrypt, encrypt } from './crypto'
import { describe, expect, test } from '@jest/globals'

const ENCRYPTION_KEY = 'Ek6MKdSdEz1EiRs6cX3uUUAAnMYua17h'

describe('tester funksjonaliteten for crypto modulen', () => {
  test('tekst er lik når den blir krypert og dekryptert', () => {
    const tekst = 'dette er en veldig fin tekst, så det så'
    const kryptertTekst = encrypt(tekst, ENCRYPTION_KEY)
    const dekryptertTekst = decrypt(kryptertTekst, ENCRYPTION_KEY)
    expect(dekryptertTekst).toBe(tekst)
  })
})
