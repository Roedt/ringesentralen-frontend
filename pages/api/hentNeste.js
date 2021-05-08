import axios from 'axios'
import NodeCache from 'node-cache'
import withSession from '../../lib/session'
import pkg from '../../package.json'

const cache = new NodeCache({ stdTTL: 3600 })

async function hentNestePerson (token, aktivtModus, aktivtLokallag) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  const config = {
    headers: {
      'User-Agent': `Ringesentralen ${pkg.version}`
    }
  }
  const nesteUrl = `${process.env.API_URL}/samtale/neste?modus=${aktivtModus}&lokallag=${aktivtLokallag}`
  try {
    const resultat = await axios.get(nesteUrl, config)
    return resultat
  } catch (error) {
    console.error(error.message)
    return false
  }
}

function isValid (data) {
  const id = data?.person?.id
  if (!id) return true
  const cached = cache.get(id)
  if (!cached) {
    cache.set(id)
    return true
  } else {
    console.warn('Fikk treff på neste samtale i cache')
    return false
  }
}

async function hentNeste (request, response) {
  const session = request.session.get('user')
  if (!session) {
    console.log('Finner ingen session, sender til innlogging fra hentNeste')
    response.status(401).json({ isAuthenticated: false })
  } else {
    const { token, aktivtModus, aktivtLokallag } = session
    let neste = await hentNestePerson(token, aktivtModus, aktivtLokallag)
    while (neste && !isValid(neste.data)) {
      console.log('hentNeste: neste var allerede i cache')
      neste = await hentNestePerson(token, aktivtModus, aktivtLokallag)
    }
    const { status, data } = neste
    response.status(status).json(data)
  }
}

export default withSession(hentNeste)
