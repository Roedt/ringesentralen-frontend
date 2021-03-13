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

  async function startVoIPSamtale () {
    device.connect(telefonnummer)
    device.on('connect', () => {
      setVoIPActive(true)
    })
  }

  async function avsluttVoIPSamtale () {
    device.disconnectAll()
    device.on('disconnect', () => {
      setVoIPActive(false)
    })
  }

  const RingeMedVoipKnapp = ({ VoIPActive }) => {
    return (
      <button type='button' onClick={() => startVoIPSamtale()} className={`{w-48 mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 ${VoIPActive ? 'bg-green' : 'bg-white'} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z' />
        </svg>
        <span>
          Ring
        </span>
      </button>
    )
  }

  const AvsluttVoipKnapp = ({ VoIPActive }) => {
    return (
      <button type='button' onClick={() => avsluttVoIPSamtale()} className={`w-48 mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 ${VoIPActive ? 'bg-red' : 'bg-white'} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z' />
          <path fill-rule='evenodd' d='M11.146 1.646a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z' />
        </svg>
        <span>
          Legg på
        </span>
      </button>
    )
  }

  const Panel = ({ device, voipReady, VoIPActive }) => {
    if (!device && !voipReady) return null
    return (
      <div>
        <RingeMedVoipKnapp VoIPActive={VoIPActive} />
        <AvsluttVoipKnapp VoIPActive={VoIPActive} />
      </div>
    )
  }

  useEffect(() => {
    hentVoipToken()
  }, [])

  return (
    <div>
      <button onClick={() => handleVoipSetup()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z' />
          <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z' />
        </svg>
        <span>
          Bruk VoIP
        </span>
      </button>
      <Panel device={device} voipReady={voipReady} VoIPActive={VoIPActive} />
    </div>
  )
}

export default VoIP
