import axios from 'axios'
import { useState } from 'react'
import toaster from 'toasted-notes'
import generatePayload from '../../lib/generate-payload'
import Button from '../../components/ui/button'

function ResultatSkjema ({ id, isOpen, setPerson, modus }) {
  const [loading, setLoading] = useState()
  const [visSkjema, setVisSkjema] = useState(isOpen)

  function toggleSkjema () {
    setVisSkjema(!visSkjema)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    const form = document.getElementById('samtalereferat-form')
    const payload = generatePayload(form)
    const referat = {
      kommentar: payload.kommentar,
      modus: modus,
      modusspesifikkeResultat: {
        type: 'KoronaspesifikkeResultat',
        vilHaKoronaprogram: payload?.vilHaKoronaprogram === 'on',
        vilBliMerAktiv: payload?.vilBliMerAktiv === 'on',
        vilHaValgkampsbrev: payload?.vilHaValgkampsbrev === 'on'
      },
      resultat: payload.resultat,
      ringtID: id,
      vilIkkeBliRingt: payload?.vilIkkeBliRingt === 'on'
    }
    try {
      await axios.post('/api/backend/samtale/registrerResultatFraSamtale', referat, { withCredentials: true })
      toaster.notify('Samtalereferatet er lagret', { duration: 2000 })
      setLoading(false)
      form.reset()
      setPerson(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={toggleSkjema} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className={`${visSkjema ? '-rotate-180' : 'rotate-0'} -ml-1 mr-2 h-5 w-5 text-gray-400 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' />
        </svg>
        <span>
          {visSkjema ? 'Skjul' : 'Vis'} samtalereferat
        </span>
      </button>
      <div className={`${visSkjema ? 'visible' : 'invisible'}`}>
        <form id='samtalereferat-form' className='space-y-8 divide-y divide-gray-200' onSubmit={handleSubmit}>
          <div className='space-y-8 divide-y divide-gray-200'>
            <div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label for='kommentar' className='block text-sm font-medium text-gray-700'>
                    Kommentarer
                  </label>
                  <div className='mt-1'>
                    <textarea id='kommentar' name='kommentar' rows='3' className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md' />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>Ekstra informasjon for senere samtaler eller til lokallaget.</p>
                </div>
              </div>
            </div>

            <div className='pt-8'>
              <div className='mt-6'>
                <fieldset className='mt-6'>
                  <div>
                    <legend className='text-base font-medium text-gray-900'>
                      Resultat av oppringing
                    </legend>
                  </div>
                  <div className='mt-4 space-y-4'>
                    <div className='flex items-center'>
                      <input id='resultat-svarte' name='resultat' type='radio' value='Svarte' required className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                      <label for='resultat-svarte' className='ml-3 block text-sm font-medium text-gray-700'>
                        Svarte
                      </label>
                    </div>
                    <div className='flex items-center'>
                      <input id='resultat-passet-ikke' name='resultat' value='Passet_ikke' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                      <label for='resultat-passet-ikke' className='ml-3 block text-sm font-medium text-gray-700'>
                        Passet ikke
                      </label>
                    </div>
                    <div className='flex items-center'>
                      <input id='resultat-ikke-svar' name='resultat' value='Ikke_svar' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                      <label for='resultat-ikke-svar' className='ml-3 block text-sm font-medium text-gray-700'>
                        Svarte ikke
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className='pt-8'>
            <div className='mt-6'>
              <fieldset>
                <legend className='text-base font-medium text-gray-900'>
                  Ønsker
                </legend>
                <div className='mt-4 space-y-4'>
                  <div className='relative flex items-start'>
                    <div className='flex items-center h-5'>
                      <input id='vilHaKoronaprogram' name='vilHaKoronaprogram' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label for='vilHaKoronaprogram' className='font-medium text-gray-700'>Vil ha korona-program på epost</label>
                    </div>
                  </div>
                  <div className='relative flex items-start'>
                    <div className='flex items-center h-5'>
                      <input id='vilHaValgkampsbrev' name='vilHaValgkampsbrev' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label for='vilHaValgkampsbrev' className='font-medium text-gray-700'>Vil ha valgkampsbrev med informasjon om valgkampen</label>
                    </div>
                  </div>
                  <div className='relative flex items-start'>
                    <div className='flex items-center h-5'>
                      <input id='vilBliMerAktiv' name='vilBliMerAktiv' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label for='vilBliMerAktiv' className='font-medium text-gray-700'>Kan tenke seg å være mer aktiv i Rødt framover</label>
                    </div>
                  </div>
                  <div className='relative flex items-start'>
                    <div className='flex items-center h-5'>
                      <input id='vilIkkeBliRingt' name='vilIkkeBliRingt' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label for='vilIkkeBliRingt' className='font-medium text-gray-700'>Vil ikke bli ringt</label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className='pt-5'>
            <Button
              type='submit'
              loading={loading}
            >
              Lagre
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ResultatSkjema
