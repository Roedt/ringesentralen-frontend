import sendSms from './sendSms'

async function sendSmser ({ token, smsId, mottakere, melding, avsender }) {
  if (!smsId) {
    console.error('Mangler smsId. Avbryter')
    return { success: false }
  }
  const meldinger = mottakere.map(({ telefonnummer, frivilligId }) => Object.assign({}, { telefonnummer, frivilligId, smsId, token, melding, avsender }))
  console.log(`Klar til å sende ${meldinger.length} smser`)
  while (meldinger.length > 0) {
    const melding = meldinger.pop()
    await sendSms(melding)
  }
  return { success: true }
}

export default sendSmser
