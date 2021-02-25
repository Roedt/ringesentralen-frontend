import axios from 'axios'
import { useEffect, useState } from 'react'
const md = require('markdown-it')()

function Ringemanus ({ manus }) {
  const [html, setHtml] = useState('')
  const [visManus, setVisManus] = useState()

  function toggleManus () {
    setVisManus(!visManus)
  }

  async function hentRingeManus (manus) {
    const url = `/api/ringemanus?manus=${manus}`
    const { data } = await axios.get(url)
    setHtml(md.render(data))
  }

  useEffect(() => {
    if (manus) {
      hentRingeManus(manus)
    }
  }, [manus])

  if (!manus) return null

  return (
    <div className='prose lg:prose-xl'>
      <button onClick={toggleManus} className='text-left w-full flex justify-between items-start text-gray-400'>
        <span className='font-medium text-gray-900'>
          Ringemanus
        </span>
        <span className='ml-6 h-7 flex items-center'>
          <svg className={`${visManus ? 'rotate-0' : '-rotate-180'} h-6 w-6 transform`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' />
          </svg>
        </span>
      </button>
      <div className={`${visManus ? 'visible' : 'invisible'}`} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default Ringemanus
