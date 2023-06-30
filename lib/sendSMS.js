// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const token = process.env.TWILIO_AUTH_TOKEN
import axios from 'axios'
import pkg from '../package.json'

const fallbackCallerId = process.env.TWILIO_SMS_ID

async function sendSMS (token, telefonnummer, melding, callerId = fallbackCallerId) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  const url = `${process.env.API_URL}/smsutsending/send`
  const config = {
    headers: {
      'User-Agent': `Ringesentralen ${pkg.version}`
    }
  }
  const payload = {
    fra: callerId,
    til: telefonnummer,
    melding: melding
  }
  try {
    await axios.post(url, payload, config)
    console.log(`sms sendt`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export default sendSMS
