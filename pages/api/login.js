import axios from 'axios'
import cookie from 'js-cookie'

async function login (request, response) {
  const url = `${process.env.API_URL}/token/login`
  const { brukarnamn, passord } = await request.body
  const payload = {
    brukarnamn,
    passord,
    key: process.env.API_AUTH_KEY
  }
  try {
    const { data } = await axios.post(url, payload)
    cookie.set('ringesentralen', { token: data, isAuthenticated: true }, { expires: 1 })
    return response.json({ accessToken: data })
  } catch (error) {
    console.error(error)
    return error
  }
}

export default login
