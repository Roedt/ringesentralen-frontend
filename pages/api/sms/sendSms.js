import fixTelefonNummer from '../../../lib/fix-telefonnummer'
import handleSMS from '../../../lib/sendSMS'
import oppdaterSms from './oppdaterSms'

async function sendSms ({ smsId, telefonnummer, melding, token }) {
  try {
    const result = await handleSMS(fixTelefonNummer(telefonnummer), melding)
    await oppdaterSms({
      token,
      smsId,
      telefonnummer,
      status: 'Sendt'
    })
    return result
  } catch (error) {
    console.error(error)
    await oppdaterSms({
      token,
      smsId,
      telefonnummer,
      status: 'Feilet'
    })
    return ({ success: false })
  }
}

export default sendSms
