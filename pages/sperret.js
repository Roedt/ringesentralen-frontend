import Head from 'next/head'
import Layout from '../components/layout'

function Sperret () {
  return (
    <Layout pageTitle='Ingen tilgang'>
      <Head>
        <title>Ingen tilgang</title>
      </Head>
      <div>
        Du har ikke tilgang til det du forsøkte å gjøre.

        Dette kan bety at du ikke er godkjent som ringer i systemet ennå eller at du ikke har fått tildelt nødvendig tilgangsnivå.
      </div>
    </Layout>
  )
}

export default Sperret
