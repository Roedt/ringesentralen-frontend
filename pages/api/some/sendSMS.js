import handleSMS from '../../../lib/sendSMS'

const callerId = process.env.TWILIO_SMS_NUMMER

function genererMelding (payload) {
  const melding = 'Du, eller noen andre, har meldt deg som aktivist i sosiale medier for Rødt. Dersom du ønsker å delta så svarer du "some" på denne meldingen. Vil du ikke bli med svarer du "fake".'
  return melding
}

async function sendSMS (payload) {
  const { telefonnummer } = payload
  const melding = genererMelding(payload)
  try {
    const result = await handleSMS(telefonnummer, melding, callerId)
    return { ...result, success: true }
  } catch (error) {
    return { success: false }
  }
}

export default sendSMS
