import axios from 'axios'
import { useEffect, useState } from 'react'
import { is404 } from '../lib/utils'
const md = require('markdown-it')()

function Ringemanus ({ manus, modus, isOpen }) {
  const [html, setHtml] = useState('')

  async function hentRingeManus () {
    const manusUrl = `/ringemanus/${modus || 'velgere'}/${manus}.md`
    const fallBackUrl = `/ringemanus/${modus || 'velgere'}/fallback.md`
    try {
      const { data } = await axios.get(manusUrl)
      setHtml(md.render(data))
    } catch (error) {
      if (is404(error)) {
        const { data } = await axios.get(fallBackUrl)
        setHtml(md.render(data))
      }
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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default Ringemanus
