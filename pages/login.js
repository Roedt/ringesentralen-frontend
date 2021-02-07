import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

import generatePayload from '../lib/generate-payload'
import Button from '../components/ui/button'

function Login () {
  const [loading, setLoading] = useState()
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    const form = document.getElementById('login-form')
    await axios.post('/api/login', generatePayload(form))
    // const { data: result } = await axios.get('/api/auth-status')
    await axios.get('/api/auth-status')
    setLoading(false)
    // console.log(result)
    form.reset()
    router.push('/')
  }

  return (
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
      </div>
    </div>
  )
}

export default Login
