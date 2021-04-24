import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from '../components/layout'
import { is401, is403 } from '../lib/utils'

function MinProfil ({ data }) {
  if (!data) return null

  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}

function Meg () {
  const router = useRouter()
  const [minProfil, setMinProfil] = useState()

  async function hentMinProfil () {
    try {
      const { data } = await axios.get('/api/backend/profil', { withCredentials: true })
      setMinProfil(data)
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
    hentMinProfil()
  }, [])

  return (
    <Layout pageTitle='Meg'>
      <Head>
        <title>Meg</title>
      </Head>
      <MinProfil data={minProfil} />
    </Layout>
  )
}

export default Meg
