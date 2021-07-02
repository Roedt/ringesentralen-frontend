import { useEffect, useState } from 'react'
import Ringemanus from '../../components/ringemanus'
import ResultatSkjema from './resultatskjema'
import PollboardVelgere from './pollboard-velgere'
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
  const { telefonnummer, id, fylke, lokallagNavn, fornavn, etternavn } = person
  const navnTilDenSomringes = `${fornavn} ${etternavn}`

  const ManusMedlemmer = () => {
    return (
      <>
        <Ringemanus
          manus={fylke}
          modus={modus}
          lokalLag={lokallagNavn}
          navn={`${user?.navn}`}
          navnTilDenSomringes={navnTilDenSomringes}
        />
      </>
    )
  }

  const ManusVelgere = () => {
    return (
      <>
        <Ringemanus
          manus='innledning'
          modus={modus}
          lokalLag={lokallagNavn}
          navn={`${user?.navn}`}
          navnTilDenSomringes={navnTilDenSomringes}
        />
        <PollboardVelgere fylke={fylke} />
        <Ringemanus
          manus='avslutning'
          modus={modus}
          lokalLag={lokallagNavn}
          navn={`${user?.navn}`}
          navnTilDenSomringes={navnTilDenSomringes}
        />
      </>
    )
  }

  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      {telefonnummer && <VoIP telefonnummer={telefonnummer} />}
      <div className='mt-4'>
        {modus === 'velgere' ? <ManusVelgere /> : <ManusMedlemmer />}
        <ResultatSkjema id={id} setPerson={setPerson} modus={modus} telefonnummer={telefonnummer} />
      </div>
    </div>
  )
}

export default Samtale
