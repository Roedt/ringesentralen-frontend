import { useEffect, useState } from 'react'

import Toggle from '../../components/ui/toggle'

const isArray = data => Array.isArray(data)
const kanBrukeRingesentralen = roller => isArray(roller) && (roller.includes('bruker') || roller.includes('venter_paa_godkjenning'))
const kanRinge = roller => isArray(roller) && roller.includes('ringer')
const kanGodkjenne = roller => isArray(roller) && roller.includes('godkjenner')
const kanAdministrere = roller => isArray(roller) && roller.includes('admin')

function regnUtRoller (roller, erBruker, erRinger, erGodkjenner) {
  const nyeRoller = []
  nyeRoller.push(erBruker ? 'bruker' : 'sperret')
  if (erRinger) {
    nyeRoller.push('ringer')
  }
  if (erGodkjenner) {
    nyeRoller.push('godkjenner')
  }
  if (roller.includes('admin') && erBruker && erRinger && erGodkjenner) {
    nyeRoller.push('admin')
  }
  return nyeRoller
}

const Bruker = ({ fornavn, etternavn, epost, rolle, lokallag, id, endreBrukerStatus }) => {
  const [erBruker, setErBruker] = useState(kanBrukeRingesentralen(rolle))
  const [erRinger, setErRinger] = useState(kanRinge(rolle))
  const [erGodkjenner, setErGodkjenner] = useState(kanGodkjenne(rolle))
  const [roller, setRoller] = useState(rolle || [])
  const erAdministrator = kanAdministrere(rolle)

  useEffect(() => {
    const oppdaterteRoller = regnUtRoller(roller, erBruker, erRinger, erGodkjenner)
    setRoller(oppdaterteRoller)
  }, [erBruker, erRinger, erGodkjenner])

  function deaktiverBruker () {
    setErBruker(false)
    setErRinger(false)
    setErGodkjenner(false)
    endreBrukerStatus({
      endring: 'deaktiver',
      id
    })
  }

  function aktiverBruker () {
    setErBruker(true)
    setErRinger(true)
    endreBrukerStatus({
      endring: 'aktiver',
      id
    })
  }

  function gjoerBrukerTilLokalGodkjenner () {
    setErGodkjenner(true)
    setErRinger(true)
    setErBruker(true)
    endreBrukerStatus({
      endring: 'gjoerTilLokalGodkjenner',
      id
    })
  }

  function fjernBrukerSomLokalGodkjenner () {
    setErGodkjenner(false)
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
          runIfOn={erAdministrator ? false : aktiverBruker}
          runIfOff={erAdministrator ? false : deaktiverBruker}
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Kan bruker ringe'
          status={erRinger}
          runIfOn={erAdministrator ? false : aktiverBruker}
          runIfOff={erAdministrator ? false : deaktiverBruker}
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Kan bruker godkjenne'
          status={erGodkjenner}
          runIfOn={erAdministrator ? false : gjoerBrukerTilLokalGodkjenner}
          runIfOff={erAdministrator ? false : fjernBrukerSomLokalGodkjenner}
        />
      </td>
    </tr>
  )
}

export default Bruker
