import Cookie from 'cookies'

async function AuthStatus (request, response) {
  const cookies = new Cookie(request, response)
  const data = cookies.get('ringesentralen')
  const cookie = JSON.parse(data)
  return response.json(cookie)
}

export default AuthStatus
