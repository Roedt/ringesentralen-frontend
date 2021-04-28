async function mottaFrivillig (request, response) {
  const payload = await request.body
  console.log(JSON.stringify(payload, null, 2))
  response.json(payload)
}

export default mottaFrivillig
