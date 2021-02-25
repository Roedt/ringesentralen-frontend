const Statistikkinnslag = ({ navn, verdi }) => {
  return (
    <tr className='text-sm font-medium text-gray-900'>
      <td className='px-6 py-4 whitespace-nowrap'>{navn}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{verdi}</td>
    </tr>
  )
}

export default Statistikkinnslag
