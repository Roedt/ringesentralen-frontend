import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

function Samtale ({ data, setPerson }) {
  const [samtale, setSamtale] = useState()

  async function avslaaSamtale (id) {
    // await axios.put('/api/backend/samtale', {}, { withCredentials: true })
    setPerson(false)
  }

  async function startSamtale (id) {
    await axios.post('/api/backend/samtale/startSamtale', { skalRingesID: id }, { withCredentials: true })
    setSamtale()
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
          <button type='button' onClick={() => startSamtale(id)} className='relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
              <path d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z' />
            </svg>
            <span>
              Start samtale
            </span>
          </button>
          <button type='button' onClick={() => avslaaSamtale(id)} className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
              <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
            </svg>
            <span>
              Avslå samtale
            </span>
          </button>
        </div>
      </div>
      {samtale && <div>Samtale pågår</div>}
    </div>
  )
}

const Ring = () => {
  const router = useRouter()
  const [person, setPerson] = useState()
  const [loading, setLoading] = useState()

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

  return (
    <Layout pageTitle='Ringesiden'>
      <Head>
        <title>Ringesiden</title>
      </Head>
      <div>
        {!person && <Button loading={loading} onClick={hentNyPerson}>Hent ny person å ringe</Button>}
        <Samtale data={person} setPerson={setPerson} />
      </div>
    </Layout>
  )
}

export default Ring
