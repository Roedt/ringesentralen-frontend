import sendSms from './sendSms'

async function sendSmser ({ token, smsId, mottakere, melding }) {
  if (!smsId) {
    console.error('Mangler smsId. Avbryter')
    return { success: false }
  }
  const meldinger = mottakere.map(telefonnummer => Object.assign({}, { telefonnummer, smsId, token, melding }))
  console.log(`Klar til å sende ${meldinger.length} smser`)
  while (meldinger.length > 0) {
    const melding = meldinger.pop()
    await sendSms(melding)
  }
  return { success: true }
}

export default sendSmser
