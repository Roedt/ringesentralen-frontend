import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'

import generatePayload from '../lib/generate-payload'

import Layout from '../components/layout'

function HentDeltagere ({ deltagere, handleSubmit }) {
  if (deltagere) return null
  return (
    <div>
      <p>Velg periode du vil hente deltagere fra</p>
      <form id='lodd-periode' onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor='fra' className='block text-sm font-medium text-gray-700'>
            Startdato
          </label>
          <div>
            <input type='date' name='fra' id='fra' className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
        </div>
        <div>
          <label htmlFor='til' className='block text-sm font-medium text-gray-700'>
            Sluttdato
          </label>
          <div>
            <input type='date' name='til' id='' className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Hent deltagere
          </button>
        </div>
      </form>
    </div>
  )
}

function Deltagere ({ deltagere, lagLodd }) {
  if (!deltagere) return null
  return (
    <div>
      <div>{deltagere.length} deltagere funnet</div>
      <button onClick={() => lagLodd()}>Generer lodd</button>
    </div>
  )
}

function Hatt ({ lodd, trekkVinner }) {
  if (!lodd) return null

  return (
    <div>
      <div>{lodd.length} lodd i hatten</div>
      <button onClick={() => trekkVinner()}>Trekk vinner</button>
    </div>
  )
}

function Vinner ({ vinner }) {
  if (!vinner) return null
  return (
    <div>
      <div>Vinneren er</div>
      <div>{vinner}</div>
    </div>
  )
}
function Lodd () {
  const [deltagere, setDeltagere] = useState(false)
  const [lodd, setLodd] = useState(false)
  const [vinner, setVinner] = useState(false)

  function lagLodd () {
    const genererteLodd = deltagere.reduce((accumulator, current) => {
      const navn = `${current.fornavn} ${current.etternavn} - ${current.lokallag}`
      const lodd = Array(current.antallSamtaler).fill(navn)
      accumulator.push(...lodd)
      return accumulator
    }, [])
    setLodd(genererteLodd)
  }

  function trekkVinner () {
    const loddCopy = [...lodd]
    setVinner(loddCopy[0])
  }

  async function handleSubmit (event) {
    event.preventDefault()
    const form = document.getElementById('lodd-periode')
    const periode = generatePayload(form)
    const { data } = await axios.post('/api/lodd', periode, { withCredentials: true })
    setDeltagere(data)
  }

  return (
    <Layout pageTitle='Lodd'>
      <Head>
        <title>Loddtrekning</title>
      </Head>
      <HentDeltagere deltagere={deltagere} handleSubmit={handleSubmit} />
      <Deltagere deltagere={deltagere} lagLodd={lagLodd} />
      <Hatt lodd={lodd} trekkVinner={trekkVinner} />
      <Vinner vinner={vinner} />
    </Layout>
  )
}

export default Lodd
