import axios from 'axios'

import withSession from '../../lib/session'
import { is401, is403, is503 } from '../../lib/utils'

async function login (request, response) {
  const tokenUrl = `${process.env.API_URL}/token/login`
  const profilUrl = `${process.env.API_URL}/profil`
  const { brukarnamn, passord } = await request.body
  const payload = {
    brukarnamn,
    passord,
    key: process.env.API_AUTH_KEY
  }
  try {
    const { data: token } = await axios.post(tokenUrl, payload)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    const { data: profil } = await axios.get(profilUrl)
    const { email, rolle, fylke, lokallag } = profil

    const user = {
      email,
      rolle,
      fylke,
      lokallag,
      token,
      expires: new Date().getTime() + 36000000,
      aktivtModus: 'medlem',
      isAuthenticated: true
    }
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
