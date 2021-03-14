import withSession from '../../lib/session'

export default withSession(async (request, response) => {
  request.session.destroy()
  response.json({ isLoggedIn: false })
})
