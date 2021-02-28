import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

export const ProfilContext = createContext()

const is401 = error => {
  return /401/.test(error.message)
}

export const ProfilContextProvider = props => {
  const router = useRouter()
  const [profil, setProfil] = useState()

  async function hentProfil () {
    try {
      const { data } = await axios.get('/api/backend/profil', { withCredentials: true })
      setProfil(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    hentProfil()
  }, [])

  return (
    <ProfilContext.Provider value={profil}>
      {props.children}
    </ProfilContext.Provider>
  )
}
