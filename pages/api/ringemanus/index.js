import { readdirSync } from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'

async function hentRingeManus (request, response) {
  const { manus } = await request.query
  console.log('manus', manus)

  const filmappe = path.join(process.cwd(), 'pages', 'api', 'ringemanus', 'manus')
  console.log('cwd', process.cwd())
  console.log('files i process.cwd()', readdirSync(process.cwd()))
  console.log('filmappe', filmappe)
  console.log('files i filmappe', readdirSync(filmappe))
  const fallback = 'fallback.md'
  const filnavn = manus ? `${manus}.md` : fallback
  console.log('filnavn', filnavn)
  let tekst = ''
  try {
    tekst = await readFile(path.join(filmappe, filnavn), 'utf-8')
  } catch (error) {
    console.error(error)
    tekst = await readFile(path.join(filmappe, fallback), 'utf-8')
  }
  response.setHeader('Content-Type', 'text/markdown; charset=utf-8')
  response.send(tekst)
}

export default hentRingeManus
