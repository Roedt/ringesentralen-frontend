export const is401 = error => {
  return /401/.test(error.message)
}

export const is403 = error => {
  return /403/.test(error.message)
}

export const is503 = error => {
  return /503/.test(error.message)
}
