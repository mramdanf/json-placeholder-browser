import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory, checkProps } from '../../appUtils'
import CommentList, { UnconnectedCommentList } from './CommentList'

const postId = 1
const commentList = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium"
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et"
  },
]

const setup = (initialState={}, initialProps={ postId }) => {
  const store = storeFactory(initialState)
  return shallow(<CommentList store={store} {...initialProps} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ comment: { commentList } })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-comment-list')
    expect(component.length).toBe(1)
  })
  test('renders correct number of post comments', () => {
    const commentCardNodes = findByTestAttr(wrapper, 'comment-card')
    expect(commentCardNodes.length).toBe(commentList.length)
  })
})
test('does not throw warning with expected props', () => {
  checkProps(CommentList, { postId: postId })
})
test('calls getPostComments with postId as argument on app mounted', () => {
  const getPostCommentsMock = jest.fn()
  const props = {
    postId,
    getPostComments: getPostCommentsMock
  }
  const wrapper = shallow(<UnconnectedCommentList {...props} />)

  wrapper.instance().componentDidMount()

  expect(getPostCommentsMock.mock.calls[0][0]).toBe(postId)
})