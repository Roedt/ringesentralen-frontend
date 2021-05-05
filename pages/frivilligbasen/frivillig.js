function Frivillig ({ data }) {
  const { frivillig, person, aktiviteter } = data
  return (
    <div>
      <div>Person: {JSON.stringify(person, null, 2)}</div>
      <div>Frivillig: {JSON.stringify(frivillig, null, 2)}</div>
      <div>Aktiviteter: {JSON.stringify(aktiviteter, null, 2)}</div>
    </div>
  )
}

export default Frivillig
