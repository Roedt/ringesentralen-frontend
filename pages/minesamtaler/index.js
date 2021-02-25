import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Samtaler from './samtaleliste.js'

const is401 = error => {
  return /401/.test(error.message)
}

const MineSamtaler = () => {
  const router = useRouter()
  const [mineSamtaler, setMineSamtaler] = useState()

  async function hentMineSamtaler () {
    try {
      const { data } = await axios.get('/api/backend/historikk/meg', { withCredentials: true })
      setMineSamtaler(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    hentMineSamtaler()
  }, [])

  return (
    <Layout pageTitle='Mine samtaler'>
      <Head>
        <title>Mine samtaler</title>
      </Head>
      <div className='shadow'>
        <Samtaler title='Mine samtaler' samtaler={mineSamtaler}/>

        <h2 className='text-xl font-semibold mt-16 mb-2'>Alle samtaler i mitt lag</h2>
        <small>NB: Denne oversikta vises kun for lokale godkjennere og admins</small>
        <br />
        Liste over lagets samtaler her
      </div>
    </Layout>
  )
}

export default MineSamtaler
