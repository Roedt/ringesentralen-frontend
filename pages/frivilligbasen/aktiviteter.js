const aktivitetNavn = {
  Stand: 'Stå på stand / møte velgere',
  SoMe: 'Dele innhold på sosiale medier',
  Doerbanking: 'Gå fra dør til dør og snakke med folk om Rødt',
  Ringing: 'Ringe potensielle velgere',
  SMS: 'Sende tekstmeldinger til potensielle velgere',
  Postkasseutdeling: 'Dele ut materiell i postkasser',
  Morgenaksjon: 'Dele ut materiell ved knutepunkt på morgenen',
  Bil: 'Har bil og kan bidra med kjøring'
}

function Aktiviteter ({ aktiviteter }) {
  const bidrag = aktiviteter.map(linje => linje.aktivitet).map(aktivitet => aktivitetNavn[aktivitet])
  return (
    <div>
      <div className='text-l font-semibold text-gray-900'>Kan bidra med</div>
      <div className='text-l text-gray-900'>{bidrag.join(', ')}</div>
    </div>
  )
}

export default Aktiviteter
