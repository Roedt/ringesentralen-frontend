import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useUser from '../../lib/useUser'
import Layout from '../../components/layout'
import { is401, is403 } from '../../lib/utils'
import StatistikkResponse from './statistikkresponse'

const Statistikk = () => {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/login' })
  const [statistikk, setStatistikk] = useState()

  async function hentStatistikk () {
    try {
      const { data } = await axios.get('/api/backend/statistikk/statistikk', { withCredentials: true })
      setStatistikk(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else if (is403(error)) {
        router.push('/sperret')
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
      <StatistikkResponse statistikk={statistikk} user={user} />
    </Layout>
  )
}

export default Statistikk
