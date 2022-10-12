import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'


async function hentUnderforum () {
    try {
      const { data } = await axios.get('/api/backend/forum/underforum', { withCredentials: true })
      setUnderforum(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login?komFra=/forum')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }

const Forum = () => {
  const router = useRouter()
  
  return (
    <Layout pageTitle='Forum'>
      <Head>
        <title>Forum</title>
      </Head>
    </Layout>
  )
}

export default Forum
