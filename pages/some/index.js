import Confetti from 'react-confetti'
import { useState } from 'react'
import Head from 'next/head'

import Kvittering from './kvittering'
import Skjema from './skjema'
import FellesskapFungererNo from './fellesskap'

function SoMeSkjema () {
  const [success, setSuccess] = useState()

  return (
    <>
      <Head>
        <title>Bli med som SoMe aktivist</title>
      </Head>
      <div className='relative bg-white'>
        {success && <Confetti />}
        <div className='absolute inset-0'>
          <div className='absolute inset-y-0 left-0 w-1/2 bg-roedt' />
        </div>
        <div className='relative max-w-7xl mx-auto lg:grid lg:grid-cols-5'>
          <header className='bg-roedt py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12'>
            <div className='max-w-lg mx-auto'>
              <h1 className='text-2xl font-extrabold tracking-tight text-white sm:text-3xl'>
                Bli aktivist i sosiale medier
              </h1>
              <p className='mt-3 text-lg leading-6 text-white'>
                Vil du hjelpe oss og spre et godt politisk budskap i sosiale medier frem mot valget?
              </p>
              <p className='mt-3 text-lg leading-6 text-white'>
                Fyll ut skjemaet så sender vi deg sms når vi trenger ekstra hjelp til å dele.
              </p>
            </div>
          </header>
          <div className='bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12'>
            <div className='max-w-lg mx-auto lg:max-w-none'>
              <main>
                {!success && <FellesskapFungererNo />}
                {success ? <Kvittering /> : <Skjema setSuccess={setSuccess} />}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SoMeSkjema
