import Aktiviteter from './aktiviteter'

function Frivillig ({ data }) {
  if (!data) return (<div />)
  const { frivillig, person, aktiviteter, fylke, lokallag } = data
  if (!frivillig) return (<div />)
  return (
    <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
      <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
        <div className='ml-4 mt-2'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>{person.fornavn} {person.etternavn}</h3>
        </div>
        <div className='ml-4 mt-2 flex-shrink-0'>
          <button type='button' className='w-48 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <svg className='-ml-1 mr-2 h-5 w-5 text-gray-400' xmlns='https://www.w3.org/2000/svg' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
            </svg>
            <span>
              Kontaktlogg
            </span>
          </button>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='ml-4'>
          <div className='text-sm text-gray-900'>
            Epost: {person.email}
          </div>
          <div className='text-sm text-gray-900'>
            Telefon: {person.telefonnummer}
          </div>
          <div className='text-sm text-gray-900'>
            Nærmeste lokallag: {lokallag.navn}
          </div>
          <div className='text-sm text-gray-900'>
            Postnummer {person.postnummer} (fylke: {fylke.navn})
          </div>
          <table>
            <tbody>
            <tr>
              <td>Allerede aktiv i lokallag?</td>
              <td>{frivillig.alleredeAktivILokallag ? "Ja" : "Nei"}</td>
            </tr>
            <tr>
              <td>Er allerede medlem i Rødt?</td>
              <td>{frivillig.medlemIRoedt}</td>
            </tr>
            <tr>
              <td>Spesiell kompetanse?</td>
              <td>{frivillig.spesiellKompetanse}</td>
            </tr>
            <tr>
              <td>Andre ting du vil bidra med?</td>
              <td>{frivillig.andreTingDuVilBidraMed}</td>
            </tr>
            <tr>
              <td>Fortell litt om deg selv</td>
              <td>{frivillig.fortellLittOmDegSelv}</td>
            </tr>
            </tbody>
          </table>
          </div>
      </div>
      <Aktiviteter aktiviteter={aktiviteter} />
    </div>
  )
}

export default Frivillig
