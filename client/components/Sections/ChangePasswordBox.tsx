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
  processing: boolean
  error?: string
}

// ~~~ Component ~~~
@inject('store')
@observer
class SigninBox extends React.Component<IProps, IState> {
  private readonly currentPassword: React.RefObject<HTMLInputElement>
  private readonly newPassword: React.RefObject<HTMLInputElement>

  constructor(props: IProps) {
    super(props)

    this.currentPassword = React.createRef()
    this.newPassword = React.createRef()

    this.state = {
      processing: false,
      error: undefined
    }
  }

  public changePassword = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await this.setState({
        processing: true
      })

      // @ts-ignore
      await this.props.store.auth.doChangePassword(this.currentPassword.current.value, this.newPassword.current.value)
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
        <div className="change-password-box w-100">
          <div className="row">
            <div className="col-12 text-center mb-3">
              <h1>Change your password</h1>
            </div>
            <div className="col-12">
              { this.state.error ? (
                  <Alert color="danger">
                    There was an error while signing in: {this.state.error}
                  </Alert>
              ) : null}
              <Form onSubmit={this.changePassword}>
                <FormGroup>
                  <Label for="currentPassword">Current password</Label>
                  <Input innerRef={this.currentPassword} type="password" name="currentPassword" id="currentPassword" placeholder="Please enter your current password" />
                </FormGroup>
                <FormGroup>
                  <Label for="newPassword">New password</Label>
                  <Input innerRef={this.newPassword} type="password" name="newPassword" id="newPassword" placeholder="Please enter the new password" />
                </FormGroup>

                <div className="d-flex w-100 justify-content-center">
                  <Button type="submit" color="primary">
                    {
                      this.state.processing ? <Spinner size="sm" color="light" />
                      : 'Change password'
                    }
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          {/*language=SCSS*/}
          <style jsx>{`
              @import "variables";

              .change-password-box {
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
