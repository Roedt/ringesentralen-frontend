import { useEffect, useState } from 'react'

import { aktivitetNavn } from './aktiviteter'

function Aktivitet ({ id, data, leggTilFilter, fjernFraFilter }) {
  const [aktiv, setAktiv] = useState(false)

  useEffect(() => {
    if (aktiv) {
      leggTilFilter(id)
    } else {
      fjernFraFilter(id)
    }
  }, [aktiv])

  return (
    <div className='relative flex items-start'>
      <div className='flex items-center h-5'>
        <input
          id={`filter-${id}`}
          name={id}
          type='checkbox'
          onClick={() => setAktiv(!aktiv)}
          className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
        />
      </div>
      <div className='ml-3 text-sm'>
        <label htmlFor={`filter-${id}`} className='font-medium text-gray-700'>
          {data}
        </label>
      </div>
    </div>
  )
}

function AktiviteterFilter ({ setFilter }) {
  const [aktivtFilter, setAktivtFilter] = useState([])

  function leggTilFilter (data) {
    const listeKopi = [...aktivtFilter]
    if (!listeKopi.includes(data)) {
      listeKopi.push(data)
      setAktivtFilter(listeKopi)
    }
  }

  function fjernFraFilter (data) {
    const listeKopi = [...aktivtFilter]
    if (listeKopi.includes(data)) {
      const nyListe = listeKopi.filter(item => item !== data)
      setAktivtFilter(nyListe)
    }
  }

  useEffect(() => {
    setFilter(aktivtFilter)
  }, [aktivtFilter])

  return (
    <div className='mb-4 p-4'>
      <h2 className='font-xl font-semibold'>Filtrer liste utfra hva man kan bidra med</h2>
      {Object.entries(aktivitetNavn).map((data) => <Aktivitet id={data[0]} data={data[1]} key={`filterkey-${data[0]}`} leggTilFilter={leggTilFilter} fjernFraFilter={fjernFraFilter} />)}
      <p className='mt-2'>
        Filteret er inkluderende. Så dersom du filtrerer på flere kriterier vil du få treff på alle som kan bidra med minst ett.
      </p>
    </div>
  )
}

export default AktiviteterFilter
