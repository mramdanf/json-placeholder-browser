import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../appUtils'
import PostForm, { UnconnectedPostForm } from './PostForm'

const setup = (initialState={}, initialProps={}) => {
  const store = storeFactory(initialState)
  return shallow(<PostForm store={store} {...initialProps} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup(
      { post: { postDetail: {} } },
      { match: { params: { id: undefined } } }
    )
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-post-form')
    expect(component.length).toBe(1)
  })
  test('renders submit button', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.text().length).not.toBe(0)
  })
})


describe('add post mode', () => {
  describe('renders', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup(
        { post: { postDetail: {} } },
        { match: { params: { id: undefined } } }
      )
    })
    test('renders input user id with empty value', () => {
      const inputUser = findByTestAttr(wrapper, 'input-user')
      expect(inputUser.prop('value')).toBe('')
    })
    test('renders input post title with empty value', () => {
      const inputTitle = findByTestAttr(wrapper, 'input-title')
      expect(inputTitle.prop('value')).toBe('')
    })
    test('renders input post body with empty value', () => {
      const inputBody = findByTestAttr(wrapper, 'input-body')
      expect(inputBody.prop('value')).toBe('')
    })
    test('calls addPost props with newPost as argument when submit button clicked', () => {
      const addPostMock = jest.fn()
      const postDetail = {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
      }
      const props = {
        post: { postDetail },
        match: { params: { id: undefined } },
        addPost: addPostMock,
        history: [],
      }
      const wrapper = shallow(<UnconnectedPostForm {...props} />)

      wrapper.instance().state = postDetail

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(addPostMock.mock.calls[0][0]).toEqual(postDetail)
    })
  })
})
describe('edit post mode', () => {
  describe('renders', () => {
    let wrapper, postDetail, postId
    beforeEach(() => {
      postId = 1
      postDetail = {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
      }
      wrapper = setup(
        { post: { postDetail } },
        { match: { params: { id: postId } } }
      )
      wrapper.instance().componentDidUpdate()
    })
    test('renders input user id with non-empty value', () => {
      const inputUser = findByTestAttr(wrapper, 'input-user')
      expect(inputUser.prop('value')).toEqual(postDetail.userId)
    })
    test('renders input post title with non-empty value', () => {
      const inputTitle = findByTestAttr(wrapper, 'input-title')
      expect(inputTitle.prop('value')).toEqual(postDetail.title)
    })
    test('renders input post body with non-empty value', () => {
      const inputBody = findByTestAttr(wrapper, 'input-body')
      expect(inputBody.prop('value')).toEqual(postDetail.body)
    })
    test('calls getPostDetail on with postId as argument on app mount', () => {
      const getPostDetailMock = jest.fn()
      const props = {
        post: postDetail,
        match: { params: { id: postId } },
        getPostDetail: getPostDetailMock,
      }
      const wrapper = shallow(<UnconnectedPostForm {...props} />)

      wrapper.instance().componentDidMount()

      expect(getPostDetailMock.mock.calls[0][0]).toBe(props.match.params.id)
    })
    test('calls editPost props with newPost as argument when submit button clicked', () => {
      const editPostMock = jest.fn()
      const postDetail = {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
      }
      const props = {
        post: { postDetail },
        match: { params: { id: postDetail.id } },
        editPost: editPostMock,
        history: [],
      }
      const wrapper = shallow(<UnconnectedPostForm {...props} />)

      wrapper.instance().state = postDetail

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(editPostMock.mock.calls[0][0]).toEqual(postDetail)
    })
  })
})

