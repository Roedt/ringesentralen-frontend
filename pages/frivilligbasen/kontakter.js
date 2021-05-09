import skrivUtPenDato from '../../lib/prettyprint-dato'

function Kontakt ({ kontakt }) {
  if (!kontakt) return null
  return (
    <div>
      <div className='text-sm text-gray-700'>
        {skrivUtPenDato(kontakt.datetime)} - {kontakt.registrert_av.fornavn} {kontakt.registrert_av.etternavn}
      </div>
      <div>{kontakt.tilbakemelding}</div>
    </div>
  )
}

function Kontakter ({ kontakter }) {
  if (!kontakter || kontakter.length === 0) return null
  return (
    <div>
      <div className='text-l font-semibold text-gray-900'>Kontaktlogg</div>
      {kontakter.map(kontakt => <Kontakt kontakt={kontakt} key={`kontakt-${kontakt.id}`} />)}
    </div>
  )
}

export default Kontakter
