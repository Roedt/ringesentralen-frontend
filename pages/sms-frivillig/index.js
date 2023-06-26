import Confetti from 'react-confetti'
import { useState } from 'react'
import Head from 'next/head'

import SMSKvittering from './kvittering'

function SMSFrivillig () {
  const [success, setSuccess] = useState()

  return (
    <>
      <Head>
        <title>Meld deg som SMS-frivillig for Rødt</title>
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
                Bli SMS-frivillig
              </h1>
              <p className='mt-3 text-lg leading-6 text-white'>
                Har du lyst til å bli SMS-frivillig for Rødt?
              </p>
              <p className='mt-3 text-lg leading-6 text-white'>
                Fyll ut skjemaet, så blir du det!
              </p>
              <p className='mt-6 text-lg text-white'>
                Vil du bidra til tidenes valgkamp for Rødt? <a href='https://www.rødt.no/bidra' className='text-white underline'>Les mer på rødt.no/bidra</a>.
              </p>
            </div>
          </header>
          <div className='bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12'>
            <div className='max-w-lg mx-auto lg:max-w-none'>
              <main>
                {success ? <SMSKvittering /> : <SMSSkjema setSuccess={setSuccess} />}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SMSFrivillig
