import axios from 'axios'
import NodeCache from 'node-cache'
const cache = new NodeCache({ stdTTL: 3600 })

const latestUrl = 'https://api.github.com/repos/roedt/ringesentralen-frontend/releases/latest'
const config = {
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
}

async function isLatesVersion (request, response) {
  const latest = cache.get('latest')
  if (latest === undefined) {
    console.log('cache miss')
    delete axios.defaults.headers.common.Authorization
    try {
      const { data } = await axios.get(latestUrl, config)
      const { tag_name: latestVersion } = data
      cache.set('latest', latestVersion)
      response.json({
        latestVersion,
        success: true
      })
    } catch (error) {
      console.error(error)
      response.json({
        success: false
      })
    }
  } else {
    response.json({
      latestVersion: latest,
      success: true
    })
  }
}

export default isLatesVersion
