import Twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const token = process.env.TWILIO_AUTH_TOKEN
const fallbackCallerId = process.env.TWILIO_SMS_ID

function sendSMS (telefonnummer, melding, callerId = fallbackCallerId) {
  const client = new Twilio(accountSid, token)
  return new Promise((resolve, reject) => {
    client.messages.create({
      body: melding,
      from: fallbackCallerId,
      to: telefonnummer
    }).then(result => {
      resolve(result)
    }).catch(error => {
      console.error(error)
      reject(error)
    })
  })
}

export default sendSMS
