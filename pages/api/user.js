import axios from 'axios'
import withSession from '../../lib/session'

export default withSession(async (request, response) => {
  const user = request.session.get('user')

  if (user) {
    response.json({
      isLoggedIn: true,
      ...user
    })
  } else {
    // Vekker backend til live dersom man ikke har brukersession
    console.log('Ingen brukersesjon, la oss ruske litt i backend')
    try {
      axios.get(`${process.env.API_URL}/ping`)
    } catch (error) {
      console.warn('Fikk feil mot ping')
      console.error(error.message)
    }
    response.json({
      isLoggedIn: false
    })
  }
})
