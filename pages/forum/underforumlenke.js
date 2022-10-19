import { useEffect, useState } from 'react';
import axios from 'axios';
import { is401 } from '../../lib/utils';
import { router } from 'next/router';
import Traad from './traad';
import SkrivInnlegg from './skrivInnlegg';

const Underforumlenke = ({ underforum }) => {
  const tittel = underforum.id
  const [visRad, setVisRad] = useState()
  const [traader, setTraader] = useState()

  useEffect(async () => {
    if (!visRad) {
      return
    }
    try {
      const { data } = await axios.get('/api/backend/forum/traader/' + underforum.id, { withCredentials: true })
      setTraader(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }, [visRad])

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
            {traader && traader.map((traad) => <Traad key={traad.id} traadId={traad} />)}
          </ul>
          <SkrivInnlegg underforum={underforum.id} />
        </dd>
      </div>
    </dl>
  )
}

export default Underforumlenke
