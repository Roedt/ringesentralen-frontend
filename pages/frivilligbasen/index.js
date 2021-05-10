import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import { Parser } from 'json2csv'
import { Blob } from 'blob-polyfill'

import { is401, is403 } from '../../lib/utils'
import skrivUtPenDato from '../../lib/prettyprint-dato'
import { skrivUtBidrag } from './aktiviteter'
import Frivillig, { genererTagLine } from './frivillig'

import Layout from '../../components/layout'

function navneSortering (a, b) {
  return a.fylke.navn.localeCompare(b.fylke.navn)
}

function skrivUtKontaktLogg (kontakter) {
  const logg = kontakter.reduce((liste, kontakt) => {
    liste.push(`${skrivUtPenDato(kontakt.datetime)} - ${kontakt.registrert_av.fornavn} ${kontakt.registrert_av.etternavn}: ${kontakt.tilbakemelding}`)
    return liste
  }, [])
  return logg.join('\n\n')
}

function Frivilligbasen () {
  const router = useRouter()
  const [frivillige, setFrivillige] = useState([])

  function lastNedCSV () {
    const json2csvParser = new Parser({ delimiter: ';' })
    const data = frivillige.map(linje => Object.assign({}, {
      fylke: linje.fylke.navn,
      lokallag: linje.lokallag.navn,
      medlemsskap: genererTagLine(linje.frivillig),
      fornavn: linje.person.fornavn,
      etternavn: linje.person.etternavn,
      telefonnummer: linje.person.telefonnummer,
      email: linje.person.email,
      aktiviteter: skrivUtBidrag(linje.aktiviteter),
      andreBidrag: linje.frivillig.andreTingDuVilBidraMed,
      kompetanse: linje.frivillig.spesiellKompetanse,
      spraak: linje.frivillig.spraak || '',
      kortOmMeg: linje.frivillig.fortellLittOmDegSelv,
      kontaktLogg: skrivUtKontaktLogg(linje.kontakt)
    }))
    const csv = json2csvParser.parse(data)
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'frivillige.csv')
  }

  async function hentFrivillige () {
    try {
      const { data } = await axios.get('/api/backend/frivillig/alle', { withCredentials: true })
      if (data) {
        data.sort(navneSortering)
        setFrivillige(data)
      }
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
    hentFrivillige()
  }, [])

  return (
    <Layout pageTitle='Frivilligbasen'>
      <Head>
        <title>Frivilligbasen</title>
      </Head>
      <div>
        <button type='button' onClick={() => lastNedCSV()} className='w-56 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' />
          </svg>
          <span>
            Last ned som csv
          </span>
        </button>
      </div>
      <div>
        {frivillige.map(frivillig => <Frivillig data={frivillig} key={`frivillig-${frivillig.frivillig.id}`} />)}
      </div>
    </Layout>
  )
}

export default Frivilligbasen
