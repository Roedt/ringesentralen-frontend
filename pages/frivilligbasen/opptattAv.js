function OpptattAv ({ opptattAv }) {
  if (!opptattAv || opptattAv.length === 0) return null
  return (
    <div>
      <div className='text-l font-semibold text-gray-900'>
        Opptatt av
      </div>
      <div>
        {opptattAv.join(', ')}
      </div>
    </div>
  )
}

export default OpptattAv
