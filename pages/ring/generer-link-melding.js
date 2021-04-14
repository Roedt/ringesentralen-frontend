const linker = {
  politikk: 'For å lese mer om politikken vår går du hit https://roedt.no/politikken',
  aksjonsside: 'Aksjonssiden vår finner du på https://www.fellesskapfungerer.no',
  medlemsside: 'Du kan lese mer om å bli medlem i Rødt, og melde deg inn på medlemssiden vår https://roedt.no/bli-medlem'
}

function genererLinkmelding (vilPolitikkLink, vilHaMedlemsLink, vilHaFellesskapLink) {
  const antallLinker = [vilPolitikkLink, vilHaMedlemsLink, vilHaFellesskapLink].filter(item => item === true).length
  const melding = []

  melding.push(`Hei. Her er linken${antallLinker > 1 ? 'e' : ''} du ville ha fra oss`)

  if (vilPolitikkLink) {
    melding.push(linker.politikk)
  }

  if (vilHaMedlemsLink) {
    melding.push(linker.medlemsside)
  }

  if (vilHaFellesskapLink) {
    melding.push(linker.aksjonsside)
  }

  return melding.join('. ')
}

export default genererLinkmelding
