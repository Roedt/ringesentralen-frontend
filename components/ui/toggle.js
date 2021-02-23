import { useState } from 'react'

function Toggle ({ skjermleserTekst, status }) {
  const [aktiv, setAktiv] = useState(status || false)
  function toggleAktiv () {
    setAktiv(!aktiv)
    console.log(aktiv)
  }

  const buttonEnabled = 'bg-indigo-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  const buttonDisabled = 'bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  const rammeEnabled = 'translate-x-5 pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
  const rammeDisabled = 'translate-x-0 pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
  const xEnabled = 'opacity-0 ease-out duration-100 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
  const xDisabled = 'opacity-100 ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
  const vEnabled = 'opacity-100 ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
  const vDisabled = 'opacity-0 ease-out duration-100 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'

  return (
    <button type='button' onClick={() => toggleAktiv()} className={aktiv ? buttonEnabled : buttonDisabled} aria-pressed={aktiv}>
      <span className='sr-only'>{skjermleserTekst}</span>
      <span className={aktiv ? rammeEnabled : rammeDisabled}>
        <span className={aktiv ? xEnabled : xDisabled} aria-hidden='true'>
          <svg className='bg-white h-3 w-3 text-gray-400' fill='none' viewBox='0 0 12 12'>
            <path d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
          </svg>
        </span>
        <span className={aktiv ? vEnabled : vDisabled} aria-hidden='true'>
          <svg className='bg-white h-3 w-3 text-indigo-600' fill='currentColor' viewBox='0 0 12 12'>
            <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
          </svg>
        </span>
      </span>
    </button>
  )
}

export default Toggle
