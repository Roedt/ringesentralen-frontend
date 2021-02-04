import Head from 'next/head'
import Layout from '../components/layout'
import Login from '../components/login'

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <title>Ringesentralen</title>
      </Head>
      <div>
        <h1>Ringesentralen</h1>
      </div>
      <Login />
    </Layout>
  )
}

export default HomePage
