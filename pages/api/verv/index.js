import registrerVerving from './registrerVerving'
import sendSMS from './sendSMS'

import fixTelefonNummer from '../../../lib/fix-telefonnummer'
import validerRecaptchaToken from './validerRecaptchaToken'

async function verifyRecaptcha (payload) {
  const recaptchaScore = await validerRecaptchaToken(payload.token)
  return recaptchaScore ? !(recaptchaScore >= 0.9) : true
}

async function verving (request, response) {
  const payload = await request.body
  payload.telefonnummer = fixTelefonNummer(payload.telefonnummer)
  const isSpam = await verifyRecaptcha(payload)

  if (!isSpam) {
    console.log('Dette er ikke spam')
    const { success } = await registrerVerving(payload)
    if (success) {
      // Sender bare sms til de som ikke er registrert fra tidligere og ved vellykkede registreringer
      await sendSMS(payload)
    }
  }

  response.json({ ...payload, success: true })
}

export default verving
