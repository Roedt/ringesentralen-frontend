import { useState } from 'react'

import Toggle from '../../components/ui/toggle'

const kanBrukeRingesentralen = roller => roller.includes('bruker')
const kanRinge = roller => roller.includes('ringer')
const kanGodkjenne = roller => roller.includes('godkjenner')
// const kanAdministrere = roller => roller.includes('admin')

const Bruker = ({ fornavn, etternavn, epost, rolle, lokallag, hypersysID, endreBrukerStatus }) => {
  const [erBruker, setErBruker] = useState(kanBrukeRingesentralen(rolle))
  const [erRinger, setErRinger] = useState(kanRinge(rolle))
  const [erGodkjenner, setErGodkjenner] = useState(kanGodkjenne(rolle))

  /*
  function avslaaBrukerSomRinger () {
    endreBrukerStatus({
      endring: 'avslaa',
      id: hypersysID
    })
  }
  */

  function godkjennBrukerSomRinger () {
    setErRinger(true)
    endreBrukerStatus({
      endring: 'godkjenn',
      id: hypersysID
    })
  }

  function deaktiverBruker () {
    setErBruker(false)
    endreBrukerStatus({
      endring: 'deaktiver',
      id: hypersysID
    })
  }

  function reaktiverBruker () {
    setErBruker(true)
    endreBrukerStatus({
      endring: 'reaktiver',
      id: hypersysID
    })
  }

  function gjoerBrukerTilLokalGodkjenner () {
    setErGodkjenner(true)
    endreBrukerStatus({
      endring: 'gjoerTilLokalGodkjenner',
      id: hypersysID
    })
  }

  function fjernBrukerSomLokalGodkjenner () {
    setErGodkjenner(false)
    endreBrukerStatus({
      endring: 'fjernSomLokalGodkjenner',
      id: hypersysID
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
        <div className='text-sm text-gray-500'>{rolle?.join(', ') || 'Ikke oppgitt'}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <Toggle
          skjermleserTekst='Kan bruke ringesentralen'
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
