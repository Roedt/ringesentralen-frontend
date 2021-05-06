import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { is401, is403 } from '../../lib/utils'
import { Warning } from '../../components/ui/alerts'

function KontaktSkjema ({ visSkjema, frivillig, setVisSkjema }) {
  const router = useRouter()
  const [tilbakemelding, setTilbakemelding] = useState('')
  const [errors, setErrors] = useState()

  if (!visSkjema) return null

  async function LagreTilbakemelding () {
    setErrors(false)
    const payload = {
      frivillig_id: frivillig.id,
      tilbakemelding
    }
    try {
      await axios.post('/api/backend/registrerKontakt', payload, { withCredentials: true })
      setVisSkjema(false)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        setErrors('Fikk ikke lagret tilbakemeldingen. Vennligst forsøk igjen. Om problemene fortsetter: kontakt oss på Slack')
        console.error(error)
      }
    }
  }

  return (
    <div className='sm:col-span-6'>
      <label htmlFor={`tilbakemelding-${frivillig.id}`} className='block text-l font-medium text-gray-700'>
        Kontaktlogg
      </label>
      <div className='mt-1'>
        <textarea
          id={`tilbakemelding-${frivillig.id}`}
          name={`tilbakemelding-${frivillig.id}`}
          rows={5}
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          defaultValue={tilbakemelding}
          onChange={event => setTilbakemelding(event.target.value)}
        />
      </div>
      <p className='mt-2 mb-2 text-l text-gray-500'>Skriv inn punkter etter samtalen</p>
      {errors && <Warning message={errors} />}
      <div className='flex justify-end mt-2'>
        <button type='button' onClick={() => LagreTilbakemelding()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
          </svg>
          <span>
            Lagre
          </span>
        </button>
        <button type='button' onClick={() => setVisSkjema(!visSkjema)} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
          </svg>
          <span>
            Avbryt
          </span>
        </button>
      </div>
    </div>
  )
}

export default KontaktSkjema
