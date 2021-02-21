function ResultatSkjema () {
  const SendKnapp = () => {
    return (
      <button type='button' onClick={() => window.alert('Ikke implementert')} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z' />
        </svg>
        <span>
          Lagre oppsummering
        </span>
      </button>
    )
  }

  const AvbrytKnapp = () => {
    return (
      <button type='button' onClick={() => window.alert('Ikke implementert')} className='w-48 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16' aria-hidden='true'>
          <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
        </svg>
        <span>
          Avbryt
        </span>
      </button>
    )
  }

  return (
    <>
      <form className='space-y-8 divide-y divide-gray-200'>
        <div className='space-y-8 divide-y divide-gray-200'>
          <div>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Samtalereferat
              </h3>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label for='about' className='block text-sm font-medium text-gray-700'>
                  Kommentarer
                </label>
                <div className='mt-1'>
                  <textarea id='about' name='about' rows='3' className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md' />
                </div>
                <p className='mt-2 text-sm text-gray-500'>Ekstra informasjon for senere samtaler eller til lokallaget.</p>
              </div>
            </div>
          </div>

          <div className='pt-8'>
            <div className='mt-6'>
              <fieldset className='mt-6'>
                <div>
                  <legend className='text-base font-medium text-gray-900'>
                    Resultat av oppringing
                  </legend>
                </div>
                <div className='mt-4 space-y-4'>
                  <div className='flex items-center'>
                    <input id='push_everything' name='push_notifications' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                    <label for='push_everything' className='ml-3 block text-sm font-medium text-gray-700'>
                      Svarte
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input id='push_email' name='push_notifications' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                    <label for='push_email' className='ml-3 block text-sm font-medium text-gray-700'>
                      Passet ikke
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input id='push_nothing' name='push_notifications' type='radio' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300' />
                    <label for='push_nothing' className='ml-3 block text-sm font-medium text-gray-700'>
                      Svarte ikke
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <div className='mt-6'>
            <fieldset>
              <legend className='text-base font-medium text-gray-900'>
                Ønsker
              </legend>
              <div className='mt-4 space-y-4'>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='comments' name='comments' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='comments' className='font-medium text-gray-700'>Vil ha korona-program på epost</label>
                  </div>
                </div>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='candidates' name='candidates' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='candidates' className='font-medium text-gray-700'>Vil ha valgkampsbrev med informasjon om valgkampen</label>
                  </div>
                </div>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='offers' name='offers' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='offers' className='font-medium text-gray-700'>Kan tenke seg å være mer aktiv i Rødt framover</label>
                  </div>
                </div>
                <div className='relative flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='ikke-ring' name='ikke-ring' type='checkbox' className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='ikke-ring' className='font-medium text-gray-700'>Vil ikke bli ringt</label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className='pt-5'>
          <div className='ml-4 mt-4 flex-shrink-0 flex justify-end space-x-4'>
            <AvbrytKnapp />
            <SendKnapp />
          </div>
        </div>
      </form>
    </>
  )
}

export default ResultatSkjema
