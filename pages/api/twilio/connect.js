import twilio from 'twilio'

import fixTelefonNummer from '../../../lib/fix-telefonnummer'

const VoiceResponse = twilio.twiml.VoiceResponse

const erUtGaaende = caller => /client/.test(caller)

async function twilioConnectCall (request, response) {
  const payload = await request.body
  const { telefonnummer, Caller } = payload
  const twiml = new VoiceResponse()
  if (erUtGaaende(Caller)) {
    // Telefoner fra Ringesentralen over VoIP
    const dial = twiml.dial({ callerId: process.env.TWILIO_CALLER_ID })
    dial.number({}, fixTelefonNummer(telefonnummer))
  }
  response.setHeader('Content-Type', 'application/xml')
  response.status(200).send(twiml.toString())
}

export default twilioConnectCall
