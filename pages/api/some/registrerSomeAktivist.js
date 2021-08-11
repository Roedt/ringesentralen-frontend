import axios from 'axios'

import hentToken from '../../../lib/hentSystembrukerToken'

const aktivistUrl = `${process.env.API_URL}/frivillig/registrerSoMeFrivillig`

async function postAktivistPaamelding ({ token, payload }) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  try {
    const { data, status } = await axios.post(aktivistUrl, payload)
    return { ...data, success: status === 201 }
  } catch (error) {
    console.error(error.message)
    return false
  }
}

async function registrerAktivist (payload) {
  const token = await hentToken()
  if (token) {
    const aktivistData = {
      fornavn: payload.fornavn,
      etternavn: payload.etternavn,
      postnummer: payload.postnummer,
      telefonnummer: payload.telefonnummer
    }
    console.log('klar til å registrere SoMeAktivist')
    console.log(JSON.stringify(aktivistData, null, 2))
    const registrertSvar = await postAktivistPaamelding({ token, payload: aktivistData })
    if (registrertSvar) {
      const { success } = registrertSvar
      if (success) {
        console.log('SoMeAktivist er registrert')
      } else {
        console.log('SoMeAktivist var registrert fra før')
      }
      return { success }
    } else {
      console.warn('SoMeAktivist ble ikke registrert')
      return { success: false }
    }
  } else {
    console.warn('mottok ikke noe token')
    return { success: false }
  }
}

export default registrerAktivist
