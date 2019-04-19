import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
// import cookies from 'next-cookies'

// ~~~ Interfaces ~~~
interface IProps {
  accessLevel: string,
  children: React.ReactNode,
  [x: string]: any
}

interface IState {
  isLoading: boolean
}

// ~~~ Layout ~~~
@inject('store')
@observer
class RouteGuard extends React.Component<IProps, IState> {
  private readonly accessLevel: string

  constructor(props: IProps) {
    super(props)
    this.accessLevel = props.accessLevel

    const isServer = (typeof window === 'undefined')
    this.state = {
      isLoading: !isServer
    }
  }

  public componentDidMount() {
    // TODO: Move this to the server side.
    let rerouting = false

    switch (this.accessLevel) {
    case 'any':
      break
    case 'guest':
      // If logged in, redirect to main page.
      if (this.props.store.auth.isAuthenticated) {
        rerouting = true
        Router.replace('/')
      }
      break
    case 'user':
      // If logged out, redirect to the signin page.
      if (!this.props.store.auth.isAuthenticated) {
        rerouting = true
        Router.replace('/signin')
      }
      break
    }

    if (!rerouting) {
      // Finished loading current page.
      this.setState({
        isLoading: false
      })
    }
  }

  public render() {
    return (
        <React.Fragment>
          {this.state.isLoading ? (
              <div>LOADING....</div>
          ) :
            this.props.children
          }
        </React.Fragment>
    )
  }
}

export default RouteGuard
