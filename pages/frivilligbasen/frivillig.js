import { useState } from 'react'

import Aktiviteter from './aktiviteter'
import KontaktSkjema from './kontaktSkjema'

function Frivillig ({ data }) {
  const [visSkjema, setVisSkjema] = useState()

  if (!data) return null
  const { frivillig, person, aktiviteter, fylke, lokallag, kontakt } = data
  if (!frivillig) return null

  function formaterKontakt (kontakt) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return (
      <div className='ml-4 mt-2 flex-shrink-0'>
        <strong>Kontakter</strong>
        <div>Tidspunkt for kontakt: {new Date(kontakt.datetime).toLocaleTimeString('no-NO', options)}</div>
        <div>Tilbakemelding: {kontakt.tilbakemelding}</div>
        <div>Kontakta av: {kontakt.registrert_av.fornavn} {kontakt.registrert_av.etternavn}</div>
      </div>
    )
  }

  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
        <div className='ml-4 mt-2 flex'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>{person.fornavn} {person.etternavn}</h3>
          <div className='ml-4'>{person.telefonnummer}</div>
          <div className='ml-4'>{person.email}</div>
          <div className='text-sm text-gray-900'>
            {fylke.navn} - {lokallag.navn} - {person.postnummer}
          </div>
        </div>
        <div className='ml-4 mt-2 flex-shrink-0'>
          <button type='button' onClick={() => setVisSkjema(!visSkjema)} className={`${!visSkjema ? 'visible' : 'invisible'} w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
            </svg>
            <span>
              Kontaktlogg
            </span>
          </button>
        </div>
      </div>
      <KontaktSkjema frivillig={frivillig} visSkjema={visSkjema} setVisSkjema={setVisSkjema} />
      <Aktiviteter aktiviteter={aktiviteter} />
      <div className='flex items-center'>
        <div className='ml-4'>
          <table>
            <tbody>
              <tr>
                <td>Allerede aktiv i lokallag?</td>
                <td>{frivillig.alleredeAktivILokallag ? 'Ja' : 'Nei'}</td>
              </tr>
              <tr>
                <td>Er allerede medlem i Rødt?</td>
                <td>{frivillig.medlemIRoedt}</td>
              </tr>
              <tr>
                <td>Spesiell kompetanse?</td>
                <td>{frivillig.spesiellKompetanse}</td>
              </tr>
              <tr>
                <td>Andre ting du vil bidra med?</td>
                <td>{frivillig.andreTingDuVilBidraMed}</td>
              </tr>
              <tr>
                <td>Fortell litt om deg selv</td>
                <td>{frivillig.fortellLittOmDegSelv}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {kontakt.map(k => formaterKontakt(k))}
    </div>
  )
}

export default Frivillig
