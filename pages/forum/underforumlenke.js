import { useState } from 'react'
import Ekspanderbar from '../../components/ui/ekspanderbar'
import Underforum from './underforum'

const Underforumlenke = ({ underforum }) => {
  const [visRad, setVisRad] = useState()

  const visUnderforumlenke = () => {
    return (
      <dl className='mt-2 space-y-2 divide-y divide-gray-200'>
        <div className='pt-6'>
          <dt className='text-lg'>
            <Ekspanderbar onClick={() => setVisRad(!visRad)} erEkspandert={visRad} tittel={underforum.id} />
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

  return (
    !underforum
      ? <></>
      : visUnderforumlenke()
  )
}

export default Underforumlenke
