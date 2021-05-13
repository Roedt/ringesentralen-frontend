function filtrerFrivillig (aktiviteter = [], spraak = '', filter) {
  if (!filter) return true
  const harAktiviteter = aktiviteter.filter(aktivitet => filter.includes(aktivitet)).length > 0
  const harSpraak = spraak.length > 1 && filter.includes('Spraak')
  return harAktiviteter || harSpraak
}

export default filtrerFrivillig
