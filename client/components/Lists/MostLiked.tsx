import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IOverviewItem } from '@/interfaces/OverviewStore'
import { Table } from 'reactstrap'

// ~~~ Interfaces ~~~
interface IProps {
  [x: string]: any
}

interface IState {
  isLoading: boolean
}

// ~~~ Components ~~~
import SingInToLike from '@/components/buttons/SignInToLike'
import LikeUnlike from '@/components/buttons/LikeUnlike'

// ~~~ Component ~~~
@inject('store')
@observer
class MostLiked extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  public loadMostLiked = async () => {
    this.setState({
      isLoading: true
    })

    await this.props.store.overview.loadMostLiked()

    this.setState({
      isLoading: false
    })
  }

  public componentDidMount(): void {
    this.loadMostLiked()
  }

  public render() {
    const items = this.props.store.overview.preparedItems

    const table = (): React.ReactElement => (
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Number of likes</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {
            items.map((item: IOverviewItem, index: number) => (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.numberOfLikes}</td>
                  <td className="d-flex justify-content-end">{
                    !this.props.store.auth.isAuthenticated
                      ? <SingInToLike/>
                        // @ts-ignore: store is injected inside the component
                      : <LikeUnlike mode={item.featuredLikes.includes(this.props.store.user.userData._id) ? 'unlike' : 'like'} userId={item._id} />
                  }</td>
                </tr>
            ))
          }
          </tbody>
        </Table>
    )

    return (
      <React.Fragment>
        {this.state.isLoading ? 'Loading...' : table()}
      </React.Fragment>
    )
  }
}

export default MostLiked
