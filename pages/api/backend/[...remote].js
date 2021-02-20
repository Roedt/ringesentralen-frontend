import axios from 'axios'
import parseCookie from '../../../lib/parse-cookie'

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
    const { data, status } = await axios[method](url, payload)
    response.status(status).json(data)
  }
}

export default backendProxy
