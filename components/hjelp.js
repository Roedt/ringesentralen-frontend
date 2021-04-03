import { useState } from 'react'

import { useAmplitude } from '../contexts/amplitude-context'

function Hjelp () {
  const { logAmplitudeEvent } = useAmplitude()
  const [visFaq0, setVisFaq0] = useState()
  const [visFaq1, setVisFaq1] = useState()
  const [visFaq2, setVisFaq2] = useState()
  const [visFaq3, setVisFaq3] = useState()
  const [visFaq4, setVisFaq4] = useState()
  const [visFaq5, setVisFaq5] = useState()
  const [visFaq6, setVisFaq6] = useState()

  function toggleFaq (func, state, spm) {
    func(state)
    if (state) {
      logAmplitudeEvent('faq', {
        handling: `Viser spørsmål ${spm}`
      })
    }
  }

  return (
    <div>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto divide-y-2 divide-gray-200'>
          <h2 className='text-center text-3xl font-extrabold text-gray-900 sm:text-4xl'>
            Slik bruker du ringesentralen
          </h2>
          <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
            <div className='pt-6'>
              <dt className='text-lg'>
                <button type='button' onClick={() => toggleFaq(setVisFaq0, !visFaq0, '0')} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-0' aria-expanded='false'>
                  <span className='font-medium text-gray-900'>
                    For deg som ringar
                  </span>
                  <span className='ml-6 h-7 flex items-center'>
                    <svg className={`${visFaq0 ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className={`mt-2 pr-12 ${visFaq0 ? 'visible' : 'hidden'}`} id='faq-0'>
                <p className='text-base text-gray-500'>
                  Dette systemet hjelper deg å ringe medlemmer eller andre. Systemet viser deg telefonnummer, namn, adresse, lokallag med meir, og så ringer du personen.
                  Systemet vil også vise deg eit forslag til <em>manus</em>, altså kva du kan seie når du snakkar med personen.
                </p>
              </dd>
            </div>
          </dl>
          <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
            <div className='pt-6'>
              <dt className='text-lg'>
                <button type='button' onClick={() => toggleFaq(setVisFaq1, !visFaq1, '1')} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-1' aria-expanded='false'>
                  <span className='font-medium text-gray-900'>
                    Logg inn
                  </span>
                  <span className='ml-6 h-7 flex items-center'>
                    <svg className={`${visFaq1 ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className={`mt-2 pr-12 ${visFaq1 ? 'visible' : 'hidden'}`} id='faq-1'>
                <p className='text-base text-gray-500'>
                  Du loggar inn med samme brukarnamn og passord som du bruker for å logge inn på Hypersys (partiets medlemssystem).
                  Har du ikkje logga inn der før, bruk <em>glemt passord</em>-lenka på innloggingssida, så vil du få moglegheit til å setje eit passord.
                </p>
                <p className='text-base text-gray-500'>
                  Når det er gjort er du registrert, og du kan logge inn her på Ringesentralen.
                </p>
                <p className='text-base text-gray-500'>Derimot vil ingen funksjonalitet vera tilgjengeleg umiddelbart: Før du kan starte å ringe, må ein administrator eller lokal godkjenner godkjenne at du er klar til å starte å ringe.
                  Når dette er klart, vil du få ein epost frå systemet. Da kan du logge deg inn og starte ringinga.
                </p>
                <p className='text-base text-gray-500'>
                  Viss du ikkje får tilgang da, logg ut og inn igjen.
                </p>
              </dd>
            </div>
          </dl>
          <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
            <div className='pt-6'>
              <dt className='text-lg'>
                <button type='button' onClick={() => toggleFaq(setVisFaq2, !visFaq2, '2')} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-2' aria-expanded='false'>
                  <span className='font-medium text-gray-900'>
                    Ring
                  </span>
                  <span className='ml-6 h-7 flex items-center'>
                    <svg className={`${visFaq2 ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className={`mt-2 pr-12 ${visFaq2 ? 'visible' : 'hidden'}`} id='faq-2'>
                <p className='text-base text-gray-500'>
                  Sjølve ringinga gjer du helst gjennom systemet.
                  Når du startar samtalen her inne på Ringesentralen, får du moglegheita til å ringe gjennom systemet. Da vil mottakaren få opp at det er Raudt som har prøvd å ringe hen,
                  og også få eit telefonnummer å ringe tilbake til som tar hen til valkampsentralen.
                </p>
                <p className='text-base text-gray-500'>
                  Skulle du ønskje det, eller det er noko teknisk problematisk, kan du også ringe personen frå din eigen telefon. Nummeret du skal ringe vil visast under personens namn.
                </p>
                <p className='text-base text-gray-500'>
                  Det er viktig at du mot slutten eller etter samtalen registrerer resultat av samtalen - eksempelvis at personen svarte og vil ha valgkampsbrev frå oss.
                  Marker om personen svarte eller ikkje. I tillegg er det sjekkboksar, som du kan krysse viss svaret er ja, og la vera blanke viss svaret er nei:
                </p>
              </dd>
            </div>
          </dl>
          <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
            <div className='pt-6'>
              <dt className='text-lg'>
                <button type='button' onClick={() => toggleFaq(setVisFaq3, !visFaq3, '3')} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-3' aria-expanded='false'>
                  <span className='font-medium text-gray-900'>
                    Personen tok ikkje telefonen
                  </span>
                  <span className='ml-6 h-7 flex items-center'>
                    <svg className={`${visFaq3 ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className={`mt-2 pr-12 ${visFaq3 ? 'visible' : 'hidden'}`} id='faq-3'>
                <p className='text-base text-gray-500'>
                  Om nokon ikkje tok telefonen, eller av andre grunnar ringer deg tilbake seinare, kan du gå inn på <em>Noen ringer tilbake</em>. Der vil du få opp namn og den andre informasjonen om personen, pluss ringemanuset.
                </p>
                <p className='text-base text-gray-500'>
                  Personar som er ringt og som svarte, vil ikkje dukke opp i systemet på ny. Viss ein person ikkje svarte, eller det ikkje passa, vil denne dukke opp igjen etter eit døgn.
                </p>
                <p className='text-base text-gray-500'>
                  Viss du gjekk inn på ring neste, men ikkje fekk ringt personen lell, og du ikkje registrerer noko resultat, vil personen dukke opp i systemet igjen etter 30 minutt.
                </p>
                <p className='text-base text-gray-500'>
                  Hugs at informasjonen du får tilgang til her er taushetsbelagt. Ikkje bruk informasjonen i andre samanhengar eller andre stadar.
                  Når du klikkar på <em>Ring</em>-sida, loggar vi at det startar ein samtale mellom deg og den du skal ringe.
                  Vi loggar også resultatet du registrerer frå samtalen, og tidspunkt.
                  Dette gjer vi for å ha oversikt over kva informasjon vi har vist fram, og til kven, og for at systemet skal fungere ordentleg (så ikkje samme person blir ringt av to ringarar samtidig, for eksempel).
                </p>
                <p className='text-base text-gray-500'>
                  Lokallag kan ha ein lokal person som har status som lokal godkjenner av ringarar. Denne personen har alle moglegheitene ein ringar har, og kan i tillegg godkjenne ringarar i sitt lokallag.
                </p>
              </dd>
            </div>
          </dl>
          <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
            <div className='pt-6'>
              <dt className='text-lg'>
                <button type='button' onClick={() => toggleFaq(setVisFaq4, !visFaq4, '4')} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-4' aria-expanded='false'>
                  <span className='font-medium text-gray-900'>
                    Administrasjonsverktøy
                  </span>
                  <span className='ml-6 h-7 flex items-center'>
                    <svg className={`${visFaq4 ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className={`mt-2 pr-12 ${visFaq4 ? 'visible' : 'hidden'}`} id='faq-4'>
                <p className='text-base text-gray-500'>
                  Vi som driftar systemet har tilgang til nokre ekstra administrasjonsverktyg: vi kan
                  <ul className='list-disc mb-6 ml-4'>
                    <li>godkjenne nye ringarar</li>
                    <li>sjå den fullstendige lista over alle ringarar</li>
                    <li>sjå ekstra statistikk</li>
                    <li>deaktivere ein ringar</li>
                    <li>gi ein ringar moglegheit til å godkjenne lokale ringarar (og til å ta bort denne moglegheita igjen)</li>
                  </ul>
                </p>
                <p className='text-base text-gray-500'>
                  Når ringeprosjektet er over for denne gong, vil vi hente ut resultata og følge dei opp vidare.
                </p>
              </dd>
            </div>
          </dl>
          <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
            <div className='pt-6'>
              <dt className='text-lg'>
                <button type='button' onClick={() => toggleFaq(setVisFaq5, !visFaq5, '5')} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-5' aria-expanded='false'>
                  <span className='font-medium text-gray-900'>
                    Noko du ikkje fekk svar på her?
                  </span>
                  <span className='ml-6 h-7 flex items-center'>
                    <svg className={`${visFaq5 ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className={`mt-2 pr-12 ${visFaq5 ? 'visible' : 'hidden'}`} id='faq-5'>
                <p className='text-base text-gray-500'>
                  Takk for at du bidreg! Er det noko du lurer på, still gjerne spørsmål på <a className='text-blue-600 underline' href='https://roedtorg.slack.com/archives/C01BNKD2RU0'>Slack</a>, på kanalen #ringesentralen.
                  Finn du tekniske feil eller andre ting du reagerer på, sett vi som lager systemet stor pris på om du rapporterer det,
                  helst på  <a className='text-blue-600 underline' href='https://roedtorg.slack.com/archives/C01BNKD2RU0'>Slack</a>.
                  Der vil sannsynlegvis Mads Opheim svare deg om tekniske ting, Reidar Strisland eller Kristoffer Lerstang om innhald og den slags.
                </p>
              </dd>
            </div>
          </dl>
          <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
            <div className='pt-6'>
              <dt className='text-lg'>
                <button type='button' onClick={() => toggleFaq(setVisFaq6, !visFaq6, '6')} className='text-left w-full flex justify-between items-start text-gray-400' aria-controls='faq-0' aria-expanded='false'>
                  <span className='font-medium text-gray-900'>
                    Hva er nytt i Ringesentralen v2?
                  </span>
                  <span className='ml-6 h-7 flex items-center'>
                    <svg className={`${visFaq6 ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform`} xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className={`mt-2 pr-12 ${visFaq6 ? 'visible' : 'hidden'}`} id='faq-6'>
                <p className='text-base text-gray-500'>
                  <ul className='list-disc pl-4'>
                    <li className='mb-1'>Du kan no logge inn med Hypersys-brukaren din. Det gjer også at du har automatisk funksjonalitet for gløymt passord.</li>
                    <li className='mb-1'>Du får epost når du har vorte godkjent som ringar, eller om du etter avtale er gjort til lokal godkjenner som kan godkjenne andre frå ditt lag som ringarar.</li>
                    <li className='mb-1'>Du kan no ringe direkte frå systemet. Når du har fått opp ein person å ringe, kan du frå inne i systemet klikke på ein knapp og så vil systemet setje opp samtalen. Mottakaren vil da bli ringt frå eit Raudt-tilknytta nummer.</li>
                    <li className='mb-1'>Du kan no avstå frå å ringe ein person, ved hjelp av ein avslå-knapp.</li>
                    <li className='mb-1'>Du kan no enkelt ta pausar mellom ringinga.</li>
                    <li className='mb-1'>Systemet er basert på ein heilt ny og trygg teknisk plattform.</li>
                    <li className='mb-1'>Systemet skalerer automatisk ved behov, så det er ingen risiko for at det blir overlasta.</li>
                    <li className='mb-1'>Vi har satt opp eit separat testmiljø der ny funksjonalitet kan testast ut.</li>
                    <li className='mb-1'>Teknisk raskt å utvikle og rulle ut ny funksjonalitet.</li>
                    <li className='mb-1'>Du kan som ringer selv endre hvilken type brukere du skal kontakte (medlemmer eller velgere)</li>
                    <li className='mb-1'>Når noen ringer tilbake (gitt at de er ringt fra den innebygde telefonen i systemet) kommer de til en telefonsvarer hvor de selv kan velge om vi skal forsøke å ringe påny eller om de ønsker å være i fred.</li>
                  </ul>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Hjelp
