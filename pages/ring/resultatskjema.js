import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import toaster from 'toasted-notes'

import generatePayload from '../../lib/generate-payload'
import Button from '../../components/ui/button'
import { is401, is403 } from '../../lib/utils'
import { useAmplitude } from '../../contexts/amplitude-context'

function ResultatSkjema ({ id, setPerson, modus, telefonnummer }) {
  const router = useRouter()
  const [loading, setLoading] = useState()
  const { logAmplitudeEvent } = useAmplitude()

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    logAmplitudeEvent('ringer', {
      handling: 'Logger samtalereferat',
      modus
    })
    const form = document.getElementById('samtalereferat-form')
    const payload = generatePayload(form)
    const referat = {
      kommentar: payload.kommentar,
      modus: modus,
      modusspesifikkeResultat: {
        type: 'Valg21SpesifikkeResultat',
        vilHaKoronaprogram: payload?.vilHaKoronaprogram === 'on',
        vilBliMerAktiv: payload?.vilBliMerAktiv === 'on',
        vilHaValgkampsbrev: payload?.vilHaValgkampsbrev === 'on',
        vilHaMedlemsLink: payload?.vilHaMedlemsLink === 'on',
        vilHaNyhetsbrevLink: payload?.vilHaNyhetsbrevLink === 'on'
      },
      resultat: payload.resultat,
      ringtID: id,
      vilIkkeBliRingt: payload?.vilIkkeBliRingt === 'on'
    }
    const { vilHaNyhetsbrevLink, vilHaMedlemsLink } = referat
    if (vilHaNyhetsbrevLink) {
      const payload = {
        telefonnummer,
        melding: 'Takk for samtalen. Du sa du ønsket å motta nyhetsbrev fra Rødt. Da må du registrere deg på https://roedt.no'
      }
      const { data } = await axios.post('/api/twilio/sendSMS', payload, { withCredentials: true })
      console.log(data)
    }
    if (vilHaMedlemsLink) {
      const payload = {
        telefonnummer,
        melding: 'Takk for samtalen. Du sa du ønsket vite mer om å bli medlem i Rødt. Les mer om dette her https://roedt.no/bli-medlem'
      }
      const { data } = await axios.post('/api/twilio/sendSMS', payload, { withCredentials: true })
      console.log(data)
    }
    try {
      await axios.post('/api/backend/samtale/registrerResultatFraSamtale', referat, { withCredentials: true })
      toaster.notify('Samtalereferatet er lagret', { duration: 2000 })
      setLoading(false)
      form.reset()
      setPerson(false)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
      setLoading(false)
    }
  }

  return (
    <>
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
                <div className={`relative flex items-start ${modus === 'velgere' ? 'visible' : 'hidden'}`}>
                  <div className='flex items-center h-5'>
                    <input id='vilHaNyhetsbrevLink' name='vilHaNyhetsbrevLink' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='vilHaNyhetsbrevLink' className='font-medium text-gray-700'>Vil ha nyhetsbrev</label>
                  </div>
                </div>
                <div className={`relative flex items-start ${modus === 'velgere' ? 'visible' : 'hidden'}`}>
                  <div className='flex items-center h-5'>
                    <input id='vilHaMedlemsLink' name='vilHaMedlemsLink' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='vilHaMedlemsLink' className='font-medium text-gray-700'>Vil ha link om å bli medlem</label>
                  </div>
                </div>
                <div className={`relative flex items-start ${modus === 'medlemmer' ? 'visible' : 'hidden'}`}>
                  <div className='flex items-center h-5'>
                    <input id='vilHaKoronaprogram' name='vilHaKoronaprogram' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='vilHaKoronaprogram' className='font-medium text-gray-700'>Vil ha korona-program på epost</label>
                  </div>
                </div>
                <div className={`relative flex items-start ${modus === 'medlemmer' ? 'visible' : 'hidden'}`}>
                  <div className='flex items-center h-5'>
                    <input id='vilHaValgkampsbrev' name='vilHaValgkampsbrev' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='vilHaValgkampsbrev' className='font-medium text-gray-700'>Vil ha valgkampsbrev med informasjon om valgkampen</label>
                  </div>
                </div>
                <div className={`relative flex items-start ${modus === 'medlemmer' ? 'visible' : 'hidden'}`}>
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
            Lagre samtalereferat
          </Button>
        </div>
      </form>
    </>
  )
}

export default ResultatSkjema
