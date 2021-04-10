import twilio from 'twilio'

import svarerAlternativer from './telefonsvarer-alternativer'
import registrerSvar from './registrerSvar'

const VoiceResponse = twilio.twiml.VoiceResponse

async function twilioCollectCall (request, response) {
  const payload = await request.body
  const { Digits, From } = payload
  let melding = ''
  if (Digits === '1') {
    melding = svarerAlternativer.ja
  }
  if (Digits === '2') {
    melding = svarerAlternativer.nei
  }
  await registrerSvar({ telefonnummer: From, digits: Digits })
  const twiml = new VoiceResponse()
  twiml.play({
    loop: 1
  }, melding)
  response.setHeader('Content-Type', 'application/xml')
  response.status(200).send(twiml.toString())
}

export default twilioCollectCall
