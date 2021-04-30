import axios from 'axios'

import hentToken from '../../lib/hentSystembrukerToken'
import fixTelefonNummer from '../../lib/fix-telefonnummer'
import lageEnumvennligStreng from '../../lib/lag-enumvennlig-streng'

const registreringsUrl = `${process.env.API_URL}/registrer`

async function postFrivilligRegistrering ({ token, payload }) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  try {
    const { data } = await axios.post(registreringsUrl, payload)
    return { ...data, success: true }
  } catch (error) {
    console.error(error.message)
    return false
  }
}

function splitNavn (navn) {
  const liste = navn.split(' ')
  const etternavn = liste.pop()
  const fornavn = liste.join(' ')
  return {
    fornavn,
    etternavn
  }
}

function repackData ({ data }) {
  const { fornavn, etternavn } = splitNavn(data.Navn)
  const aktiviteter = [
    'Stand',
    'SoMe',
    'Dørbanking',
    'Ringing',
    'SMS',
    'Postkasseutdeling',
    'Morgenaksjon',
    'Bil'
  ]

  const kanTenkeSegAaBidraMedAktiviteter = aktiviteter.filter(aktivitet => data[aktivitet] === 'true').map(aktivitet => lageEnumvennligStreng(aktivitet))

  const repacked = {
    alleredeAktivILokallag: data.Aktiv === 'Ja',
    andreTingDuVilBidraMed: data['Andre bidrag'],
    epost: data.Email,
    etternavn,
    fornavn,
    fortellLittOmDegSelv: data.field,
    kanTenkeSegAaBidraMedAktiviteter,
    medlemIRoedt: data.Medlem,
    postnummer: data.Postnummer,
    spesiellKompetanse: data.Kompetanse,
    telefonnummer: fixTelefonNummer(data.Tlf)
  }

  return repacked
}

async function mottaFrivillig (request, response) {
  const payload = await request.body
  const token = await hentToken()
  if (token) {
    const repacked = repackData(payload)
    const registrertFrivillig = await postFrivilligRegistrering({ token, payload: repacked })
    if (registrertFrivillig) {
      const { success } = registrertFrivillig
      if (success) {
        console.log('frivillig er registrert')
      } else {
        console.log('noe feilet og frivillig ble ikke registrert')
      }
    } else {
      console.warn('frivillig ble ikke registrert')
    }
  } else {
    console.warn('mottok ikke noe token')
  }
  response.json(payload)
}

export default mottaFrivillig
