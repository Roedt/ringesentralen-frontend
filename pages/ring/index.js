import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Button from '../../components/ui/button'

const is401 = error => {
  return /401/.test(error.message)
}

/*
const RingerPanel = props => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <div className='p-4'>
        <p>Velkommen, Grei Kamerat (12345678)!</p>
        <p>Du har så langt ringt 0 ganger.</p>
        <p>Det er 0 folk igjen å ringe i ditt lokallag.</p>
        <p>Takk for din innsats!</p>
      </div>
    </div>
  )
}

const Manus = () => {
  return (
    <div>
      Dette er verdens beste manus!
      <hr className='mt-2 mb-2' />
    </div>
  )
}

const SamtalePanel = props => {
  const [showManus, setShowManus] = useState()
  const handleManusToggle = () => {
    setShowManus(!showManus)
  }
  return (
    <>
      <div>
        1. Ring Anton Duck
        Anton Duck, Rødt
        ☎ 12345674
        Du er den første til å ringe Anton Duck!
      </div>
      <div>
        Start samtale
        Hopp over
      </div>
      <div>
        <button onClick={handleManusToggle} className='bg-transparent hover:bg-red text-red font-semibold hover:text-white py-2 px-4 border border-red hover:border-transparent'>
          {showManus ? 'Skjul' : 'Vis'} manus
        </button>
      </div>
      {showManus && <Manus />}
      <div>
        Hva ble resultatet
        ikke svar
        passet ikke, må blir ringt opp på spesielt tidspunkt
        svarte

        kommentar

        Vil ha korona-program på epost
        Vil ha valgkampsbrev med informasjon om valgkampen
        Kan tenke seg å være mer aktiv i Rødt framover
        Vil ikke bli ringt
      </div>
    </>
  )
}
*/

function ResultatSkjema () {
  const SendKnapp = () => {
    return (
      <button type='button' onClick={() => window.alert('Ikke implementert')} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z' />
        </svg>
        <span>
          Lagre oppsummering
        </span>
      </button>
    )
  }

  const AvbrytKnapp = () => {
    return (
      <button type='button' onClick={() => window.alert('Ikke implementert')} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
        </svg>
        <span>
          Avbryt
        </span>
      </button>
    )
  }

  return (
    <>
      <form className='space-y-8 divide-y divide-gray-200'>
        <div className='space-y-8 divide-y divide-gray-200'>
          <div>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Samtalereferat
              </h3>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label for='about' className='block text-sm font-medium text-gray-700'>
                  Kommentarer
                </label>
                <div className='mt-1'>
                  <textarea id='about' name='about' rows='3' className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md' />
                </div>
                <p className='mt-2 text-sm text-gray-500'>Ekstra informasjon for senere samtaler eller til lokallaget.</p>
              </div>
            </div>
          </div>

          <div className='pt-8'>
            <div className='mt-6'>
              <fieldset className='mt-6'>
                <div>
                  <legend className='text-base font-medium text-gray-900'>
                    Resultat av oppringing
                  </legend>
                </div>
                <div className='mt-4 space-y-4'>
                  <div className='flex items-center'>
                    <input id='push_everything' name='push_notifications' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                    <label for='push_everything' className='ml-3 block text-sm font-medium text-gray-700'>
                      Svarte
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input id='push_email' name='push_notifications' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                    <label for='push_email' className='ml-3 block text-sm font-medium text-gray-700'>
                      Passet ikke
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input id='push_nothing' name='push_notifications' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                    <label for='push_nothing' className='ml-3 block text-sm font-medium text-gray-700'>
                      Svarte ikke
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <div className='mt-6'>
            <fieldset>
              <legend className='text-base font-medium text-gray-900'>
                Ønsker
              </legend>
              <div className='mt-4 space-y-4'>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='comments' name='comments' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='comments' className='font-medium text-gray-700'>Vil ha korona-program på epost</label>
                  </div>
                </div>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='candidates' name='candidates' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='candidates' className='font-medium text-gray-700'>Vil ha valgkampsbrev med informasjon om valgkampen</label>
                  </div>
                </div>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='offers' name='offers' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='offers' className='font-medium text-gray-700'>Kan tenke seg å være mer aktiv i Rødt framover</label>
                  </div>
                </div>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='ikke-ring' name='ikke-ring' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='ikke-ring' className='font-medium text-gray-700'>Vil ikke bli ringt</label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className='pt-5'>
          <div className='ml-4 mt-4 flex-shrink-0 flex justify-end space-x-4'>
            <AvbrytKnapp />
            <SendKnapp />
          </div>
        </div>
      </form>
    </>
  )
}

function Samtale ({ data, setPerson }) {
  const [samtale, setSamtale] = useState()

  async function avslaaSamtale () {
    setPerson(false)
  }

  async function startSamtale (id) {
    await axios.post('/api/backend/samtale/startSamtale', { skalRingesID: id }, { withCredentials: true })
    setSamtale('paagaaende')
  }

  async function avsluttSamtale (id) {
    await axios.post('/api/backend/samtale/startSamtale', { skalRingesID: id }, { withCredentials: true })
    setSamtale('avsluttet')
  }

  const StartKnapp = () => {
    return (
      <button type='button' onClick={() => startSamtale(id)} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z' />
        </svg>
        <span>
          Start samtale
        </span>
      </button>
    )
  }

  const StoppKnapp = () => {
    return (
      <button type='button' onClick={() => avsluttSamtale(id)} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          <path d='M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z' />
        </svg>
        <span>
          Avslutt samtale
        </span>
      </button>
    )
  }

  if (!data) return null
  const { person } = data
  const { fornavn, etternavn, telefonnummer, id } = person
  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      <div className='-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap'>
        <div className='ml-4 mt-4'>
          <div className='flex items-center'>
            <div className='ml-4'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                {fornavn} {etternavn}
              </h3>
              <p className='text-sm text-gray-500'>
                {telefonnummer}
              </p>
            </div>
          </div>
        </div>
        <div className='ml-4 mt-4 flex-shrink-0 flex'>
          {!samtale && <StartKnapp />}
          {samtale === 'paagaaende' && <StoppKnapp />}
          <button type='button' disabled={samtale} onClick={() => avslaaSamtale()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
              <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
            </svg>
            <span>
              Avslå samtale
            </span>
          </button>
        </div>
      </div>
      {samtale === 'avsluttet' && <ResultatSkjema />}
    </div>
  )
}

const Ring = () => {
  const router = useRouter()
  const [person, setPerson] = useState()
  const [loading, setLoading] = useState()
  const [voipToken, setVoipToken] = useState()

  async function hentNyPerson () {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/backend/samtale/neste', { withCredentials: true })
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
      console.log(data)
      setVoipToken(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    hentVoipToken()
  }, [])

  return (
    <Layout pageTitle='Ringesiden'>
      <Head>
        <title>Ringesiden</title>
      </Head>
      <div>
        {!person && <Button loading={loading} onClick={hentNyPerson}>Hent ny person å ringe</Button>}
        <Samtale data={person} setPerson={setPerson} />
      </div>
      {voipToken && <div>Du er klar for VoIP samtaler</div>}
    </Layout>
  )
}

export default Ring
