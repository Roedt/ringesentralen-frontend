import { readFile } from 'fs/promises'
import path from 'path'

async function hentRingeManus (request, response) {
  const { manus } = await request.query
  const filmappe = path.join(process.cwd(), 'ringemanus')
  const fallback = 'fallback.md'
  const filnavn = manus ? `${manus}.md` : fallback
  let tekst = ''
  try {
    tekst = await readFile(path.join(filmappe, filnavn), 'utf-8')
  } catch (error) {
    tekst = await readFile(path.join(filmappe, fallback), 'utf-8')
  }
  response.setHeader('Content-Type', 'text/markdown; charset=utf-8')
  response.send(tekst)
}

export default hentRingeManus
