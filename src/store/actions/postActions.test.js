import moxios from 'moxios'

import { storeFactory } from '../../appUtils'
import { getUserPosts, deletePost } from './postActions'
import actionTypes from './actionTypes';

describe('post action creator', () => {
  let postList, store
  beforeEach(() => {
    moxios.install()
    postList = [
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
    store = storeFactory()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('adds response userPostList to state when getUserPosts action creator called', () => {
    const user = {
      id: 1
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: postList
      })
    })

    return store.dispatch(getUserPosts(user))
      .then(() => {
        const newState = store.getState()
        expect(newState.post.postList).toBe(postList)
      })
  })
  test('delete single post', () => {
    const deletedPostId = 1
    let newPostList = postList.filter(post => post.id !== deletedPostId)

    // Mocking user post list
    store.dispatch({
      type: actionTypes.SET_USER_POSTS,
      payload: postList
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })

    return store.dispatch(deletePost(deletedPostId))
      .then(() => {
        const newState = store.getState()
        expect(newState.post.postList).toEqual(newPostList)
      })
  })
})