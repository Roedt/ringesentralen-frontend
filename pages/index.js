import Head from 'next/head'
import Layout from '../components/layout'

const HomePage = () => {
  return (
    <Layout>
      <Head>
        Ringesentralen
      </Head>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-mono'>Ringesentralen</h1>
      </div>
    </Layout>
  )
}

export default HomePage
