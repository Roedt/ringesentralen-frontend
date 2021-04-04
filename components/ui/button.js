import Spinner from './spinner'

function Button ({ children, loading, ...props }) {
  return (
    <button
      className='w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-roedt hover:shadow-none flex justify-center'
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

export default Button
