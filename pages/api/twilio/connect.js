const twilio = require('twilio')
const VoiceResponse = twilio.twiml.VoiceResponse

async function twilioConnectCall (request, response) {
  const payload = await request.body
  const { Caller, To } = payload
  const twiml = new VoiceResponse()
  const dial = twiml.dial({ callerId: Caller })
  dial.number({}, To)
  response.send(twiml.toString())
}

export default twilioConnectCall
