import { useEffect, useState } from 'react'
import axios from 'axios'
import { router } from 'next/router'
import { is401 } from '../../lib/utils'
import Traad from './traad'
import SkrivInnlegg from './skrivInnlegg'
import Button from '../../components/ui/button'

const Underforum = ({ underforum, visRad }) => {
  const [traader, setTraader] = useState()
  const [visTraad, setVisTraad] = useState()

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

  const traadTittel = (traad) => {
    return (
      <div>
        <button
          type='button' onClick={() => {
            setVisTraad(traad === visTraad ? undefined : traad)
          }}
          className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-0' aria-expanded='false'
        >
          <span className='font-big text-gray-900 underline'>
            {traad.tittel}
          </span>
          <span className='ml-6 h-7 flex items-center'>
            <svg className={`${visTraad === traad ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
            </svg>
          </span>
        </button>
        {visTraad === traad && <Traad key={traad.id} traadId={traad} />}
      </div>
    )
  }
  return (
    <div className='pt-6'>
      <ul>
        {traader && traader.map(traadTittel)}
      </ul>
      <SkrivInnlegg key={'skrivInnlegg' + underforum.id} underforum={underforum.id} />
    </div>
  )
}

export default Underforum
