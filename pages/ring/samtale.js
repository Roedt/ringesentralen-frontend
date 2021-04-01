import { useEffect, useState } from 'react'
import Ringemanus from '../../components/ringemanus'
import ResultatSkjema from './resultatskjema'
import VoIP from './voip'

function Samtale ({ accepted, data, user, setPerson }) {
  const [modus, setModus] = useState('velgere')

  useEffect(() => {
    if (user) {
      setModus(user.aktivtModus)
    }
  }, [user])

  const kanViseKomponent = data && accepted

  if (!kanViseKomponent) return null

  const { person } = data
  const { telefonnummer, id, fylke, lokallag } = person

  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      {telefonnummer && <VoIP telefonnummer={telefonnummer} />}
      <div className='mt-4 flex lg:flex-row md:flex-col'>
        <div className='flex-1 lg:pr-4 md:mb-4'>
          <ResultatSkjema id={id} setPerson={setPerson} modus={modus} telefonnummer={telefonnummer} />
        </div>
        <div className='flex-1 lg:pl-4 md:mb-4'>
          <Ringemanus manus={fylke} modus={modus} lokalLag={`<lokallaget ${lokallag}>`} navn={`<navnet ${user?.email}>`} />
        </div>
      </div>
    </div>
  )
}

export default Samtale
