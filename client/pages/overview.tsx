import * as React from 'react'
import { Store } from '@/store'
import Layout from '@/layouts/Default'

// ~~~ Interfaces ~~~
interface IProps {
  store: Store
  req: any
}

// ~~~ Components ~~~
import MostLiked from '@/components/Lists/MostLiked'

// ~~~ Component ~~~
class OverviewPage extends React.Component {
  public static async getInitialProps({ req, store }: IProps) {
    if (req) {
      await store.overview.loadMostLiked()
    }

    return {}
  }

  public render() {
    return (
      <Layout accessLevel="any" title="Overview">
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <MostLiked />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default OverviewPage
