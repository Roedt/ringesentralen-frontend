import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { is401 } from '../lib/utils'

const isFunction = func => typeof func === 'function'

function Modus ({ user, action, callOnChange }) {
  const router = useRouter()
  const [aktivtModus, setAktivtModus] = useState('medlemmer')

  async function setModus (modus) {
    setAktivtModus(modus)
    try {
      await axios.post('/api/modus', { modus }, { withCredentials: true })
      router.reload()
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
    if (callOnChange && isFunction(callOnChange)) {
      callOnChange(modus)
    }
  }

  useEffect(() => {
    if (user) {
      const { aktivtModus } = user
      setAktivtModus(aktivtModus)
    }
  }, [user])

  return (
    <div className='flex justify-start mb-8'>
      <span className='relative z-0 inline-flex shadow-sm rounded-md'>
        <button onClick={() => setModus('medlemmer')} type='button' className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 ${aktivtModus === 'medlemmer' ? 'bg-green-100' : 'bg-white'} text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}>
          {`${action} medlemmer`}
        </button>
        <button onClick={() => setModus('velgere')} type='button' className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 ${aktivtModus === 'velgere' ? 'bg-green-100' : 'bg-white'} text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}>
          {`${action} velgere`}
        </button>
      </span>
    </div>
  )
}

export default Modus
