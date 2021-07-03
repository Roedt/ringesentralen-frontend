import { useAmplitude } from '../contexts/amplitude-context'
import lageEnumvennligStreng from '../lib/lag-enumvennlig-streng'

function MinipollCheckbox ({ tekst, tema, alternativer, fylke, visForFylker }) {
  const { logAmplitudeEvent } = useAmplitude()

  if (!tema && !tekst) return null

  // Dersom det sendes med array av fylker, sjekk om spm skal vises for de
  if (visForFylker && Array.isArray(visForFylker)) {
    if (!visForFylker.includes(fylke)) {
      return null
    }
  }

  function registrerSvar (event) {
    if (event.target.checked) {
      const svar = event.target.value
      logAmplitudeEvent('poll', {
        tema,
        svar
      })
    }
  }

  function CheckBox ({ alternativ }) {
    const key = lageEnumvennligStreng(alternativ)
    return (
      <div className='relative flex items-start'>
        <div className='flex items-center h-5'>
          <input id={key} name={key} value={alternativ} onChange={registrerSvar} type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
        </div>
        <div className='ml-3 text-base'>
          <label htmlFor={key} className='font-medium text-gray-700'>{alternativ}</label>
        </div>
      </div>
    )
  }

  return (
    <div className='my-4 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg'>
      <h1 className='text-lg mb-2'>{tekst}</h1>
      <div>
        {alternativer.map((alternativ, index) => <CheckBox alternativ={alternativ} key={`poll-chkbx-alternativ-${index}`} />)}
      </div>
    </div>
  )
}

export default MinipollCheckbox
