const Samtale = ({ tidspunkt, ringer, kommentar, resultat, ringtNummer, ringtNavn }) => {
  return (
    <tr>
      <td>{tidspunkt}</td>
      <td>{ringtNavn} ({ringtNummer})</td>
      <td>{resultat}</td>
      <td>{kommentar}</td>
      <td>{ringer}</td>
    </tr>
  )
}

export default Samtale
