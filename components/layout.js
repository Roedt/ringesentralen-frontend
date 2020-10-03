import Header from './header'
import Footer from './footer'

export default function Layout ({ children }) {
  return (
    <div className='flex flex-row justify-center'>
      <div className='flex flex-col h-screen justify-between container-xl'>
        <Header />
        <main className='mb-auto'>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
