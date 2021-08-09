import fixTelefonNummer from '../../../lib/fix-telefonnummer'
import handleSMS from '../../../lib/sendSMS'
import oppdaterSms from './oppdaterSms'

async function sendSms ({ smsId, telefonnummer, frivilligId, melding, token }) {
  try {
    const result = await handleSMS(fixTelefonNummer(telefonnummer), melding)
    await oppdaterSms({
      token,
      smsId,
      frivilligId,
      status: 'Sendt'
    })
    return result
  } catch (error) {
    console.error(error)
    await oppdaterSms({
      token,
      smsId,
      frivilligId,
      status: 'Feilet'
    })
    return ({ success: false })
  }
}

export default sendSms
