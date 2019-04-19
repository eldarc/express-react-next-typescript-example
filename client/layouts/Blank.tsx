import Head from 'next/head'
import * as React from 'react'
import RouteGuard from './RouteGuard'
import '@/styles/main.scss'

interface IProps {
  title?: string,
  accessLevel?: string
}

const Layout: React.FunctionComponent<IProps> = ({ children, title = 'LikeBase', accessLevel = 'any' }) => (
    <RouteGuard accessLevel={accessLevel}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section id="__content" className="container-fluid">
        {children}
      </section>
    </RouteGuard>
)

export default Layout
