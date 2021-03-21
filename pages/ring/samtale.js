import axios from 'axios'
import { useEffect, useState } from 'react'
import Ringemanus from '../../components/ringemanus'
import ResultatSkjema from './resultatskjema'
import VoIP from './voip'

function Samtale ({ accepted, data, user, setPerson }) {
  const [samtale, setSamtale] = useState()
  const [modus, setModus] = useState('velgere')

  async function startSamtale (id) {
    await axios.post('/api/backend/samtale/startSamtale', { skalRingesID: id }, { withCredentials: true })
    setSamtale('paagaaende')
  }

  async function avsluttSamtale () {
    setSamtale('avsluttet')
  }

  async function avbrytSamtale () {
    setPerson(false)
  }

  const StartKnapp = ({ id }) => {
    return (
      <button type='button' onClick={() => startSamtale(id)} className='w-48 mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
        <span>
          Samtalen starter
        </span>
      </button>
    )
  }

  const StoppKnapp = () => {
    return (
      <button type='button' onClick={() => avsluttSamtale()} className='w-48 mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z' />
        </svg>
        <span>
          Samtalen er ferdig
        </span>
      </button>
    )
  }

  const AvbrytKnapp = () => {
    return (
      <button type='button' onClick={() => avbrytSamtale()} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
        <span>
          Avbryt ringesesjonen
        </span>
      </button>
    )
  }

  useEffect(() => {
    if (user) {
      setModus(user.aktivtModus)
    }
  }, [user])

  const kanViseKomponent = data && accepted

  if (!kanViseKomponent) return null

  const { person } = data
  const { telefonnummer, id, fylke } = person

  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      {telefonnummer && <VoIP telefonnummer={telefonnummer} />}
      <div className='-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap'>
        <div className='ml-4 mt-4 flex-shrink-0 flex'>
          {!samtale && <StartKnapp id={id} />}
          {samtale === 'paagaaende' && <StoppKnapp />}
          <AvbrytKnapp />
        </div>
      </div>
      <div className='mt-4 flex lg:flex-row md:flex-col'>
        <div className='flex-1 lg:pr-4 md:mb-4'>
          <ResultatSkjema id={id} setPerson={setPerson} isOpen />
        </div>
        <div className='flex-1 lg:pl-4'>
          <Ringemanus manus={fylke} modus={modus} isOpen />
        </div>
      </div>
    </div>
  )
}

export default Samtale
