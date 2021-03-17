import axios from 'axios'

import withSession from '../../../lib/session'
import { is401, is403, is503 } from '../../../lib/utils'

async function backendProxy (request, response) {
  const { query: { remote } } = request
  const method = request.method.toLowerCase()
  const payload = await request.body
  const user = request.session.get('user')
  if (!user) {
    console.log('Finner ingen bruker, sender til innlogging')
    response.status(401).json({ isAuthenticated: false })
  } else {
    const { token } = user
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    const url = `${process.env.API_URL}/${remote.join('/')}`
    try {
      const { data, status } = await axios[method](url, payload)
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
}

export default withSession(backendProxy)
