import moxios from 'moxios'

import { storeFactory } from '../../appUtils'
import { 
  getPostComments, deleteComment, getCommentDetail, addComment, editComment
} from './commentActions'
import actionTypes from './actionTypes';

describe('comment action creator', () => {
  let store, commentList
  beforeEach(() => {
    moxios.install()

    store = storeFactory()
    commentList = [
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
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('adds response commentList to state when getPostComments action creator called', () => {
    const postId = 1

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: commentList,
      })
    })

    return store.dispatch(getPostComments(postId))
      .then(() => {
        const newState = store.getState()
        expect(newState.comment.commentList).toEqual(commentList)
      })
  })
  test('delete single comment', () => {
    const deletedCommentId = 1
    const newCommentList = commentList.filter(comment => comment.id !== deletedCommentId)

    store.dispatch({
      type: actionTypes.SET_POST_COMMENTS,
      payload: commentList,
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })

    return store.dispatch(deleteComment(deletedCommentId))
      .then(() => {
        const newState = store.getState()
        expect(newState.comment.commentList).toEqual(newCommentList)
      })
  })
  test('get comment detail', () => {
    const commentDetail = {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium"
    }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: commentDetail
      })
    })
    return store.dispatch(getCommentDetail(commentDetail.id))
      .then(() => {
        const newState = store.getState()
        expect(newState.comment.commentDetail).toEqual(commentDetail)
      })
  })
  test('add single comment', () => {
    const newComment = {
      postId: 1,
      id: 3,
      name: "xxid labore ex et quam laborum",
      email: "xxEliseo@gardner.biz",
      body: "xxlaudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium"
    }
    const newCommentList = [
      ...commentList,
      newComment,
    ]
    store.dispatch({
      type: actionTypes.SET_POST_COMMENTS,
      payload: commentList,
    })
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: newComment,
      })
    })
    return store.dispatch(addComment(newComment))
      .then(() => {
        const newState = store.getState()
        expect(newState.comment.commentList).toEqual(newCommentList)
      })
  })
  test('edit comment', () => {
    const newComment = {
      postId: 1,
      id: 2,
      name: "xxid labore ex et quam laborum",
      email: "xxEliseo@gardner.biz",
      body: "xxlaudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium"
    }
    const newCommentList = [
      ...commentList.filter(comment => comment.id !== newComment.id),
      newComment,
    ]
    store.dispatch({
      type: actionTypes.SET_POST_COMMENTS,
      payload: commentList,
    })
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: newComment,
      })
    })
    return store.dispatch(editComment(newComment, newComment.id))
      .then(() => {
        const newState = store.getState()
        expect(newState.comment.commentList).toEqual(newCommentList)
      })
  })
})