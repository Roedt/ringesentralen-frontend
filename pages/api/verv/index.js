import registrerVerving from './registrerVerving'
import sendSMS from './sendSMS'

import fixTelefonNummer from '../../../lib/fix-telefonnummer'

function isSpam (payload) {
  return payload.epost.length > 0
}

async function verving (request, response) {
  const payload = await request.body
  console.log(JSON.stringify(payload, null, 2))
  payload.telefonnummer = fixTelefonNummer(payload.telefonnummer)
  payload.epost = '12534343'
  console.log(JSON.stringify(payload, null, 2))

  if (!isSpam(payload)) {
    const { success } = await registrerVerving(payload)
    if (success) {
      // Sender bare sms til de som ikke er registrert fra tidligere og ved vellykkede registreringer
      await sendSMS(payload)
    }
  }

  response.json({ ...payload, success: true })
}

export default verving
