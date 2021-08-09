import axios from 'axios'

import pkg from '../../../package.json'

async function oppdaterSms ({ token, smsId, telefonnummer, status }) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  const url = `${process.env.API_URL}/sms/oppdater`
  const config = {
    headers: {
      'User-Agent': `Ringesentralen ${pkg.version}`
    }
  }
  const payload = {
    mottakere: [telefonnummer],
    smsId,
    status
  }
  try {
    await axios.post(url, payload, config)
    console.log(`sms oppdatert - ${smsId} - ${status}`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export default oppdaterSms
