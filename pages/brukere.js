import Head from 'next/head'
import Layout from '../components/layout'

const Brukere = () => {
  return (
    <Layout>
      <Head>
        <title>Brukere</title>
      </Head>
      <div className='flex flex-col items-center'>
        Brukerhåndtering
      </div>
    </Layout>
  )
}

export default Brukere
