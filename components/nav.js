import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function BurgerLink ({ href, title, pathname }) {
  const menuBurgerSelected = 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
  const menuBurger = 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
  return (
    <Link href={href}>
      <a className={pathname === href ? menuBurgerSelected : menuBurger}>{title}</a>
    </Link>
  )
}

function MainLink ({ href, title, pathname }) {
  const menuMainSelected = 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
  const menuMain = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
  return (
    <Link href={href}>
      <a className={pathname === href ? menuMainSelected : menuMain}>{title}</a>
    </Link>
  )
}

function Nav ({ erAdmin }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <img className='h-8 w-8' src='/logo.jpg' alt='Rødt logo' />
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <MainLink href='/' title='Forsiden' pathname={router.pathname} />
                {erAdmin && <MainLink href='/forum' title='Forum' pathname={router.pathname} />}
                <MainLink href='/ring' title='Ring' pathname={router.pathname} />
                <MainLink href='/minesamtaler' title='Mine samtaler' pathname={router.pathname} />
                <MainLink href='/hjelp' title='Hjelp' pathname={router.pathname} />
                <MainLink href='/brukere' title='Brukere' pathname={router.pathname} />
                <MainLink href='/statistikk' title='Statistikk' pathname={router.pathname} />
                <MainLink href='/meg' title='Meg' pathname={router.pathname} />
                <MainLink href='/frivilligbasen' title='Frivilligbasen' pathname={router.pathname} />
                <MainLink href='/loggut' title='Logg ut' pathname={router.pathname} />
              </div>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
            >
              <span className='sr-only'>Åpne hovedmenyen</span>
              <svg className='block h-6 w-6' xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              <svg className='hidden h-6 w-6' xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? '' : 'hidden'} md:hidden`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          <BurgerLink href='/' title='Forsiden' pathname={router.pathname} />
          {erAdmin && <BurgerLink href='/forum' title='Forum' pathname={router.pathname} />}
          <BurgerLink href='/ring' title='Ring' pathname={router.pathname} />
          <BurgerLink href='/minesamtaler' title='Mine samtaler' pathname={router.pathname} />
          <BurgerLink href='/hjelp' title='Hjelp' pathname={router.pathname} />
          <BurgerLink href='/brukere' title='Brukere' pathname={router.pathname} />
          <BurgerLink href='/statistikk' title='Statistikk' pathname={router.pathname} />
          <BurgerLink href='/meg' title='Meg' pathname={router.pathname} />
          <BurgerLink href='/frivilligbasen' title='Frivilligbasen' pathname={router.pathname} />
          <BurgerLink href='/loggut' title='Logg ut' pathname={router.pathname} />
        </div>
      </div>
    </nav>
  )
}

export default Nav
