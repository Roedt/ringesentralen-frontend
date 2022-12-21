import axios from 'axios'
import { is401, is403, is503 } from '../../lib/utils'

const tokenUrl = `${process.env.API_URL}/token/trengerMFA`

async function trengerMFA (request, response) {
  const { enhetsid } = await request.body

  const payload = {
    enhetsid: enhetsid
  }
  try {
    const { data: trengerMFA } = await axios.post(tokenUrl, payload)
    response.json({ trengerMFA: trengerMFA })
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

export default trengerMFA
