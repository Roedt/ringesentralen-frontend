const amplitude = typeof window !== 'undefined' ? require('amplitude-js') : () => null
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
  if (amplitude) {
    amplitude.getInstance().init(apiKey, undefined, config)
    logAmplitudeEvent('sidevisning', {
      sidetittel: document.title
    })
  }
}

export function logAmplitudeEvent (eventName, data) {
  return new Promise(function (resolve) {
    const eventData = data || {}
    if (amplitude) {
      amplitude.getInstance().logEvent(eventName, eventData, resolve)
    }
  })
}
