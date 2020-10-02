import Head from 'next/head'
import Layout from '../components/layout'

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <title>Ringesentralen</title>
      </Head>
      <div className='flex flex-col items-center'>
        <h1>Ringesentralen</h1>
      </div>
    </Layout>
  )
}

export default HomePage
