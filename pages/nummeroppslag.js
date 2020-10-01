import Head from 'next/head'
import Layout from '../components/layout'

const Nummeroppslag = () => {
  return (
    <Layout>
      <Head>
        Nummeroppslag
      </Head>
      <div className='flex flex-col items-center'>
        Slå opp nummer
      </div>
    </Layout>
  )
}

export default Nummeroppslag
