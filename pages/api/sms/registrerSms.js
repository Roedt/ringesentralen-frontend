import axios from 'axios'

import pkg from '../../../package.json'

async function registrerSms (token, mottakere, melding) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  const url = `${process.env.API_URL}/sms/lagre`
  const config = {
    headers: {
      'User-Agent': `Ringesentralen ${pkg.version}`
    }
  }
  const payload = {
    mottakere,
    tekst: melding
  }
  try {
    const { data } = await axios.post(url, payload, config)
    console.log(`sms lagret - smsId - ${data.id}`)
    return { smsId: data.id, success: true }
  } catch (error) {
    console.error(error)
    return { smsId: false, success: false }
  }
}

export default registrerSms
