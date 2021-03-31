import harTelefonnummerGyldigLandkode from './telefonnummer-har-gyldig-landkode'

describe('tester funksjonaliteten for telefonnummerHarGyldigLandkode', () => {
  test('+47 er gyldig landkode', () => {
    const telefonnummer = '+4712345678'
    expect(harTelefonnummerGyldigLandkode(telefonnummer)).toBe(true)
  })

  test('+1 er ikke gyldig landkode', () => {
    const telefonnummer = '+112345678'
    expect(harTelefonnummerGyldigLandkode(telefonnummer)).toBe(false)
  })
})
