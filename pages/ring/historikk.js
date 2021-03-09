import prettyPrintDato from '../../lib/prettyprint-dato'

function Logg ({ data }) {
  const { kommentar, ringer, tidspunkt, resultat } = data
  return (
    <li className='py-4'>
      <div className='flex space-x-3'>
        <div className='flex-1 space-y-1'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium'>{prettyPrintDato(tidspunkt)}</h3>
            <p className='text-sm text-gray-500'>{ringer}</p>
          </div>
          <p className='text-sm text-gray-700'>{resultat}</p>
          <p className='text-sm text-gray-700'>{kommentar}</p>
        </div>
      </div>
    </li>
  )
}

function Historikk ({ tidlegareSamtalar }) {
  if (!tidlegareSamtalar || tidlegareSamtalar.length === 0) return null

  return (
    <div className='mt-4 divide-y divide-gray-200'>
      <h2>Tidligere samtaler</h2>
      <div>
        <ul className='divide-y divide-gray-200'>
          {tidlegareSamtalar.map(data => <Logg data={data} key={data.tidspunkt} />)}
        </ul>
      </div>
    </div>
  )
}

export default Historikk
