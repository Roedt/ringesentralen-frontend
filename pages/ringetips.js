import Head from 'next/head'
import Layout from '../components/layout'
import Tilbakemelding from '../components/tilbakemelding'

const Ringetips = () => {
  return (
    <Layout pageTitle='Ringetips'>
      <Head>
        <title>Ringetips</title>
      </Head>
      <Tilbakemelding
        tekst='Hva synes du om ringetipsene?'
        tema='ringetips'
      />
    </Layout>
  )
}

export default Ringetips
