import { useStaticRendering } from 'mobx-react'
import AuthStore from './modules/AuthStore'
import UserStore from './modules/UserStore'
import OverviewStore from './modules/OverviewStore'
import Cookies from 'js-cookie'

// For SSR static rendering is required.
const isServer = (typeof window === 'undefined')
useStaticRendering(isServer)

// Main root store.
class Store {
  // @ts-ignore (AuthStore is definitely set in the `else` branch in the constructor)
  public auth: AuthStore
  public user: UserStore
  public overview: OverviewStore

  constructor(checkAuth: boolean) {
    this.overview = new OverviewStore()
    this.user = new UserStore()

    // Check if the user is already logged in, and create the store according to that status.
    const token = Cookies.get('token')
    if (checkAuth && token) {
      this.auth = new AuthStore(token)

      // Fetch user data.
      this.user.fetchUserData().then(() => {
        this.overview.ignoreUser(this.user.userData._id)
      })
    } else {
      this.auth = new AuthStore()
    }
  }
}

// Export Store and store initialization function.
export { Store }
let store: Store
export function initializeStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    // return new Store(initialData)
    return new Store(false)
  }

  if (!store) {
    store = new Store(true)
  }

  return store
}
