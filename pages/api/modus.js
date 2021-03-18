import withSession from '../../lib/session'

async function settAktivtModus (request, response) {
  const { modus } = await request.query
  const session = request.session.get('user')
  if (!session) {
    console.log('Finner ingen session, sender til innlogging')
    response.status(401).json({ isAuthenticated: false })
  } else {
    const updatedSession = {
      ...session,
      aktivtModus: modus
    }
    request.session.set('user', updatedSession)
    await request.session.save()
    response.json(updatedSession)
  }
}

export default withSession(settAktivtModus)
