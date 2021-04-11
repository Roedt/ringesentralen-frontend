import registrerVerving from './registrerVerving'
import sendSMS from './sendSMS'

import fixTelefonNummer from '../../../lib/fix-telefonnummer'
import validerRecaptchaToken from './validerRecaptchaToken'

async function verifyRecaptcha (payload) {
  const recaptchaScore = await validerRecaptchaToken(payload.token)
  console.log(recaptchaScore)
  return recaptchaScore ? recaptchaScore > 10 : false
}

async function verving (request, response) {
  const payload = await request.body
  console.log(JSON.stringify(payload, null, 2))
  payload.telefonnummer = fixTelefonNummer(payload.telefonnummer)
  console.log(JSON.stringify(payload, null, 2))
  const isSpam = await verifyRecaptcha(payload)

  if (!isSpam) {
    const { success } = await registrerVerving(payload)
    if (success) {
      // Sender bare sms til de som ikke er registrert fra tidligere og ved vellykkede registreringer
      await sendSMS(payload)
    }
  }

  response.json({ ...payload, success: true })
}

export default verving
