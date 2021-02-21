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
TWILIO_ACCOUNT_SID=
TWILIO_TWIML_APP_SID=
TWILIO_CALLER_ID=
TWILIO_API_KEY=
TWILIO_API_SECRET=
```

### Twilio
- følger guiden [Browser calls with Node.js and Express](https://www.twilio.com/docs/voice/tutorials/browser-calls-node-express)
- for å teste med et gitt telefonnummer legg til `debugNummer` på `/ring` (`/ring?debugNummer=98765432`)

## Lisens

[MIT](LICENSE)
