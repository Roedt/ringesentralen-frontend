import axios from 'axios'

const recaptchaSecret = process.env.RECAPTCHA_SECRET
const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify'

async function validerRecaptchaToken (token, remoteip) {
  const params = new URLSearchParams()
  params.append('response', token)
  params.append('secret', recaptchaSecret)
  if (remoteip) {
    params.append('remoteip', remoteip)
  }

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  try {
    const { data } = await axios.post(recaptchaURL, params, config)
    const { success, score } = data
    if (!success) {
      return false
    } else {
      return score
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

export default validerRecaptchaToken
