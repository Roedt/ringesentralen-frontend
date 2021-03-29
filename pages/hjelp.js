import Head from 'next/head'
import Layout from '../components/layout'
import Hjelp from '../components/hjelp'
import Tilbakemelding from '../components/tilbakemelding'

const HjelpeSide = () => {
  return (
    <Layout pageTitle='Hjelp'>
      <Head>
        <title>Hjelpeside</title>
      </Head>
      <Hjelp />
      <Tilbakemelding
        tekst='Hvordan fungerte hjelpesiden for deg?'
        tema='hjelpesiden'
      />
    </Layout>
  )
}

export default HjelpeSide
