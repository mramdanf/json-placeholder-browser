import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../appUtils'
import CommentForm, { UnconnectedCommentForm } from './CommentForm'

const setup = (initialState={}, initialProps={}) => {
  const store = storeFactory(initialState)
  return shallow(<CommentForm store={store} {...initialProps} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup(
      { comment: { commentDetail: {} } },
      { match: { params: { id: undefined } } }
    )
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-comment-form')
    expect(component.length).toBe(1)
  })
  test('renders submit button', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.text().length).not.toBe(0)
  })
})
describe('add comment mode', () => {
  describe('renders', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup(
        { post: { commentDetail: {} } },
        { match: { params: { id: undefined } } }
      )
    })
    test('renders input name with empty value', () => {
      const inputName = findByTestAttr(wrapper, 'input-name')
      expect(inputName.prop('value')).toBe('')
    })
    test('renders input email with empty value', () => {
      const inputEmail = findByTestAttr(wrapper, 'input-email')
      expect(inputEmail.prop('value')).toBe('')
    })
    test('renders input comment body with empty value', () => {
      const commentBody = findByTestAttr(wrapper, 'input-body')
      expect(commentBody.prop('value')).toBe('')
    })
    test('calls addComment props with newComment as argument when submit button clicked', () => {
      const addCommentMock = jest.fn()
      const commentDetail = {
        postId: 1,
        id: 3,
        name: "odio adipisci rerum aut animi",
        email: "Nikita@garfield.biz",
        body: "quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus maiores nam est cum et ducimus et vero voluptates excepturi deleniti ratione"
      }
      const props = {
        comment: { commentDetail },
        match: { params: { id: undefined } },
        addComment: addCommentMock,
        history: [],
      }
      const wrapper = shallow(<UnconnectedCommentForm {...props} />)

      wrapper.instance().state = commentDetail

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(addCommentMock.mock.calls[0][0]).toEqual(commentDetail)
    })
  })
})
describe('edit post mode', () => {
  describe('renders', () => {
    let wrapper, commentDetail, commentId
    beforeEach(() => {
      commentId = 1
      commentDetail = {
        postId: 1,
        id: 3,
        name: "odio adipisci rerum aut animi",
        email: "Nikita@garfield.biz",
        body: "quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus maiores nam est cum et ducimus et vero voluptates excepturi deleniti ratione"
      }
      wrapper = setup(
        { comment: { commentDetail } },
        { match: { params: { id: commentId } } }
      )
      wrapper.instance().componentDidUpdate()
    })
    test('renders input name with non-empty value', () => {
      const inputName = findByTestAttr(wrapper, 'input-name')
      expect(inputName.prop('value')).toEqual(commentDetail.name)
    })
    test('renders input comment email with non-empty value', () => {
      const inputEmail = findByTestAttr(wrapper, 'input-email')
      expect(inputEmail.prop('value')).toEqual(commentDetail.email)
    })
    test('renders input comment body with non-empty value', () => {
      const inputBody = findByTestAttr(wrapper, 'input-body')
      expect(inputBody.prop('value')).toEqual(commentDetail.body)
    })
    test('calls getCommentDetail on with commentId as argument on app mount', () => {
      const getCommentDetailMock = jest.fn()
      const props = {
        comment: commentDetail,
        match: { params: { id: commentId } },
        getCommentDetail: getCommentDetailMock,
      }
      const wrapper = shallow(<UnconnectedCommentForm {...props} />)

      wrapper.instance().componentDidMount()

      expect(getCommentDetailMock.mock.calls[0][0]).toBe(props.match.params.id)
    })
    test('calls editComment props with newComment as argument when submit button clicked', () => {
      const editCommentMock = jest.fn()
      const props = {
        comment: { commentDetail },
        match: { params: { id: commentDetail.id } },
        editComment: editCommentMock,
        history: [],
      }
      const wrapper = shallow(<UnconnectedCommentForm {...props} />)

      wrapper.instance().state = commentDetail

      const submitButton = findByTestAttr(wrapper, 'submit-button')
      submitButton.simulate('click', { preventDefault() {} })

      expect(editCommentMock.mock.calls[0][0]).toEqual(commentDetail)
    })
  })
})