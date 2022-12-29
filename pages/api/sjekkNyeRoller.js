import withSession from '../../lib/session'

async function sjekkNyeRoller (request, response) {
  const roller = await request.body
  const session = request.session.get('user')
  if (!session) {
    console.log('Finner ingen session, sender til innlogging')
    response.status(401).json({ isAuthenticated: false })
  } else {
    const updatedSession = {
      ...session,
      rolle: roller
    }
    request.session.set('user', updatedSession)
    await request.session.save()
    response.json(updatedSession)
  }
}

export default withSession(sjekkNyeRoller)
