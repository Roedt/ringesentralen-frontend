import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { is401, is403 } from '../../lib/utils'

import Layout from '../../components/layout'

function Frivilligbasen () {
  const router = useRouter()
  const [frivillige, setFrivillige] = useState([])

  async function hentFrivillige () {
    try {
      const { data } = await axios.get('/api/backend/alle', { withCredentials: true })
      if (data) {
        setFrivillige(data)
      }
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
    hentFrivillige()
  }, [])

  return (
    <Layout pageTitle='Frivilligbasen'>
      <Head>
        <title>Frivilligbasen</title>
      </Head>
      <div>
        {JSON.stringify(frivillige, null, 2)}
      </div>
    </Layout>
  )
}

export default Frivilligbasen
