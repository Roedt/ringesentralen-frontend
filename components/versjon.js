import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import pkg from '../../package.json'

const thisVersion = pkg.version

function SisteVersjon () {
  const router = useRouter()
  const { data: latest } = useSWR('/api/get-latest-version')
  const [latestVersion, setLatestVersion] = useState()

  function reloadSite () {
    router.reload()
  }

  useEffect(() => {
    if (latest) {
      setLatestVersion(latest.latestVersion)
    }
  }, [latest])

  if (!latestVersion) return null

  if (latestVersion === thisVersion) return null

  return (
    <div>
      Ny versjon av ringesentralen er ute. Du er på v{thisVersion} og siste versjon er v{latestVersion}. <button onClick={() => reloadSite()}>Oppdater</button>
    </div>
  )
}

export default SisteVersjon
