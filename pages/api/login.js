import axios from 'axios'
import Cookie from 'cookies'
import { encrypt } from '../../lib/crypto'
import { is401, is403, is503 } from '../../lib/utils'

async function login (request, response) {
  const url = `${process.env.API_URL}/token/login`
  const { brukarnamn, passord } = await request.body
  const payload = {
    brukarnamn,
    passord,
    key: process.env.API_AUTH_KEY
  }
  try {
    const { data: token } = await axios.post(url, payload)
    const cookie = {
      token,
      expires: new Date().getTime() + 36000000
    }
    const cookies = new Cookie(request, response)
    cookies.set(process.env.COOKIE_NAME, encrypt(cookie), {
      httpOnly: true,
      sameSite: 'lax'
    })
    return response.json(cookie)
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

export default login
