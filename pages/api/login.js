import axios from 'axios'
import Cookie from 'cookies'

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
    const cookies = new Cookie(request, response)
    cookies.set()
    cookies.set('ringesentralen', data, {
      httpOnly: true,
      sameSite: 'lax'
    })
    return response.json({ accessToken: data })
  } catch (error) {
    console.error(error)
    return error
  }
}

export default login
