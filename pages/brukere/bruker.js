import { useEffect, useState } from 'react'

import Toggle from '../../components/ui/toggle'

const isArray = data => Array.isArray(data)
const kanBrukeRingesentralen = roller => isArray(roller) && roller.includes('bruker')
const kanRinge = roller => isArray(roller) && roller.includes('ringer')
const kanGodkjenne = roller => isArray(roller) && roller.includes('godkjenner')

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

  useEffect(() => {
    const oppdaterteRoller = regnUtRoller(roller, erBruker, erRinger, erGodkjenner)
    setRoller(oppdaterteRoller)
  }, [erBruker, erRinger, erGodkjenner])

  /*
  function avslaaBrukerSomRinger () {
    endreBrukerStatus({
      endring: 'avslaa',
      id: id
    })
  }
  */

  function godkjennBrukerSomRinger () {
    setErRinger(true)
    setErBruker(true)
    endreBrukerStatus({
      endring: 'godkjenn',
      id
    })
  }

  function deaktiverBruker () {
    setErBruker(false)
    setErRinger(false)
    setErGodkjenner(false)
    endreBrukerStatus({
      endring: 'deaktiver',
      id
    })
  }

  function reaktiverBruker () {
    setErBruker(true)
    setErRinger(true)
    endreBrukerStatus({
      endring: 'reaktiver',
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
          runIfOn={reaktiverBruker}
          runIfOff={deaktiverBruker}
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Kan bruker ringe'
          status={erRinger}
          runIfOn={godkjennBrukerSomRinger}
          runIfOff={deaktiverBruker}
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Kan bruker godkjenne'
          status={erGodkjenner}
          runIfOn={gjoerBrukerTilLokalGodkjenner}
          runIfOff={fjernBrukerSomLokalGodkjenner}
        />
      </td>
    </tr>
  )
}

export default Bruker
