import axios from 'axios'

import { encrypt } from './crypto'

const tokenUrl = `${process.env.API_URL}/token/login`
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

async function hentSystembrukerToken () {
  try {
    const payload = {
      brukarnamn: encrypt(process.env.SERVICEBRUKER_BRUKERNAVN, ENCRYPTION_KEY),
      passord: encrypt(process.env.SERVICEBRUKER_PASSORD, ENCRYPTION_KEY),
      systembruker: true,
      key: process.env.API_AUTH_KEY,
      enhetsid: encrypt('systembruker', ENCRYPTION_KEY)
    }
    const { data } = await axios.post(tokenUrl, payload)
    return data
  } catch (error) {
    console.error(error.message)
    return false
  }
}

export default hentSystembrukerToken
