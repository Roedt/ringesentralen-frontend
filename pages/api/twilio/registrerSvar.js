import axios from 'axios'

import hentToken from '../../../lib/hentSystembrukerToken'

const svarUrl = `${process.env.API_URL}/telefonsvar`

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
