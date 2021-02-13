import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout'

const is401 = error => {
  return /401/.test(error.message)
}

const Bruker = ({ fornavn, etternavn, epost }) => {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900'>
              {fornavn} {etternavn}
            </div>
            <div className='text-sm text-gray-500'>
              {epost}
            </div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>Regional Paradigm Technician</div>
        <div className='text-sm text-gray-500'>Optimization</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
          Active
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        Admin
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
        <a href='#' className='text-indigo-600 hover:text-indigo-900'>Edit</a>
      </td>
    </tr>
  )
}

function BrukerListe ({ brukere }) {
  if (!brukere) return null
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Title
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Role
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {brukere && brukere.map(bruker => <Bruker {...bruker} key={bruker.hypersysID} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const Brukere = () => {
  const router = useRouter()
  const [brukere, setBrukere] = useState()

  async function handleBrukere () {
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

  return (
    <Layout pageTitle='Brukere'>
      <Head>
        <title>Brukere</title>
      </Head>
      <div>
        Brukerhåndtering
      </div>
      <div>
        Godkjenn nye brukere
      </div>
      <div>
        <button onClick={() => handleBrukere()}>Registrerte brukere</button>
      </div>
      <div>
        Deaktiverte/Ikke godkjente brukere
      </div>
      <BrukerListe brukere={brukere} />
    </Layout>
  )
}

export default Brukere
