import Head from 'next/head'
import * as React from 'react'

// ~~~ Global styling ~~~
import '../styles/main.scss'
// import 'startbootstrap-sb-admin-2/scss/sb-admin-2.scss'

// ~~~ Components ~~~
import Footer from '../components/Layout/Footer'
import Navbar from '../components/Layout/Navbar'
import RouteGuard from '@/layouts/RouteGuard'

interface IProps {
  title?: string,
  accessLevel?: string,
  centered?: boolean
}

// ~~~ Layout ~~~
const Layout: React.FunctionComponent<IProps> = ({ children, title, accessLevel = 'any', centered = false }) => (
    <RouteGuard accessLevel={accessLevel}>
        <Head>
            <title>LikeBase - {title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar/>
        <section id="__content" className={'container-fluid' + (centered ? ' center' : '')}>
            {children}
        </section>
        <Footer/>
    </RouteGuard>
)

export default Layout
