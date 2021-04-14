import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import toaster from 'toasted-notes'

import generatePayload from '../../lib/generate-payload'
import genererLinkmelding from './generer-link-melding'
import Button from '../../components/ui/button'
import Minipoll from '../../components/minipoll'
import { Warning } from '../../components/ui/alerts'

import { is401, is403 } from '../../lib/utils'
import { useAmplitude } from '../../contexts/amplitude-context'

function PollsVelgere () {
  return (
    <>
      <Minipoll
        tema='oktForskjellPandemi'
        tekst='Opplever du at forskjellene har økt som følge av korona-pandemien?'
        alternativer={['Ja', 'Nei', 'Vet ikke']}
      />
      <Minipoll
        tema='oktForskjellGjortNok'
        tekst='Synes du det har blitt gjort nok for å hindre økte forskjeller i denne tida?'
        alternativer={['Ja', 'Nei', 'Vet ikke']}
      />
      <Minipoll
        tema='tannhelse'
        tekst='Er du enig med Rødt i at tannhelse bør være gratis?'
        alternativer={['Svært enig', 'Enig', 'Verken eller', 'Uenig', 'Svært uenig']}
      />
      <Minipoll
        tema='fellesVelferd'
        tekst='Er du enig med Rødt i at skattepenger bevilget til velferd skal gå til felles velferd, ikke privat profitt?'
        alternativer={['Svært enig', 'Enig', 'Verken eller', 'Uenig', 'Svært uenig']}
      />
      <Minipoll
        tema='stemmePaaRoedt'
        tekst='Er Rødt et av partiene du vurderer å stemme på?'
        alternativer={['Ja', 'Nei', 'Vet ikke']}
      />
    </>
  )
}

function ResultatSkjema ({ id, setPerson, modus, telefonnummer }) {
  const router = useRouter()
  const [loading, setLoading] = useState()
  const [errors, setErrors] = useState()
  const { logAmplitudeEvent } = useAmplitude()

  const handleSubmit = async event => {
    event.preventDefault()
    setErrors(false)
    setLoading(true)
    logAmplitudeEvent('ringer', {
      handling: 'Logger samtalereferat',
      modus
    })
    const form = document.getElementById('samtalereferat-form')
    const payload = generatePayload(form)
    const referat = {
      kommentar: payload.kommentar || '',
      modus: modus,
      modusspesifikkeResultat: {
        type: 'Valg21SpesifikkeResultat',
        vilHaKoronaprogram: payload?.vilHaKoronaprogram === 'on',
        vilBliMerAktiv: payload?.vilBliMerAktiv === 'on',
        vilHaValgkampsbrev: payload?.vilHaValgkampsbrev === 'on',
        vilHaMedlemsLink: payload?.vilHaMedlemsLink === 'on',
        vilHaFellesskapLink: payload?.vilHaFellesskapLink === 'on',
        vilHaNyhetsbrevLink: payload?.vilHaNyhetsbrevLink === 'on'
      },
      resultat: payload.resultat,
      ringtID: id,
      vilIkkeBliRingt: payload?.vilIkkeBliRingt === 'on'
    }

    const { vilHaNyhetsbrevLink, vilHaMedlemsLink, vilHaFellesskapLink } = referat.modusspesifikkeResultat

    if (vilHaNyhetsbrevLink || vilHaMedlemsLink || vilHaFellesskapLink) {
      const payload = {
        telefonnummer,
        melding: genererLinkmelding(vilHaNyhetsbrevLink, vilHaMedlemsLink, vilHaFellesskapLink)
      }
      await axios.post('/api/twilio/sendSMS', payload, { withCredentials: true })
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
        setErrors('Fikk ikke lagret samtalen. Vennligst forsøk igjen. Om problemene fortsetter: kontakt oss på Slack')
        console.error(error)
      }
      setLoading(false)
    }
  }

  return (
    <>
      {modus === 'velgere' && <PollsVelgere />}
      <form id='samtalereferat-form' className='space-y-8 divide-y divide-gray-200 mb-4' onSubmit={handleSubmit}>
        <div className={`space-y-8 ${modus === 'medlemmer' ? 'divide-y divide-gray-200' : ''}`}>
          <div className={`${modus === 'medlemmer' ? 'visible' : 'hidden'}`}>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label htmlFor='kommentar' className='block text-sm font-medium text-gray-700'>
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
                    <label htmlFor='resultat-svarte' className='ml-3 block text-sm font-medium text-gray-700'>
                      Svarte
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input id='resultat-passet-ikke' name='resultat' value='Passet_ikke' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                    <label htmlFor='resultat-passet-ikke' className='ml-3 block text-sm font-medium text-gray-700'>
                      Passet ikke
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input id='resultat-ikke-svar' name='resultat' value='Ikke_svar' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                    <label htmlFor='resultat-ikke-svar' className='ml-3 block text-sm font-medium text-gray-700'>
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
                    <input id='vilPolitikkLink' name='vilPolitikkLink' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='vilPolitikkLink' className='font-medium text-gray-700'>Vil ha sms med link Rødts politikk</label>
                  </div>
                </div>
                <div className={`relative flex items-start ${modus === 'velgere' ? 'visible' : 'hidden'}`}>
                  <div className='flex items-center h-5'>
                    <input id='vilHaMedlemsLink' name='vilHaMedlemsLink' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='vilHaMedlemsLink' className='font-medium text-gray-700'>Vil ha sms med link om å bli medlem</label>
                  </div>
                </div>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='vilHaFellesskapLink' name='vilHaFellesskapLink' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='vilHaFellesskapLink' className='font-medium text-gray-700'>Vil ha sms med link til fellesskapfungerer.no</label>
                  </div>
                </div>
                <div className={`relative flex items-start ${modus === 'velgere' ? 'visible' : 'hidden'}`}>
                  <div className='flex items-center h-5'>
                    <input id='vilBliRingtAugus' name='vilBliRingtAugus' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='vilBliRingtAugus' className='font-medium text-gray-700'>Vil bli ringt igjen i august</label>
                  </div>
                </div>
                <div className={`relative flex items-start ${modus === 'medlemmer' ? 'visible' : 'hidden'}`}>
                  <div className='flex items-center h-5'>
                    <input id='vilBliMerAktiv' name='vilBliMerAktiv' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='vilBliMerAktiv' className='font-medium text-gray-700'>Kan tenke seg å være mer aktiv i Rødt framover</label>
                  </div>
                </div>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='vilIkkeBliRingt' name='vilIkkeBliRingt' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='vilIkkeBliRingt' className='font-medium text-gray-700'>Vil ikke bli ringt</label>
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
      {errors && <Warning message={errors} />}
    </>
  )
}

export default ResultatSkjema
