import '../css/tailwind.css'
import 'toasted-notes/src/styles.css'

export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
