import useSWR from 'swr'

import pkg from '../package.json'

const thisVersion = pkg.version

function VersjonsNummer ({ thisVersion, latest }) {
  let melding = `Ringesentralen v${thisVersion}`
  let className = ''
  if (latest?.success && thisVersion !== latest.latestVersion) {
    melding = `Ny versjon! Du bruker v${thisVersion} siste versjon er v${latest.latestVersion}. Vennligst oppdater nettleseren.`
    className = 'text-roedt'
  }
  return (
    <span className={className}>
      {melding}
    </span>
  )
}

export default function Footer () {
  const { data: latest } = useSWR('/api/get-latest-version')

  return (
    <>
      <footer className='h-10 px-10 inline-flex items-center justify-between text-gray-500'>
        <div>
          <VersjonsNummer thisVersion={thisVersion} latest={latest} />
        </div>
        <div className='flex'>
          <a href='https://roedtorg.slack.com/archives/C01BNKD2RU0' title='Gå til ringesentralens kanal på Slack' className='mr-2'>
            <svg xmlns='https://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16' className='text-gray-500 hover:text-gray-900'>
              <path d='M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z' />
            </svg>
          </a>
          <a href='https://github.com/Roedt/ringesentralen-frontend' title='Gå til ringesentralen på GitHub'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16' className='text-gray-500 hover:text-gray-900'>
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
            </svg>
          </a>
        </div>
      </footer>
    </>
  )
}
