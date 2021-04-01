import Twilio from 'twilio'

import withSession from '../../../lib/session'
import fixTelefonNummer from '../../../lib/fix-telefonnummer'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const token = process.env.TWILIO_AUTH_TOKEN
const callerId = process.env.TWILIO_SMS_ID

function handleSMS (telefonnummer, melding) {
  const client = new Twilio(accountSid, token)
  return new Promise((resolve, reject) => {
    client.messages.create({
      body: melding,
      from: callerId,
      to: fixTelefonNummer(telefonnummer)
    }).then(result => {
      resolve(result)
    }).catch(error => {
      console.error(error)
      reject(error)
    })
  })
}

async function sendSMS (request, response) {
  const user = request.session.get('user')
  if (!user) {
    response.status(401).json({ isAuthenticated: false })
  } else {
    const payload = await request.body
    const { telefonnummer, melding } = payload
    try {
      const result = await handleSMS(telefonnummer, melding)
      response.json(result)
    } catch (error) {
      response.json({ success: false, error })
    }
  }
}

export default withSession(sendSMS)
