import Head from 'next/head'
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

const SamtalePanel = props => {
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
        Vis/skjul manus
      </div>
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
        <title>Ring</title>
      </Head>
      <RingerPanel />
      <SamtalePanel />
    </Layout>
  )
}

export default Ring
