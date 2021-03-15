import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useUser from '../../lib/useUser'
import { is401, is403 } from '../../lib/utils'
import Layout from '../../components/layout'
import Samtaler from './samtaleliste.js'

const SamtaleOversikt = () => {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/login' })
  const [mineSamtaler, setMineSamtaler] = useState()
  const [lagetsSamtaler, setLagetsSamtaler] = useState()
  const [erGodkjenner, setErGodkjenner] = useState()

  async function hentMineSamtaler () {
    try {
      const { data } = await axios.get('/api/backend/historikk/meg', { withCredentials: true })
      setMineSamtaler(data)
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
  async function hentLagetsSamtaler () {
    try {
      const { data } = await axios.get('/api/backend/historikk/laget', { withCredentials: true })
      setLagetsSamtaler(data)
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
    hentMineSamtaler()
  }, [])

  useEffect(() => {
    if (user) {
      setErGodkjenner(user.rolle.includes('godkjenner'))
    }
  }, [user])

  useEffect(() => {
    if (erGodkjenner) {
      hentLagetsSamtaler()
    }
  }, [erGodkjenner])

  const LagetsSamtaler = ({ samtaler }) => {
    if (!samtaler) return null
    return (
      <div className='shadow mt-12'>
        <small>NB: Denne oversikta vises kun for lokale godkjennere og admins</small>
        <br />
        <Samtaler title='Alle samtaler i mitt lag' samtaler={samtaler} />
      </div>
    )
  }

  return (
    <>
      <div className='shadow'>
        <Samtaler title='Mine samtaler' samtaler={mineSamtaler} />
      </div>
      <LagetsSamtaler samtaler={lagetsSamtaler} />
    </>
  )
}

function MineSamtaler () {
  return (
    <Layout pageTitle='Mine samtaler'>
      <Head>
        <title>Mine samtaler</title>
      </Head>
      <SamtaleOversikt />
    </Layout>
  )
}

export default MineSamtaler
