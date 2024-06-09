import Head from 'next/head'

import useUser from '../lib/useUser'
import Layout from '../components/layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const HomePage = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    console.log(user)
  }, [user])

  function lenkerForOslo () {
    return (
      <>
        <li><a href='https://xn--verktykasse-kgb.eu/' className='underline'>Verktøykassa for Rødt Oslo</a></li>
        <li><a href='https://calendar.google.com/calendar/u/0/embed?color=%23cca6ac&src=acfvhhb7plabhq1k3q1493gru4@group.calendar.google.com' className='underline'>Rødt Oslos kalender</a></li>
      </>
    )
  }

  return (
    <Layout pageTitle='Rødt-sentralen'>
      <Head>
        <title>Rødt-sentralen</title>
      </Head>
      <div className='max-w-3xl divide-y-1 divide-gray-200'>
        <div>
          <h2 className='text-2xl tracking-tight text-gray-900 mb-4'>
            Hei, {user?.navn}.<br />Velkommen til Rødt-sentralen.
          </h2>
          <hr className='mb-4' />
          <p className='text-base text-gray-500 mb-2 justify-start'>
            Her finner du
          </p>
          <ul className='list-disc mb-6 ml-4'>
            <li>Rødts Ringesentral, som du finner i menyen øverst</li>
            <li>
              <button type='button' onClick={() => router.push('/meg')} className='underline'>
                Informasjonen vi har lagret om deg i medlemssystemet
              </button>
            </li>
            {(user?.fylke === 3) ? lenkerForOslo() : <></>}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
