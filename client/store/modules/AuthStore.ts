import { action, observable, flow } from 'mobx'
import { login, signup, setAuthorizationHeader } from '@api/auth'
import { updatePassword } from '@api/me'
import Cookies from 'js-cookie'

class AuthStore {
  @observable public processing: boolean
  @observable public isAuthenticated: boolean

  public doSignin = flow(function *(this: AuthStore, username: string, password: string, isSignup: boolean = false) {
    if (this.processing) {
      return
    }

    this.processing = true

    try {
      const data = isSignup ? yield signup(username, password) : yield login(username, password)
      this.authenticate(data.token, true)
    } catch (error) {
      throw error
    } finally {
      this.processing = false
    }
  }).bind(this)

  public doChangePassword = flow(function *(this: AuthStore, currentPassword: string, newPassword: string) {
    if (this.processing) {
      return
    }

    this.processing = true

    try {
      yield updatePassword(currentPassword, newPassword)
    } catch (error) {
      throw error
    } finally {
      this.processing = false
    }
  }).bind(this)

  constructor(token?: string) {
    this.processing = false
    this.isAuthenticated = false

    // If the user is already logged in, authenticate.
    if (token) {
      this.authenticate(token)
    }
  }

  @action public authenticate(token: string, newLogin: boolean = false) {
    // Set as authenticated.
    this.isAuthenticated = true

    // Set cookies
    if (newLogin) {
      Cookies.set('token', token, {
        expires: 1
      })
    }

    // Set authorization header.
    setAuthorizationHeader(token)
  }

  @action public doSignout() {
    // Set as unauthenticated.
    Cookies.remove('token')
    this.isAuthenticated = false

    // Set authorization header.
    setAuthorizationHeader(undefined)
  }
}

export default AuthStore
