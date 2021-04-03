import axios from 'axios'
import Confetti from 'react-confetti'
import { useState } from 'react'

import generatePayload from '../lib/generate-payload'

function Verving () {
  const [success, setSuccess] = useState()
  const [ververMeg, setVerverMeg] = useState()

  function toggleVerveSelv (event) {
    setVerverMeg(event.target.checked)
  }

  async function handleSubmit (event) {
    event.preventDefault()
    const form = document.getElementById('verving-skjema')
    const payload = generatePayload(form)
    await axios.post('/api/verving', payload)
    form.reset()
    setSuccess(true)
  }

  return (
    <div className='relative bg-white'>
      {success && <Confetti />}
      <div className='absolute inset-0'>
        <div className='absolute inset-y-0 left-0 w-1/2 roedt' />
      </div>
      <div className='relative max-w-7xl mx-auto lg:grid lg:grid-cols-5'>
        <div className='roedt py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12'>
          <div className='max-w-lg mx-auto'>
            <h2 className='text-2xl font-extrabold tracking-tight text-white sm:text-3xl'>
              Verv en venn
            </h2>
            <p className='mt-3 text-lg leading-6 text-white'>
              Har du en god venn vi bør ringe, eller vil du at vi skal ringe deg?
            </p>
            <p className='mt-3 text-lg leading-6 text-white'>
              Fyll ut skjemaet så tar en av våre medlemmer kontakt.
            </p>
            <p className='mt-6 text-lg text-white'>
              Vil du bidra til tidenes valgkamp for Rødt? <a href='https://www.fellesskapfungerer.no/' className='text-white underline'>Les mer på fellesskapfungerer.no</a>.
            </p>
          </div>
        </div>
        <div className='bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12'>
          <div className='max-w-lg mx-auto lg:max-w-none'>
            <form id='verving-skjema' onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-6'>
              <div className='flex items-center'>
                <input type='checkbox' name='ververMegSelv' id='ververMegSelv' onClick={toggleVerveSelv} className='focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded mr-2' />
                <label htmlFor='ververMegSelv' className='text-gray-500'>Jeg verver meg selv</label>
              </div>
              <div className={`${ververMeg ? 'hidden' : 'visible'}`}>
                <label htmlFor='ververensNavn' className='sr-only'>Navnet ditt</label>
                <input type='text' name='ververensNavn' id='ververensNavn' autoComplete='name' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Navnet ditt' />
              </div>
              <div>
                <label htmlFor='fornavn' className='sr-only'>Fornavn {ververMeg ? '' : 'på den du verver'}</label>
                <input type='text' name='fornavn' id='fornavn' autoComplete='given-name' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder={`Fornavn ${ververMeg ? '' : 'på den du verver'}`} />
              </div>
              <div>
                <label htmlFor='etternavn' className='sr-only'>Etternavn {ververMeg ? '' : 'på den du verver'}</label>
                <input type='text' name='etternavn' id='etternavn' autoComplete='family-name' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder={`Etternavn ${ververMeg ? '' : 'på den du verver'}`} />
              </div>
              <div>
                <label htmlFor='postnummer' className='sr-only'>Postnummer {ververMeg ? '' : 'til den du verver'}</label>
                <input type='text' name='postnummer' id='postnummer' autoComplete='postal-code' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder={`Postnummer ${ververMeg ? '' : 'til den du verver'}`} />
              </div>
              <div className='email'>
                <label htmlFor='epost' className='sr-only'>E-post</label>
                <input id='epost' name='epost' type='email' autoComplete='email' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='E-post' />
              </div>
              <div>
                <label htmlFor='telefonnummer' className='sr-only'>Telefonnummer {ververMeg ? '' : 'til den du verver'}</label>
                <input type='text' name='telefonnummer' id='telefonnummer' autoComplete='tel' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder={`Telefonnummer ${ververMeg ? '' : 'til den du verver'}`} />
              </div>
              <div>
                <button type='submit' className='inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-black hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  Send inn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verving
