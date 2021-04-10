const linker = {
  nyhetsbrev: 'For å motta nyhetsbrev melder du deg på her https://roedt.no',
  aksjonsside: 'Aksjonssiden vår finner du på https://www.fellesskapfungerer.no',
  medlemsside: 'Du kan lese mer om å bli medlem i Rødt, og melde deg inn på medlemssiden vår https://roedt.no/bli-medlem'
}

function genererLinkmelding (vilHaNyhetsbrevLink, vilHaMedlemsLink, vilHaFellesskapLink) {
  const antallLinker = [vilHaNyhetsbrevLink, vilHaMedlemsLink, vilHaFellesskapLink].filter(item => item === true).length
  const melding = []

  melding.push(`Hei. Her er linken${antallLinker > 1 ? 'e' : ''} du ville ha fra oss`)

  if (vilHaNyhetsbrevLink) {
    melding.push(linker.nyhetsbrev)
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
