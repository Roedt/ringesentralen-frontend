import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { is401 } from '../lib/utils'

const isFunction = func => typeof func === 'function'

function LokallagVelger ({ user, callOnChange }) {
  const router = useRouter()
  const [aktivtLokallag, setAktivtLokallag] = useState()
  const [mineLokallag, setMineLokallag] = useState([])

  async function hentMineLokallag () {
    try {
      const { data } = await axios.get('/api/backend/profil/lokallag', { withCredentials: true })
      setMineLokallag(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  async function setLokallag (lokallag) {
    setAktivtLokallag(lokallag)
    try {
      await axios.post('/api/lokallag', { lokallag }, { withCredentials: true })
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
    if (callOnChange && isFunction(callOnChange)) {
      callOnChange(lokallag)
    }
  }

  useEffect(() => {
    if (user) {
      setAktivtLokallag(user.aktivtLokallag)
      hentMineLokallag()
    }
  }, [user])

  if (!user || mineLokallag.length <= 1) return null

  return (
    <div>
      {JSON.stringify(mineLokallag, null, 2)}
    </div>
  )
}

export default LokallagVelger
