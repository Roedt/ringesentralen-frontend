import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout'

const is401 = error => {
  return /401/.test(error.message)
}

const Bruker = ({ epost }) => {
  return (
    <div>
      {epost}
    </div>
  )
}

const Brukere = () => {
  const router = useRouter()
  const [brukere, setBrukere] = useState()

  async function handleBrukere () {
    try {
      const { data } = await axios.get('/api/backend/brukere/brukere', { withCredentials: true })
      setBrukere(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  return (
    <Layout pageTitle='Brukere'>
      <Head>
        <title>Brukere</title>
      </Head>
      <div>
        Brukerhåndtering
      </div>
      <div>
        Godkjenn nye brukere
      </div>
      <div>
        <button onClick={() => handleBrukere()}>Registrerte brukere</button>
      </div>
      <div>
        Deaktiverte/Ikke godkjente brukere
      </div>
      {brukere && brukere.map(bruker => <Bruker {...bruker} key={bruker.hypersysID} />)}
    </Layout>
  )
}

export default Brukere
