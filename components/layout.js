import Header from './header'
import Nav from './nav'
import Footer from './footer'
import Vannmerke from './vannmerke'

export default function Layout ({ pageTitle, children }) {
  return (
    <div>
      <Vannmerke isDemo={!process.env.NEXT_PUBLIC_IS_PRODUCTION} />
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
  )
}
