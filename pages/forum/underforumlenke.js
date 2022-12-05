import { useState } from 'react'
import Ekspanderbar from '../../components/ui/ekspanderbar'
import Underforum from './underforum'

const Underforumlenke = ({ underforum }) => {
  const tittel = underforum.id
  const [visRad, setVisRad] = useState()

  return (
    <dl className='mt-2 space-y-2 divide-y divide-gray-200'>
      <div className='pt-6'>
        <dt className='text-lg'>
          <Ekspanderbar onClick={() => setVisRad(!visRad)} erEkspandert={visRad} tittel={tittel} />
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
