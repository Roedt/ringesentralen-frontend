import withSession from '../../../lib/session'

import registrerSms from './registrerSms'
import sendSmser from './sendSmser'

async function sms (request, response) {
  const user = request.session.get('user')
  if (!user) {
    response.status(401).json({ isAuthenticated: false })
  } else {
    const payload = await request.body
    const { token, telefonnummer } = user
    const { mottakere, melding } = payload
    const frivillige = mottakere.map(mottaker => mottaker.frivilligId)
    const { smsId } = await registrerSms(token, frivillige, melding)
    const result = await sendSmser({
      smsId,
      melding,
      token,
      mottakere,
      telefonnummer
    })
    response.json(result)
  }
}

export default withSession(sms)
