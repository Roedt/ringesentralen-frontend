/**
 * Fikser telefonnummer til bruk for twilio
 */
function fixTelefonNummer (nummer = '') {
  nummer = nummer.replace(/\D/g, '')
  if (nummer.length === 8) {
    nummer = `+47${nummer}`
  }
  if (nummer.length === 10) {
    nummer = `+${nummer}`
  }
  if (nummer.startsWith('00')) {
    nummer = nummer.replace('00', '+')
  }
  return nummer
}

export default fixTelefonNummer
