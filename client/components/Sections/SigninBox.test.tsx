/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { Store } from '@/store'

import SigninBox from './SigninBox'

describe('SigninBox', () => {
  it('renders correctly', () => {
    const tree = renderer
        .create(<SigninBox store={new Store(false)}/>)
        .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
