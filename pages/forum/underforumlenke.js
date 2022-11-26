import { useState } from 'react'
import Underforum from './underforum'

const Underforumlenke = ({ underforum }) => {
  const tittel = underforum.id
  const [visRad, setVisRad] = useState()

  return (
    <dl className='mt-2 space-y-2 divide-y divide-gray-200'>
      <div className='pt-6'>
        <dt className='text-lg'>
          <button type='button' onClick={() => setVisRad(!visRad)} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-0' aria-expanded='false'>
            <span className='font-big text-gray-900 underline'>
              {tittel}
            </span>
            <span className='ml-6 h-7 flex items-center'>
              <svg className={`${visRad ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
              </svg>
            </span>
          </button>
        </dt>
        <dd className={`mt-2 pr-12 ${visRad ? 'visible' : 'hidden'}`} id='faq-0'>
          <ul>
            {underforum && <Underforum key={underforum.id} underforum={underforum} visRad={visRad} />}
          </ul>
        </dd>
      </div>
    </dl>
  )
}

export default Underforumlenke
