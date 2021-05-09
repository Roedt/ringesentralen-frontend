import { useState } from 'react'

import Aktiviteter from './aktiviteter'
import KontaktSkjema from './kontaktSkjema'
import Kontakter from './kontakter'

function genererTagLine (frivillig) {
  const tags = []
  if (frivillig.medlemIRoedt === 'Vilbli') {
    tags.push('Vil bli medlem i Rødt')
  }
  if (frivillig.medlemIRoedt === 'RU') {
    tags.push('Er medlem av Rød Ungdom')
  }
  if (frivillig.medlemIRoedt === 'Ja') {
    tags.push('Er medlem av Rødt')
  }
  if (frivillig.medlemIRoedt === 'Nei') {
    tags.push('Er ikke medlem av Rødt')
  }
  tags.push(frivillig.alleredeAktivILokallag ? 'allerede aktiv i lokallaget' : 'ikke aktiv i lokallaget')
  return tags.join(', ')
}

function Frivillig ({ data }) {
  const [visSkjema, setVisSkjema] = useState()

  if (!data) return null
  const { frivillig, person, aktiviteter, fylke, lokallag, kontakt } = data
  if (!frivillig) return null

  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
        <div className='ml-4 mt-2 flex'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>{person.fornavn} {person.etternavn}</h3>
          <div className='ml-4'>{person.telefonnummer}</div>
          <div className='ml-4 mr-4'>{person.email}</div>
          <div className='text-sm text-gray-700'>
            {fylke.navn} - {lokallag.navn} - {person.postnummer}
          </div>
        </div>
        <div className='ml-4 mt-2 flex-shrink-0'>
          <button type='button' onClick={() => setVisSkjema(!visSkjema)} className={`${!visSkjema ? 'visible' : 'invisible'} w-36 ml-3 mb-4 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-l font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
            </svg>
            <span>
              Kontaktlogg
            </span>
          </button>
        </div>
      </div>
      <div className='-mt-2 text-gray-700 text-sm'>
        <p>{genererTagLine(frivillig)}</p>
        <p>{frivillig.fortellLittOmDegSelv}</p>
      </div>
      <KontaktSkjema frivillig={frivillig} visSkjema={visSkjema} setVisSkjema={setVisSkjema} />
      <Aktiviteter aktiviteter={aktiviteter} frivillig={frivillig} />
      <Kontakter kontakter={kontakt} />
    </div>
  )
}

export default Frivillig
