import Samtale from './samtale'

function Samtaler ({ title, samtaler, erMeg }) {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-2'>{title}</h2>
      <ul className='divide-y divide-gray-200'>
        {samtaler && samtaler.map(samtale => <Samtale {...samtale} erMeg={erMeg} key={samtale.tidspunkt + samtale.ringer} />)}
      </ul>
    </div>
  )
}

export default Samtaler
