import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { is401 } from '../../lib/utils'

function VoIP ({ telefonnummer }) {
  const router = useRouter()
  const [device, setDevice] = useState()
  const [voipToken, setVoipToken] = useState()
  const [VoIPActive, setVoIPActive] = useState()
  const [voipReady, setVoipReady] = useState()

  async function hentVoipToken () {
    try {
      const { data } = await axios.get('/api/twilio/token', { withCredentials: true })
      setVoipToken(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  function handleVoipSetup () {
    if (voipToken) {
      const Twilio = require('twilio-client')
      const phone = new Twilio.Device()
      phone.setup(voipToken, {
        codecPreferences: ['opus', 'pcmu'],
        fakeLocalDTMF: true,
        enableRingingState: true
      })
      phone.on('ready', function (phone) {
        setDevice(() => phone)
        setVoipReady(true)
      })
    }
  }

  async function startVoIPSamtale (telefonnummer) {
    device.connect({ telefonnummer })
    device.on('connect', () => {
      setVoIPActive(true)
    })
    device.on('disconnect', () => {
      setVoIPActive(false)
    })
  }

  async function avsluttVoIPSamtale () {
    device.disconnectAll()
  }

  const RingeMedVoipKnapp = ({ VoIPActive, telefonnummer }) => {
    return (
      <button type='button' onClick={() => startVoIPSamtale(telefonnummer)} className={`w-48 mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 ${VoIPActive ? 'bg-green-500' : 'bg-white'} hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-900' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z' />
        </svg>
        <span>
          Ring
        </span>
      </button>
    )
  }

  const AvsluttVoipKnapp = ({ VoIPActive }) => {
    return (
      <button type='button' onClick={() => avsluttVoIPSamtale()} className={`w-48 mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 ${VoIPActive ? 'bg-red-200' : 'bg-white'} hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-900' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z' />
        </svg>
        <span>
          Legg på
        </span>
      </button>
    )
  }

  const Panel = ({ device, voipReady, VoIPActive, telefonnummer }) => {
    if (!device && !voipReady && !telefonnummer) return null
    return (
      <>
        <RingeMedVoipKnapp VoIPActive={VoIPActive} telefonnummer={telefonnummer} />
        <AvsluttVoipKnapp VoIPActive={VoIPActive} />
      </>
    )
  }

  useEffect(() => {
    hentVoipToken()
  }, [])

  return (
    <div className='mb-4 pb-4 border-b border-gray-200'>
      <button onClick={() => handleVoipSetup()} className={`${voipReady && 'hidden '}w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
        </svg>
        <span>
          Bruk VoIP
        </span>
      </button>
      <Panel device={device} voipReady={voipReady} VoIPActive={VoIPActive} telefonnummer={telefonnummer} />
    </div>
  )
}

export default VoIP
