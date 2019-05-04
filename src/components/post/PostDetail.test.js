import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../appUtils'
import PostDetail, { UnconnectedPostDetail } from './PostDetail'

const postDetail = {
  userId: 1,
  id: 1,
  title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
}

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  const defaultProps = { match: { params: { id: postDetail.id } } }
  return shallow(<PostDetail store={store} {...defaultProps} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ post: { postDetail } })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-post-detail')
    expect(component.length).toBe(1)
  })
  test('renders post title', () => {
    const postTitle = findByTestAttr(wrapper, 'post-title')
    expect(postTitle.text().length).not.toBe(0)
  })
  test('renders post body', () => {
    const postBody = findByTestAttr(wrapper, 'post-body')
    expect(postBody.text().length).not.toBe(0)
  })
  test('renders post comments list', () => {
    const postComments = findByTestAttr(wrapper, 'post-comments')
    expect(postComments.length).toBe(1)
  })
  test('render edit post button', () => {
    const editPostBtn = findByTestAttr(wrapper, 'edit-post-button')
    expect(editPostBtn.text().length).not.toBe(0)
  })
  test('renders add comment button', () => {
    const addCommentBtn = findByTestAttr(wrapper, 'add-comment-button')
    expect(addCommentBtn.text().length).not.toBe(0)
  })
})
test('calls getPostDetail with argument postId on app mounted', () => {
  const getPostDetailMock = jest.fn()
  const props = {
    getPostDetail: getPostDetailMock,
    match: { params: { id: postDetail.id } },
    post: postDetail,
  }
  const wrapper = shallow(<UnconnectedPostDetail {...props} />)

  wrapper.instance().componentDidMount()

  expect(getPostDetailMock.mock.calls[0][0]).toBe(props.match.params.id)
})