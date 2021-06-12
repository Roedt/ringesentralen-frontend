import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { is401 } from '../lib/utils'

const isFunction = func => typeof func === 'function'

function navneSortering (a, b) {
  return a.navn.localeCompare(b.navn)
}

function LokallagVelger ({ user, callOnChange, noSessionUpdate, heading = 'Velg lokallag du ringer på vegne av' }) {
  const router = useRouter()
  const [aktivtLokallag, setAktivtLokallag] = useState()
  const [mineLokallag, setMineLokallag] = useState([])
  const showComponentLimit = noSessionUpdate ? 2 : 1

  async function hentMineLokallag () {
    try {
      const { data } = await axios.get('/api/backend/profil/lokallag', { withCredentials: true })
      data.sort(navneSortering)
      if (noSessionUpdate) {
        data.unshift({
          navn: 'Vis alle lokallag',
          id: 'visalle'
        })
      }
      setMineLokallag(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login')
      } else {
        console.error(error)
      }
    }
  }

  async function setLokallag (event) {
    const lokallag = event.target.value
    setAktivtLokallag(lokallag)
    // Oppdaterer ikke valgtlokallag i session noSessionUpdate er satt
    if (!noSessionUpdate) {
      try {
        await axios.post('/api/lokallag', { lokallag }, { withCredentials: true })
      } catch (error) {
        if (is401(error)) {
          router.push('/login')
        } else {
          console.error(error)
        }
      }
    }
    if (callOnChange && isFunction(callOnChange)) {
      callOnChange(lokallag)
    }
  }

  function Linje (props) {
    const { id, navn, aktivt } = props
    return (
      <option value={id} selected={id.toString() === aktivt.toString()}>{navn}</option>
    )
  }

  useEffect(() => {
    if (user) {
      setAktivtLokallag(noSessionUpdate ? 'visalle' : user.aktivtLokallag)
      hentMineLokallag()
    }
  }, [user])

  if (!user || mineLokallag.length <= showComponentLimit) return null

  return (
    <div>
      <label htmlFor='lokallag' className='block text-sm font-medium text-gray-700'>{heading}</label>
      <select id='location' name='location' onChange={setLokallag} className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
        {mineLokallag.map(lag => <Linje {...lag} aktivt={aktivtLokallag} key={lag.id} />)}
      </select>
    </div>
  )
}

export default LokallagVelger
