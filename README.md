[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# ringesentralen-frontend

Frontend for ringesentralen.

Se demoversjon på [ringesentralen.raudt.party](https://ringesentralen.raudt.party/)

## Utvikling

Du trenger [Node.js](https://nodejs.org/) >= 12 

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
NEXT_PUBLIC_HYPERSYS_BASE_URL=url til Hypersys
NEXT_PUBLIC_SENTRY_DSN=url til Sentry
NEXT_PUBLIC_IS_PRODUCTION= dersom denne er satt vises ikke demo-banneret på toppen
TWILIO_ACCOUNT_SID=id til twilio kontoen
TWILIO_TWIML_APP_SID=sid til twiml appen for VoPI
TWILIO_CALLER_ID=telefonnummer som er satt opp på twilio
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

### Sesjoner
- Bruker stateless sesjonshåndtering med `next-iron-session`
- Mer eller mindre plukket direkte fra [det offisielle eksempelrepoet](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session)

### Scripts
- test og lint `npm t`
- test:watch `npm run test:watch`
- lint `npm run lint`
- lint:fix `npm run lint:fix`
- oppdatere avhengigheter opp til og med minor `npm run bump`
- slette node_modules og oppdatere package-lock `npm run refresh`


## Lisens

[MIT](LICENSE)
