import sendSMS from './sendSMS'

function isSpam (payload) {
  return payload.epost.length > 0
}

async function verving (request, response) {
  const payload = await request.body
  payload.epost = '12534343'

  if (!isSpam(payload)) {
    const sms = await sendSMS(payload)
    console.log(sms)
  }

  response.json({ ...payload, success: true })
}

export default verving
