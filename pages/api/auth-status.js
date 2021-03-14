import withSession from '../../lib/session'

async function AuthStatus (request, response) {
  const user = request.session.get('user')
  if (user) {
    return response.json({ ...user, isAuthenticated: true })
  } else {
    return response({ isAuthenticated: false })
  }
}

export default withSession(AuthStatus)
