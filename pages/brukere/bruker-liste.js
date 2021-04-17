import axios from 'axios'
import Bruker from './bruker'

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
                    Bruker
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Ringe velgere
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Ringe medlemmer
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Godkjenner
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
