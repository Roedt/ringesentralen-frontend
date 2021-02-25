import Samtaleresultat from './samtaleresultat'
import Statistikkinnslag from './statistikkinnslag'

const StatistikkResponse = ({ statistikk }) => {
  if (!statistikk) return null
  const resultater = statistikk.samtalerStatistikkResponse.resultat

  return (
    <div>
      <h2 className='text-xl font-semibold'>Samtale-statistikk</h2>
      <table className='min-w-full divide-y divide-gray-200'>
        <tbody className='bg-white divide-y divide-gray-200'>
          {resultater && resultater.map(resultat => <Samtaleresultat {...resultat} key={resultat.displaytext} />)}
          <Statistikkinnslag navn='Samtaler med resultat så langt' verdi={statistikk.samtalerStatistikkResponse.samtalerMedResultatSaaLangt} />
        </tbody>
      </table>

      <h2 className='text-xl font-semibold mt-12'>Ringere-statistikk</h2>
      <table className='min-w-full divide-y divide-gray-200'>
        <tbody className='bg-white divide-y divide-gray-200'>
          <Statistikkinnslag navn='Registrerte ringere' verdi={statistikk.ringereStatistikkResponse.registrerteRingere} />
          <Statistikkinnslag navn='Antall som har ringt' verdi={statistikk.ringereStatistikkResponse.antallSomHarRingt} />
          <Statistikkinnslag navn='Aktivere ringere den siste timen' verdi={statistikk.ringereStatistikkResponse.aktiveRingereDenSisteTimen} />
          <Statistikkinnslag navn='Aktivere ringere i dag' verdi={statistikk.ringereStatistikkResponse.aktiveRingereIDag} />
          <Statistikkinnslag navn='Lokale godkjennere' verdi={statistikk.ringereStatistikkResponse.lokaleGodkjennere} />
          <Statistikkinnslag navn='Avviste ringere' verdi={statistikk.ringereStatistikkResponse.avvisteRingere} />
          <Statistikkinnslag navn='Antall lokallag ringt fra totalt' verdi={statistikk.ringereStatistikkResponse.antallLokallagRingtFraTotalt} />
        </tbody>
      </table>

      <h2 className='text-xl font-semibold mt-12'>Personer-statistikk</h2>
      <table className='min-w-full divide-y divide-gray-200'>
        <tbody className='bg-white divide-y divide-gray-200'>
          <Statistikkinnslag navn='Antall personer i systemet totalt' verdi={statistikk.personerStatistikkResponse.antallPersonerISystemetTotalt} />
          <Statistikkinnslag navn='Antall ringere' verdi={statistikk.personerStatistikkResponse.ringere} />
          <Statistikkinnslag navn='Antall ferdigringte' verdi={statistikk.personerStatistikkResponse.ferdigringte} />
          <Statistikkinnslag navn='Antall ringt uten svar' verdi={statistikk.personerStatistikkResponse.ringtUtenSvar} />
          <Statistikkinnslag navn='Antall ikke ringt' verdi={statistikk.personerStatistikkResponse.ikkeRingt} />
          <Statistikkinnslag navn='Antall lokallag med personer tilknytta' verdi={statistikk.personerStatistikkResponse.antallLokallagMedPersonerTilknytta} />
        </tbody>
      </table>
    </div>
  )
}

export default StatistikkResponse
