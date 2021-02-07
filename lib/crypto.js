const encryptor = require('simple-encryptor')(process.env.ENCRYPTOR_KEY)

export const encrypt = value => encryptor.encrypt(value)

export const decrypt = value => encryptor.decrypt(value)
