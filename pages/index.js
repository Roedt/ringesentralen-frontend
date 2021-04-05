import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useUser from '../lib/useUser'
import Layout from '../components/layout'
import Modus from '../components/modus'
import { is401, is403 } from '../lib/utils'

function Linje ({ lokallag, igjenAaRinge, personerSomKanRinges, totaltInklRingte }) {
  return (
    <div className='mb-4'>
      <h2 className='text-lg leading-6 font-medium text-gray-900'>
        {lokallag.navn}
      </h2>
      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h3 className='text-sm font-medium text-gray-500 truncate'>
              Igjen å ringe
            </h3>
            <h4 className='mt-1 text-3xl font-semibold text-gray-900'>
              {igjenAaRinge}
            </h4>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h3 className='text-sm font-medium text-gray-500 truncate'>
              Personer som kan ringes
            </h3>
            <h4 className='mt-1 text-3xl font-semibold text-gray-900'>
              {personerSomKanRinges}
            </h4>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h3 className='text-sm font-medium text-gray-500 truncate'>
              Totalt
            </h3>
            <h4 className='mt-1 text-3xl font-semibold text-gray-900'>
              {totaltInklRingte}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard ({ dashboard }) {
  if (!dashboard) return null
  const { statusliste } = dashboard
  /*
  console.log(JSON.stringify(statusliste, null, 2))
  const mergedData = statusliste.reduce((accumulator, current) => {
    accumulator.igjenAaRinge += current.igjenAaRinge
    accumulator.personerSomKanRinges += current.personerSomKanRinges
    accumulator.totaltInklRingte += current.totaltInklRingte
    return accumulator
  }, { igjenAaRinge: 0, personerSomKanRinges: 0, totaltInklRingte: 0 })
  */
  return (
    <>
      {statusliste.map(data => <Linje {...data} key={data.lokallag.id} />)}
    </>
  )
}

const HomePage = () => {
  const router = useRouter()
  const { user } = useUser()
  const [dashboard, setDashboard] = useState()
  const [aktivtModus, setAktivtModus] = useState()

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

  useEffect(() => {
    if (aktivtModus) {
      getDashboard()
    }
  }, [aktivtModus])

  return (
    <Layout pageTitle='Ringesentralen'>
      <Head>
        <title>Ringesentralen</title>
      </Head>
      <Modus user={user} action='Vis' callOnChange={setAktivtModus} />
      <Dashboard dashboard={dashboard} />
    </Layout>
  )
}

export default HomePage
