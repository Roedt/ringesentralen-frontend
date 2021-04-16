import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import pkg from '../package.json'

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
    <div className='bg-yellow-200 text-center text-gray-900 p-4'>
      Ny versjon av ringesentralen er ute. Du er på v{thisVersion} og siste versjon er v{latestVersion}. <button className='ml-4 inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={() => reloadSite()}>Oppdater nå</button>
    </div>
  )
}

export default SisteVersjon
