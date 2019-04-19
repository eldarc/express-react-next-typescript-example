import * as React from 'react'
import Router from 'next/router'

interface IProps {
  res: any
}

class IndexPage extends React.Component {
  public static async getInitialProps({ res }: IProps) {
    if (res) {
      res.writeHead(302, {
        Location: '/overview'
      })

      res.end()
    } else {
      Router.replace('/overview')
    }

    return {}
  }

  public render() {
    return <React.Fragment />
  }
}

export default IndexPage
