import { useState } from 'react'
import Historikk from './historikk'

function Person ({ data, setIsAccepted, setPerson }) {
  const [godtatt, setIsGodtatt] = useState()

  function avslaaSamtale () {
    setPerson(false)
  }

  function godtaSamtale () {
    setIsAccepted(true)
    setIsGodtatt(true)
  }

  if (!data) return null

  const { person, tidlegareSamtalar } = data
  const { fornavn, etternavn, telefonnummer } = person

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
        <div className={`${godtatt ? 'hidden ' : ''}ml-4 mt-4 flex-shrink-0 flex`}>
          <button type='button' onClick={() => godtaSamtale()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' />
            </svg>
            <span>
              Godta samtale
            </span>
          </button>
          <button type='button' onClick={() => avslaaSamtale()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
              <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
            </svg>
            <span>
              Avslå samtale
            </span>
          </button>
        </div>
      </div>
      <Historikk tidlegareSamtalar={tidlegareSamtalar} isOpen />
    </div>
  )
}

export default Person
