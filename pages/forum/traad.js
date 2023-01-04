import { useEffect, useState } from 'react'
import axios from 'axios'
import { is401, is403 } from '../../lib/utils'
import { router } from 'next/router'
import Editor from './editor'

const Traad = ({ traadId }) => {
  const [traad, setTraad] = useState()

  async function hentTraad () {
    try {
      const { data } = await axios.get('/api/backend/forum/traader/traad/' + traadId.underforum + '/' + traadId.tittel, { withCredentials: true })
      setTraad(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login?komFra=/forum')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (traadId) {
      hentTraad()
    }
  }, [traadId])

  const visTraad = () => {
    return (
      <>
        <li className='mb-1 py-1' key={traadId.tittel}>
          {traad && traad.innhold.innhold &&
            <Editor readOnly listener={undefined} eksisterendeInnhold={traad.innhold.innhold} />}
        </li>
        <hr />
      </>
    )
  }

  return (
    traadId
      ? visTraad()
      : <></>
  )
}

export default Traad
