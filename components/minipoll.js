import { useState } from 'react'

import { useAmplitude } from '../contexts/amplitude-context'

function Minipoll ({ tekst, tema, alternativer }) {
  const { logAmplitudeEvent } = useAmplitude()
  const [valgt, setValgt] = useState()

  if (!tema && !tekst) return null

  function registrerSvar (svar) {
    setValgt(svar)
    logAmplitudeEvent('poll', {
      tema,
      svar
    })
  }

  function Button ({ alternativ, valgt }) {
    return (
      <button type='button' onClick={() => registrerSvar(alternativ)} className={`w-24 mr-2 mt-2 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 ${valgt === alternativ ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
        <span>
          {alternativ}
        </span>
      </button>
    )
  }

  return (
    <div className='my-4 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg'>
      <h1 className='text-lg font-semibold mb-1'>Minipoll</h1>
      <h2 className='text-lg mb-2'>{tekst}</h2>
      <div>
        {alternativer.map((alternativ, index) => <Button alternativ={alternativ} valgt={valgt} key={`poll-alternativ-${index}`} />)}
      </div>
    </div>
  )
}

export default Minipoll
