const Samtale = ({ tidspunkt, ringer, kommentar, resultat, ringtNummer, ringtNavn }) => {
  return (
    <tr className='text-sm font-medium text-gray-900'>
      <td className='px-6 py-4 whitespace-nowrap'>{tidspunkt}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{ringtNavn} ({ringtNummer})</td>
      <td className='px-6 py-4 whitespace-nowrap'>{resultat}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{kommentar}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{ringer}</td>
    </tr>
  )
}

export default Samtale
