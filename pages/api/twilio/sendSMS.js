import withSession from '../../../lib/session'
import fixTelefonNummer from '../../../lib/fix-telefonnummer'
import handleSMS from '../../../lib/sendSMS'

async function sendSMS (request, response) {
  const user = request.session.get('user')
  if (!user) {
    response.status(401).json({ isAuthenticated: false })
  } else {
    const payload = await request.body
    const { telefonnummer, melding } = payload
    try {
      const result = await handleSMS(fixTelefonNummer(telefonnummer), melding)
      response.json(result)
    } catch (error) {
      response.json({ success: false, error })
    }
  }
}

export default withSession(sendSMS)
