import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'

const is401 = error => {
  return /401/.test(error.message)
}

function Loggut () {
  const router = useRouter()

  async function handleLogOut () {
    try {
      await axios.get('/api/logout', { withCredentials: true })
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  function handleCancel () {
    router.push('/')
  }

  return (
    <div>
      <Head>
        <title>Ringesentralen - logg ut</title>
      </Head>
      <div className='flex flex-col h-screen bg-gray-100'>
        <div className='grid place-items-center mx-2 my-20 sm:my-auto'>
          <div className='w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg'>
            <h1 className='text-center font-semibold text-2xl lg:text-3xl text-gray-800'>
              Logg ut av Ringesentralen
            </h1>
            <p className='mt-2 text-center'>
              Er du sikker på at du vil logge ut?
            </p>
            <div className='mt-4 flex justify-center'>
              <button onClick={handleCancel} type='button' className='text-center w-24 mr-8 px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Nei</button>
              <button onClick={handleLogOut} type='button' className='text-center w-24 px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Ja</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loggut
