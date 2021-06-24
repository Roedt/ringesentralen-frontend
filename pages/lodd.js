import axios from 'axios'
import Head from 'next/head'

import generatePayload from '../lib/generate-payload'

import Layout from '../components/layout'

function Lodd () {
  async function handleSubmit (event) {
    event.preventDefault()
    const form = document.getElementById('lodd-periode')
    const periode = generatePayload(form)
    const { data } = await axios.post('/api/lodd', periode, { withCredentials: true })
    console.log(data)
  }

  return (
    <Layout pageTitle='Lodd'>
      <Head>
        <title>Loddtrekning</title>
      </Head>
      <div>
        <p>Velg periode du vil lage lodd for</p>
        <form id='lodd-periode' onSubmit={handleSubmit}>
          <input type='date' name='fra' />
          <input type='date' name='til' />
          <button type='submit'>Lag lodd</button>
        </form>
      </div>
    </Layout>
  )
}

export default Lodd
