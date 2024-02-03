/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XIcon } from '@heroicons/react/20/solid'

function Toast ({ melding }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!melding) {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [melding])

  return (
    <Transition
      show={show}
      as={Fragment}
      enter='transform ease-out duration-300 transition'
      enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
      enterTo='translate-y-0 opacity-100 sm:translate-x-0'
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='absolute z-10 sm:inset-0 md:inset-32 overflow-y-auto w-full'>
        <div className='max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
          <div className='p-4'>
            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <CheckCircleIcon className='h-6 w-6 text-green-400' aria-hidden='true' />
              </div>
              <div className='ml-3 w-0 flex-1 pt-0.5'>
                <p className='text-sm font-medium text-gray-900'>{melding}</p>
              </div>
              <div className='ml-4 flex-shrink-0 flex'>
                <button
                  className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={() => {
                    setShow(false)
                  }}
                >
                  <span className='sr-only'>Lukk</span>
                  <XIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Toast
