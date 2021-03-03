import axios from 'axios'
import parseCookie from '../../../lib/parse-cookie'
import { is401, is403, is503 } from '../../../lib/utils'

async function backendProxy (request, response) {
  const { query: { remote } } = request
  const method = request.method.toLowerCase()
  const payload = await request.body
  const cookie = parseCookie(request, response)
  if (!cookie) {
    response.status(401).json({ isAuthenticated: false })
  } else {
    const { token } = cookie
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    const url = `${process.env.API_URL}/${remote.join('/')}`
    try {
      const { data, status } = await axios[method](url, payload)
      response.status(status).json(data)
    } catch (error) {
      if (is401) {
        response.status(401).send(error)
      } else if (is403) {
        response.status(403).send(error)
      } else if (is503) {   
        response.status(503).json(error)
      } else {
        console.error(error)
        throw error
      }
    }
  }
}

export default backendProxy
