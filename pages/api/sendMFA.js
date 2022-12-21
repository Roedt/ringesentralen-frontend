import axios from 'axios'
import { is401, is403, is503 } from '../../lib/utils'

const sendMFAUrl = `${process.env.API_URL}/token/sendMFA`

async function sendMFA (request, response) {
  const { enhetsid, brukernavn } = await request.body

  const payload = {
    enhetsid: enhetsid,
    brukernavn: brukernavn
  }
  try {
    await axios.post(sendMFAUrl, payload)
    response.json({})
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

export default sendMFA
