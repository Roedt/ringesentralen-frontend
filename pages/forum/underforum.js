import { useEffect, useState } from 'react'
import axios from 'axios'
import { router } from 'next/router'
import { is401 } from '../../lib/utils'
import Traad from './traad'
import SkrivInnlegg from './skrivInnlegg'
import Ekspanderbar from '../../components/ui/ekspanderbar'

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
        <Ekspanderbar onClick={() => setVisTraad(traad === visTraad ? undefined : traad)} erEkspandert={visTraad === traad} tittel={traad.tittel} />
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
