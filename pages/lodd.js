import axios from 'axios'
import shuffle from 'crypto-shuffle'
import Head from 'next/head'
import { useState } from 'react'
import Confetti from 'react-confetti'

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
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
      <div className='text-center text-2xl mb-4'>{deltagere.length} deltagere funnet</div>
      <button onClick={() => lagLodd()} className='text-xl w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Generer lodd</button>
    </div>
  )
}

function Hatt ({ loddPerson, loddLokallag, trekkVinner }) {
  if (!loddPerson && !loddLokallag) return null

  return (
    <div>
      <div className='text-center text-2xl mb-4'>{loddPerson.length} lodd i hver hatt</div>
      <button onClick={() => trekkVinner()} className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Trekk vinner</button>
    </div>
  )
}

function Vinner ({ vinnerPerson, vinnerLokallag }) {
  if (!vinnerPerson && !vinnerLokallag) return null
  return (
    <div className='text-center text-xl'>
      <div>Vinneren av de frivillige</div>
      <div className='text-2xl'>{vinnerPerson}</div>
      <div className='mt-4'>Vinneren av lokallagene</div>
      <div className='text-2xl'>{vinnerLokallag}</div>
    </div>
  )
}
function Lodd () {
  const [deltagere, setDeltagere] = useState(false)
  const [loddPerson, setLoddPerson] = useState(false)
  const [loddLokallag, setLoddLokallag] = useState(false)
  const [vinnerPerson, setVinnerPerson] = useState(false)
  const [vinnerLokallag, setVinnerLokallag] = useState(false)
  const [visConfetti, setVisConfetti] = useState()

  function lagLodd () {
    const genererteLodd = deltagere.reduce((accumulator, current) => {
      const navn = `${current.fornavn} ${current.etternavn} - ${current.lokallag}`
      const loddPerson = Array(current.antallSamtaler).fill(navn)
      const loddLag = Array(current.antallSamtaler).fill(current.lokallag)
      accumulator.person.push(...loddPerson)
      accumulator.lag.push(...loddLag)
      return accumulator
    }, { person: [], lag: [] })
    setLoddPerson(genererteLodd.person)
    setLoddLokallag(genererteLodd.lag)
  }

  function trekkVinner () {
    const loddCopyPerson = [...loddPerson]
    const loddCopyLokallag = [...loddLokallag]
    setVinnerPerson(shuffle(loddCopyPerson)[0])
    setVinnerLokallag(shuffle(loddCopyLokallag)[0])
    setVisConfetti(true)
    setTimeout(() => {
      setVisConfetti(false)
    }, 10000)
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
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        {visConfetti && <Confetti />}
        <HentDeltagere deltagere={deltagere} handleSubmit={handleSubmit} />
        {!loddPerson && <Deltagere deltagere={deltagere} lagLodd={lagLodd} />}
        {!vinnerPerson && <Hatt loddPerson={loddPerson} loddLokallag={loddLokallag} trekkVinner={trekkVinner} />}
        <Vinner vinnerPerson={vinnerPerson} vinnerLokallag={vinnerLokallag} />
      </div>
    </Layout>
  )
}

export default Lodd
