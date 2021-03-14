import axios from 'axios'

import withSession from '../../lib/session'
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

    const user = {
      token,
      expires: new Date().getTime() + 36000000,
      isAuthenticated: true
    }
    console.log('Hentet bruker, alt er oki')
    request.session.set('user', user)
    await request.session.save()
    response.json(user)
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

export default withSession(login)
