function OpptattAv ({ opptattAv }) {
  if (!opptattAv || opptattAv.length === 0) return null
  return (
    <div>
      <small className='text-gray-900'>Opptatt av: {opptattAv.join(', ')}</small>
    </div>
  )
}

export default OpptattAv
