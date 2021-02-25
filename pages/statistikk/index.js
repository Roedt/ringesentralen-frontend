import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import StatistikkResponse from './statistikkresponse'

const is401 = error => {
  return /401/.test(error.message)
}

const Statistikk = () => {
  const router = useRouter()
  const [statistikk, setStatistikk] = useState()

  async function hentStatistikk () {
    try {
      const { data } = await axios.get('/api/backend/statistikk/statistikk', { withCredentials: true })
      setStatistikk(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    hentStatistikk()
  }, [])

  return (
    <Layout pageTitle='Statistikk'>
      <Head>
        <title>Statistikk</title>
      </Head>
      <StatistikkResponse statistikk={statistikk} />
    </Layout>
  )
}

export default Statistikk
