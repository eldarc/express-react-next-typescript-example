import * as React from 'react'
import { observer, inject } from 'mobx-react'

// ~~~ Layout ~~~
import { Button, Spinner } from 'reactstrap'
import { Store } from '@/store'

// ~~~ Interfaces ~~~
interface IProps {
  store: Store
  userId: string
  mode: string
}

interface IState {
  processing: boolean
}

// ~~~ Component ~~~
@inject('store')
@observer
class LikeUnlike extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      processing: false
    }
  }

  public likeOrUnlike = () => {
    this.props.mode === 'like' ? this.likeUser() : this.unlikeUser()
  }

  public likeUser = async () => {
    try {
      await this.setState({
        processing: true
      })

      await this.props.store.overview.doLikeUser(this.props.userId)
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({
        processing: false
      })
    }
  }
  public unlikeUser = async () => {
    try {
      await this.setState({
        processing: true
      })

      await this.props.store.overview.doUnlikeUser(this.props.userId)
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({
        processing: false
      })
    }
  }

  public render() {
    return (
      <Button className="like-unlike-btn" onClick={this.likeOrUnlike} color={this.props.mode === 'like' ? 'success' : 'danger'} size="sm">
        {
          this.state.processing ? <Spinner size="sm" color="light" />
          : (this.props.mode === 'like' ? 'Like' : 'Unlike')
        }
      </Button>
    )
  }
}

export default LikeUnlike
