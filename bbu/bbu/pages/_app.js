import '@/styles/common.scss'
import { SessionProvider } from 'next-auth/react'
import Layout from './component/Layout'
import MyContext from './component/MyContext'



export default function App({ Component, pageProps }) {

  return (
    <SessionProvider>
      <MyContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MyContext>
    </SessionProvider>
  )
}
