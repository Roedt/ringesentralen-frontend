import axios from 'axios'

import pkg from '../../../package.json'

import withSession from '../../../lib/session'
import { is401, is403, is503 } from '../../../lib/utils'

async function backendProxy (request, response) {
  const { query: { remote } } = request
  const method = request.method.toLowerCase()
  const payload = await request.body
  const user = request.session.get('user')

  async function kallBackend (url) {
    const config = {
      headers: {
        'User-Agent': `Ringesentralen ${pkg.version}`
      }
    }
    try {
      const { data, status } = await axios[method](url, payload, config)
      response.status(status).json(data)
    } catch (error) {
      if (is401(error)) {
        response.status(401).send(error)
      } else if (is403(error)) {
        response.status(403).send(error)
      } else if (is503(error)) {
        response.status(503).json(error)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  if (!user) {
    const godkjenteUatoriserteEndepunkt = ['ping']
    const remoteJoined = remote.join('/')
    if (godkjenteUatoriserteEndepunkt.includes(remoteJoined)) {
      await kallBackend(`${process.env.API_URL}/${remoteJoined}`)
    } else {
      console.log('Finner ingen bruker, sender til innlogging')
      response.status(401).json({ isAuthenticated: false })
    }
  } else {
    const { token, aktivtModus, aktivtLokallag } = user
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    const url = `${process.env.API_URL}/${remote.join('/')}?modus=${aktivtModus}&lokallag=${aktivtLokallag}`
    await kallBackend(url)
  }
}

export default withSession(backendProxy)
