import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Parser } from 'json2csv'

import { is401, is403 } from '../../lib/utils'
import skrivUtPenDato from '../../lib/prettyprint-dato'
import useUser from '../../lib/useUser'
import LokallagVelger from '../../components/lokallag-velger'
import { skrivUtBidrag } from './aktiviteter'
import Frivillig, { genererTagLine } from './frivillig'
import filtrerFrivillig from '../../lib/filtrerFrivillig'
import AktiviteterFilter from './aktiviteterFilter'
import Sms from './sms'

import Layout from '../../components/layout'

function fylkesnavnSortering (a, b) {
  return a.fylke.navn.localeCompare(b.fylke.navn)
}

function etternavnSortering (a, b) {
  return a.person.etternavn.localeCompare(b.person.etternavn)
}

function lokallagsnavnSortering (a, b) {
  return a.lokallag.navn.localeCompare(b.lokallag.navn)
}

function datoSortering (a, b) {
  return b.frivillig.registrertTidspunkt.localeCompare(a.frivillig.registrertTidspunkt)
}

function skrivUtKontaktLogg (kontakter) {
  const logg = kontakter.reduce((liste, kontakt) => {
    liste.push(`${skrivUtPenDato(kontakt.datetime)} - ${kontakt.registrert_av.fornavn} ${kontakt.registrert_av.etternavn}: ${kontakt.tilbakemelding}`)
    return liste
  }, [])
  return logg.join('\n\n')
}

function skrivUtKoronaTilbakemeldinger (tilbakemeldinger = {}) {
  const tilbakemelding = []
  const { tydelig, forslag, personlig } = tilbakemeldinger
  if (tydelig) {
    tilbakemelding.push('Synes Rødt har hatt tydelige løsninger under pandemien')
  } else {
    tilbakemelding.push('Synes ikke Rødt har hatt tydelige løsninger under pandemien')
  }
  if (personlig) {
    tilbakemelding.push('Har selv, eller har noen i sin nære omkrets som har, opplevd økonomiske konsekvenser som følge av koronakrisa')
  } else {
    tilbakemelding.push('Har ikke selv, eller i sin nære omkrets som har, opplevd økonomiske konsekvenser som følge av koronakrisa')
  }
  if (forslag && forslag.length > 1) {
    tilbakemelding.push('Forslag noe spesielt Rødt bør foreslå for å hjelpe folk gjennom koronakrisa:')
    tilbakemelding.push(forslag)
  }
  return tilbakemelding.join('\n')
}

function FrivilligTeller ({ frivillige, ufiltrertListe, sortering }) {
  if ((frivillige && frivillige.length === 0) || (ufiltrertListe && ufiltrertListe.lenght === 0)) return null
  return (
    <div className='p-4 mt-2 text-xl'>
      Viser {frivillige.length} av {ufiltrertListe.length} frivillige, sortert etter {sortering}
    </div>
  )
}

const sorteringsAlternativer = {
  fylke: fylkesnavnSortering,
  etternavn: etternavnSortering,
  lokallag: lokallagsnavnSortering,
  registreringsdato: datoSortering
}

function Frivilligbasen () {
  const router = useRouter()
  const { user } = useUser()
  const [lokallagId, setLokallagId] = useState()
  const [frivillige, setFrivillige] = useState([])
  const [filterKriterier, setFilterKriterier] = useState([])
  const [ufiltrertListe, setUfiltrertListe] = useState([])
  const [sortering, setSortering] = useState('fylke')

  function lastNedCSV () {
    const json2csvParser = new Parser({
      delimiter: ';',
      eol: '\r\n'
    })
    const data = frivillige.map(linje => Object.assign({}, {
      fylke: linje.fylke.navn,
      lokallag: linje.lokallag.navn,
      medlemsskap: genererTagLine(linje.frivillig),
      fornavn: linje.person.fornavn,
      etternavn: linje.person.etternavn,
      telefonnummer: linje.person.telefonnummer,
      email: linje.person.email,
      aktiviteter: skrivUtBidrag(linje.aktiviteter),
      andreBidrag: linje.frivillig.andreTingDuVilBidraMed || ' ',
      kompetanse: linje.frivillig.spesiellKompetanse || ' ',
      spraak: linje.frivillig.spraak || ' ',
      kortOmMeg: linje.frivillig.fortellLittOmDegSelv || ' ',
      opptattAv: linje.opptattAv ? linje.opptattAv.join(', ') : ' ',
      koronaTilbakemelding: skrivUtKoronaTilbakemeldinger(linje.frivilligKorona),
      kontaktLogg: skrivUtKontaktLogg(linje.kontakt) || ' '
    }))
    json2csvParser.parse(data)
  }

  async function hentFrivillige () {
    try {
      const { data } = await axios.get('/api/backend/frivillig/alle', { withCredentials: true })
      if (data) {
        data.sort(sorteringsAlternativer[sortering])
        setUfiltrertListe(data)
        const filtrert = data.filter(linje => filtrerFrivillig(linje.aktiviteter, linje.frivillig.spraak, filterKriterier))
        setFrivillige(filtrert)
      }
    } catch (error) {
      if (is401(error)) {
        router.push('/login?komFra=/frivilligbasen')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }
  }

  function oppdaterLokallagId (id) {
    setLokallagId(id === 'visalle' ? false : id)
  }

  useEffect(() => {
    hentFrivillige()
  }, [])

  useEffect(() => {
    let filtrert = ufiltrertListe.filter(linje => filtrerFrivillig(linje.aktiviteter, linje.frivillig.spraak, filterKriterier))
    if (lokallagId) {
      filtrert = filtrert.filter(frivillig => frivillig.lokallag.id === parseInt(lokallagId, 10))
    }
    filtrert.sort(sorteringsAlternativer[sortering])
    setFrivillige(filtrert)
  }, [filterKriterier, lokallagId, sortering])

  return (
    <Layout pageTitle='Frivilligbasen'>
      <Head>
        <title>Frivilligbasen</title>
      </Head>
      <div>
        <AktiviteterFilter setFilter={setFilterKriterier} />
        <div className='mb-4 p-4'>
          <LokallagVelger
            user={user}
            heading='Vis kun frivillige knyttet til et bestemt lokallag'
            callOnChange={oppdaterLokallagId}
            noSessionUpdate
          />
        </div>
        <button type='button' onClick={() => lastNedCSV()} className='w-56 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' />
          </svg>
          <span>
            Last ned som csv
          </span>
        </button>
      </div>
      <Sms filterKriterier={filterKriterier} frivillige={frivillige} user={user} />
      <FrivilligTeller frivillige={frivillige} ufiltrertListe={ufiltrertListe} sortering={sortering} />
      <div>
        <button onClick={() => setSortering('fylke')} className='w-56 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Fylke</button>
        <button onClick={() => setSortering('etternavn')} className='w-56 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Etternavn</button>
        <button onClick={() => setSortering('lokallag')} className='w-56 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Lokallag</button>
        <button onClick={() => setSortering('registreringsdato')} className='w-56 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Registreringsdato</button>
      </div>
      <div>
        {frivillige.map(frivillig => <Frivillig data={frivillig} key={`frivillig-${frivillig.frivillig.id}`} />)}
      </div>
    </Layout>
  )
}

export default Frivilligbasen
