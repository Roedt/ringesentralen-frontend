import parseCookie from '../../lib/parse-cookie'

async function AuthStatus (request, response) {
  const cookie = parseCookie(request, response)
  if (cookie) {
    return response.json({ ...cookie, isAuthenticated: true })
  } else {
    return response({ isAuthenticated: false })
  }
}

export default AuthStatus
