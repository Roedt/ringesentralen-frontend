const Ekspanderbar = ({ onClick, erEkspandert, tittel }) => {
    return (
        <button
          type='button' onClick={onClick}
          className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-0' aria-expanded='false'
        >
          <span className='font-big text-gray-900 underline'>
            {tittel}
          </span>
          <span className='ml-6 h-7 flex items-center'>
            <svg className={`${erEkspandert ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
            </svg>
          </span>
        </button>
    )
}

export default Ekspanderbar