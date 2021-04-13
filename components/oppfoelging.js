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
    liste.push('Ønsker å få tilsendt koronaprogram')
  }
  if (merAktiv) {
    liste.push('Ønsker å bli mer aktiv i Rødt')
  }
  if (valgkampsbrev) {
    liste.push('Ønsker å få tilsendt valgkampsbrev')
  }
  if (vilHaMedlemsLink) {
    liste.push('Ønsker tilsendt link for medlemsskap')
  }
  if (vilHaFellesskapLink) {
    liste.push('Ønsker tilsendt link for fellesskapfungerer.no')
  }
  if (vilHaNyhetsbrevLink) {
    liste.push('Ønsker tilsendt link for nyhetsbrev')
  }
  if (vilIkkeBliRingt) {
    liste.push('Ønsker IKKE å bli ringt igjen')
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
    <div>
      <ul className='list-disc'>
        {onsker.map((text, index) => <Linje text={text} key={`onskelinje-${index}`} />)}
      </ul>
    </div>
  )
}

export default Oppfoelging
