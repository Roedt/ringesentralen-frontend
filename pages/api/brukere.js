import axios from 'axios'
import parseCookie from '../../lib/parse-cookie'

async function Brukere (request, response) {
  const cookie = parseCookie(request, response)
  if (!cookie) {
    response.status(401).json({ isAuthenticated: false })
  } else {
    const { token } = cookie
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    const url = `${process.env.API_URL}/brukere/brukere`
    const { data } = await axios.get(url)
    response.json(data)
  }
}

export default Brukere
