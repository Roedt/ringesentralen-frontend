import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'

const is401 = error => {
  return /401/.test(error.message)
}

function Dashboard ({ dashboard }) {
  if (!dashboard) return null
  const { statusliste } = dashboard
  const mergedData = statusliste.reduce((accumulator, current) => {
    accumulator.igjenAaRinge += current.igjenAaRinge
    accumulator.personerSomKanRinges += current.personerSomKanRinges
    accumulator.totaltInklRingte += current.totaltInklRingte
    return accumulator
  }, { igjenAaRinge: 0, personerSomKanRinges: 0, totaltInklRingte: 0 })
  return (
    <div>
      <h2 className='text-lg leading-6 font-medium text-gray-900'>
        Status
      </h2>
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <dt className='text-sm font-medium text-gray-500 truncate'>
              Igjen å ringe
            </dt>
            <dd className='mt-1 text-3xl font-semibold text-gray-900'>
              {mergedData.igjenAaRinge}
            </dd>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <dt className='text-sm font-medium text-gray-500 truncate'>
              Personer som kan ringes
            </dt>
            <dd className='mt-1 text-3xl font-semibold text-gray-900'>
              {mergedData.personerSomKanRinges}
            </dd>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <dt className='text-sm font-medium text-gray-500 truncate'>
              Totalt
            </dt>
            <dd className='mt-1 text-3xl font-semibold text-gray-900'>
              {mergedData.totaltInklRingte}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  )
}

const HomePage = () => {
  const router = useRouter()
  const [dashboard, setDashboard] = useState()

  async function getDashboard () {
    try {
      const { data } = await axios.get('/api/backend/dashboard', { withCredentials: true })
      setDashboard(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])

  function handleBoom () {
    throw new Error('Alt gikk galt')
  }

  return (
    <Layout pageTitle='Ringesentralen'>
      <Head>
        <title>Ringesentralen</title>
      </Head>
      <Dashboard dashboard={dashboard} />
      <button onClick={handleBoom}>Boom</button>
    </Layout>
  )
}

export default HomePage
