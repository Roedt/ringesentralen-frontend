export const notify = (tekst) => {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(tekst)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification(tekst)
      }
    })
  }
}
