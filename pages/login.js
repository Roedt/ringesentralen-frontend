import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { is401, is403, is503 } from '../lib/utils'
import generatePayload from '../lib/generate-payload'
import Button from '../components/ui/button'
import { Warning } from '../components/ui/alerts'
import Hjelp from '../components/hjelp'

function Login () {
  const [loading, setLoading] = useState()
  const [errors, setErrors] = useState()
  const [visHjelp, setVisHjelp] = useState()
  const router = useRouter()

  function toggleHjelp () {
    setVisHjelp(!visHjelp)
  }

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
      if (is401(error)) {
        setErrors('Du er ikke registrert som bruker av systemet. Sjekk om du er korrekt registrert i Hypersys eller kontakt oss på Slack.')
      } else if (is403(error)) {
        setErrors('Feil brukernavn og/eller passord. Vennligst prøv igjen.')
      } else if (is503(error)) {
        setErrors('Vi har problemer med å nå noen av baksystemene. Vennligst prøv igjen senere.')
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
            <div>
              <div className='flex flex-row justify-between'>
                <h2 className='text-2xl font-semibold pt-1 pb-1'>Ringesentralen</h2>
                <img className='-ml-2 h-10 w-10' src='/logo.jpg' alt='Rødt logo' />
              </div>
            </div>
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
          <div className='mt-6 mb-2'>
            Har du glemt passordet? <a href={`${process.env.NEXT_PUBLIC_HYPERSYS_BASE_URL}/auth/reset/`} className='underline tracking-wide text-gray-700 hover:bg-gray-100 hover:text-gray-900'>Gjenopprett passord</a>
          </div>
          {errors && <Warning message={errors} />}
          <button onClick={toggleHjelp} className='w-48 mt-2 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className={`${visHjelp ? '-rotate-180' : 'rotate-0'} -ml-1 mr-2 h-5 w-5 text-gray-400 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
            </svg>
            <span>
              {visHjelp ? 'Skjul' : 'Vis'} hjelp
            </span>
          </button>
          <div className={`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-gray-100 ${visHjelp ? 'visible' : 'hidden'}`}>
            <Hjelp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
