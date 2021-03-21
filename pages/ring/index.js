import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { is401, is403 } from '../../lib/utils'
import useUser from '../../lib/useUser'
import Samtale from './samtale'
import Nummeroppslag from './nummeroppslag'
import Modus from './modus'
import Person from './person'
import Layout from '../../components/layout'
import Button from '../../components/ui/button'

const Ring = () => {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/login' })
  const [person, setPerson] = useState()
  const [accepted, setIsAccepted] = useState()
  const [loading, setLoading] = useState()
  const { debugNummer } = router.query

  async function hentNyPerson () {
    setLoading(true)
    setIsAccepted(false)
    try {
      const { data } = await axios.get('/api/backend/samtale/neste', { withCredentials: true })
      if (debugNummer) {
        data.person.telefonnummer = debugNummer
      }
      setLoading(false)
      if (data) {
        setPerson(data)
      }
    } catch (error) {
      setLoading(false)
      if (is401(error)) {
        router.push('/login')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }
  }

  return (
    <Layout pageTitle='Ringesiden'>
      <Head>
        <title>Ringesiden</title>
      </Head>
      <div>
        {!person && <Modus user={user} />}
        {!person && <Button loading={loading} onClick={hentNyPerson}>Hent ny person å ringe</Button>}
        {!person && <Nummeroppslag setPerson={setPerson} />}
        {person && <Person data={person} setIsAccepted={setIsAccepted} setPerson={setPerson} />}
        <Samtale data={person} accepted={accepted} setPerson={setPerson} user={user} />
      </div>
    </Layout>
  )
}

export default Ring
