import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Confetti from 'react-confetti'

import { is401, is403 } from '../../lib/utils'
import useUser from '../../lib/useUser'
import Samtale from './samtale'
import Nummeroppslag from './nummeroppslag'
import Modus from '../../components/modus'
import LokallagVelger from '../../components/lokallag-velger'
import Person from './person'
import StengeTid from './stengetid'
import Layout from '../../components/layout'
import Button from '../../components/ui/button'
import { Info } from '../../components/ui/alerts'

const Ring = () => {
  const router = useRouter()
  const { user } = useUser()
  const [person, setPerson] = useState()
  const [accepted, setIsAccepted] = useState()
  const [loading, setLoading] = useState()
  const [visConfetti, setVisConfetti] = useState()
  const [info, setInfo] = useState()
  const { debugNummer } = process.env.NEXT_PUBLIC_TILLAT_DEBUGNUMMER ? router.query : false

  async function hentNyPerson () {
    setInfo(false)
    setLoading(true)
    setIsAccepted(false)
    try {
      const { data, status } = await axios.get('/api/hentNeste', { withCredentials: true })
      if (debugNummer) {
        data.person.telefonnummer = debugNummer
      }
      setLoading(false)
      if (data) {
        data.person.lokallagNavn = data.lokallagNavn
        setPerson(data)
      }
      if (status === 204) {
        setInfo('Du har kommet til slutten av listen. Ingen flere å ringe. Gratulerer!')
        setVisConfetti(true)
        setTimeout(() => {
          setVisConfetti(false)
        }, 10000)
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
    <Layout pageTitle={user ? `Ringesiden - ringer ${user.aktivtModus}` : 'Ringesiden'}>
      <Head>
        <title>Ringesiden</title>
      </Head>
      <div>
        <StengeTid />
        {!person && <Modus user={user} action='Ring' />}
        {!person && <LokallagVelger user={user} />}
        {!person && <Button loading={loading} onClick={hentNyPerson}>Hent ny person å ringe</Button>}
        {!person && <Nummeroppslag setPerson={setPerson} />}
        {info && <Info message={info} />}
        {visConfetti && <Confetti />}
        {person && <Person data={person} setIsAccepted={setIsAccepted} setPerson={setPerson} />}
        <Samtale data={person} accepted={accepted} setPerson={setPerson} user={user} />
      </div>
    </Layout>
  )
}

export default Ring
