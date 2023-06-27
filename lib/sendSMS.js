import Twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const token = process.env.TWILIO_AUTH_TOKEN
const fallbackCallerId = process.env.TWILIO_SMS_ID

function sendSMS (telefonnummer, melding, callerId = fallbackCallerId) {
  console.log('Klar til å sende SMS')
  const client = new Twilio(accountSid, token)
  console.log('Twilio-klient satt opp')
  return new Promise((resolve, reject) => {
    console.log('Klar til å lage melding fra ' + fallbackCallerId + ' til ' + telefonnummer)
    client.messages.create({
      body: melding,
      from: fallbackCallerId,
      to: telefonnummer
    }).then(result => {
      console.log(result)
      resolve(result)
    }).catch(error => {
      console.error(error)
      reject(error)
    })
  })
}

export default sendSMS
