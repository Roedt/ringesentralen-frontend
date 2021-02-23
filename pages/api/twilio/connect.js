import twilio from 'twilio'
import fixTelefonNummer from '../../../lib/fix-telefonnummer'
const VoiceResponse = twilio.twiml.VoiceResponse

const erUtGaaende = caller => /client/.test(caller)

async function twilioConnectCall (request, response) {
  const payload = await request.body
  const { telefonnummer, Caller } = payload
  const twiml = new VoiceResponse()
  const dial = twiml.dial({ callerId: process.env.TWILIO_CALLER_ID })
  if (erUtGaaende(Caller)) {
    // Telefoner fra Ringesentralen over VoIP
    dial.number({}, fixTelefonNummer(telefonnummer))
  } else {
    // Telefoner sok ringer tilbake og skal redirectes til et av våre nummere
    dial.number({}, process.env.TWILIO_INCOMING_HANDLER)
  }
  response.setHeader('Content-Type', 'application/xml')
  response.status(200).send(twiml.toString())
}

export default twilioConnectCall
