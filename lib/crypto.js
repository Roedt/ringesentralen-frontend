const crypto = require('crypto')

function encrypt (tekst, ENCRYPTION_KEY) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(tekst)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return `${iv.toString('base64')}:${encrypted.toString('base64')}`
}

function decrypt (tekst, ENCRYPTION_KEY) {
  const [ivStreng, tekstStreng] = tekst.split(':')
  const iv = Buffer.from(ivStreng, 'base64')
  const kryptertTekst = Buffer.from(tekstStreng, 'base64')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let decrypted = decipher.update(kryptertTekst)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

export { decrypt, encrypt }
