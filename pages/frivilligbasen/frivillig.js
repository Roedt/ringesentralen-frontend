import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

import Aktiviteter from './aktiviteter'
import KontaktSkjema from './kontaktSkjema'
import Kontakter from './kontakter'
import OpptattAv from './opptattAv'
import FrivilligKorona from './frivilligKorona'
import skrivUtPenDato from '../../lib/prettyprint-dato'

function VisSkjulTekst ({ vis }) {
  if (vis) {
    return (
      <>
        Skjul tilleggsinformasjon <ChevronUpIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
      </>
    )
  } else {
    return (
      <>
        Vis tilleggsinformasjon <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
      </>
    )
  }
}

export function genererTagLine (frivillig) {
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
  tags.push('Meldte seg ' + skrivUtPenDato(frivillig.registrertTidspunkt))
  return tags.join(', ')
}

function Frivillig ({ data }) {
  const [visSkjema, setVisSkjema] = useState()
  const [visTilleggsinformasjon, setVisTilleggsinformasjon] = useState()

  if (!data) return null
  const { frivillig, person, aktiviteter, fylke, lokallag, kontakt, opptattAv, frivilligKorona } = data
  if (!frivillig) return null

  function mineSpraak (frivillig) {
    if (!frivillig.spraak || frivillig.spraak.length === 0) return null
    return 'Snakker ' + frivillig.spraak
  }

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
          <button type='button' onClick={() => setVisSkjema(!visSkjema)} className={`${!visSkjema ? 'visible' : 'invisible'} w-36 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-l font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
            </svg>
            <span>
              Kontaktlogg
            </span>
          </button>
        </div>
      </div>
      <div className='md:-mt-2 text-gray-700 text-sm'>
        <p>{genererTagLine(frivillig)}</p>
        <p>{frivillig.fortellLittOmDegSelv}</p>
        <p>{mineSpraak(frivillig)}</p>
      </div>
      <KontaktSkjema frivillig={frivillig} visSkjema={visSkjema} setVisSkjema={setVisSkjema} />
      <Aktiviteter aktiviteter={aktiviteter} frivillig={frivillig} />
      <Kontakter kontakter={kontakt} />
      <div>
        <button onClick={() => setVisTilleggsinformasjon(!visTilleggsinformasjon)} className='mt-2 mb-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
          <VisSkjulTekst vis={visTilleggsinformasjon} />
        </button>
        <div className={`${visTilleggsinformasjon ? 'visible' : 'hidden'}`}>
          <OpptattAv opptattAv={opptattAv} />
          <FrivilligKorona frivilligKorona={frivilligKorona} />
        </div>
      </div>
    </div>
  )
}

export default Frivillig
