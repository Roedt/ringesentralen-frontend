import Head from 'next/head'
import Layout from '../components/layout'
import Hjelp from '../components/hjelp'

const HjelpeSide = () => {
  return (
    <Layout pageTitle='Hjelp'>
      <Head>
        <title>Hjelpeside</title>
      </Head>
      <Hjelp />
    </Layout>
  )
}

export default HjelpeSide
