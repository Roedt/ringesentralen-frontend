import axios from 'axios'

import { encrypt } from '../../../lib/crypto'

const tokenUrl = `${process.env.API_URL}/token/login`
const verveUrl = `${process.env.API_URL}/verving/verv`
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

async function hentToken () {
  const payload = {
    brukarnamn: encrypt(process.env.SERVICEBRUKER_BRUKERNAVN, ENCRYPTION_KEY),
    passord: encrypt(process.env.SERVICEBRUKER_PASSORD, ENCRYPTION_KEY),
    systembruker: true,
    key: process.env.API_AUTH_KEY
  }
  try {
    const { data } = await axios.post(tokenUrl, payload)
    return data
  } catch (error) {
    console.error(error.message)
    return false
  }
}

async function postVerving ({ token, payload }) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  try {
    const { data } = await axios.post(verveUrl, payload)
    console.log(data)
    return data
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
    const registrertSvar = await postVerving({ token, verveData })
    if (registrertSvar) {
      console.log(registrertSvar)
      console.log('vervingen er registrert')
      return { success: true }
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
