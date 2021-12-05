import amplitude from 'amplitude-js'

const isBrowser = () => typeof window !== 'undefined'

const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY

const config = {
  saveEvents: false,
  includeUtm: true,
  includeReferrer: true,
  trackingOptions: {
    city: false,
    ip_address: false
  }
}

export const initAmplitude = () => {
  if (isBrowser()) {
    amplitude.getInstance().init(apiKey, undefined, config)
    logAmplitudeEvent('sidevisning', {
      sidetittel: document.title
    })
  }
}

export function logAmplitudeEvent (eventName, data) {
  return new Promise(function (resolve) {
    const eventData = data || {}
    if (isBrowser()) {
      amplitude.getInstance().logEvent(eventName, eventData, resolve)
    }
  })
}
