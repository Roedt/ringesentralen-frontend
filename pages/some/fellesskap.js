import { useAmplitude } from '../../contexts/amplitude-context'

function Fellesskap () {
  const { logAmplitudeEvent } = useAmplitude()

  function handleClick (event) {
    event.preventDefault()
    logAmplitudeEvent('some', {
      handling: 'Går til fellesskapfungerer.no'
    })
    window.location.assign(event.target.href)
  }

  return (
    <div className='text-xl mb-2'>
      <p className='mb-1'>
        Her verver du deg for å bli kun nettaktivist.
      </p>
      <p>
        Dersom du vil hjelpe oss både med sosiale medier og andre ting i tillegg så registrer deg heller på <a href='https://www.fellesskapfungerer.no/' className='underline tracking-wide text-gray-700 hover:bg-gray-100 hover:text-gray-900' onClick={handleClick}>fellesskapfungerer.no</a>
      </p>
    </div>
  )
}

export default Fellesskap
