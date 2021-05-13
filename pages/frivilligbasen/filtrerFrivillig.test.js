import filtrerFrivillig from './filtrerFrivillig'

describe('tester funksjonen filtrerFrivillig', () => {
  test('funksjonen returerer true når det ikke er sendt inn kriterier for filtrering', () => {
    expect(filtrerFrivillig(['Bil', 'SMS'], '')).toBe(true)
  })

  test('funksjonen returerer true når man spør etter Bil i filtrering og bil er en av aktivitetene', () => {
    expect(filtrerFrivillig(['Bil', 'SMS'], '', ['Bil'])).toBe(true)
  })

  test('funksjonen returerer true når man spør etter spraak i filtrering og brukeren har språk', () => {
    expect(filtrerFrivillig(['Bil', 'SMS'], 'Engelsk', ['Spraak'])).toBe(true)
  })

  test('funksjonen returerer false når man spør etter Fly i filtrering og fly IKKE er en av aktivitetene', () => {
    expect(filtrerFrivillig(['Bil', 'SMS'], 'Engelsk', ['Fly'])).toBe(false)
  })

  test('funksjonen returerer false når man spør etter Fly og språk i filtrering', () => {
    expect(filtrerFrivillig(['Bil', 'SMS'], 'Engelsk', ['Fly', 'Spraak'])).toBe(true)
  })
})
