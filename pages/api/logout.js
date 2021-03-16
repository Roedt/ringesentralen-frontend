import withSession from '../../lib/session'

export default withSession(async (request, response) => {
  await request.session.destroy()
  response.status(401).json({ isLoggedIn: false })
})
