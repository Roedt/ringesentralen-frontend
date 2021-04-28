import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import { Parser } from 'json2csv'
import { Blob } from 'blob-polyfill'

import useUser from '../lib/useUser'
import Layout from '../components/layout'
import Modus from '../components/modus'
import { is401, is403 } from '../lib/utils'

function navneSortering (a, b) {
  return a.lokallag.navn.localeCompare(b.lokallag.navn)
}

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
  function lastNedCSV () {
    const json2csvParser = new Parser()
    const { statusliste } = dashboard
    const data = statusliste.map(linje => Object.assign({}, {
      lokallag: linje.lokallag.navn,
      igjenAaRinge: linje.igjenAaRinge,
      personerSomKanRinges: linje.personerSomKanRinges,
      totaltInklRingte: linje.totaltInklRingte
    }))
    const csv = json2csvParser.parse(data)
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'dashboard.csv')
  }

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
      <div className='flex justify-end'>
        <button type='button' onClick={() => lastNedCSV()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' />
          </svg>
          <span>
            Last ned
          </span>
        </button>
      </div>
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
      if (data && Array.isArray(data.statusliste)) {
        data.statusliste = data.statusliste.sort(navneSortering)
      }
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
