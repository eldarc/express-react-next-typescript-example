import { observable, flow, computed, action } from 'mobx'
import { fetchMostLiked } from '@api/mostLiked'
import { likeUser, fetchUser, unlikeUser } from '@api/user'
import { IOverviewItem } from '@/interfaces/OverviewStore'

class OverviewStore {
  @computed get preparedItems(): IOverviewItem[] | null {
    return this.items.filter((item) => {
      return !this.ignoreUsers.includes(item._id)
    })
  }
  @observable public items: IOverviewItem[]

  public loadMostLiked = flow(function *(this: OverviewStore) {
    try {
      // Fetch user data.
      this.items = yield fetchMostLiked()
    } catch (error) {
      throw error
    }
  }).bind(this)

  public doLikeUser = flow(function *(this: OverviewStore, userId: string) {
    try {
      // Like user.
      yield likeUser(userId)

      // Fetch updated data.
      yield this.fetchUser(userId)
    } catch (error) {
      throw error
    }
  }).bind(this)

  public doUnlikeUser = flow(function *(this: OverviewStore, userId: string) {
    try {
      // Like user.
      yield unlikeUser(userId)

      // Fetch updated data.
      yield this.fetchUser(userId)
    } catch (error) {
      throw error
    }
  }).bind(this)

  public fetchUser = flow(function *(this: OverviewStore, userId: string) {
    try {
      // Fetch user data
      const userData = yield fetchUser(userId)

      // Store the new data.
      const index = this.items.findIndex((item) => item._id === userData._id)
      if (index >= 0) {
        this.items[index] = userData
      } else {
        this.items.push(userData)
      }

      // Sort items including the updated data.
      this.items = this.items.slice().sort((a, b) => {
        return b.numberOfLikes - a.numberOfLikes
      })
    } catch (error) {
      throw error
    }
  }).bind(this)

  @observable private ignoreUsers: string[]
  constructor() {
    this.items = []
    this.ignoreUsers = []
  }

  @action public setItems(items: IOverviewItem[]) {
    this.items = items
  }

  @action public ignoreUser(userId: string) {
    this.ignoreUsers.push(userId)
  }

  @action public unignoreUser(userId: string) {
    const index = this.ignoreUsers.findIndex((item) => item === userId)

    if (index >= 0) {
      this.ignoreUsers.splice(index, 1)
    }
  }
}

export default OverviewStore
