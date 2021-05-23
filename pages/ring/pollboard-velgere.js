import Minipoll from '../../components/minipoll'
import MinipollCheckbox from '../../components/minipoll-checkbox'

const politiskeSaker = [
  'Øke dagpengenivået, spesielt for lavtlønte',
  'Bruke statens ressurser på å skape miljøvennlige  arbeidsplasser',
  'Erstatte markedsstyring med tillitsreform i  offentlig sektor',
  'Kutt i politikerlønningene',
  'Et mer rettferdig pensjonssystem',
  'Erstatt helseforetakene med en åpen og  demokratisk styringsmodell',
  'Gratis barnehage',
  'Opprettelse av en likelønnspott for å utjevne  lønnsforskjeller basert på kjønn',
  'Øke barnetrygden og holde den utenfor  beregningen av sosialhjelp',
  'Økning i skattene for de superrike',
  'Forby private bemanningsselskaper',
  'Sikre at ingen mister arbeidsavklaringspenger før de er avklart',
  'Gratis tannhelse',
  'Kutte i flate avgifter som ikke tar hensyn til hvor mye du har, hvor du bor eller hvor mye du forbruker',
  'Melde Norge ut av NATO og jobbe for en nordisk forsvarsallianse',
  'Innføring av dynastiskatt, en rettferdig og progressiv skatt på luksusarv',
  'Sekstimers normal-arbeidsdag (30 timers  arbeidsuke)',
  'Sikre urørt natur',
  'Styrke kommuneøkonomien',
  'Erstatte EØS-avtalen med en handelsavtale',
  'Styrke bemanningen i velferden',
  'Postombæring fem dager i uka',
  'Hindre diskriminering og rasisme i boligmarkedet og arbeidslivet',
  'Lovfesting av rett til lærlingplass',
  'Norsk kontroll over kraftpolitikken',
  'Bedre og billigere kollektivtransport',
  'Sikre norske arbeidsplasser i fiskeriet',
  'At asylsøkere skal få jobbe mens de venter på  svar',
  'Stanse leting og utbygging av nye oljefelt',
  'Nei til nye vindkraftanlegg på land',
  'Kutte i egenandelen på helsetjenester',
  'Styrke det norske forsvaret',
  'Ta imot flere asylsøkere og kvoteflyktninger',
  'Sikre at ingen mister dagpengene uten tilbud om jobb eller utdanning',
  'En ikke-kommersiell boligsektor med billigere boliger',
  'Ta tilbake jernbanen i offentlig regi',
  'Innføring av leksefri skole',
  'Profittfri velferd',
  'Si nei til EU-direktiv som svekker fagbevegelsen og rettigheter i arbeidslivet',
  'Bruke deler av oljefondet på å gjøre nødvendige investeringer i utbygging av klimavennlig infrastruktur',
  'Reversering av tvangssammenslåtte fylker og kommuner',
  'Øke sosialstønaden',
  'Økt norsk selvforsyning av mat, medisiner og annet'
]

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
      <MinipollCheckbox
        tema='viktigsteSaker'
        tekst='Hva er de viktigste sakene du synes Rødt skal kjempe for?'
        alternativer={politiskeSaker}
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
