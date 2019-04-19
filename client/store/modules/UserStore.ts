import { observable, flow } from 'mobx'
import { me } from '@api/me'
import { IUserData } from '@/interfaces/UserStore'

class UserStore {
  @observable public userData: IUserData

  public fetchUserData = flow(function *(this: UserStore) {
    try {
      // Fetch user data.
      this.userData = yield me()
    } catch (error) {
      throw error
    }
  }).bind(this)

  constructor() {
    this.userData = {
      _id: 'null',
      username: '',
      numberOfLikes: 0
    }
  }

}

export default UserStore
