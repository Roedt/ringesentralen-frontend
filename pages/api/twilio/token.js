import withSession from '../../../lib/session'

function twilioToken (request, response) {
  const user = request.session.get('user')
  if (!user) {
    response.status(401).json({ isAuthenticated: false })
  } else {
    const AccessToken = require('twilio').jwt.AccessToken
    const VoiceGrant = AccessToken.VoiceGrant
    // Oppsett for Twilio
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
    const twilioApiKey = process.env.TWILIO_API_KEY
    const twilioApiSecret = process.env.TWILIO_API_SECRET
    // Oppsett for denne appen
    const outgoingApplicationSid = process.env.TWILIO_TWIML_APP_SID
    const identity = process.env.TWILIO_CALLER_ID
    // Grant som setter opp voice som denne brukeren
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid,
      incomingAllow: false
    })
    // Lager tokenet som skal bruker av klienten
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      { identity }
    )
    token.addGrant(voiceGrant)
    // Serialize the token to a JWT string
    response.send(token.toJwt())
  }
}

export default withSession(twilioToken)
