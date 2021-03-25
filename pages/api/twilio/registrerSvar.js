import axios from 'axios'

import { encrypt } from '../../../lib/crypto'

const tokenUrl = `${process.env.API_URL}/token/login`
const svarUrl = `${process.env.API_URL}/telefonsvar`
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

function hentSvarAlternativ (digits) {
  let svar = 'ugyldigSvar'
  if (!digits) {
    svar = 'svarteIkke'
  } else if (digits === '1') {
    svar = 'ringTilbake'
  } else if (digits === '2') {
    svar = 'ikkeRingIgjen'
  }
  return svar
}

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

async function postSvar ({ token, payload }) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  try {
    const { data } = await axios.post(svarUrl, payload)
    console.log(data)
    return data
  } catch (error) {
    console.error(error.message)
    return false
  }
}

async function registrerSvar ({ telefonnummer, digits }) {
  const payload = {
    telefonnummer,
    svar: hentSvarAlternativ(digits)
  }
  const token = await hentToken()
  if (token) {
    const registrertSvar = await postSvar({ token, payload })
    if (registrertSvar) {
      console.log('svaret er registrert')
    } else {
      console.warn('svaret ble ikke registrert')
    }
  } else {
    console.warn('mottok ikke noe token')
  }
  return true
}

export default registrerSvar
