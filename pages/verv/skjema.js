import axios from 'axios'
import { useState } from 'react'

import generatePayload from '../../lib/generate-payload'
import useRecaptcha from '../../lib/useRecaptcha'

import Button from '../../components/ui/button'

function Skjema ({ setSuccess }) {
  const [loading, setLoading] = useState()
  const [ververMeg, setVerverMeg] = useState()
  const { getToken } = useRecaptcha()

  function toggleVerveSelv (event) {
    setVerverMeg(event.target.checked)
  }

  async function handleSubmit (event) {
    event.preventDefault()
    setLoading(true)
    const token = await getToken({ action: 'verving' })
    console.log(token)
    const form = document.getElementById('verving-skjema')
    const payload = generatePayload(form)
    payload.token = token
    await axios.post('/api/verv', payload)
    setLoading(false)
    form.reset()
    setSuccess(true)
  }

  return (
    <form id='verving-skjema' onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-6'>
      <div className='flex items-center'>
        <input type='checkbox' name='ververMegSelv' id='ververMegSelv' onClick={toggleVerveSelv} className='focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded mr-2' />
        <label htmlFor='ververMegSelv' className='text-gray-500'>Jeg verver meg selv</label>
      </div>
      <div className={`${ververMeg ? 'hidden' : 'visible'}`}>
        <label htmlFor='ververensNavn' className='sr-only'>Navnet ditt</label>
        <input type='text' name='ververensNavn' id='ververensNavn' autoComplete='name' required={!ververMeg} className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Navnet ditt' />
      </div>
      <div>
        <label htmlFor='fornavn' className='sr-only'>Fornavn {ververMeg ? '' : 'på den du verver'}</label>
        <input type='text' name='fornavn' id='fornavn' autoComplete='given-name' required className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder={`Fornavn ${ververMeg ? '' : 'på den du verver'}`} />
      </div>
      <div>
        <label htmlFor='etternavn' className='sr-only'>Etternavn {ververMeg ? '' : 'på den du verver'}</label>
        <input type='text' name='etternavn' id='etternavn' autoComplete='family-name' required className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder={`Etternavn ${ververMeg ? '' : 'på den du verver'}`} />
      </div>
      <div>
        <label htmlFor='postnummer' className='sr-only'>Postnummer {ververMeg ? '' : 'til den du verver'}</label>
        <input type='text' name='postnummer' id='postnummer' autoComplete='postal-code' required className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder={`Postnummer ${ververMeg ? '' : 'til den du verver'}`} />
      </div>
      <div className='email'>
        <label htmlFor='epost' className='sr-only'>E-post</label>
        <input id='epost' name='epost' type='email' autoComplete='email' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='E-post' />
      </div>
      <div>
        <label htmlFor='telefonnummer' className='sr-only'>Telefonnummer {ververMeg ? '' : 'til den du verver'}</label>
        <input type='text' name='telefonnummer' id='telefonnummer' autoComplete='tel' required className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder={`Telefonnummer ${ververMeg ? '' : 'til den du verver'}`} />
      </div>
      <div>
        <Button
          type='submit'
          loading={loading}
        >
          Send inn vervingen
        </Button>
      </div>
    </form>
  )
}

export default Skjema
