/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { Store } from '@/store'

import ChangePasswordBox from './ChangePasswordBox'

describe('ChangePasswordBox', () => {
  it('renders correctly', () => {
    const tree = renderer
        .create(<ChangePasswordBox store={new Store(false)}/>)
        .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
