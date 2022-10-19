import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { is401, is403 } from '../../lib/utils'
import { useEffect, useState } from 'react'
import Underforumlenke from './underforumlenke'

const Forum = () => {
  const router = useRouter()
  const [underforum, setUnderforum] = useState()

  async function hentUnderforum () {
    try {
      const { data } = await axios.get('/api/backend/forum', { withCredentials: true })
      setUnderforum(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login?komFra=/forum')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    hentUnderforum()
  }, [])

  return (
    <Layout pageTitle='Forum'>
      <Head>
        <title>Forum</title>
      </Head>
      <div className='forum'>
        {underforum && underforum.map((text) => <Underforumlenke key={text.id} underforum={text} />)}
      </div>
    </Layout>
  )
}

export default Forum
