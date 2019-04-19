import App, { Container, NextAppContext } from 'next/app'
import React from 'react'
import { Store, initializeStore } from '@/store'
import { Provider } from 'mobx-react'

class ExampleApp extends App {
  public static async getInitialProps(appContext: NextAppContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const store = initializeStore()

    // Provide the store to getInitialProps of pages
    // @ts-ignore
    appContext.ctx.store = store

    const appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialStore: store
    }
  }

  private readonly store: Store

  constructor(props: any) {
    super(props)
    const isServer = (typeof window === 'undefined')
    this.store = isServer ? props.initialStore : initializeStore()
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default ExampleApp
