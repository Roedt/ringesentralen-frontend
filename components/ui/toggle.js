import { useEffect, useRef, useState } from 'react'

const isFunction = func => typeof func === 'function'

function Toggle ({ skjermleserTekst, status, runIfOn, runIfOff }) {
  const [aktiv, setAktiv] = useState(status || false)
  const [toggleState, setToggleState] = useState(status || false)

  const aktivRef = useRef(status || false)
  function toggleAktiv () {
    setAktiv(!aktiv)
  }

  // Kjører evt funksjoner om toggle endrer state
  useEffect(() => {
    if (aktivRef.current !== aktiv) {
      if (aktiv && isFunction(runIfOn)) {
        runIfOn()
      }
      if (!aktiv && isFunction(runIfOff)) {
        runIfOff()
      }
      aktivRef.current = aktiv
      setToggleState(aktiv)
    }
  }, [aktiv])

  // Gjøre det mulig å påvirke visning utenfra (om en serie toggles avhenger av hverandre)
  useEffect(() => {
    setToggleState(status)
  }, [status])

  return (
    <button type='button' onClick={() => toggleAktiv()} className={`${toggleState ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`} aria-pressed={aktiv}>
      <span className='sr-only'>{skjermleserTekst}</span>
      <span className={`${toggleState ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}>
        <span className={`${toggleState ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`} aria-hidden='true'>
          <svg className='bg-white h-3 w-3 text-gray-400' fill='none' viewBox='0 0 12 12'>
            <path d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
          </svg>
        </span>
        <span className={`${toggleState ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`} aria-hidden='true'>
          <svg className='bg-white h-3 w-3 text-indigo-600' fill='currentColor' viewBox='0 0 12 12'>
            <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
          </svg>
        </span>
      </span>
    </button>
  )
}

export default Toggle
