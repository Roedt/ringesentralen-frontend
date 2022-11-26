import Editor from './editor'
import Button from '../../components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import { is401, is403 } from '../../lib/utils'
import { router } from 'next/router'
import Ekspanderbar from '../../components/ui/ekspanderbar'

const SkrivInnlegg = ({ underforum }) => {
  const [node, setNode] = useState()
  const [tittel, setTittel] = useState()
  const [visStartNyTraad, setVisStartNyTraad] = useState()

  const onChange = (editorState) => {
    setNode(editorState.toJSON())
  }

  const publiser = async () => {
    try {
      await axios.post('/api/backend/forum/traader/traad/' + underforum + '/' + tittel, node, { withCredentials: true })
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

  return (
    <div>
      <hr />
      <br />
      <Ekspanderbar onClick={() => setVisStartNyTraad(!visStartNyTraad)} erEkspandert={visStartNyTraad} tittel={'Start en ny tråd'} />
      <dd className={`mt-2 pr-12 ${visStartNyTraad ? 'visible' : 'hidden'}`}>
        <input id='innlegg-tittel' type='text' className='block w-full' placeholder='Tittel' value={tittel} onChange={event => setTittel(event.target.value)} />
        <Editor listener={onChange} />
        <Button type='button' onClick={publiser}>Publiser</Button>
      </dd>
    </div>
  )
}

export default SkrivInnlegg
