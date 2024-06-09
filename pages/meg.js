import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useUser from '../lib/useUser'
import { is401, is403 } from '../lib/utils'

import Layout from '../components/layout'
import { Warning } from '../components/ui/alerts'

function navneSortering (a, b) {
  return a.navn.localeCompare(b.navn)
}

function MinProfil ({ profil, session, mineLokallag }) {
  if (!profil || !session || !mineLokallag) return null

  const { fornavn, etternavn, telefonnummer, email, postnummer, fylkeNavn, lokallagNavn } = profil
  const rollerProfil = profil.rolle
  const { aktivtModus, aktivtLokallag } = session
  const rollerSesjon = session.rolle
  const message = 'Du har ulike roller i løsningen og i pågående sesjon. Vennligst logg ut og inn igjen'

  const hentAktivtLokallagNavn = (id) => {
    const lokallag = mineLokallag.find(lag => lag.id === id)
    return lokallag ? lokallag.navn : id
  }

  const url = `${process.env.NEXT_PUBLIC_HYPERSYS_BASE_URL}`
  return (
    <>
      {rollerProfil.toString() !== rollerSesjon.toString() && <Warning message={message} />}
      <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>Meg i Rødt-sentralen</h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>Informasjon fra profil og innlogget sesjon</p>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>Vil du endre informasjonen om deg, kan du gjøre det
            <a href={url} className='underline'>direkte i medlemssystemet.</a>
          </p>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Navn</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{fornavn} {etternavn}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>E-post</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{email}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Telefonnummer</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{telefonnummer}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Lokallag</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{lokallagNavn}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Postnummer</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{postnummer}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Fylke</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{fylkeNavn}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Roller i systemet</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {rollerProfil.join(', ')}
              </dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Roller i sesjon</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {rollerSesjon.join(', ')}
              </dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Aktivt lokallag i sesjon</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{hentAktivtLokallagNavn(aktivtLokallag)}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Aktivt ringemodus i sesjon</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{aktivtModus}</dd>
            </div>
            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Lokallag jeg har tilgang til</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                <ul>{mineLokallag.map(lag => <li key={`lagid-${lag.id}`}>{lag.navn}</li>)}</ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

function Meg () {
  const router = useRouter()
  const { user } = useUser()
  const [minProfil, setMinProfil] = useState()
  const [mineLokallag, setMineLokallag] = useState()

  async function hentMinProfil () {
    try {
      const { data } = await axios.get('/api/backend/profil', { withCredentials: true })
      setMinProfil(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login?komFra=/meg')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }
  }

  async function hentMineLokallag () {
    try {
      const { data } = await axios.get('/api/backend/profil/lokallag', { withCredentials: true })
      data.sort(navneSortering)
      setMineLokallag(data)
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
    if (user) {
      hentMinProfil()
      hentMineLokallag()
    }
  }, [user])

  if (!user || !minProfil) return null

  return (
    <Layout pageTitle='Meg'>
      <Head>
        <title>Meg</title>
      </Head>
      <MinProfil profil={minProfil} session={user} mineLokallag={mineLokallag} />
    </Layout>
  )
}

export default Meg
