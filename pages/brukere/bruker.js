import { useEffect, useState } from 'react'

import { useAmplitude } from '../../contexts/amplitude-context'
import Toggle from '../../components/ui/toggle'

const isArray = data => Array.isArray(data)
const kanBrukeRingesentralen = roller => isArray(roller) && (roller.includes('bruker') || roller.includes('venter_paa_godkjenning'))
const kanRinge = roller => isArray(roller) && roller.includes('ringer')
const kanRingeMedlemmer = roller => isArray(roller) && roller.includes('ringerForMedlemmer')
const kanGodkjenne = roller => isArray(roller) && roller.includes('godkjenner')
const kanAdministrere = roller => isArray(roller) && roller.includes('admin')

function regnUtRoller (roller, erBruker, erRinger, erRingerForMedlemmer, erGodkjenner) {
  const nyeRoller = []
  nyeRoller.push(erBruker ? 'bruker' : 'sperret')
  if (erRinger) {
    nyeRoller.push('ringer')
  }
  if (erRingerForMedlemmer) {
    nyeRoller.push('ringerForMedlemmer')
  }
  if (erGodkjenner) {
    nyeRoller.push('godkjenner')
  }
  if (roller.includes('admin') && erBruker && erRinger && erRingerForMedlemmer && erGodkjenner) {
    nyeRoller.push('admin')
  }
  return nyeRoller
}

const Bruker = ({ fornavn, etternavn, epost, rolle, lokallag, id, fylke, endreBrukerStatus, postnummer }) => {
  const [erBruker, setErBruker] = useState(kanBrukeRingesentralen(rolle))
  const [erRinger, setErRinger] = useState(kanRinge(rolle))
  const [erRingerForMedlemmer, setErRingerForMedlemmer] = useState(kanRingeMedlemmer(rolle))
  const [erGodkjenner, setErGodkjenner] = useState(kanGodkjenne(rolle))
  const [roller, setRoller] = useState(rolle || [])
  const erAdministrator = kanAdministrere(rolle)
  const { logAmplitudeEvent } = useAmplitude()

  useEffect(() => {
    const oppdaterteRoller = regnUtRoller(roller, erBruker, erRinger, erRingerForMedlemmer, erGodkjenner)
    setRoller(oppdaterteRoller)
  }, [erBruker, erRinger, erGodkjenner, erRingerForMedlemmer])

  function deaktiverBruker () {
    setErBruker(false)
    setErRinger(false)
    setErRingerForMedlemmer(false)
    setErGodkjenner(false)
    logAmplitudeEvent('brukere', {
      handling: 'Deaktiverer bruker'
    })
    endreBrukerStatus({
      endring: 'deaktiver',
      id
    })
  }

  function aktiverBruker () {
    setErBruker(true)
    setErRinger(true)
    logAmplitudeEvent('brukere', {
      handling: 'Aktiverer bruker'
    })
    endreBrukerStatus({
      endring: 'aktiver',
      id
    })
  }

  function giTilgangTilAaRingeMedlemmer () {
    setErBruker(true)
    setErRinger(true)
    setErRingerForMedlemmer(true)
    logAmplitudeEvent('brukere', {
      handling: 'Gir bruker tilgang til å ringe medlemmer'
    })
    endreBrukerStatus({
      endring: 'giTilgangTilAaRingeMedlemmer',
      id
    })
  }

  function fjernTilgangTilAaRingeMedlemmer () {
    setErRingerForMedlemmer(false)
    logAmplitudeEvent('brukere', {
      handling: 'Gir bruker tilgang til å ringe medlemmer'
    })
    endreBrukerStatus({
      endring: 'fjernTilgangTilAaRingeMedlemmer',
      id
    })
  }

  function gjoerBrukerTilLokalGodkjenner () {
    setErGodkjenner(true)
    setErRinger(true)
    setErRingerForMedlemmer(true)
    setErBruker(true)
    logAmplitudeEvent('brukere', {
      handling: 'Gjør bruker til lokal godkjenner'
    })
    endreBrukerStatus({
      endring: 'gjoerTilLokalGodkjenner',
      id
    })
  }

  function fjernBrukerSomLokalGodkjenner () {
    setErGodkjenner(false)
    logAmplitudeEvent('brukere', {
      handling: 'Fjerner bruker som lokal godkjenner'
    })
    endreBrukerStatus({
      endring: 'fjernSomLokalGodkjenner',
      id
    })
  }

  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900'>
              {fornavn} {etternavn}
            </div>
            <div className='text-sm text-gray-500'>
              {epost}
            </div>
            <div className='text-sm text-gray-500'>
              Postnummer {postnummer} (fylke: {fylke?.navn || 'Udefinert'})
            </div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{lokallag?.navn || 'Ikke oppgitt'}</div>
        <div className='text-sm text-gray-500'>{roller.join(', ') || 'Ikke oppgitt'}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <Toggle
          skjermleserTekst='Har bruker tilgang til ringesentralen'
          status={erBruker}
          runIfOn={aktiverBruker}
          runIfOff={deaktiverBruker}
          disabled={erAdministrator}
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Kan bruker ringe velgere'
          status={erRinger}
          runIfOn={aktiverBruker}
          runIfOff={deaktiverBruker}
          disabled={erAdministrator}
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Kan bruker ringe medlemmer'
          status={erRingerForMedlemmer}
          runIfOn={giTilgangTilAaRingeMedlemmer}
          runIfOff={fjernTilgangTilAaRingeMedlemmer}
          disabled={erAdministrator}
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Kan bruker godkjenne'
          status={erGodkjenner}
          runIfOn={gjoerBrukerTilLokalGodkjenner}
          runIfOff={fjernBrukerSomLokalGodkjenner}
          disabled={erAdministrator}
        />
      </td>
    </tr>
  )
}

export default Bruker
