import axios from 'axios'
import { is401, is403, is503 } from '../../lib/utils'
import { encrypt } from '../../lib/crypto'

const sendMFAUrl = `${process.env.API_URL}/token/sendMFA`

async function sendMFA (request, response) {
  const { enhetsid, brukernavn } = await request.body
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

  const payload = {
    enhetsid: encrypt(enhetsid, ENCRYPTION_KEY),
    brukernavn: encrypt(brukernavn, ENCRYPTION_KEY)
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
