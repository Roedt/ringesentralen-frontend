import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'

import { is401, is403 } from '../lib/utils'

function Linje ({ igjenAaRinge, lokallag, personerSomKanRinges, totaltInklRingte }) {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900'>
              {lokallag.navn}
            </div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{igjenAaRinge}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{personerSomKanRinges}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{totaltInklRingte}</div>
      </td>
    </tr>
  )
}

function Liste ({ data }) {
  if (!data) return null
  const { statusliste } = data
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Lokallag
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Igjen å ringe
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Kan ringes
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Totalt
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {statusliste && statusliste.map(linje => <Linje {...linje} key={linje.lokallag.id} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const router = useRouter()
  const [dashboard, setDashboard] = useState()

  async function getDashboard () {
    try {
      const { data } = await axios.get('/api/backend/dashboard', { withCredentials: true })
      setDashboard(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])

  return (
    <Layout pageTitle='Dashboard'>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Liste data={dashboard} />
    </Layout>
  )
}

export default Dashboard
