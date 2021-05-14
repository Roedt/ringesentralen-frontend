import { createContext, useContext, useEffect, useState } from 'react'

import Toast from '../components/ui/toast'

const ToastContext = createContext()

function ToastProvider ({ children }) {
  const [toastMelding, setToastMelding] = useState()

  useEffect(() => {
    if (toastMelding) {
      setTimeout(() => {
        setToastMelding(false)
      }, 3000)
    }
  }, [toastMelding])

  return (
    <ToastContext.Provider value={{ setToastMelding }}>
      {children}
      <div
        aria-live='assertive'
        className='fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start'
      >
        <div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
          <Toast melding={toastMelding} />
        </div>
      </div>
    </ToastContext.Provider>
  )
}

function useToast () {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast må brukes under en ToastProvider')
  }
  return context
}

export {
  ToastProvider,
  useToast
}
