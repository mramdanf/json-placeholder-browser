import React from 'react'
import { shallow } from 'enzyme'

import UserList from './UserList'
import { findByTestAttr } from '../../appUtils'

const setup = () => {
  return shallow(<UserList />)
}

describe('renders', () => {
  test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-user-list')
    expect(component.length).toBe(1)
  })
})