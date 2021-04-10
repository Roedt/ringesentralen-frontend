import twilio from 'twilio'

import svarerAlternativer from './telefonsvarer-alternativer'
import registrerSvar from './registrerSvar'

const VoiceResponse = twilio.twiml.VoiceResponse

async function twilioCollectCall (request, response) {
  const payload = await request.body
  const { Digits, From } = payload
  let melding = 'Vi mottok ikke noe svar vi forstod, men det er helt greit. Godt valg! '
  let success = false
  if (Digits === '1') {
    melding = svarerAlternativer.ja
    success = true
  }
  if (Digits === '2') {
    melding = svarerAlternativer.nei
    success = true
  }
  const twiml = new VoiceResponse()
  if (success) {
    await registrerSvar({ telefonnummer: From, digits: Digits })
    twiml.play({
      loop: 1
    }, melding)
  } else {
    twiml.say({
      voice: 'Polly.Liv',
      language: 'nb-NO'
    }, melding)
  }
  response.setHeader('Content-Type', 'application/xml')
  response.status(200).send(twiml.toString())
}

export default twilioCollectCall
