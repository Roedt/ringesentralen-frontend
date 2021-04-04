function Vannmerke ({ isDemo }) {
  if (!isDemo) return null

  return (
    <div className='flex justify-center bg-roedt text-white'>
      Demo
    </div>
  )
}

export default Vannmerke
