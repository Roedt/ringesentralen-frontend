import twilio from 'twilio'

const VoiceResponse = twilio.twiml.VoiceResponse

async function twilioCollectCall (request, response) {
  const payload = await request.body
  const { Digits } = payload
  let melding = 'Vi mottok ikke noe svar, men det er helt greit. Godt valg! '
  if (Digits === '1') {
    melding = 'Vi ringer deg tilbake når vi er tilbake på sentralen. Godt valg! '
  }
  if (Digits === '2') {
    melding = 'Da skal vi la være å ringe deg tilbake. Godt valg! '
  }
  const twiml = new VoiceResponse()
  twiml.say({
    voice: 'Polly.Liv',
    language: 'nb-NO'
  }, melding)
  response.setHeader('Content-Type', 'application/xml')
  response.status(200).send(twiml.toString())
}

export default twilioCollectCall
