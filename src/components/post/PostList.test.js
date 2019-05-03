import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory, checkProps } from '../../appUtils'
import PostList, { UnConnectedPostList } from './PostList'

const postList = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  },
]

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  return shallow(<PostList store={store} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ post: { postList } })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-post-list')
    expect(component.length).toBe(1)
  })
  test('renders correct number of user posts', () => {
    const postCardNodes = findByTestAttr(wrapper, 'post-card')
    expect(postCardNodes.length).toBe(postList.length)
  })
})
test('calls `getUserPosts` on app mount with userId as arguments', () => {
  const getUserPostsMock = jest.fn()
  const userId = 1
  const props = {
    getUserPosts: getUserPostsMock,
    postList,
    match: { params: { id: 1 } },
  }
  const wrapper = shallow(<UnConnectedPostList {...props} />)

  wrapper.instance().componentDidMount()

  expect(getUserPostsMock.mock.calls[0][0]).toBe(props.match.params.id)
})