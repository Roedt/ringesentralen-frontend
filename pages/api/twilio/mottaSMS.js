import axios from 'axios'

import hentToken from '../../../lib/hentSystembrukerToken'

const svarUrl = `${process.env.API_URL}/verving/svar`

const svarerJa = melding => /ja/i.test(melding.toLowerCase())
const svarerNei = melding => /nei/i.test(melding.toLowerCase())

async function postVerveSvar ({ token, payload }) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  try {
    const { data } = await axios.post(svarUrl, payload)
    return { ...data, success: true }
  } catch (error) {
    console.error(error.message)
    return false
  }
}

async function mottaSMS (request, response) {
  const payload = await request.body
  const { From, Body } = payload
  if (svarerJa(Body) || svarerNei(Body)) {
    const token = await hentToken()
    if (token) {
      const resultat = {
        svar: svarerJa(Body),
        telefonnummer: From
      }
      const registrertSvar = await postVerveSvar({ token, payload: resultat })
      if (registrertSvar) {
        const { success } = registrertSvar
        if (success) {
          console.log('svaret er registrert')
        } else {
          console.log('noe feilet og svaret ble ikke registrert')
        }
      } else {
        console.warn('svaret ble ikke registrert')
      }
    } else {
      console.warn('mottok ikke noe token')
    }
  } else {
    console.warn('klarte ikke tolke svaret')
  }
  response.json({ success: true })
}

export default mottaSMS
