import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { is401 } from '../../lib/utils'
import Samtale from './samtale'
import Nummeroppslag from './nummeroppslag'
import Person from './person'
import Layout from '../../components/layout'
import Button from '../../components/ui/button'

const Ring = () => {
  const router = useRouter()
  const [person, setPerson] = useState()
  const [accepted, setIsAccepted] = useState()
  const [device, setDevice] = useState()
  const [loading, setLoading] = useState()
  const [voipToken, setVoipToken] = useState()
  const [voipReady, setVoipReady] = useState()
  const { debugNummer } = router.query

  async function hentNyPerson () {
    setLoading(true)
    setIsAccepted(false)
    try {
      const { data } = await axios.get('/api/backend/samtale/neste', { withCredentials: true })
      if (debugNummer) {
        data.person.telefonnummer = debugNummer
      }
      setPerson(data)
      setLoading(false)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  async function hentVoipToken () {
    try {
      const { data } = await axios.get('/api/twilio/token', { withCredentials: true })
      setVoipToken(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  function handleVoipSetup () {
    if (voipToken) {
      const Twilio = require('twilio-client')
      const phone = new Twilio.Device()
      phone.setup(voipToken, {
        codecPreferences: ['opus', 'pcmu'],
        fakeLocalDTMF: true,
        enableRingingState: true
      })
      phone.on('ready', function (phone) {
        setDevice(() => phone)
        setVoipReady(true)
      })
    }
  }

  useEffect(() => {
    hentVoipToken()
  }, [])

  const VoIP = () => {
    return (
      <button onClick={() => handleVoipSetup()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z' />
          <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z' />
        </svg>
        <span>
          Tillat VoIP
        </span>
      </button>
    )
  }

  return (
    <Layout pageTitle='Ringesiden'>
      <Head>
        <title>Ringesiden</title>
      </Head>
      <div>
        {(voipToken && !voipReady) && <VoIP />}
        {!person && <Button loading={loading} onClick={hentNyPerson}>Hent ny person å ringe</Button>}
        {!person && <Nummeroppslag setPerson={setPerson} />}
        {person && <Person data={person} setIsAccepted={setIsAccepted} setPerson={setPerson} />}
        <Samtale data={person} accepted={accepted} device={device} setPerson={setPerson} />
      </div>
    </Layout>
  )
}

export default Ring
