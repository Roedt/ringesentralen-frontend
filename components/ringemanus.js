import axios from 'axios'
import { useEffect, useState } from 'react'
import Handlebars from 'handlebars'

import { is404 } from '../lib/utils'
const md = require('markdown-it')()

function Ringemanus ({ manus, modus, lokalLag, navn, navnTilDenSomringes }) {
  const [html, setHtml] = useState('')
  const innhold = {
    navn,
    lokalLag,
    navnTilDenSomringes
  }

  async function hentRingeManus () {
    const manusUrl = `/ringemanus/${modus || 'velgere'}/${manus}.md`
    const fallBackUrl = `/ringemanus/${modus || 'velgere'}/fallback.md`
    try {
      const { data } = await axios.get(manusUrl)
      const templateGenerator = Handlebars.compile(data)
      const markdown = templateGenerator(innhold)
      setHtml(md.render(markdown))
    } catch (error) {
      if (is404(error)) {
        const { data } = await axios.get(fallBackUrl)
        const templateGenerator = Handlebars.compile(data)
        const markdown = templateGenerator(innhold)
        setHtml(md.render(markdown))
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
