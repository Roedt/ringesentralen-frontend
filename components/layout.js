import Header from './header'
import Footer from './footer'

export default function Layout ({ children }) {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Header />
      <main className='mb-auto'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
