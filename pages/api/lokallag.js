import withSession from '../../lib/session'

async function settAktivtLokallag (request, response) {
  const { lokallag } = await request.body
  const session = request.session.get('user')
  if (!session) {
    console.log('Finner ingen session, sender til innlogging')
    response.status(401).json({ isAuthenticated: false })
  } else {
    const updatedSession = {
      ...session,
      aktivtLokallag: lokallag
    }
    request.session.set('user', updatedSession)
    await request.session.save()
    response.json(updatedSession)
  }
}

export default withSession(settAktivtLokallag)
