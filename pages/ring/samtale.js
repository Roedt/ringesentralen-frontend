import axios from 'axios'
import { useState } from 'react'
import ResultatSkjema from './resultatskjema'

function Samtale ({ data, device, setPerson }) {
  const [samtale, setSamtale] = useState()
  const [VoIPActive, setVoIPActive] = useState()

  async function avslaaSamtale () {
    setPerson(false)
  }

  async function startSamtale (id) {
    await axios.post('/api/backend/samtale/startSamtale', { skalRingesID: id }, { withCredentials: true })
    setSamtale('paagaaende')
  }

  async function avsluttSamtale (id) {
    setSamtale('avsluttet')
  }

  async function startVoIPSamtale (telefonnummer) {
    device.connect({ telefonnummer })
    device.on('connect', () => {
      setVoIPActive(true)
      setSamtale('paagaaende')
    })
  }

  async function avsluttVoIPSamtale () {
    device.disconnectAll()
    device.on('disconnect', () => {
      setVoIPActive(false)
      setSamtale('avsluttet')
    })
  }

  const StartKnapp = () => {
    return (
      <button type='button' onClick={() => startSamtale(id)} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z' />
        </svg>
        <span>
          Start samtale
        </span>
      </button>
    )
  }

  const StoppKnapp = () => {
    return (
      <button type='button' onClick={() => avsluttSamtale(id)} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          <path d='M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z' />
        </svg>
        <span>
          Avslutt samtale
        </span>
      </button>
    )
  }

  const RingeMedVoipKnapp = ({ telefonnummer }) => {
    return (
      <button type='button' onClick={() => startVoIPSamtale(telefonnummer)} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z' />
        </svg>
        <span>
          Ring med VoIP
        </span>
      </button>
    )
  }

  const AvsluttVoipKnapp = () => {
    return (
      <button type='button' onClick={() => avsluttVoIPSamtale()} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z' />
          <path fill-rule='evenodd' d='M11.146 1.646a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z' />
        </svg>
        <span>
          Legg på VoIP
        </span>
      </button>
    )
  }

  if (!data) return null
  const { person } = data
  const { fornavn, etternavn, telefonnummer, id } = person
  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      <div className='-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap'>
        <div className='ml-4 mt-4'>
          <div className='flex items-center'>
            <div className='ml-4'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                {fornavn} {etternavn}
              </h3>
              <p className='text-sm text-gray-500'>
                {telefonnummer}
              </p>
              {(device && !VoIPActive) && <RingeMedVoipKnapp telefonnummer={telefonnummer} />}
              {VoIPActive && <AvsluttVoipKnapp />}
            </div>
          </div>
        </div>
        <div className='ml-4 mt-4 flex-shrink-0 flex'>
          {!samtale && <StartKnapp />}
          {samtale === 'paagaaende' && <StoppKnapp />}
          <button type='button' disabled={samtale} onClick={() => avslaaSamtale()} className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
              <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
            </svg>
            <span>
              Avslå samtale
            </span>
          </button>
        </div>
      </div>
      {samtale === 'avsluttet' && <ResultatSkjema id={id} setPerson={setPerson} />}
    </div>
  )
}

export default Samtale
