import { useState, useEffect } from 'react'
const SITE_ID = process.env.NEXT_PUBLIC_CAPTCHA_ID

function useRecaptcha () {
  const [token, setToken] = useState()

  useEffect(() => {
    if (token) {
      return
    }
    if (typeof window !== 'undefined') {
      window.grecaptcha.ready(async () => {
        const recaptchaToken = await window.grecaptcha.execute(SITE_ID, { action: 'submit' })
        setToken(recaptchaToken)
      })
    }
  }, [token])

  return token
}

export default useRecaptcha
