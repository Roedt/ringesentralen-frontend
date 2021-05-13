function filtrerFrivillig (aktiviteter = [], spraak = '', filter) {
  if (!filter || filter.length === 0) return true
  const mineAktiviteter = aktiviteter.map(item => item.aktivitet)
  const harAktiviteter = mineAktiviteter.filter(aktivitet => filter.includes(aktivitet)).length > 0
  const harSpraak = spraak && spraak.length > 1 && filter.includes('Spraak')
  return harAktiviteter || harSpraak
}

export default filtrerFrivillig
