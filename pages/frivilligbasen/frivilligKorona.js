function FrivilligKorona ({ frivilligKorona }) {
  if (!frivilligKorona || frivilligKorona.length === 0) return null
  const tydelig = frivilligKorona.tydelig ? 'Synes Rødt har hatt tydelige løsninger under pandemien' : 'Synes ikke Rødt har hatt tydelige løsninger under pandemien'
  const personlig = frivilligKorona.personlig
    ? 'Har selv, eller har noen i sin nære omkrets som har, opplevd økonomiske konsekvenser som følge av koronakrisa'
    : 'Har ikke selv, eller i sin nære omkrets som har, opplevd økonomiske konsekvenser som følge av koronakrisa'
  const forslag = frivilligKorona.forslag.length > 1
    ? 'Forslag noe spesielt Rødt bør foreslå for å hjelpe folk gjennom koronakrisa: ' + frivilligKorona.forslag
    : ''
  return (
    <>
      <div className='text-l font-semibold text-gray-900'>
        Synspunkter på koronahåndteringen
      </div>
      <div>
        {tydelig}
      </div>
      <div>
        Synes regjeringa har håndtert koronakrisa på en forsvarlig måte? {frivilligKorona.haandtering}
      </div>
      <div>
        {personlig}
      </div>
      <div>
        {forslag}
      </div>
    </>
  )
}

export default FrivilligKorona
