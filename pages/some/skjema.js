import axios from 'axios'
import { useState } from 'react'

import generatePayload from '../../lib/generate-payload'
import useRecaptcha from '../../lib/useRecaptcha'

import Button from '../../components/ui/button'

function Skjema ({ setSuccess }) {
  const [loading, setLoading] = useState()
  const { getToken } = useRecaptcha()

  async function handleSubmit (event) {
    event.preventDefault()
    setLoading(true)
    const token = await getToken({ action: 'some-skjema' })
    const form = document.getElementById('verving-skjema')
    const payload = generatePayload(form)
    payload.token = token
    await axios.post('/api/some', payload)
    setLoading(false)
    form.reset()
    setSuccess(true)
  }

  return (
    <form id='verving-skjema' onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-6'>
      <div>
        <label htmlFor='fornavn' className='sr-only'>Fornavn</label>
        <input type='text' name='fornavn' id='fornavn' autoComplete='given-name' required className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Fornavn' />
      </div>
      <div>
        <label htmlFor='etternavn' className='sr-only'>Etternavn</label>
        <input type='text' name='etternavn' id='etternavn' autoComplete='family-name' required className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Etternavn' />
      </div>
      <div>
        <label htmlFor='postnummer' className='sr-only'>Postnummer</label>
        <input type='text' name='postnummer' id='postnummer' autoComplete='postal-code' required className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Postnummer' />
      </div>
      <div>
        <label htmlFor='telefonnummer' className='sr-only'>Mobiltelefonnummer</label>
        <input type='text' name='telefonnummer' id='telefonnummer' autoComplete='tel' required className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Telefonnummer' />
      </div>
      <div>
        <Button
          type='submit'
          loading={loading}
        >
          Meld meg til kamp
        </Button>
      </div>
    </form>
  )
}

export default Skjema
