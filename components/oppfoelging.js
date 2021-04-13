function lagOnskeListe (oppfoelging) {
  const {
    koronaprogram,
    merAktiv,
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
  if (merAktiv) {
    liste.push('Kan tenke seg å være mer aktiv i Rødt framover')
  }
  if (valgkampsbrev) {
    liste.push('Vil ha valgkampsbrev med informasjon om valgkampen')
  }
  if (vilHaMedlemsLink) {
    liste.push('Vil ha tilsendt link om å bli medlem')
  }
  if (vilHaFellesskapLink) {
    liste.push('Vil ha tilsendt link til fellesskapfungerer.no')
  }
  if (vilHaNyhetsbrevLink) {
    liste.push('Vil ha tilsendt link til nyhetsbrev')
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

function Oppfoelging ({ oppfoelging, className }) {
  if (!oppfoelging) return null
  const onsker = lagOnskeListe(oppfoelging)
  if (onsker.length === 0) return null
  return (
    <div className={className}>
      <ul className='list-disc'>
        {onsker.map((text, index) => <Linje text={text} key={`onskelinje-${index}`} />)}
      </ul>
    </div>
  )
}

export default Oppfoelging
