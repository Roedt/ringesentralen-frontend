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
  } else {
    // Telefoner som ringer tilbake skal treffe telefonsvareren vår
    // Først setter vi opp tastefunksjonen som tar imot input fra tastene
    // Den timer ut etter 5 sekunder og er ferdig etter at ett tall er mottatt
    const gather = twiml.gather({
      input: 'dtmf',
      timeout: 5,
      numDigits: 1,
      action: '/api/twilio/collect'
    })
    // Så setter vi opp stemmen som skal leses opp først
    gather.say({
      voice: 'Polly.Liv',
      language: 'nb-NO'
    }, 'Velkommen til Rødts ringesentral. Tast een om du vil at vi skal ringe deg tilbake senere. Tast too om du ikke ønsker å bli ringt igjen')
    // Dersom innsamling av data timer ut sendes data videre likevel
    twiml.redirect('/api/twilio/collect')
    // Dette er den gamle koden for å redirecte til et annet telefonnummer
    // twiml.dial(process.env.TWILIO_INCOMING_HANDLER)
  }
  response.setHeader('Content-Type', 'application/xml')
  response.status(200).send(twiml.toString())
}

export default twilioConnectCall
