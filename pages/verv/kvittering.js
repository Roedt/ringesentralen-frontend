function Kvittering () {
  return (
    <div>
      <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-4'>
        Tusen takk for at du har vervet!
      </h2>
      <button onClick={() => window.location.reload()} className='w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-red-700 hover:shadow-none flex justify-center'>
        Jeg vil verve flere
      </button>
    </div>
  )
}

export default Kvittering
