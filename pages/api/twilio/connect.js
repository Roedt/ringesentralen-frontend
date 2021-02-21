async function twilioConnectCall (request, response) {
  const payload = await request.body
  console.log(payload)
  response.status(204)
}

export default twilioConnectCall
