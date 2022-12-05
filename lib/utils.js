export const is400 = error => {
  return /400/.test(error.message)
}

export const is401 = error => {
  return /401/.test(error.message)
}

export const is403 = error => {
  return /403/.test(error.message)
}

export const is404 = error => {
  return /404/.test(error.message)
}

export const is503 = error => {
  return /503/.test(error.message)
}

const isArray = data => Array.isArray(data)

export const erAdmin = roller => {
    return isArray(roller) && roller.includes('admin')
}