import axios from 'axios'
import { useEffect, useState } from 'react'
const md = require('markdown-it')()

function Ringemanus ({ manus, modus, isOpen }) {
  const [html, setHtml] = useState('')
  const [visManus, setVisManus] = useState(isOpen)

  function toggleManus () {
    setVisManus(!visManus)
  }

  async function hentRingeManus () {
    const manusUrl = `/ringemanus/${modus || 'velgere'}/{manus}.md`
    const fallBackUrl = `/ringemanus/${modus || 'velgere'}/fallback.md`
    try {
      const { data } = await axios.get(manusUrl)
      setHtml(md.render(data))
    } catch (error) {
      const { data } = await axios.get(fallBackUrl)
      setHtml(md.render(data))
    }
  }

  useEffect(() => {
    if (manus && modus) {
      hentRingeManus()
    }
  }, [manus, modus])

  if (!manus || !modus) return null

  return (
    <div className='prose lg:prose-xl'>
      <button onClick={toggleManus} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className={`${visManus ? '-rotate-180' : 'rotate-0'} -ml-1 mr-2 h-5 w-5 text-gray-400 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' />
        </svg>
        <span>
          {visManus ? 'Skjul' : 'Vis'} ringemanus
        </span>
      </button>
      <div className={`${visManus ? 'visible' : 'invisible'}`} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default Ringemanus
