function filtrerFrivillig (aktiviteter, spraak, filter) {
  if (!filter) return true
  const harAktiviteter = aktiviteter.filter(aktivitet => filter.includes(aktivitet))
  const harSpraak = spraak.length > 1 && filter.includes('spraak')
  return harAktiviteter || harSpraak
}

export default filtrerFrivillig
