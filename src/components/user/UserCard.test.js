import React from 'react'
import { shallow } from 'enzyme'

import UserCard from './UserCard'
import { findByTestAttr, checkProps } from '../../appUtils'

const defaultProps = {
  user: {
    id: 1,
    fullName: 'Ramdan',
    email: 'mramdanf@gmail.com',
    phone: '08458947377',
  },
}

const setup = (initialProps={}) => {
  const setupProps = { ...defaultProps, ...initialProps }
  return shallow(<UserCard {...setupProps} />)
}

describe('renders', () => {
  let wrapper,
      componentUserCard
  beforeEach(() => {
    wrapper = setup()
    componentUserCard = findByTestAttr(wrapper, 'component-user-card')
  })
  test('renders without error', () => {
    expect(componentUserCard.length).toBe(1)
  })
  test('renders user-avatar', () => {
    expect(componentUserCard.prop('cover')).not.toBe({})
  })
  test('renders user-detail', () => {
    const userDetail = findByTestAttr(wrapper, 'user-detail')
    expect(userDetail.length).toBe(1)
  })
  test('renders view user posts button', () => {
    const actionDomProp = componentUserCard.prop('actions')
    const viewUserPostBtn = actionDomProp.find(item => {
      return item.props.children.props['data-test'] == 'view-user-posts-button'
    })
    expect(viewUserPostBtn).not.toBe(undefined)
  })
  test('renders view user albums button', () => {
    const actionDomProp = componentUserCard.prop('actions')
    const viewUserAlbumsBtn = actionDomProp.find(item => {
      return item.props.children.props['data-test'] == 'view-user-albums-button'
    })
    expect(viewUserAlbumsBtn).not.toBe(undefined)
  })
})
test('does not throws warning with expected props', () => {
  checkProps(UserCard, defaultProps)
})
test('calls `viewUserPosts` with arguments when view-user-posts-button clicked', () => {
  const props = {
    history: []
  }
  const wrapper = setup(props)
  
  const componentUserCard = findByTestAttr(wrapper, 'component-user-card')
  const actions = componentUserCard.prop('actions')
  const viewUserPostsBtn = actions.find(item => {
    return item.props.children.props['data-test'] == 'view-user-posts-button'
  })
  viewUserPostsBtn.props.children.props['onClick']()

  const receivedHistoryProps = wrapper.instance().props.history[0]
  expect(receivedHistoryProps).toBe(`user-posts/${defaultProps.user.id}`)
})
test('calls `viewUserAlbums` with arguments when view-user-almbums-button clicked', () => {
  const props = {
    history: []
  }
  const wrapper = setup(props)
  
  const componentUserCard = findByTestAttr(wrapper, 'component-user-card')
  const actions = componentUserCard.prop('actions')
  const viewUserAlbumsBtn = actions.find(item => {
    return item.props.children.props['data-test'] == 'view-user-albums-button'
  })
  viewUserAlbumsBtn.props.children.props['onClick']()

  const receivedHistoryProps = wrapper.instance().props.history[0]
  expect(receivedHistoryProps).toBe(`user-albums/${defaultProps.user.id}`)
})