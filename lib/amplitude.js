const amplitude = typeof window !== 'undefined' ? require('amplitude-js') : () => null

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
    amplitude.getInstance().init(process.env.AMPLITUDE_API_KEY, undefined, config)
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
