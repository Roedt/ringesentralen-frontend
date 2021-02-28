import Header from './header'
import Nav from './nav'
import Footer from './footer'
import { ProfilContextProvider } from '../contexts/profil-context-provider'

export default function Layout ({ pageTitle, children }) {
  return (
    <ProfilContextProvider>
      <div>
        <Nav />
        <Header pageTitle={pageTitle} />
        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
            <div className='px-4 py-4 sm:px-0'>
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProfilContextProvider>
  )
}
