import 'toasted-notes/src/styles.css'
import { init } from '../utils/sentry'
import '../css/tailwind.css'

init()

export default function App ({ Component, pageProps, err }) {
  return <Component {...pageProps} err={err} />
}
