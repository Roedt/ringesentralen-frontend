import axios from 'axios'

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
        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
          Godkjent
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        Gjør til godkjenner
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        Sett som administrator
      </td>
    </tr>
  )
}

function BrukerListe ({ brukere }) {
  async function endreBrukerStatus (data) {
    const { endring, id } = data
    const url = `/api/backend/brukere/${endring}`
    await axios.put(url, { personMedEndraTilgang: id }, { withCredentials: true })
  }

  if (!brukere) return null
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Navn
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Lokallag
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Ringer
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Godkjenner
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Administrator
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {brukere && brukere.map(bruker => <Bruker {...bruker} endreBrukerStatus={endreBrukerStatus} key={bruker.hypersysID} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrukerListe
