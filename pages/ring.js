import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'

const RingerPanel = props => {
  return (
    <div>
      Velkommen, G g (95552759)!
      Du har så langt ringt 0 ganger.
      Det er 0 folk igjen å ringe i ditt lokallag.
      Takk for din innsats!
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
        <button onClick={handleManusToggle} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
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

const Ring = () => {
  return (
    <Layout>
      <Head>
        <title>Ring neste</title>
      </Head>
      <RingerPanel />
      <SamtalePanel />
    </Layout>
  )
}

export default Ring
