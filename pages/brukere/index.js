import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import BrukerListe from './bruker-liste'

const is401 = error => {
  return /401/.test(error.message)
}

const Brukere = () => {
  const router = useRouter()
  const [brukere, setBrukere] = useState()

  async function hentBrukere () {
    try {
      const { data } = await axios.get('/api/backend/brukere/brukere', { withCredentials: true })
      setBrukere(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    hentBrukere()
  }, [])

  return (
    <Layout pageTitle='Brukere'>
      <Head>
        <title>Brukere</title>
      </Head>
      <div className='flex justify-end mb-8'>
        <span className='relative z-0 inline-flex shadow-sm rounded-md'>
          <button onClick={() => window.alert('ikke implementert ennå')} type='button' className='relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
            Vis alle brukere
          </button>
          <button onClick={() => window.alert('ikke implementert ennå')} type='button' className='-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
            Godkjenn nye brukere
          </button>
          <button onClick={() => window.alert('ikke implementert ennå')} type='button' className='-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
            Registrerte brukere
          </button>
          <button onClick={() => window.alert('ikke implementert ennå')} type='button' className='-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
            Deaktiverte/Ikke godkjente brukere
          </button>
        </span>
      </div>
      <BrukerListe brukere={brukere} />
    </Layout>
  )
}

export default Brukere
