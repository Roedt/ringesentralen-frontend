import { useState, useEffect } from 'react'

function useRecaptcha (SITE_ID) {
  const [token, setToken] = useState()

  useEffect(() => {
    if (token) {
      return
    }

    const { grecaptcha } = window
    grecaptcha.ready(async () => {
      const recaptchaToken = await grecaptcha.execute(SITE_ID, { action: 'submit' })
      setToken(recaptchaToken)
    })
  }, [SITE_ID, token])

  return token
}

export default useRecaptcha
