function lagOnskeListe (oppfoelging) {
  const {
    koronaprogram,
    vilBliMerAktiv,
    vilPolitikkLink,
    vilBliRingtAugust,
    valgkampsbrev,
    vilIkkeBliRingt,
    vilHaMedlemsLink,
    vilHaFellesskapLink,
    vilHaNyhetsbrevLink
  } = oppfoelging
  const liste = []
  if (koronaprogram) {
    liste.push('Vil ha korona-program på epost')
  }
  if (vilPolitikkLink) {
    liste.push('Vil ha sms med link Rødts politikk')
  }
  if (vilBliMerAktiv) {
    liste.push('Kan tenke seg å være mer aktiv i Rødt framover')
  }
  if (valgkampsbrev) {
    liste.push('Vil ha valgkampsbrev med informasjon om valgkampen')
  }
  if (vilHaMedlemsLink) {
    liste.push('Vil ha sms med link om å bli medlem')
  }
  if (vilHaFellesskapLink) {
    liste.push('Vil ha sms med link til fellesskapfungerer.no')
  }
  if (vilHaNyhetsbrevLink) {
    liste.push('Vil ha tilsendt link til nyhetsbrev')
  }
  if (vilBliRingtAugust) {
    liste.push('Vil bli ringt igjen i augustt')
  }
  if (vilIkkeBliRingt) {
    liste.push('Vil IKKE bli ringt')
  }
  return liste
}

function Linje ({ text }) {
  return (
    <li className='ml-4'>
      {text}
    </li>
  )
}

function Oppfoelging ({ oppfoelging }) {
  if (!oppfoelging) return null
  const onsker = lagOnskeListe(oppfoelging)
  if (onsker.length === 0) return null
  return (
      <ul className='list-disc text-sm text-gray-700'>
        {onsker.map((text, index) => <Linje text={text} key={`onskelinje-${index}`} />)}
      </ul>
  )
}

export default Oppfoelging
