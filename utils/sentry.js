import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'

const ignoreErrors = [
  'TypeError: Failed to fetch',
  'TypeError: NetworkError when attempting to fetch resource',
  'TypeError: cancelled',
  'TypeError: avbrutt'
]

export const init = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const integrations = []
    const environment = typeof window !== 'undefined' ? window.location.hostname : 'ukjent'
    if (
      process.env.NEXT_IS_SERVER === 'true' &&
      process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
    ) {
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            frame.filename = frame.filename.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
              'app:///'
            )
            frame.filename = frame.filename.replace('.next', '_next')
            return frame
          }
        })
      )
    }

    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      integrations,
      environment,
      autoSessionTracking: false,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: process.env.NEXT_PUBLIC_COMMIT_SHA,
      ignoreErrors
    })
  }
}
