import '../css/tailwind.css'
import 'toasted-notes/src/styles.css'
import Vannmerke from '../components/vannmerke'

export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Vannmerke isDemo />
      <Component {...pageProps} />
    </>
  )
}
