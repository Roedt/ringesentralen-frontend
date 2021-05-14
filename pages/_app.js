import 'toasted-notes/src/styles.css'
import { init } from '../utils/sentry'
import { AmplitudeProvider } from '../contexts/amplitude-context'
import { ToastProvider } from '../contexts/toast-context'
import '../css/tailwind.css'

init()

export default function App ({ Component, pageProps, err }) {
  return (
    <AmplitudeProvider>
      <ToastProvider>
        <Component {...pageProps} err={err} />
      </ToastProvider>
    </AmplitudeProvider>
  )
}
