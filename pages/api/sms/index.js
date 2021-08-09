import withSession from '../../../lib/session'

import registrerSms from './registrerSms'
import sendSmser from './sendSmser'

async function sms (request, response) {
  const user = request.session.get('user')
  if (!user) {
    response.status(401).json({ isAuthenticated: false })
  } else {
    const payload = await request.body
    const { token } = user
    const { mottakere, melding } = payload
    const { smsId } = await registrerSms(token, mottakere, melding)
    const result = await sendSmser({
      smsId,
      melding,
      token,
      mottakere
    })
    response.json(result)
  }
}

export default withSession(sms)
