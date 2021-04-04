import handleSMS from '../../../lib/sendSMS'

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
