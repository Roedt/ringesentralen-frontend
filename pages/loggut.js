import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { is401 } from '../lib/utils'
import Tilbakemelding from '../components/tilbakemelding'

function Loggut () {
  const router = useRouter()

  async function handleLogOut () {
    try {
      await axios.get('/api/logout', { withCredentials: true })
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  function handleCancel () {
    router.push('/')
  }

  return (
    <div>
      <Head>
        <title>Ringesentralen - logg ut</title>
      </Head>
      <div className='flex flex-col h-screen bg-gray-100'>
        <main className='grid place-items-center mx-2 my-20 sm:my-auto'>
          <div className='w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg'>
            <h1 className='text-center font-semibold text-2xl lg:text-3xl text-gray-800'>
              Logg ut av Ringesentralen
            </h1>
            <p className='mt-2 text-center'>
              Er du sikker på at du vil logge ut?
            </p>
            <div className='mt-4 flex justify-center'>
              <button type='button' onClick={() => handleCancel()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                </svg>
                <span>
                  Nei
                </span>
              </button>
              <button type='button' onClick={() => handleLogOut()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                </svg>
                <span>
                  Ja
                </span>
              </button>
            </div>
          </div>
          <Tilbakemelding
            tekst='Hvordan var opplevelsen din av Rødt-sentralen i dag?'
            tema='utlogging'
          />
        </main>
      </div>
    </div>
  )
}

export default Loggut
