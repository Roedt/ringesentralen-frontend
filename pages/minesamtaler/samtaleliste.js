import Samtale from './samtale'

function Samtaler ({ title, samtaler }) {
  return (
    <div className='shadow'>
      <h2 className='text-xl font-semibold mb-2'>{title}</h2>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Tidspunkt
            </th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Ringt
            </th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Resultat
            </th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Kommentar
            </th>
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Ringt av
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {samtaler && samtaler.map(samtale => <Samtale {...samtale} key={samtale.tidspunkt+samtale.ringer} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Samtaler
