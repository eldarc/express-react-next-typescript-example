/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import SignInToLike from './SignInToLike'

describe('SignInToLike', () => {
  it('renders correctly', () => {
    const tree = renderer
        .create(<SignInToLike/>)
        .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
