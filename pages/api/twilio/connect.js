const twilio = require('twilio')
const VoiceResponse = twilio.twiml.VoiceResponse

async function twilioConnectCall (request, response) {
  const payload = await request.body
  const { telefonnummer } = payload
  const twiml = new VoiceResponse()
  const dial = twiml.dial({ callerId: process.env.TWILIO_CALLER_ID })
  dial.number({}, telefonnummer)
  response.setHeader('Content-Type', 'application/xml')
  response.status(200).send(twiml.toString())
}

export default twilioConnectCall
