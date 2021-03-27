import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { is401, is403, is503 } from '../lib/utils'
import generatePayload from '../lib/generate-payload'
import Button from '../components/ui/button'
import { Warning } from '../components/ui/alerts'

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
      await axios.get('/api/auth-status')
      setLoading(false)
      form.reset()
      router.push('/')
    } catch (error) {
      setLoading(false)
      if (is401(error) || is403(error)) {
        setErrors('Feil brukernavn og/eller passord. Sjekk om du er korrekt registrert i Hypersys eller kontakt oss på Slack.')
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
            <p className='mb-2'>
              Du loggar inn med samme brukarnamn og passord som du bruker for å logge inn på Hypersys (partiets medlemssystem). <br />
            </p>
            <p className='mb-2'>
              Har du ikkje logga inn der før, eller har glemt passordet, <a href={`${process.env.NEXT_PUBLIC_HYPERSYS_BASE_URL}/auth/reset/`} className='underline tracking-wide text-gray-700 hover:bg-gray-100 hover:text-gray-900'>bruk gjenopprett passord</a>.
            </p>
            <p>
              Er det noko du lurer på, <a className='underline tracking-wide text-gray-700 hover:bg-gray-100 hover:text-gray-900' href='https://roedtorg.slack.com/archives/C01BNKD2RU0'>still gjerne spørsmål på Slack</a>
            </p>
          </div>
          {errors && <Warning message={errors} />}
        </div>
      </div>
    </div>
  )
}

export default Login
