import Toggle from '../../components/ui/toggle'

const Bruker = ({ fornavn, etternavn, epost, rolle, lokallag, hypersysID, endreBrukerStatus }) => {
  function avslaaBrukerSomRinger () {
    endreBrukerStatus({
      endring: 'avslaa',
      id: hypersysID
    })
  }

  function deaktiverBrukerSomRinger () {
    endreBrukerStatus({
      endring: 'deaktiver',
      id: hypersysID
    })
  }

  function godkjennBrukerSomRinger () {
    endreBrukerStatus({
      endring: 'godkjenn',
      id: hypersysID
    })
  }

  function reaktiverBrukerSomRinger () {
    endreBrukerStatus({
      endring: 'reaktiver',
      id: hypersysID
    })
  }

  function gjoerBrukerTilLokalGodkjenner () {
    endreBrukerStatus({
      endring: 'gjoerTilLokalGodkjenner',
      id: hypersysID
    })
  }

  function fjernBrukerSomLokalGodkjenner () {
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
        <div className='text-sm text-gray-900'>{lokallag.navn}</div>
        <div className='text-sm text-gray-500'>{rolle.join(', ')}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <Toggle
          skjermleserTekst='Er bruker godkjent som ringer'
          status
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Er bruker lokal godkjenner'
        />
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        <Toggle
          skjermleserTekst='Er bruker aktivert'
          status
        />
      </td>
    </tr>
  )
}

export default Bruker
