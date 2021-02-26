const Statistikkinnslag = ({ displaytext, antal }) => {
  return (
    <tr className='text-sm font-medium text-gray-900'>
      <td className='px-6 py-4 whitespace-nowrap'>{displaytext}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{antal}</td>
    </tr>
  )
}

export default Statistikkinnslag
