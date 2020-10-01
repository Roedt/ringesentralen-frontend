import { version } from '../package.json'

export default function Footer () {
  return (
    <footer className='h-10 flex justify-center'>
      {version}
    </footer>
  )
}
