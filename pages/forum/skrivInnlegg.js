import Editor from './editor';
import Button from '../../components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { is401, is403 } from '../../lib/utils';
import { router } from 'next/router';

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

  const startNyTraadTittel = () => {
     return (
          <button type='button' onClick={() => setVisStartNyTraad(!visStartNyTraad)} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-0' aria-expanded='false'>
            <span className='font-medium text-gray-900 underline'>
              Start en ny tråd
            </span>
              <span className='ml-6 h-7 flex items-center'>
              <svg className={`${visStartNyTraad ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
              </svg>
            </span>
          </button>
      )
  }

  return (
    <div>
      <hr />
      <br />
      {startNyTraadTittel()}
      <dd className={`mt-2 pr-12 ${visStartNyTraad ? 'visible' : 'hidden'}`}>
        <input id='innlegg-tittel' type='text' className='block w-full' placeholder='Tittel' value={tittel} onChange={event => setTittel(event.target.value)} />
        <Editor listener={onChange} />
        <Button type='button' onClick={publiser}>Publiser</Button>
      </dd>
    </div>
  )
}

export default SkrivInnlegg
