import actionTypes from '../../store/actions/actionTypes'
import postReducer from './postReducer'

test('returns default initial state of {} when no action is passed', () => {
  const newState = postReducer(undefined, {})
  expect(newState).toEqual({})
})
test('returns { postList: [...] } when receiving an action of type `SET_USER_POSTS`', () => {
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
  const action = {
    type: actionTypes.SET_USER_POSTS,
    payload: postList,
  }
  const newState = postReducer(undefined, action)
  expect(newState.postList).toEqual(postList)
})