import axios from 'axios'
import Confetti from 'react-confetti'
import { useState } from 'react'

import generatePayload from '../lib/generate-payload'

function Verving () {
  const [success, setSuccess] = useState()

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
              <div>
                <label for='fornavn' className='sr-only'>Fornavn</label>
                <input type='text' name='fornavn' id='fornavn' autoComplete='given-name' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Fornavn' />
              </div>
              <div>
                <label for='etternavn' className='sr-only'>Etternavn</label>
                <input type='text' name='etternavn' id='etternavn' autoComplete='family-name' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Etternavn' />
              </div>
              <div>
                <label for='postnummer' className='sr-only'>Postnummer</label>
                <input type='text' name='postnummer' id='postnummer' autoComplete='postal-code' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Postnummer' />
              </div>
              <div className='email'>
                <label for='epost' className='sr-only'>E-post</label>
                <input id='epost' name='epost' type='email' autoComplete='email' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='E-post' />
              </div>
              <div>
                <label for='telefonnummer' className='sr-only'>Telefonnummer</label>
                <input type='text' name='telefonnummer' id='telefonnummer' autoComplete='tel' className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md' placeholder='Telefonnummer' />
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
