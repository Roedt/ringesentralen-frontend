import Link from 'next/link'

const Header = () => {
  return (
    <header className='h-10'>
      <nav className='flex justify-center'>
        <div className='flex space-x-3 text-xl'>
          <Link href='/'><a>Ringesentralen</a></Link>
          <Link href='/ring'><a>Ring neste</a></Link>
          <Link href='/nummeroppslag'><a>Nummeroppslag</a></Link>
          <Link href='/hjelp'><a>Hjelp</a></Link>
          <Link href='/brukere'><a>Brukere</a></Link>
          <Link href='/statistikk'><a>Statistikk</a></Link>
          <Link href='/administrasjon'><a>Administrasjon</a></Link>
        </div>
      </nav>
      <style jsx>
        {`
          a {
            color: #2e3c46;
          }
          a:hover {
            color: #e52437;
          }
        `}
      </style>
    </header>
  )
}

export default Header
