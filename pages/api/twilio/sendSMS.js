import Twilio from 'twilio'

import withSession from '../../../lib/session'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const callerId = process.env.TWILIO_CALLER_ID

async function sendSMS (request, response) {
  const user = request.session.get('user')
  if (!user) {
    response.status(401).json({ isAuthenticated: false })
  } else {
    const client = new Twilio(accountSid, authToken)
    const payload = await request.body
    const { telefonnummer, melding } = payload
    const result = await client.messages.create({
      body: melding,
      from: callerId,
      to: telefonnummer
    })
    console.log(result)
    response.json(result)
  }
}

export default withSession(sendSMS)
