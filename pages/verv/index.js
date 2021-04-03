import Confetti from 'react-confetti'
import { useState } from 'react'

import Kvittering from './kvittering'
import Skjema from './skjema'

function Verving () {
  const [success, setSuccess] = useState()

  return (
    <div className='relative bg-white'>
      {success && <Confetti />}
      <div className='absolute inset-0'>
        <div className='absolute inset-y-0 left-0 w-1/2 roedt' />
      </div>
      <div className='relative max-w-7xl mx-auto lg:grid lg:grid-cols-5'>
        <div className='roedt py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12'>
          <div className='max-w-lg mx-auto'>
            <h2 className='text-2xl font-extrabold tracking-tight text-white sm:text-3xl'>
              Verv en venn
            </h2>
            <p className='mt-3 text-lg leading-6 text-white'>
              Har du en god venn vi bør ringe, eller vil du at vi skal ringe deg?
            </p>
            <p className='mt-3 text-lg leading-6 text-white'>
              Fyll ut skjemaet så tar en av våre medlemmer kontakt.
            </p>
            <p className='mt-6 text-lg text-white'>
              Vil du bidra til tidenes valgkamp for Rødt? <a href='https://www.fellesskapfungerer.no/' className='text-white underline'>Les mer på fellesskapfungerer.no</a>.
            </p>
          </div>
        </div>
        <div className='bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12'>
          <div className='max-w-lg mx-auto lg:max-w-none'>
            {success ? <Kvittering /> : <Skjema setSuccess={setSuccess} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verving
