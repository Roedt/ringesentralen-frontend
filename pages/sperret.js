import Head from 'next/head'
import { useEffect, useState } from 'react'

import useUser from '../lib/useUser'
import Layout from '../components/layout'

function Sperret () {
  const { user } = useUser()
  const [roller, setRoller] = useState()

  useEffect(() => {
    if (user) {
      setRoller(user.rolle)
    }
  }, [user])

  return (
    <Layout pageTitle='Ingen tilgang'>
      <Head>
        <title>Ingen tilgang</title>
      </Head>
      <div className='text-lg'>
        <p className='mb-2'>
          Du har ikke tilgang til det du forsøkte å gjøre.
        </p>
        <p className='mb-2'>
          Dette kan bety at du ikke er godkjent som ringer i systemet ennå eller at du ikke har fått tildelt nødvendig tilgangsnivå.
        </p>
        <p className='mb-2'>
          Du har nå disse rollene i løsningen: <span className='text-gray-900 font-semibold'>{roller ? roller.join(', ') : 'ingen'}</span>
        </p>
        <p>
          Mener du dette er feil, eller har spørsmål så <a className='underline tracking-wide text-gray-700 hover:bg-gray-100 hover:text-gray-900' href='https://roedtorg.slack.com/archives/C01BNKD2RU0'>kontakt oss på Slack</a>.
        </p>
      </div>
    </Layout>
  )
}

export default Sperret
