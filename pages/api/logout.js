import Cookie from 'cookies'

async function login (request, response) {
  const cookies = new Cookie(request, response)
  cookies.set(process.env.COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax'
  })
  response.status(401).json({ isAuthenticated: false })
}

export default login
