import { useEffect, useState } from 'react'
import useScript from 'react-script-hook'

const SITE_ID = process.env.NEXT_PUBLIC_CAPTCHA_SITE_ID

function useRecaptcha () {
  const [recaptcha, setRecaptcha] = useState()

  useScript({
    src: `https://www.google.com/recaptcha/api.js?render=${SITE_ID}`,
    onload: () =>
      window.grecaptcha.ready(() => {
        setRecaptcha(window.grecaptcha)
      })
  })

  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        setRecaptcha(window.grecaptcha)
      })
    }
  }, [])

  async function getToken (action) {
    let token = false
    if (recaptcha) {
      token = await recaptcha.execute(SITE_ID, { action })
    }
    return token
  }

  return {
    getToken
  }
}

export default useRecaptcha
