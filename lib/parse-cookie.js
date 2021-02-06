import Cookie from 'cookies'

function isValid ({ token, expires }) {
  return token && expires > new Date().getTime()
}

function parseCookie (request, response) {
  const cookies = new Cookie(request, response)
  const data = cookies.get('ringesentralen')
  const cookie = data ? JSON.parse(data) : false
  return isValid(cookie) ? cookie : false
}

export default parseCookie
