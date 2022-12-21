import axios from 'axios'

const tokenUrl = `${process.env.API_URL}/ping`

async function trengerMFA (enhetsid, response) {
  const payload = {
    enhetsid: enhetsid
  }
  try {
    await axios.get(tokenUrl)
    response.json({ updated: true})
  } catch (error) {
    console.error(error.message)
    response.json({ updated: false })
  }
}

export default trengerMFA
