import Head from 'next/head'
import Layout from '../components/layout'

const Brukere = () => {
  return (
    <Layout>
      <Head>
        <title>Brukere</title>
      </Head>
      <div>
        Brukerhåndtering
      </div>
      <div>
        Godkjenn nye brukere
      </div>
      <div>
        Registrerte brukere
      </div>
      <div>
        Deaktiverte/Ikke godkjente brukere
      </div>
    </Layout>
  )
}

export default Brukere
