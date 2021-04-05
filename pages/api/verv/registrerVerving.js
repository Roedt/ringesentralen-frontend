import axios from 'axios'

import hentToken from '../../../lib/hentSystembrukerToken'

const verveUrl = `${process.env.API_URL}/verving/verv`

async function postVerving ({ token, payload }) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  try {
    const { data, status } = await axios.post(verveUrl, payload)
    return { ...data, success: status === 201 }
  } catch (error) {
    console.error(error.message)
    return false
  }
}

async function registrerVerving (payload) {
  const token = await hentToken()
  if (token) {
    const verveData = {
      fornavn: payload.fornavn,
      etternavn: payload.etternavn,
      postnummer: payload.postnummer,
      telefonnummer: payload.telefonnummer
    }
    const registrertSvar = await postVerving({ token, payload: verveData })
    if (registrertSvar) {
      const { success } = registrertSvar
      if (success) {
        console.log('vervingen er registrert')
      } else {
        console.log('den vervede var registrert fra før')
      }
      return { success }
    } else {
      console.warn('vervingen ble ikke registrert')
      return { success: false }
    }
  } else {
    console.warn('mottok ikke noe token')
    return { success: false }
  }
}

export default registrerVerving
