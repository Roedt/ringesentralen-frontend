[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# ringesentralen-frontend

Frontend for ringesentralen til Rødt.

Se demoversjon på [test.ringesentralen.no](https://test.ringesentralen.no/)

## Utvikling

Du trenger [Node.js](https://nodejs.org/) >= 14

- klon repoet
- installer avhengigheter `npm i`
- start dev server `npm run dev`
- besøk appen på [http://localhost:3000](http://localhost:3000)
- sett opp en lokal `.env`

```
API_URL=url til APIet
API_AUTH_KEY=Nøkkel for loginkallet
COOKIE_NAME=Navn på cookie
COOKIE_SECRET=Nøkkel for kryptering, minst 32 tegn
ENCRYPTION_KEY=Nøkkel for kryptering av brukernavn og passord, 32 tegn
NEXT_PUBLIC_AMPLITUDE_API_KEY=Nøkkel for logging til Amplitude
NEXT_PUBLIC_HYPERSYS_BASE_URL=url til Hypersys
NEXT_PUBLIC_SENTRY_DSN=url til Sentry
NEXT_PUBLIC_IS_PRODUCTION=dersom denne er satt vises ikke demo-banneret på toppen
NEXT_PUBLIC_TILLAT_DEBUGNUMMER=dersom denne er satt kan du overstyre nummeret fra databasen med valgt nummer (til testing)
NEXT_PUBLIC_RECAPTCHA_SITE_ID=site id for reCaptcha (brukes på vervesiden)
RECAPTCHA_SECRET=secret for verifisering av reCaptcha
SERVICEBRUKER_BRUKERNAVN=brukernavn for servicebrukeren som skal registrere svar fra telefonsvareren
SERVICEBRUKER_PASSORD=passord for servicebrukeren
TWILIO_ACCOUNT_SID=id til twilio kontoen
TWILIO_AUTH_TOKEN=token til twilio konto, brukes til sms
TWILIO_TWIML_APP_SID=sid til twiml appen for VoPI
TWILIO_CALLER_ID=telefonnummer som er satt opp for voice hos twilio
TWILIO_SMS_ID=id for enveis meldinger (Alpha numeric id hos Twilio)
TWILIO_SMS_NUMMER=nummer for toveis meldinger (telfonnummer med sms kapabilitet hos Twilio)
TWILIO_INCOMING_HANDLER=telefonnummer vi ønsker å videresende innkommende samtaler til
TWILIO_API_KEY=api key hos twilio
TWILIO_API_SECRET=api secret hos twilio
```

### Twilio

- følger guiden [Browser calls with Node.js and Express](https://www.twilio.com/docs/voice/tutorials/browser-calls-node-express)
- for å teste med et gitt telefonnummer legg til `debugNummer` på `/ring` (`/ring?debugNummer=98765432`) i test må dette være et nummer som er godkjent via twiliokonsollen
- `/api/twilio/token` oppretter token mot twilo basert på nøkler og apier
- `/api/twilio/connect` lager twiml som svar på Twilios webhook (bruk f.eks. [ngrok](https://ngrok.com/) for å nå lokal maskin under utvikling)

### Ringemanus

- Det lages ringemanus for hvert valgdistrikt
- Manus skrives i markdown og legges i mappen `public/ringemanus/<velgere|medlemmer>/<fylkesnummer>.md`
- Du kan bruke handlebars i manus for å erstatte `{{navn}}` og `{{lokalLag}}`

### Sesjoner

- Bruker stateless sesjonshåndtering med `next-iron-session`
- Mer eller mindre plukket direkte fra [det offisielle eksempelrepoet](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session)

### Scripts

- test og lint `npm t`
- test:watch `npm run test:watch`
- lint `npm run lint`
- lint:fix `npm run lint:fix`
- oppdatere avhengigheter opp til og med minor `npm run bump` - ikke så nyttig etter at `renovate` er satt opp på repoet
- slette node_modules og oppdatere package-lock `npm run refresh`

## Deploy

Det er satt opp automatikk så alle push til `main` starter bygg og deploy til test og produksjonsmiljø

## Konfigurasjon

I filen [settings.js](settings.js) kan du slå av og på ulik funksjonalitet.
- `tillatSkifteModus` er denne `true` kan brukerne veksle melllom å ringe medlemmer eller velgere

## Lisens

[MIT](LICENSE)
