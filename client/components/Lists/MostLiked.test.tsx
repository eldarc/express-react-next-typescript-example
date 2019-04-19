/* eslint-env jest */
import React from 'react'
import { render } from 'enzyme'
import { Provider } from 'mobx-react'

import MostLiked from './MostLiked'
import { Store } from '@/store'
import { IOverviewItem } from '@/interfaces/OverviewStore'

// Back-end returns the list ordered by `numberOfLikes`
const baseUsers: IOverviewItem[] = [
  {
    _id: '1',
    username: 'username_1',
    numberOfLikes: 3,
    featuredLikes: []
  },
  {
    _id: '2',
    username: 'username_2',
    numberOfLikes: 3,
    featuredLikes: []
  },
  {
    _id: '3',
    username: 'username_3',
    numberOfLikes: 3,
    featuredLikes: []
  }
]

describe('MostLiked', () => {
  let store: Store

  beforeEach(() => {
    store = new Store(false)
  })

  it('renders overview list with three users when signed out', () => {
    // Prepare store.
    store.overview.setItems(baseUsers.slice())

    // Test component.
    const wrapper = render(<MostLiked store={store} />)

    // There should be three users on the list.
    expect(wrapper.find('.table tbody tr').length).toEqual(3)

    // All rows should have the `Sign in to like` button.
    expect(wrapper.find('.table tbody tr td .signin-to-like-btn').length).toEqual(3)
  })

  it('renders overview list with three users (one hidden) when signed in', async () => {
    // Prepare store.
    const newBaseUsers = baseUsers.slice()
    // `username_1` will represent the logged in user, which will be hidden from the list, and `username_2` will represent an user that `username_1` liked.
    newBaseUsers[1].featuredLikes.push(newBaseUsers[0]._id)

    // Save in the store.
    store.overview.items = baseUsers.slice()
    store.auth.isAuthenticated = true

    // Select the logged in user.
    store.user.userData = { ...newBaseUsers[0] }
    store.overview.ignoreUser(store.user.userData._id)

    // Test component.
    const wrapper = render(
        <Provider store={store}>
          <MostLiked />
        </Provider>
    )

    // There should be only two users on the list.
    expect(wrapper.find('.table tbody tr').length).toEqual(2)

    // The first user in the list is liked, so the unlike button should be rendered.
    expect(wrapper.find('.table tbody tr td .like-unlike-btn').eq(0).text()).toEqual('Unlike')

    // The second user in the list is not liked, so the like button should be rendered.
    expect(wrapper.find('.table tbody tr td .like-unlike-btn').eq(1).text()).toEqual('Like')
  })
})
