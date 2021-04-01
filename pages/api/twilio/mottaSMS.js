async function mottaSMS (request, response) {
  const payload = await request.body
  console.log(JSON.stringify(payload, null, 2))
  response.json({ success: true })
}

export default mottaSMS
