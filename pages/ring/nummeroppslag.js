import axios from 'axios'
import { useState } from 'react'

function Nummeroppslag ({ setPerson }) {
  const [telefonNummer, setTelefonNummer] = useState('')
  const [alert, setAlert] = useState()

  async function hentTelefonNummer () {
    if (telefonNummer) {
      setAlert(false)
      const { data } = axios.post('/api/backend/samtale/noenRingerTilbake', { ringtNummer: telefonNummer.toString() }, { withCredentials: true })
      console.log(data)
      if (data) {
        setPerson(data)
      } else {
        setAlert('Fant ingen treff på telefonnummeret')
      }
    }
  }

  return (
    <div className='mt-4'>
      <label for='telefonnummer' className='block text-sm font-bold text-gray-700'>Slå opp telefonnummer</label>
      <div className='mt-1 flex rounded-md shadow-sm'>
        <div className='relative flex items-stretch flex-grow focus-within:z-10'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
              <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
            </svg>
          </div>
          <input type='text' name='telefonnummer' value={telefonNummer} onChange={event => setTelefonNummer(event.target.value)} id='telefonnummer' className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300' placeholder='Telefonnummer' />
        </div>
        <button onClick={hentTelefonNummer} className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
          <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
            <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' />
          </svg>
          <span>Søk</span>
        </button>
      </div>
      {alert && <div>{alert}</div>}
    </div>
  )
}

export default Nummeroppslag
