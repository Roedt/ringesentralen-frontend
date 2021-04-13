import prettyPrintDate from '../../lib/prettyprint-dato'
import Oppfoelging from '../../components/oppfoelging'

const Samtale = ({ tidspunkt, ringer, kommentar, resultat, ringtNummer, ringtNavn, erMeg, oppfoelging }) => {
  return (
    <li className='py-4'>
      <div className='flex space-x-3'>
        <div className='flex-1 space-y-1'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium'>{prettyPrintDate(tidspunkt)} - {ringtNavn} ({ringtNummer})</h3>
            <p className='text-sm text-gray-500'>{resultat}</p>
          </div>
          <p className='text-sm text-gray-500'>
            {kommentar}
            <Oppfoelging oppfoelging={oppfoelging} />
          </p>
          <p className={`${erMeg ? 'hidden' : 'visible'} text-sm text-gray-500 mt-2`}>Ringt av: {ringer}</p>
        </div>
      </div>
    </li>
  )
}

export default Samtale
