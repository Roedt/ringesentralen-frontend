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
ENCRYPTOR_KEY=Nøkkel for kryptering av cookie
COOKIE_NAME=Navn på cookie
NEXT_PUBLIC_HYPERSYS_BASE_URL=url til hypersys
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

## Lisens

[MIT](LICENSE)
