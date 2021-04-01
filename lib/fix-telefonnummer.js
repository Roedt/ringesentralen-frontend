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
  return nummer
}

export default fixTelefonNummer
