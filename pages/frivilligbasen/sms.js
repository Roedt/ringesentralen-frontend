import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { is401, is403 } from '../../lib/utils'
import { Warning } from '../../components/ui/alerts'

const isArray = data => Array.isArray(data)
const erAdmin = roller => isArray(roller) && roller.includes('admin')

function MeldingsSkjema ({ showForm, frivillige, setShowForm }) {
  const router = useRouter()
  const [melding, setMelding] = useState('')
  const [errors, setErrors] = useState()

  if (!showForm) return null

  async function sendMelding () {
    setErrors(false)
    const mottakere = frivillige.map(({ person, frivillig }) => Object.assign({}, { telefonnummer: person.telefonnummer, frivilligId: frivillig.id }))
    const payload = {
      mottakere,
      melding
    }
    try {
      await axios.post('/api/sms', payload, { withCredentials: true })
      setMelding('')
      setShowForm(false)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        setErrors('Fikk ikke sendt meldingen. Vennligst forsøk igjen. Om problemene fortsetter: kontakt oss på Slack')
        console.error(error)
      }
    }
  }

  return (
    <div className='sm:col-span-6 p-4'>
      <label htmlFor='sms-melding' className='block text-l font-medium text-gray-700'>
        Melding ({melding.length} tegn)
      </label>
      <div className='mt-1'>
        <textarea
          id='sms-melding'
          name='sms-melding'
          rows={5}
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          defaultValue={melding}
          onChange={event => setMelding(event.target.value)}
        />
      </div>
      <p className='mt-2 mb-2 text-l text-gray-500'>Send melding til {frivillige.length} frivillige</p>
      {errors && <Warning message={errors} />}
      <div className='flex justify-end mt-2'>
        <button type='button' onClick={() => sendMelding()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
          </svg>
          <span>
            Send
          </span>
        </button>
        <button type='button' onClick={() => { setShowForm(!showForm); setMelding('') }} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
          </svg>
          <span>
            Avbryt
          </span>
        </button>
      </div>
    </div>
  )
}

function SMS ({ frivillige, filterKriterier, user }) {
  const [showForm, setShowForm] = useState()
  console.log(user)

  if ((filterKriterier && filterKriterier.length === 0) || (frivillige && frivillige.length === 0) || !erAdmin(user.rolle)) return null

  return (
    <div className='mt-4'>
      <button type='button' onClick={() => setShowForm(true)} className='w-128 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
        </svg>
        <span>
          Send SMS til dette utvalget av frivillige
        </span>
      </button>
      <MeldingsSkjema showForm={showForm} setShowForm={setShowForm} frivillige={frivillige} />
    </div>
  )
}

export default SMS
