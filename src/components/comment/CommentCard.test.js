import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../../appUtils'
import { NonHocCommentCard } from './CommentCard'

const defaultProps = {
  comment: {
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium"
  },
  deleteComment: () => {}
}

const setup = (intialProps={}) => {
  const setupProps = { ...defaultProps, ...intialProps }
  return shallow(<NonHocCommentCard {...setupProps} />)
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-comment-card')
    expect(component.length).toBe(1)
  })
  test('renders comment-name', () => {
    const commentName = findByTestAttr(wrapper, 'comment-name')
    expect(commentName.text().length).not.toBe(0)
  })
  test('renders comment-email', () => {
    const commentEmail = findByTestAttr(wrapper, 'comment-email')
    expect(commentEmail.text().length).not.toBe(0)
  })
  test('renders comment-body', () => {
    const commentBody = findByTestAttr(wrapper, 'comment-body')
    expect(commentBody.text().length).not.toBe(0)
  })
  test('renders edit comment button', () => {
    const editCommentBtn = findByTestAttr(wrapper, 'edit-comment-button')
    expect(editCommentBtn.text().length).not.toBe(0)
  })
  test('renders delete comment button', () => {
    const deleteCommentBtn = findByTestAttr(wrapper, 'delete-comment-button')
    expect(deleteCommentBtn.text().length).not.toBe(0)
  })
})
test('does not throw warning with expected props', () => {
  checkProps(NonHocCommentCard, defaultProps)
})
test('go to edit comment page when edit comment button clicked', () => {
  const commentId = 1
  const props = {
    history: []
  }
  const wrapper = setup(props)
  const editCommentBtn = findByTestAttr(wrapper, 'edit-comment-button')
  editCommentBtn.simulate('click')

  expect(wrapper.instance().props.history[0]).toBe(`/edit-comment/${commentId}`)

})
test('calls `deleteComment` props with commentId as argument when delete comment btn clicked', () => {
  const deletedCommentId = 1
  const deleteCommentMock = jest.fn()
  const props = {
    deleteComment: deleteCommentMock
  }

  const wrapper = setup(props)
  const deleteCommentBtn = findByTestAttr(wrapper, 'delete-comment-button')
  deleteCommentBtn.simulate('click')

  expect(deleteCommentMock.mock.calls[0][0]).toBe(deletedCommentId)
})