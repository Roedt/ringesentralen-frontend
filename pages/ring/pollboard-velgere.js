import Minipoll from '../../components/minipoll'

function PollboardVelgere () {
  return (
    <>
      <Minipoll
        tema='oktForskjellPandemi'
        tekst='Opplever du at forskjellene har økt som følge av korona-pandemien?'
        alternativer={['Ja', 'Nei', 'Vet ikke']}
      />
      <Minipoll
        tema='oktForskjellGjortNok'
        tekst='Synes du det har blitt gjort nok for å hindre økte forskjeller i denne tida?'
        alternativer={['Ja', 'Nei', 'Vet ikke']}
      />
      <Minipoll
        tema='tannhelse'
        tekst='Er du enig med Rødt i at tannhelse bør være gratis?'
        alternativer={['Svært enig', 'Enig', 'Verken eller', 'Uenig', 'Svært uenig']}
      />
      <Minipoll
        tema='fellesVelferd'
        tekst='Er du enig med Rødt i at skattepenger bevilget til velferd skal gå til felles velferd, ikke privat profitt?'
        alternativer={['Svært enig', 'Enig', 'Verken eller', 'Uenig', 'Svært uenig']}
      />
      <Minipoll
        tema='stemmePaaRoedt'
        tekst='Er Rødt et av partiene du vurderer å stemme på?'
        alternativer={['Ja', 'Nei', 'Vet ikke']}
      />
    </>
  )
}

export default PollboardVelgere
