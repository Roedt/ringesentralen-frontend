import 'toasted-notes/src/styles.css'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import '../css/tailwind.css'

Sentry.init({
  dsn: 'https://43df61ecc23343df9c559c1e677a3494@o549321.ingest.sentry.io/5671959',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
})

export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
