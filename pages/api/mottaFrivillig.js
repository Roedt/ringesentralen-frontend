import axios from 'axios'

import hentToken from '../../lib/hentSystembrukerToken'
import fixTelefonNummer from '../../lib/fix-telefonnummer'
import lageEnumvennligStreng from '../../lib/lag-enumvennlig-streng'

const registreringsUrl = `${process.env.API_URL}/frivillig/registrer`

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

  const politiskeSjekkbokser = [
    'Øke sosialstønaden',
    'Reversering av tvangssammenslåtte fylker og kommuner．',
    'Bruke deler av oljefondet på  å gjøre nødvendige investeringer i utbygging av klimavennlig infrastruktur',
    'Si nei til EU-direktiv som svekker fagbevegelsen og rettigheter i arbeidslivet',
    'Profittfri velferd',
    'Innføring av leksefri skole',
    'Ta tilbake jernbanen i offentlig regi',
    'En ikke-kommersiell boligsektor med billigere boliger',
    'Sikre at ingen mister dagpengene uten tilbud om jobb eller utdanning',
    'Ta imot flere asylsøkere og kvoteflyktninger',
    'Styrke det norske forsvaret',
    'Kutte i egenandelen på helsetjenester',
    'Nei til nye vindkraftanlegg på land',
    'Stanse leting og utbygging av nye oljefelt',
    'At asylsøkere skal få jobbe mens de venter på svar',
    'Sikre norske arbeidsplasser i fiskeriet',
    'Bedre og billigere kollektivtransport',
    'Lovfesting av rett til lærlingplass',
    'Hindre diskriminering og rasisme i boligmarkedet og arbeidslivet',
    'Postombæring fem dager i uka',
    'Styrke bemanningen i velferden',
    'Erstatte EØS-avtalen med en handelsavtale',
    'Styrke kommuneøkonomien',
    'Sikre urørt natur',
    'Sekstimers normal-arbeidsdag (30 timers arbeidsuke)',
    'Innføring av dynastiskatt, en rettferdig og progressiv skatt på luksusarv',
    'Melde Norge ut av NATO og jobbe for en nordisk forsvarsallianse',
    'Kutte i flate avgifter som ikke tar hensyn til hvor mye du har, hvor du bor eller hvor mye du forbruker',
    'Gratis tannhelse',
    'Sikre at ingen mister arbeidsavklaringspenger før de er avklart',
    'Forby private bemanningsselskaper',
    'Økning i skattene for de superrike',
    'Øke barnetrygden og holde den utenfor beregningen av sosialhjelp',
    'Opprettelse av en likelønnspott for å utjevne lønnsforskjeller basert på kjønn',
    'Gratis barnehage',
    'Erstatt helseforetakene med en åpen og demokratisk styringsmodell',
    'Et mer rettferdig pensjonssystem',
    'Kutt i politikerlønningene',
    'Erstatte markedsstyring med tillitsreform i offentlig sektor',
    'Øke dagpengenivået, spesielt for lavtlønte'
  ]

  const valgtePolitiskeSjekkbokser = politiskeSjekkbokser.filter(sjekkboks => data[sjekkboks] === 'true')
    .map(sjekkboks => lageEnumvennligStreng(sjekkboks))
    .map(sjekkboks => sjekkboks.charAt(0).toUpperCase() + sjekkboks.slice(1))

  const repacked = {
    alleredeAktivILokallag: data.Aktiv === 'Ja',
    andreTingDuVilBidraMed: data['Andre bidrag'],
    epost: data.Email,
    etternavn,
    fornavn,
    fortellLittOmDegSelv: data.field,
    kanTenkeSegAaBidraMedAktiviteter,
    medlemIRoedt: lageEnumvennligStreng(data.Medlem),
    postnummer: data.Postnummer,
    spesiellKompetanse: data.Kompetanse,
    spraak: data['Språk 2'],
    telefonnummer: fixTelefonNummer(data.Tlf),
    opptattAv: valgtePolitiskeSjekkbokser,
    haandtering: data['Håndtering'],
    personlig: data.Personlig === 'Ja',
    tydelig: data.Tydelig,
    forslag: data.Forslag
  }

  return repacked
}

async function mottaFrivillig (request, response) {
  const payload = await request.body
  const token = await hentToken()
  if (token) {
    console.log('datadump frivillig webhook')
    console.log(JSON.stringify(payload, null, 2))
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
    console.warn('mottok ikke noe token på mottaFrivillig')
  }
  response.json(payload)
}

export default mottaFrivillig
