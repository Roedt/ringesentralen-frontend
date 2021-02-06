import { AuthProvider } from '../lib/auth-provider'
import '../css/tailwind.css'

export default function MyApp ({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
