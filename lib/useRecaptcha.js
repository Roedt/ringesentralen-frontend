import { useEffect, useState } from 'react'

function useRecaptcha (siteID) {
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
      token = await recaptcha.execute(siteID, { action })
    }
    return token
  }

  return {
    getToken
  }
}

export default useRecaptcha
