import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { is401, is403, is503 } from '../lib/utils'
import generatePayload from '../lib/generate-payload'
import Button from '../components/ui/button'
import { Warning } from '../components/ui/alerts'

function hentEnhetsid () {
  /* eslint-disable no-undef */
  let enhetsid = localStorage.getItem('ringesentralen-enhetsid')
  if (!enhetsid) {
    enhetsid = crypto.randomUUID()
    localStorage.setItem('ringesentralen-enhetsid', enhetsid)
  }
  /* eslint-enable no-undef */
  return enhetsid
}

const Tilstand = {
  ikkeSjekka: 'ikkeSjekka',
  trengerIkkeMFA: 'trengerIkkeMFA',
  trengerMFA: 'trengerMFA'
}

function Login () {
  const [loading, setLoading] = useState()
  const [errors, setErrors] = useState()
  const [tilstand, setTilstand] = useState(Tilstand.ikkeSjekka)
  const [engangskode, setEngangskode] = useState()
  const [engangskodesendt, setEngangskodesendt] = useState(false)
  const [brukernavn, setBrukernavn] = useState()
  const router = useRouter()

  const sjekkOmViTrengerMFA = async (brukernavnFraInput) => {
    if (!brukernavnFraInput) {
      return Tilstand.ikkeSjekka
    }
    try {
      const response = await axios.post('/api/trengerMFA', { enhetsid: hentEnhetsid(), brukernavn: brukernavnFraInput })
      const trenger = response.data.trengerMFA
      if (trenger === true) {
        setTilstand(Tilstand.trengerMFA)
        return Tilstand.trengerMFA
      } else {
        setTilstand(Tilstand.trengerIkkeMFA)
        return Tilstand.trengerIkkeMFA
      }
    } catch (error) {
      setLoading(false)
      if (is401(error) || is403(error)) {
        setErrors('Feil brukernavn og/eller passord. Sjekk om du er korrekt registrert i Hypersys eller kontakt oss på Slack.')
      } else if (is503(error)) {
        setErrors('Vi har problemer med å nå noen av baksystemene. Vennligst prøv igjen senere.')
      } else {
        console.error(error)
      }
      return Tilstand.ikkeSjekka
    }
  }

  const sendMFA = async (brukernavn) => {
    try {
      setEngangskodesendt(false)
      setLoading(true)
      await axios.post('/api/sendMFA', { enhetsid: hentEnhetsid(), brukernavn })
      setLoading(false)
      setEngangskodesendt(true)
    } catch (error) {
      setLoading(false)
      if (is401(error) || is403(error)) {
        setErrors('Feil brukernavn og/eller passord. Sjekk om du er korrekt registrert i Hypersys eller kontakt oss på Slack.')
      } else if (is503(error)) {
        setErrors('Vi har problemer med å nå noen av baksystemene. Vennligst prøv igjen senere.')
      } else {
        console.error(error)
      }
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setErrors(false)
    setLoading(true)
    const form = document.getElementById('login-form')
    try {
      const payload = {
        ...generatePayload(form),
        enhetsid: hentEnhetsid()
      }
      await axios.post('/api/login', payload)
      setLoading(false)
      form.reset()
      const params = new URLSearchParams(router.asPath.replace('/login', ''))
      const komFra = params.get('komFra')
      if (komFra) {
        router.push(komFra)
      } else {
        router.push('/ring')
      }
    } catch (error) {
      setLoading(false)
      if (is401(error) || is403(error)) {
        setErrors('Feil brukernavn og/eller passord. Sjekk om du er korrekt registrert i Hypersys eller kontakt oss på Slack.')
      } else if (is503(error)) {
        setErrors('Vi har problemer med å nå noen av baksystemene. Vennligst prøv igjen senere.')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    const wakeupBackend = async () => {
      try {
        await axios.get('/api/backend/ping')
      } catch (error) {
        console.error(error)
      }
    }
    wakeupBackend()
  }, [])

  async function handleSubmitMedMFAsjekk (event) {
    if (!brukernavn) {
      return
    }
    if (tilstand === Tilstand.trengerIkkeMFA) {
      await handleSubmit(event)
    } else {
      event.preventDefault()
      const maaHaMFA = await sjekkOmViTrengerMFA(brukernavn)
      if (maaHaMFA === Tilstand.trengerIkkeMFA || (engangskode && maaHaMFA === Tilstand.trengerMFA)) {
        await handleSubmit(event)
      }
    }
  }

  function visSendMFAtekst () {
    return (
      <>
        <p className='mb-1 mt-2 '>
          Du må verifisere at du er den du sier du er ved å skrive inn koden fra eposten du fikk fra oss.<br />
          Har du ikke fått epost? Skriv inn epostadressa di i e-post-feltet og
          <button
            onClick={() => sendMFA(brukernavn)}
            className='underline tracking-wide text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          >trykk
            her for å få tilsendt ny
          </button> (til {brukernavn})
        </p>
      </>
    )
  }

  function visInformasjon () {
    return (
      <div className='w-11/12 mt-6 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 p-0'>
        <p className='mb-2'>
          Du loggar inn med samme brukarnamn og passord som du bruker for å logge inn på Hypersys (partiets
          medlemssystem). <br />
        </p>
        {visURL('Har du ikkje logga inn der før, eller har glemt passordet, ', `${process.env.NEXT_PUBLIC_HYPERSYS_BASE_URL}/auth/reset/`, 'bruk gjenopprett passord', 'mb-3')}
        {visURL('Er det noko du lurer på, ', 'https://roedtorg.slack.com/archives/C01BNKD2RU0', 'still gjerne spørsmål på Slack', 'mb-0')}
        {visURL('Om du ikke bruker Slack kan du ', 'https://roedt.no/slack', 'få tilgang her', 'mb-0')}
      </div>
    )
  }

  const visURL = (visningstekst, url, lenketekst, bunnmargin) => {
    return (
      <p className={bunnmargin}>{visningstekst}
        <a
          className='underline tracking-wide text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          href={url}
        >{lenketekst}
        </a>.
      </p>
    )
  }

  return (
    <div>
      <Head>
        <title>Rødt-sentralen</title>
      </Head>
      <main className='flex flex-col h-screen bg-gray-100'>
        <div className='grid place-items-center mx-2 my-20 sm:my-auto'>
          <div
            className='w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg'
          >
            <div>
              <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold pt-1 pb-1'>Rødt-sentralen</h1>
                <img className='-ml-2 h-10 w-10' src='/logo.jpg' alt='Rødt logo' />
              </div>
            </div>
            <form className='mt-10' id='login-form' onSubmit={handleSubmitMedMFAsjekk}>
              <label htmlFor='brukarnamn' className='block text-xs font-semibold text-gray-600 uppercase'>
                E-postadresse
              </label>
              <input
                id='brukarnamn' type='email' name='brukarnamn' placeholder='E-postadresse' autoComplete='email'
                className='block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200'
                required
                value={brukernavn}
                onInput={(event) => setBrukernavn(event.target.value)}
                onBlur={(event) => sjekkOmViTrengerMFA(event.target.value)}
              />
              <label htmlFor='passord' className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                Passord
              </label>
              <input
                id='passord' type='password' name='passord' placeholder='Passord' autoComplete='current-password'
                className='block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200'
                required
              />
              {tilstand === Tilstand.trengerMFA &&
                <>
                  <label htmlFor='engangskode' className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                    Engangskode
                  </label>
                  <input
                    id='engangskode' type='text' name='engangskode' placeholder='Engangskode'
                    className='block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200'
                    value={engangskode}
                    onInput={(event) => setEngangskode(event.target.value)}
                    required
                  />
                </>}
              {engangskodesendt && <p><em>Engangskode er sendt på epost</em></p>}
              {tilstand === Tilstand.trengerMFA && visSendMFAtekst()}
              <Button
                type='submit'
                loading={loading}
              >
                Logg inn
              </Button>
            </form>
          </div>
          {visInformasjon()}
          {errors && <Warning message={errors} />}
        </div>
      </main>
    </div>
  )
}

export default Login
