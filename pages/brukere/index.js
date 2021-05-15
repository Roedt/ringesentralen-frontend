import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { is401, is403 } from '../../lib/utils'
import useUser from '../../lib/useUser'
import Layout from '../../components/layout'
import { Warning } from '../../components/ui/alerts'
import BrukerListe from './bruker-liste'

function etternavnSortering (a, b) {
  return a.etternavn.localeCompare(b.etternavn)
}

function NyeBrukereVarsling ({ nyeBrukere }) {
  if (!nyeBrukere) return null
  return (
    <div className='mb-4'>
      <Warning message='Det ligger brukere som venter på godkjenning i listen. Trykk på "Godkjenn nye brukere" for å se alle.' />
    </div>
  )
}

const Brukere = () => {
  const { user } = useUser()
  const router = useRouter()
  const [brukere, setBrukere] = useState()
  const [ikkeGodkjenteBrukere, setIkkeGodkjenteBrukere] = useState()
  const [filterKriterie, setFilterKriterie] = useState()
  const [mineRoller, setMineRoller] = useState()

  async function hentBrukere () {
    try {
      const { data } = await axios.get('/api/backend/brukere/brukere', { withCredentials: true })
      data.sort(etternavnSortering)
      if (filterKriterie) {
        const filtrert = data.filter(bruker => bruker.rolle.includes(filterKriterie))
        setBrukere(filtrert)
        setIkkeGodkjenteBrukere(false)
      } else {
        setBrukere(data)
        const nyeBrukere = data.filter(bruker => bruker.rolle.includes('venter_paa_godkjenning'))
        setIkkeGodkjenteBrukere(nyeBrukere.length > 0)
      }
    } catch (error) {
      if (is401(error)) {
        router.push('/login?komFra=/brukere')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    hentBrukere()
  }, [filterKriterie])

  useEffect(() => {
    if (user) {
      setMineRoller(user.rolle)
    }
  }, [user])

  return (
    <Layout pageTitle='Brukere'>
      <Head>
        <title>Brukere</title>
      </Head>
      <div className='flex justify-end mb-4'>
        <span className='relative z-0 inline-flex shadow-sm rounded-md'>
          <button onClick={() => setFilterKriterie(false)} type='button' className='relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
            Vis alle brukere
          </button>
          <button onClick={() => setFilterKriterie('venter_paa_godkjenning')} type='button' className='-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
            Godkjenn nye brukere
          </button>
          <button onClick={() => setFilterKriterie('bruker')} type='button' className='-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
            Registrerte brukere
          </button>
          <button onClick={() => setFilterKriterie('sperret')} type='button' className='-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'>
            Deaktiverte/Ikke godkjente brukere
          </button>
        </span>
      </div>
      <NyeBrukereVarsling nyeBrukere={ikkeGodkjenteBrukere} />
      <BrukerListe brukere={brukere} mineRoller={mineRoller} />
    </Layout>
  )
}

export default Brukere
