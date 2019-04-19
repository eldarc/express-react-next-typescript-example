/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'

import Footer from './Footer'

describe('Footer', () => {
  it('renders the footer with correct text', () => {
    const wrapper = shallow(<Footer/>)
    expect(wrapper.find('.footer').find('.text-muted').text()).toEqual('Example footer')
  })
})
