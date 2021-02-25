import axios from 'axios'
import { useEffect, useState } from 'react'
const md = require('markdown-it')()

function Ringemanus ({ manus }) {
  const [html, setHtml] = useState('')
  // const [visManus, setVisManus] = useState()

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
    <div className='prose lg:prose-xl' dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default Ringemanus
