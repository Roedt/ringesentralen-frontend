import filtrerFrivillig from './filtrerFrivillig'
import { describe, expect, test } from '@jest/globals'

const aktiviteter = [
  { id: 1, aktivitet: 'Bil' },
  { id: 2, aktivitet: 'SMS' }
]

describe('tester funksjonen filtrerFrivillig', () => {
  test('funksjonen returerer true når det ikke er sendt inn kriterier for filtrering', () => {
    expect(filtrerFrivillig(aktiviteter, null)).toBe(true)
  })

  test('funksjonen returerer true når man spør etter Bil i filtrering og bil er en av aktivitetene', () => {
    expect(filtrerFrivillig(aktiviteter, null, ['Bil'])).toBe(true)
  })

  test('funksjonen returerer true når man spør etter spraak i filtrering og brukeren har språk', () => {
    expect(filtrerFrivillig(aktiviteter, 'Engelsk', ['Spraak'])).toBe(true)
  })

  test('funksjonen returerer false når man spør etter Fly i filtrering og fly IKKE er en av aktivitetene', () => {
    expect(filtrerFrivillig(aktiviteter, 'Engelsk', ['Fly'])).toBe(false)
  })

  test('funksjonen returerer true når man spør etter Fly og språk i filtrering', () => {
    expect(filtrerFrivillig(aktiviteter, 'Engelsk', ['Fly', 'Spraak'])).toBe(true)
  })
})
