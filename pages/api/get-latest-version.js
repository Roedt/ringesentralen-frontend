import axios from 'axios'

const latestUrl = 'https://api.github.com/repos/roedt/ringesentralen-frontend/releases/latest'
const config = {
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
}

async function isLatesVersion (request, response) {
  const { data } = await axios.get(latestUrl, config)
  const { tag_name: latestVersion } = data
  response.json({
    latestVersion
  })
}

export default isLatesVersion
