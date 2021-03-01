import prettyPrintDate from '../../lib/prettyprint-dato'

const Samtale = ({ tidspunkt, ringer, kommentar, resultat, ringtNummer, ringtNavn }) => {
  return (
    <tr className='text-sm font-medium text-gray-900'>
      <td className='px-6 py-4 whitespace-nowrap'>{prettyPrintDate(tidspunkt)}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{ringtNavn} ({ringtNummer})</td>
      <td className='px-6 py-4 whitespace-nowrap'>{resultat}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{kommentar}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{ringer}</td>
    </tr>
  )
}

export default Samtale
