import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { is401 } from '../../lib/utils'
import Historikk from './historikk'

function Person ({ data, setIsAccepted, setPerson }) {
  const router = useRouter()
  const [godtatt, setIsGodtatt] = useState()

  function avslaaSamtale () {
    setPerson(false)
  }

  function avbrytSesjon () {
    setPerson(false)
  }

  async function startSamtale (id) {
    try {
      await axios.post('/api/backend/samtale/startSamtale', { skalRingesID: id }, { withCredentials: true })
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  function godtaSamtale (id) {
    setIsAccepted(true)
    setIsGodtatt(true)
    startSamtale(id)
  }

  if (!data) return null

  const { person, tidlegareSamtalar } = data
  const { fornavn, etternavn, telefonnummer, id } = person

  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      <div className='-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap'>
        <div className='ml-4 mt-4'>
          <div className='flex items-center'>
            <div className='ml-4'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                {fornavn} {etternavn}
              </h3>
              <p className='text-sm text-gray-500'>
                {telefonnummer}
              </p>
            </div>
          </div>
        </div>
        <div className={`${godtatt ? 'hidden ' : 'visible'}ml-4 mt-4 flex-shrink-0 flex`}>
          <button type='button' onClick={() => godtaSamtale(id)} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' />
            </svg>
            <span>
              Godta samtale
            </span>
          </button>
          <button type='button' onClick={() => avslaaSamtale()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
            </svg>
            <span>
              Avslå samtale
            </span>
          </button>
        </div>
        <div className={`${godtatt ? 'visible' : 'hidden'} ml-4 mt-4 flex-shrink-0 flex`}>
          <button type='button' onClick={() => avbrytSesjon()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <span>
              Avbryt ringesesjonen
            </span>
          </button>
        </div>
      </div>
      <Historikk tidlegareSamtalar={tidlegareSamtalar} isOpen />
    </div>
  )
}

export default Person
