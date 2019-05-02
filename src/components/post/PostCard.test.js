import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../../appUtils'
import PostCard, { NonHocPostCard } from './PostCard'

const defaultProps = {
  post: {
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
  },
  author: 'Ramdan',
  commentsCount: 10,
}

const setup = (initialProps={}) => {
  const setupProps = { ...defaultProps, ...initialProps }
  return shallow(<NonHocPostCard {...setupProps} />)
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-post-card')
    expect(component.length).toBe(1)
  })
  test('renders post title', () => {
    const postTitle = findByTestAttr(wrapper, 'post-title')
    expect(postTitle.text().length).not.toBe(0)
  })
  test('renders post content', () => {
    const postContent = findByTestAttr(wrapper, 'post-body')
    expect(postContent.text().length).not.toBe(0)
  })
  test('renders post author', () => {
    const postAuthor = findByTestAttr(wrapper, 'post-author')
    expect(postAuthor.text().length).not.toBe(0)
  })
  test('renders post comments count', () => {
    const postCommentsCount = findByTestAttr(wrapper, 'post-comments-count')
    expect(postCommentsCount.text().length).not.toBe(0)
  })
  test('renders view detail post button', () => {
    const componentPostCard = findByTestAttr(wrapper, 'component-post-card')
    const actionDomProp = componentPostCard.prop('actions')
    const viewDetailPostBtn = actionDomProp.find(item => {
      return item.props.children.props['data-test'] == 'view-detail-post-button'
    })
    expect(viewDetailPostBtn).not.toBe(undefined)
  })
  test('renders delete post button', () => {
    const componentPostCard = findByTestAttr(wrapper, 'component-post-card')
    const actionDomProp = componentPostCard.prop('actions')
    const deletePostBtn = actionDomProp.find(item => {
      return item.props.children.props['data-test'] == 'delete-post-button'
    })
    expect(deletePostBtn).not.toBe(undefined)
  })
})
test('does not throw warning with expected props', () => {
  checkProps(PostCard, defaultProps)
})
