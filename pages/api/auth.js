import axios from 'axios'

async function login (request, response) {
  const url = `${process.env.API_URL}/token/login`
  const { brukarnamn, passord } = await request.body
  const payload = {
    brukarnamn,
    passord,
    key: process.env.API_AUTH_KEY
  }
  try {
    const { data } = await axios.post(url, payload)
    return response.json({ accessToken: data })
  } catch (error) {
    console.error(error)
    return error
  }
}

export default login
