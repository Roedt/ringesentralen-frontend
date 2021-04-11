import { useEffect, useState } from 'react'
const SITE_ID = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID

function useRecaptcha () {
  const [recaptcha, setRecaptcha] = useState()

  useEffect(() => {
    if (!window || !window.grecaptcha) {
      return
    }

    const grecaptcha = window.grecaptcha.enterprise

    grecaptcha.ready(() => {
      setRecaptcha(grecaptcha)
    })
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
