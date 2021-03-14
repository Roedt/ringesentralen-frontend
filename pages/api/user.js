import withSession from '../../lib/session'

export default withSession(async (request, response) => {
  const user = request.session.get('user')

  if (user) {
    response.json({
      isLoggedIn: true,
      ...user
    })
  } else {
    response.json({
      isLoggedIn: false
    })
  }
})
