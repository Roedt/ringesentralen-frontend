import { useEffect, useState } from 'react'

import useUser from '../lib/useUser'

import Header from './header'
import Nav from './nav'
import Footer from './footer'
import Vannmerke from './vannmerke'
import SisteVersjon from './versjon'

export default function Layout ({ pageTitle, children }) {
  const { user } = useUser()
  const [isLoggedIn, setIsLoggedIn] = useState()

  useEffect(() => {
    if (user !== undefined) {
      setIsLoggedIn(user.isLoggedIn)
    }
  }, [user])

  if (!isLoggedIn) return null

  return (
    <div className='flex flex-col min-h-screen'>
      <Vannmerke isDemo={!process.env.NEXT_PUBLIC_IS_PRODUCTION} />
      <Nav />
      <SisteVersjon />
      <Header pageTitle={pageTitle} />
      <main className='flex-grow'>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-4 sm:px-0'>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
