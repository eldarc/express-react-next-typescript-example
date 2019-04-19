/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { Store } from '@/store'

import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders correctly', () => {
    const tree = renderer
        .create(<Navbar store={new Store(false)}/>)
        .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
