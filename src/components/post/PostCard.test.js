import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../../appUtils'
import PostCard, { NonHocPostCard } from './PostCard'

const defaultProps = {
  post: {
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
  },
  deletePost: () => {}
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
  test('renders edit post button', () => {
    const componentPostCard = findByTestAttr(wrapper, 'component-post-card')
    const actionDomProp = componentPostCard.prop('actions')
    const editPostBtn = actionDomProp.find(item => {
      return item.props.children.props['data-test'] === 'edit-post-button'
    })
    expect(editPostBtn).not.toBe(undefined)
  })
})
test('does not throw warning with expected props', () => {
  checkProps(PostCard, defaultProps)
})
test('calls `viewDetailPost` with non-empty arguments when view detail post button clicked', () => {
  const props = {
    history: []
  }
  const wrapper = setup(props)
  
  const postUserCard = findByTestAttr(wrapper, 'component-post-card')
  const actions = postUserCard.prop('actions')
  const viewDetailPostBtn = actions.find(item => {
    return item.props.children.props['data-test'] == 'view-detail-post-button'
  })
  viewDetailPostBtn.props.children.props['onClick']()

  const receivedHistoryProps = wrapper.instance().props.history[0]
  expect(receivedHistoryProps).toBe(`/post-detail/${defaultProps.post.id}`)
})
test('calls `deletePost` with postId argument when delete post button clicked', () => {
  const deletePostMock = jest.fn()
  const props = {
    deletePost: deletePostMock
  }

  const wrapper = setup(props)
  
  const componentPostCard = findByTestAttr(wrapper, 'component-post-card')
  const actionDomProp = componentPostCard.prop('actions')
  const deletePostBtn = actionDomProp.find(item => {
    return item.props.children.props['data-test'] == 'delete-post-button'
  })

  deletePostBtn.props.children.props['onClick']()

  expect(deletePostMock.mock.calls[0][0]).toBe(defaultProps.post.id)
  
})
test('go to edit post page when edit post button clicked', () => {
  const props = {
    history: []
  }
  const wrapper = setup(props)
  
  const postUserCard = findByTestAttr(wrapper, 'component-post-card')
  const actions = postUserCard.prop('actions')
  const editPostBtn = actions.find(item => {
    return item.props.children.props['data-test'] == 'edit-post-button'
  })
  editPostBtn.props.children.props['onClick']()

  const receivedHistoryProps = wrapper.instance().props.history[0]
  expect(receivedHistoryProps).toBe(`/edit-post/${defaultProps.post.id}`)
})
