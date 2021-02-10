import Head from 'next/head'
import Layout from '../components/layout'

const Hjelp = () => {
  return (
    <Layout pageTitle='Hjelp'>
      <Head>
        <title>Hjelpeside</title>
      </Head>
      <div class="rounded-xl bg-gray-100 p-8 md:p-8">
    <h2 class="text-xl font-semibold mb-2">For deg som ringar</h2>
    <p>Dette systemet hjelper deg å ringe medlemmer eller andre. Systemet viser deg telefonnummer, namn, adresse, lokallag med meir, og så ringer du personen.
    Systemet vil også vise deg eit forslag til <em>manus</em>, altså kva du kan seie når du snakkar med personen.</p>

    <p>Det er viktig at du mot slutten eller etter samtalen registrerer resultat av samtalen - eksempelvis at personen svarte og vil ha valgkampsbrev frå oss. 
    Marker om personen svarte eller ikkje. I tillegg er de tre sjekkboksar, som du kan krysse viss svaret er ja, og la vera blanke viss svaret er nei:</p>
    <ul class="list-disc ml-4 mb-4 mt-2">
        <li>Vil ha korona-program på epost</li>
        <li>Kan tenke seg å være mer aktiv i Rødt framover</li>
        <li>Vil ha valgkampsbrev med informasjon om valgkampen</li>
    </ul>

    <p>Om nokon ikkje tok telefonen, eller av andre grunnar ringer deg tilbake seinare, kan du gå inn på <em>Noen ringer tilbake</em>. Der vil du få opp namn og den andre informasjonen om personen, pluss ringemanuset.</p>

    <p>Personar som er ringt og som svarte, vil ikkje dukke opp i systemet på ny. Viss ein person ikkje svarte, eller det ikkje passa, vil denne dukke opp igjen etter eit døgn.</p>

    <p>Viss du gjekk inn på ring neste, men ikkje fekk ringt personen lell, og du ikkje registrerer noko resultat, vil personen dukke opp i systemet igjen etter 30 minutt.</p>

    <p>Hugs at informasjonen du får tilgang til her er taushetsbelagt. Ikkje bruk informasjonen i andre samanhengar eller andre stadar. 
    Når du klikkar på <em>Ring</em>-sida, loggar vi at det startar ein samtale mellom deg og den du skal ringe. 
    Vi loggar også resultatet du registrerer frå samtalen, og tidspunkt.
    Dette gjer vi for å ha oversikt over kva informasjon vi har vist fram, og til kven, og for at systemet skal fungere ordentleg (så ikkje samme person blir ringt av to ringarar samtidig, for eksempel).
    </p>

    <p>Lokallag kan ha ein lokal person som har status som lokal godkjenner av ringarar. Denne personen har alle moglegheitene ein ringar har, og kan i tillegg godkjenne ringarar i sitt lokallag.</p>

    <hr class="m-4" />
    <h2 class="text-xl font-semibold mb-2">Administrasjonsverktøy</h2>
    <p>Vi som driftar systemet har tilgang til nokre ekstra administrasjonsverktyg: vi kan 
        <ul class="list-disc mb-6 ml-4">
            <li>godkjenne nye ringarar</li>
            <li>sjå den fullstendige lista over alle ringarar</li>
            <li>sjå ekstra statistikk</li>
            <li>slette all informasjon vi har om ein person</li>
            <li>deaktivere ein ringar</li>
            <li>gi ein ringar moglegheit til å godkjenne lokale ringarar (og til å ta bort denne moglegheita igjen)</li>
        </ul>
    </p>

    <p>Når ringeprosjektet er over for denne gong, vil vi hente ut resultata og følge dei opp vidare.</p>

    <hr class="m-4" />
    <h2 class="text-xl font-semibold mb-2">Noko du ikkje fekk svar på her?</h2>
    <p>Takk for at du bidreg! Er det noko du lurer på, still gjerne spørsmål på <a href="https://roedtorg.slack.com/archives/C01BNKD2RU0">Slack</a>, på kanalen #ringesentralen. 
    Finn du tekniske feil eller andre ting du reagerer på, sett vi som lager systemet stor pris på om du rapporterer det, 
    helst på  <a href="https://roedtorg.slack.com/archives/C01BNKD2RU0">Slack</a>.
    Der vil sannsynlegvis Mads Opheim svare deg om tekniske ting, Reidar Strisland eller Kristoffer Lerstang om innhald og den slags.
    </p>
    </div>
    </Layout>
  )
}

export default Hjelp
