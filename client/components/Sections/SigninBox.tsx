import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Router from 'next/router'

// ~~~ Layout ~~~
import { Button, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap'

// ~~~ Interfaces ~~~
interface IProps {
  [x: string]: any
}

interface IState {
  mode: string
  processing: boolean
  error?: string
}

// ~~~ Component ~~~
@inject('store')
@observer
class SigninBox extends React.Component<IProps, IState> {
  private readonly username: React.RefObject<HTMLInputElement>
  private readonly password: React.RefObject<HTMLInputElement>

  constructor(props: IProps) {
    super(props)

    this.username = React.createRef()
    this.password = React.createRef()

    this.state = {
      mode: 'signin',
      processing: false,
      error: undefined
    }
  }

  public switchToSignin = () => {
    this.setState({
      mode: 'signin'
    })
  }

  public switchToSignup = () => {
    this.setState({
      mode: 'signup'
    })
  }

  public signin = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await this.setState({
        processing: true
      })

      // @ts-ignore
      await this.props.store.auth.doSignin(this.username.current.value, this.password.current.value, this.state.mode === 'signup')
      await this.props.store.user.fetchUserData()
      await this.props.store.overview.ignoreUser(this.props.store.user.userData._id)

      await Router.push('/overview')
    } catch (e) {
      this.setState({
        error: JSON.stringify(e.response.data)
      })
    } finally {
      this.setState({
        processing: false
      })
    }
  }

  public render() {
    return (
        <div className="signin-box w-100">
          <div className="row">
            <div className="col-12 text-center mb-3">
              <h1>{this.state.mode === 'signin' ? 'Sign in' : 'Sign up'}</h1>
            </div>
            <div className="col-12 text-center mb-3">
              {
                this.state.mode === 'signin'
                  ? (
                      <span>
                        Don't have an account?&nbsp;
                        <a onClick={this.switchToSignup} href="#">Sign up here</a>
                      </span>
                    )
                  : (
                    <span>
                      Already have an account?&nbsp;
                      <a onClick={this.switchToSignin} href="#">Sign in here</a>
                    </span>
                  )
              }
            </div>
            <div className="col-12">
              { this.state.error ? (
                  <Alert color="danger">
                    There was an error while signing in: {this.state.error}
                  </Alert>
              ) : null}
              <Form onSubmit={this.signin}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input innerRef={this.username} type="text" name="username" id="username" placeholder="Please enter your username" />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input innerRef={this.password} type="password" name="password" id="password" placeholder="Please enter your password" />
                </FormGroup>

                <div className="d-flex w-100 justify-content-center">
                  <Button type="submit" color="primary">
                    {
                      this.state.processing ? <Spinner size="sm" color="light" />
                      : (this.state.mode === 'signin' ? 'Sign in' : 'Sign up')
                    }
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          {/*language=SCSS*/}
          <style jsx>{`
              @import "variables";

              .signin-box {
                max-width: 450px;
                background-color: rgba($white, 0.4);
                border-radius: $border-radius-lg;
                padding: $grid-gutter-width / 2;
                box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
              }
            `}</style>
        </div>
    )
  }
}

export default SigninBox
