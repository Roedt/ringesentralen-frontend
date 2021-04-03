function Kvittering () {
  return (
    <div>
      <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-4'>
        Tusen takk for at du har vervet!
      </h2>
      <button onClick={() => window.location.reload()} className='inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-black hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        Jeg vil verve flere
      </button>
    </div>
  )
}

export default Kvittering
