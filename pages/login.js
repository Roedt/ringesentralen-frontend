import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { is403, is503 } from '../lib/utils'
import generatePayload from '../lib/generate-payload'
import Button from '../components/ui/button'

function ShowErrors ({ error }) {
  const { message } = error
  return (
    <div class='mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4'>
      <div class='flex'>
        <div class='flex-shrink-0'>
          <svg class='h-5 w-5 text-yellow-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
            <path fill-rule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clip-rule='evenodd' />
          </svg>
        </div>
        <div class='ml-3'>
          <p className='text-sm text-yellow-700'>
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

function Login () {
  const [loading, setLoading] = useState()
  const [errors, setErrors] = useState()
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    setErrors(false)
    setLoading(true)
    const form = document.getElementById('login-form')
    try {
      await axios.post('/api/login', generatePayload(form))
      // const { data: result } = await axios.get('/api/auth-status')
      await axios.get('/api/auth-status')
      setLoading(false)
      // console.log(result)
      form.reset()
      router.push('/')
    } catch (error) {
      setLoading(false)
      if (is403(error)) {
        setErrors({ message: 'Feil brukernavn og/eller passord. Vennligst prøv igjen.' })
      } else if (is503(error)) {
        setErrors({ message: 'Vi har problemer med å nå noen av baksystemene. Vennligst prøv igjen senere.' })
      } else {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Ringesentralen</title>
      </Head>
      <div className='flex flex-col h-screen bg-gray-100'>
        <div className='grid place-items-center mx-2 my-20 sm:my-auto'>
          <div className='w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg'>
            <h2 className='text-center font-semibold text-3xl lg:text-4xl text-gray-800'>
              Innlogging
            </h2>
            <form className='mt-10' id='login-form' onSubmit={handleSubmit}>
              <label htmlFor='brukarnamn' className='block text-xs font-semibold text-gray-600 uppercase'>
                E-postadresse
              </label>
              <input
                id='brukarnamn' type='email' name='brukarnamn' placeholder='E-postadresse' autoComplete='email'
                className='block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200'
                required
              />
              <label htmlFor='passord' className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                Passord
              </label>
              <input
                id='passord' type='password' name='passord' placeholder='Passord' autoComplete='current-password'
                className='block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200'
                required
              />
              <Button
                type='submit'
                loading={loading}
              >
                Logg inn
              </Button>
            </form>
          </div>
          <div className='mt-6'>
            Har du glemt passordet? <a href={`${process.env.NEXT_PUBLIC_HYPERSYS_BASE_URL}/auth/reset/`} className='underline tracking-wide text-gray-700 hover:bg-gray-100 hover:text-gray-900'>Gjenopprett passord</a>
          </div>
          {errors && <ShowErrors error={errors} />}
        </div>
      </div>
    </div>
  )
}

export default Login
