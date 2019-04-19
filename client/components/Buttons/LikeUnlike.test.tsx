/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { Store } from '@/store'

import LikeUnlike from './LikeUnlike'

describe('LikeUnlike', () => {
  it('renders correctly like mode', () => {
    const tree = renderer
        .create(<LikeUnlike mode="like" userId="1" store={new Store(false)}/>)
        .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly unlike mode', () => {
    const tree = renderer
        .create(<LikeUnlike mode="unlike" userId="1" store={new Store(false)}/>)
        .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
