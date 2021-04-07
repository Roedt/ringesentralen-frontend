import Twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const token = process.env.TWILIO_AUTH_TOKEN

function sendSMS (telefonnummer, melding, callerId = process.env.TWILIO_SMS_ID) {
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

export default sendSMS
