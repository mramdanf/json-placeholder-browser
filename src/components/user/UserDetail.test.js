import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../../appUtils'
import UserDetail from './UserDetail'

const defaultProps = {
  name: 'Ramdan',
  email: 'mramdanf@gmail.com',
  phone: '0812233444',
}

const setup = (initialProps={}) => {
  const setupProps = { ...defaultProps, ...initialProps }
  return shallow(<UserDetail {...setupProps} />)
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-user-detail')
    expect(component.length).toBe(1)
  })
  test('renders user fullName', () => {
    const userFullName = findByTestAttr(wrapper, 'user-fullname')
    expect(userFullName.text().length).not.toBe(0)
  })
  test('renders user email', () => {
    const userEmail = findByTestAttr(wrapper, 'user-email')
    expect(userEmail.text().length).not.toBe(0)
  })
  test('renders user phone', () => {
    const userPhone = findByTestAttr(wrapper, 'user-phone')
    expect(userPhone.text().length).not.toBe(0)
  })
})
test('does not throw warning with expected props', () => {
  checkProps(UserDetail, defaultProps)
})