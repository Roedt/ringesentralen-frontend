import Statistikkinnslag from './statistikkinnslag'
import { useEffect, useState } from 'react'

const StatistikkResponse = ({ statistikk, user }) => {
  if (!statistikk) return null

  const [erAdmin, setErAdmin] = useState(false)
  const [erRinger, setErRinger] = useState(false)

  useEffect(() => {
    if (user && user.rolle) {
      setErAdmin(user?.rolle.includes('admin'))
      setErRinger(user?.rolle.includes('ringer'))
    }
  }, [user])

  const resultater = statistikk.samtalerStatistikkResponse.resultat

  const SamtalerStatistikk = () => {
    if (!statistikk) return null
    return (
      <div>
        <h2 className='text-xl font-semibold'>Samtale-statistikk</h2>
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='bg-white divide-y divide-gray-200'>
            {resultater && resultater.map(resultat => <Statistikkinnslag {...resultat} key={resultat.displaytext} />)}
            <Statistikkinnslag displaytext='Samtaler med resultat så langt' antal={statistikk.samtalerStatistikkResponse.samtalerMedResultatSaaLangt} />
          </tbody>
        </table>
      </div>
    )
  }

  const RingereStatistikk = () => {
    if (!statistikk) return null
    return (
      <div>
        <h2 className='text-xl font-semibold mt-12'>Ringere-statistikk</h2>
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='bg-white divide-y divide-gray-200'>
            <Statistikkinnslag displaytext='Registrerte ringere' antal={statistikk.ringereStatistikkResponse.registrerteRingere} />
            <Statistikkinnslag displaytext='Antall som har ringt' antal={statistikk.ringereStatistikkResponse.antallSomHarRingt} />
            <Statistikkinnslag displaytext='Aktive ringere den siste timen' antal={statistikk.ringereStatistikkResponse.aktiveRingereDenSisteTimen} />
            <Statistikkinnslag displaytext='Aktive ringere i dag' antal={statistikk.ringereStatistikkResponse.aktiveRingereIDag} />
            <Statistikkinnslag displaytext='Lokale godkjennere' antal={statistikk.ringereStatistikkResponse.lokaleGodkjennere} />
            <Statistikkinnslag displaytext='Avviste ringere' antal={statistikk.ringereStatistikkResponse.avvisteRingere} />
            <Statistikkinnslag displaytext='Antall lokallag ringt fra totalt' antal={statistikk.ringereStatistikkResponse.antallLokallagRingtFraTotalt} />
          </tbody>
        </table>
      </div>
    )
  }

  const PersonerStatistikk = () => {
    if (!statistikk) return null
    return (
      <div>
        <h2 className='text-xl font-semibold mt-12'>Personer-statistikk</h2>
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='bg-white divide-y divide-gray-200'>
            <Statistikkinnslag displaytext='Antall personer i systemet totalt' antal={statistikk.personerStatistikkResponse.antallPersonerISystemetTotalt} />
            <Statistikkinnslag displaytext='Antall ringere' antal={statistikk.personerStatistikkResponse.ringere} />
            <Statistikkinnslag displaytext='Antall ferdigringte' antal={statistikk.personerStatistikkResponse.ferdigringte} />
            <Statistikkinnslag displaytext='Antall ringt uten svar' antal={statistikk.personerStatistikkResponse.ringtUtenSvar} />
            <Statistikkinnslag displaytext='Antall ikke ringt' antal={statistikk.personerStatistikkResponse.ikkeRingt} />
            <Statistikkinnslag displaytext='Antall lokallag med personer tilknytta' antal={statistikk.personerStatistikkResponse.antallLokallagMedPersonerTilknytta} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      {erRinger && SamtalerStatistikk(statistikk)}
      {erAdmin && RingereStatistikk(statistikk)}
      {erAdmin && PersonerStatistikk(statistikk)}
    </div>
  )
}

export default StatistikkResponse
