import registrerSoMeAktivist from './registrerSomeAktivist'
// import sendSMS from './sendSMS'

import fixTelefonNummer from '../../../lib/fix-telefonnummer'

async function registrering (request, response) {
  const payload = await request.body
  payload.telefonnummer = fixTelefonNummer(payload.telefonnummer)

  await registrerSoMeAktivist(payload)
  // const { success } = await registrerSoMeAktivist(payload)
  /*
  if (success) {
    // Sender bare sms til de som ikke er registrert fra tidligere og ved vellykkede registreringer
    await sendSMS(payload)
  }
  */

  response.json({ ...payload, success: true })
}

export default registrering
