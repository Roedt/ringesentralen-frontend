import Twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const token = process.env.TWILIO_AUTH_TOKEN
const callerId = process.env.TWILIO_SMS_ID

function handleSMS (telefonnummer, melding) {
  const client = new Twilio(accountSid, token)
  return new Promise((resolve, reject) => {
    client.messages.create({
      body: melding,
      from: callerId,
      to: telefonnummer
    }).then(result => {
      resolve(result)
    }).catch(error => {
      console.error(error)
      reject(error)
    })
  })
}

function genererMelding (payload) {
  const { ververMegSelv, ververensNavn } = payload
  const melding = `${ververMegSelv ? 'Du, eller noen andre,' : ververensNavn} har vervet deg til Rødts ringesentral. Dersom du ønsker at noen av Rødts medlemmer skal ringe deg så svarer du "ja" på denne meldingen. Vil du ikke bli ringt svarer du "nei".`
  return melding
}

async function sendSMS (payload) {
  const { telefonnummer } = payload
  const melding = genererMelding(payload)
  try {
    const result = await handleSMS(telefonnummer, melding)
    return { ...result, success: true }
  } catch (error) {
    return { success: false }
  }
}

export default sendSMS
