import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href='/'><a>Ringesentralen</a></Link></li>
          <li><Link href='/ring'><a>Ring neste</a></Link></li>
          <li><Link href='/nummeroppslag'><a>Nummeroppslag</a></Link></li>
          <li><Link href='/hjelp'><a>Hjelp</a></Link></li>
          <li><Link href='/brukere'><a>Brukere</a></Link></li>
          <li><Link href='/statistikk'><a>Statistikk</a></Link></li>
          <li><Link href='/administrasjon'><a>Administrasjon</a></Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
