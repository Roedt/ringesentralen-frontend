import axios from 'axios'
import withSession from '../../lib/session'
import pkg from '../../package.json'

async function hentLodd (token, aktivtModus, aktivtLokallag, fra, til) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  const config = {
    headers: {
      'User-Agent': `Ringesentralen ${pkg.version}`
    }
  }
  const loddUrl = `${process.env.API_URL}/statistikk/lodd?fra=${fra}&til=${til}&modus=${aktivtModus}&lokallag=${aktivtLokallag}`
  try {
    const resultat = await axios.get(loddUrl, config)
    return resultat
  } catch (error) {
    console.error(error.message)
    return false
  }
}

async function lodd (request, response) {
  const session = request.session.get('user')
  const payload = await request.body
  if (!session) {
    console.log('finner ingen session, sender til innlogging fra hentNeste')
    response.status(401).json({ isAuthenticated: false })
  } else {
    const { token, aktivtModus, aktivtLokallag } = session
    const { fra, til } = payload
    const lodd = await hentLodd(token, aktivtModus, aktivtLokallag, fra, til)
    const { status, data } = lodd
    response.status(status).json(data)
  }
}

export default withSession(lodd)
