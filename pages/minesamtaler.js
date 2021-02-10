import Head from 'next/head'
import Layout from '../components/layout'

const MineSamtaler = () => {
  return (
    <Layout pageTitle='Mine samtaler'>
      <Head>
        <title>Mine samtaler</title>
      </Head>
      <div className='shadow'>
        <h2 class="text-xl font-semibold mb-2">Mine samtaler</h2>
        <table>
            <tr><td>1</td></tr>
            <tr><td>2</td></tr>
            <tr><td>3</td></tr>
        </table>
        
        <h2 class="text-xl font-semibold mt-16 mb-2">Alle samtaler i mitt lag</h2>
        <small>NB: Denne oversikta vises kun for lokale godkjennere og admins</small>
        <br />
        Liste over lagets samtaler her
      </div>
    </Layout>
  )
}

export default MineSamtaler
