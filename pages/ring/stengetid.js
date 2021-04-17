import { Warning } from '../../components/ui/alerts'

function StengeTid () {
  const klokkeslett = new Date().getHours()
  if (klokkeslett < 21) return null
  return (
    <div className='mb-4'>
      <Warning message='Vi skal ikke ringe folk etter klokken 21. Ta fri nå. Ha en fin kveld :-)' />
    </div>
  )
}

export default StengeTid
